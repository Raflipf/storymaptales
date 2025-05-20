# Panduan Mengatur HTTPS Lokal untuk Service Worker dan PWA

Berikut langkah-langkah untuk mengatur HTTPS lokal menggunakan mkcert dan menjalankan server HTTPS untuk folder `dist` Anda:

## 1. Install mkcert

- Download dan install mkcert dari https://github.com/FiloSottile/mkcert
- Ikuti petunjuk instalasi sesuai OS Anda.

## 2. Buat Sertifikat SSL Lokal

Buka terminal dan jalankan perintah berikut di folder proyek Anda:

```bash
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

Perintah ini akan membuat dua file sertifikat, misalnya:

- `localhost+2.pem` (sertifikat)
- `localhost+2-key.pem` (private key)

## 3. Jalankan Server HTTPS

Anda bisa menggunakan `serve` atau `http-server` dengan opsi HTTPS.

Contoh menggunakan `serve`:

```bash
npx serve -s dist --ssl-cert localhost+2.pem --ssl-key localhost+2-key.pem
```

Atau menggunakan `http-server`:

```bash
npx http-server dist -S -C localhost+2.pem -K localhost+2-key.pem
```

## 4. Akses Aplikasi

Buka browser dan akses:

```
https://localhost:5000
```

atau port yang digunakan server.

## 5. Akses dari Jaringan Lokal

Untuk mengakses dari perangkat lain di jaringan lokal, Anda perlu membuat sertifikat untuk IP lokal Anda:

```bash
mkcert 192.168.x.x
```

Ganti `192.168.x.x` dengan IP lokal komputer Anda.

Kemudian jalankan server HTTPS dengan sertifikat tersebut.

## 6. Verifikasi

- Pastikan service worker terdaftar di DevTools > Application > Service Workers.
- Pastikan prompt instalasi PWA muncul.

Jika Anda butuh bantuan lebih lanjut, beri tahu saya.
