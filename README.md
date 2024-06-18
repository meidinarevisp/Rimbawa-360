# Website Rimbawa 360 Dengan Node.js
<p align="center"><a href="https://nodejs.org/en" target="_blank"><img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" width="400" alt="Node.js Logo"></a></p>

## Release types

* **Current**: Under active development. Code for the Current release is in the
  branch for its major version number (for example,
  [v19.x](https://github.com/nodejs/node/tree/v19.x)). Node.js releases a new
  major version every 6 months, allowing for breaking changes. This happens in
  April and October every year. Releases appearing each October have a support
  life of 8 months. Releases appearing each April convert to LTS (see below)
  each October.
* **LTS**: Releases that receive Long Term Support, with a focus on stability
  and security. Every even-numbered major version will become an LTS release.
  LTS releases receive 12 months of _Active LTS_ support and a further 18 months
  of _Maintenance_. LTS release lines have alphabetically-ordered code names,
  beginning with v4 Argon. There are no breaking changes or feature additions,
  except in some special circumstances.
* **Nightly**: Code from the Current branch built every 24-hours when there are
  changes. Use with caution.

Current and LTS releases follow [semantic versioning](https://semver.org). A
member of the Release Team [signs](#release-keys) each Current and LTS release.
For more information, see the
[Release README](https://github.com/nodejs/Release#readme).

### Download

Binaries, installers, and source tarballs are available at
<https://nodejs.org/en/download/>.

#### Current and LTS releases

<https://nodejs.org/download/release/>

The [latest](https://nodejs.org/download/release/latest/) directory is an
alias for the latest Current release. The latest-_codename_ directory is an
alias for the latest release from an LTS line. For example, the
[latest-hydrogen](https://nodejs.org/download/release/latest-hydrogen/)
directory contains the latest Hydrogen (Node.js 18) release.

#### Nightly releases

<https://nodejs.org/download/nightly/>

Each directory name and filename contains a date (in UTC) and the commit
SHA at the HEAD of the release.


## Langkah-langkah Instalasi

1. *Clone Project*

    - Clone project dari repository dengan menggunakan perintah berikut:
        bash
        git clone https://github.com/meidinarevisp/Rimbawa-360.git
        
        
2. *Install NPM Dependencies*
    - Masuk ke direktori project dengan perintah:
	bash
	cd Rimbawa-360

    - Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:
        bash
        npm install

    - Jalankan perintah berikut untuk menginstal webpack dan webpack-dev-server:
	bash
	npm install webpack webpack-cli webpack-dev-server
        

3. *Copy dan Paste File .env*

    - Salin semua data dari file .env.example dan tempelkan di file .env:
        bash
        cp .env.example .env
        
        
4. *Create Database in PhpMyAdmin*

    - Buat database Bernama rimbawa360
                      

5. *Jalankan Server Lokal*
    - Terakhir, jalankan perintah berikut untuk menjalankan proyek secara lokal:
        bash
        npm run server
        
   - Setelah itu buka terminal baru dan Jalankan perintah berikut untuk membangun (build) aset dengan Webpack:
        bash
        npm run build
   - Setelah proses build selesai, jalankan perintah berikut untuk menjalankan server Webpack:
        bash
        npm run start-dev
        
    - Proyek akan berjalan di http://localhost:5000 || http://192.168.1.3:5000/ secara default.

6. *Login*
    - Daftar dan login menggunakan akun masing-masing untuk mengakses webnya.
    - Login ke dashboard admin menggunakan akun operator dengan email dan password berikut:
        - username: cek di DatabaseSeeder
        - password: cek di DatabasesSeeder
## Catatan

-   Pastikan Anda memiliki Git, Node.js, dan NPM yang terinstal di sistem Anda sebelum menjalankan langkah-langkah di atas.
-   Pastikan juga Anda memiliki database yang sudah terbuat dan konfigurasi yang sesuai di file .env.
