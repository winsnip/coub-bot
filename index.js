const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

function printBanner() {
    console.log('\x1b[34m', '██     ██ ██ ███    ██ ███████ ███    ██ ██ ██████  ');
    console.log('\x1b[34m', '██     ██ ██ ████   ██ ██      ████   ██ ██ ██   ██ ');
    console.log('\x1b[34m', '██  █  ██ ██ ██ ██  ██ ███████ ██ ██  ██ ██ ██████  ');
    console.log('\x1b[34m', '██ ███ ██ ██ ██  ██ ██      ██ ██  ██ ██ ██ ██      ');
    console.log('\x1b[34m', ' ███ ███  ██ ██   ████ ███████ ██   ████ ██ ██      ');
    console.log('\x1b[0m');
    console.log("Join our Telegram channel: https://t.me/winsnip");
}

function consolewithTime(word) {
    const now = new Date().toISOString().split('.')[0].replace('T', ' ');
    console.log(`[${now}] ${word}`);
}

function loadQuery() {
    try {
        return fs.readFileSync('data.txt', 'utf-8').split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.log("File data.txt not found.");
        return [];
    }
}

async function getToken(apiToken) {
    try {
        const url = 'https://coub.com/api/v2/torus/token';
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-auth-token': apiToken,
        };
        const response = await axios.post(url, null, { headers });
        if (response.data) {
            const accessToken = response.data.access_token || '';
            const expiresIn = response.data.expires_in || 0; 
            const expirationHours = Math.round(expiresIn / 3600);

            if (expirationHours > 0) {
                consolewithTime( `Success get token, Expired in ${expirationHours} Hour`);
            } else {
                consolewithTime( `Success get token, Expires in less than 1 hour`);
            }
            
            return accessToken;
        }
    } catch (error) {
        consolewithTime( `Error getting token: ${error.message}`);
        return null;
    }
}

async function login(query) {
    try {
        const url = 'https://coub.com/api/v2/sessions/login_mini_app';
        const response = await axios.post(url, new URLSearchParams(query));
        
        if (response.data) {
            consolewithTime("Mendapatkan Token");
            const apiToken = response.data.api_token || "";
            return await getToken(apiToken);
        }
    } catch (error) {
        consolewithTime( `Error during login: ${error.message}`);
        return null;
    }
}

async function getRewards(token) {
    try {
        const url = 'https://rewards.coub.com/api/v2/get_user_rewards';
        const headers = {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        };
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        consolewithTime( `Failed get reward. Error: ${error.response ? error.response.status : error.message}`);
        return null;
    }
}

async function claimTask(token, taskId, taskTitle) {
    try {
        const url = 'https://rewards.coub.com/api/v2/complete_task';
        const headers = {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        };
        const params = { task_reward_id: taskId };
        const response = await axios.get(url, { headers, params });
        return response.data;
    } catch (error) {
        consolewithTime( `ID ${taskId} | Task '${taskTitle}' failed to claim`);
        return null;
    }
}

async function main() {
    printBanner();
    while (true) {
        const queries = loadQuery();
        const tasks = JSON.parse(fs.readFileSync("coub_task.json"));
        const totalQueries = queries.length;

        const delay = Math.floor(24 * Math.random() * (3600 + Math.random() * 50));
        const startTime = Date.now();

        for (let index = 0; index < totalQueries; index++) {
            const query = queries[index];
            // parse query
            const parsed = Object.fromEntries(new URLSearchParams(query));
            parsed.user = JSON.parse(decodeURIComponent(parsed.user));

            // get user
            const user = parsed.user;
            const username = user.username || '';
            consolewithTime( `====== Account ${index + 1}/${totalQueries} | ${username} ======`);

            const token = await login(query);
            const dataReward = await getRewards(token);
            console.log("")
            const validTaskIds = dataReward.map(data => data.id).filter(id => ![2, 12, 13, 15, 16, 19].includes(id));

            for (const task of tasks) {
                const taskId = task.id;
        
                if (validTaskIds.includes(taskId)) {
                    consolewithTime(`✅ ${task.title} Done...`);
                } else {
                    consolewithTime(`🚀 ${task.title} Starting task...`);
                    await claimTask(token, taskId, task.title);
                }
            }
        }

        const endTime = Date.now();
        const totalTime = delay - (endTime - startTime);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        
        const now = new Date().toISOString().split('.')[0].replace('T', ' ');
        console.log(`[${now}] Waiting in ${seconds} seconds to continue...`);
        if (seconds > 0) {
            await new Promise(resolve => setTimeout(resolve, totalTime));
        }
    }
}

main().catch(console.error);
