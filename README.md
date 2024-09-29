# COUB BOT

1.) Siapkan kopi 1 gelas ☕.

2.) Pastikan Node.js dan npm sudah terinstall di server Anda. Jika belum, skrip instalasi sudah termasuk perintah instalasi.

**LINUX/VPS**

4.) Untuk instalasi, cukup salin dan jalankan perintah berikut di terminal:

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/coub.sh)
```

5.) Untuk memasukkan token baru setelah instalasi, buka file data.txt:

```
nano ~/coub-bot/data.txt
```

***untuk check status***
```
systemctl status coub-bot
```

***untuk restart***
```
systemctl restart coub-bot
```

***untuk stop***
```
systemctl stop coub-bot
```

***untuk melihat logs***
```
journalctl -u coub-bot -f
```

6.) Jika ingin menjalankan ulang bot secara manual, gunakan perintah ini:

```
node ~/coub-bot/index.js
```


***DONASI***

kalo mau bayarin kopi https://trakteer.id/Winsnipsupport/tip