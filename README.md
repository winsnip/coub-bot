# COUB BOT

***Siapkan kopi 1 gelas ☕.***

***Pastikan Node.js dan npm sudah terinstall di server Anda. Jika belum, skrip instalasi sudah termasuk perintah instalasi.***

**LINUX/VPS**

1.) Untuk instalasi Linux / VPS, cukup salin dan jalankan perintah berikut di terminal:

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/coub.sh)
```

2.) Untuk memasukkan token baru setelah instalasi, buka file data.txt:

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

3.) Jika ingin menjalankan ulang bot secara manual, gunakan perintah ini:

```
node ~/coub-bot/index.js
```


**Termux**

1.) Untuk pengguna Termux, skrip ini juga bisa dijalankan. Salin dan jalankan perintah di bawah ini di Termux:

```
bash <(curl -s https://file.winsnip.xyz/file/uploads/coub.sh)
```

2.) Untuk menjalankan bot, gunakan perintah berikut:
```
coub-bot
```



**Windows**

1.) Skrip ini juga bisa digunakan di WSL. Setelah instalasi, Anda bisa menjalankan bot menggunakan perintah:

```
coub-bot
```



***DONASI***

kalo mau bayarin kopi https://trakteer.id/Winsnipsupport/tip