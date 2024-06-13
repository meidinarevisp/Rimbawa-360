const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  multipleStatements: true,
});

const createDatabaseAndTable = `
    CREATE DATABASE IF NOT EXISTS rimbawa360;
    USE rimbawa360;
    CREATE TABLE IF NOT EXISTS direktori (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama_tempat VARCHAR(255) NOT NULL,
        lokasi VARCHAR(255) NOT NULL,
        latitude VARCHAR(255) NOT NULL,
        longitude VARCHAR(255) NOT NULL,
        deskripsi TEXT NOT NULL,
        aktivitas TEXT NOT NULL,
        akses TEXT NOT NULL,
        fasilitas TEXT NOT NULL,
        gambar VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS edukasi (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama_isu VARCHAR(255) NOT NULL,
        deskripsi TEXT NOT NULL,
        dampak TEXT NOT NULL,
        solusi TEXT NOT NULL,
        gambar VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS spesies (
        id INT PRIMARY KEY AUTO_INCREMENT,
        namaSpesies VARCHAR(255) NOT NULL,
        deskripsi TEXT NOT NULL,
        kerajaan VARCHAR(255) NOT NULL,
        kelas VARCHAR(255) NOT NULL,
        statusKonservasi VARCHAR(255) NOT NULL,
        ordo VARCHAR(255) NOT NULL,
        spesies VARCHAR(255) NOT NULL,
        populasi VARCHAR(255) NOT NULL,
        rentanganHidup VARCHAR(255) NOT NULL,
        panjang VARCHAR(255) NOT NULL,
        berat VARCHAR(255) NOT NULL,
        kecepatanTertinggi VARCHAR(255) NOT NULL,
        gambar VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS auth (
        id_user INT PRIMARY KEY AUTO_INCREMENT,
        nama_pengguna VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT(11) NOT NULL,
        gambar VARCHAR(255), 
        date_created DATE NOT NULL,
        reset_password_token VARCHAR(255) NULL,
        reset_password_expires VARCHAR(255) NULL
    );

        CREATE TABLE IF NOT EXISTS cerita (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        username VARCHAR(255) NOT NULL,
        cerita TEXT NOT NULL,
        gambar VARCHAR(255), 
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES auth(id_user)
    );

        CREATE TABLE IF NOT EXISTS forum (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        username VARCHAR(255) NOT NULL,
        judul VARCHAR(255) NOT NULL,
        deskripsi TEXT NOT NULL,
        gambar VARCHAR(255) NOT NULL, 
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES auth(id_user)
    );

    INSERT INTO auth (nama_pengguna, email, username, password, role_id, gambar, date_created)
    SELECT * FROM (SELECT 'Meidina Revi Sandra Pertiwi', 'f6136xb325@dicoding.org', 'admin1', '${bcrypt.hashSync(
      "rimbawa360",
      10
    )}', 1, '', NOW()) AS tmp
    WHERE NOT EXISTS (
        SELECT username FROM auth WHERE username = 'admin1'
    ) LIMIT 1;

    INSERT INTO auth (nama_pengguna, email, username, password, role_id, gambar, date_created)
    SELECT * FROM (SELECT 'Mohammad Rifqi Abdan', 'f6136yb196@dicoding.org', 'admin2', '${bcrypt.hashSync(
      "rimbawa360",
      10
    )}', 1, '', NOW()) AS tmp
    WHERE NOT EXISTS (
        SELECT username FROM auth WHERE username = 'admin2'
    ) LIMIT 1;

    INSERT INTO auth (nama_pengguna, email, username, password, role_id, gambar, date_created)
    SELECT * FROM (SELECT 'Fikrin Werdiansyah', 'f1936yb112@dicoding.org', 'admin3', '${bcrypt.hashSync(
      "rimbawa360",
      10
    )}', 1, '', NOW()) AS tmp
    WHERE NOT EXISTS (
        SELECT username FROM auth WHERE username = 'admin3'
    ) LIMIT 1;
`;

pool.query(createDatabaseAndTable, (err, results) => {
  if (err) {
    console.error("Error creating database and table:", err);
  } else {
    console.log("Database and table created or already exist.");
  }
});

module.exports = pool.promise();
