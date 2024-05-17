import "../styles/style.css";
import ceritaData from "../data/Cerita.json"; // Impor data JSON
import ekowisataData from "../data/Ekowisata.json"; // Impor data JSON Ekowisata
import spesiesData from "../data/Spesies.json";
import edukasiData from "../data/Edukasi.json"; // Import the education data JSON

// Memilih elemen destinasi-section
const destinasiSection = document.querySelector(".destinasi-section");

// Mengecek apakah elemen destinasi-section ditemukan
if (destinasiSection) {
  // Mendapatkan div dengan class row di dalam destinasi-section
  const destinasiRow = destinasiSection.querySelector(".row");

  // Fungsi untuk menampilkan tiga destinasi ekowisata
  function tampilkanDestinasi() {
    // Kosongkan div row sebelum menambahkan destinasi baru
    destinasiRow.innerHTML = "";

    // Ambil tiga destinasi acak dari data JSON
    const destinasiAcak = getRandomDestinations(
      ekowisataData.ekowisata_hutan,
      3
    );

    // Loop melalui tiga destinasi acak
    destinasiAcak.forEach((destinasi) => {
      // Membuat elemen div untuk setiap destinasi
      const destinasiCol = document.createElement("div");
      destinasiCol.classList.add("col-md-4");

      // Membuat konten destinasi ekowisata
      const destinasiContent = `
        <div class="image-container">
          <img src="${destinasi.gambar}" alt="${destinasi.nama_tempat}" class="img-fluid" />
          <h1>${destinasi.lokasi}</h1>
        </div>
        <div class="text-content">
          <h4>${destinasi.nama_tempat}</h4>
          <p>${destinasi.deskripsi}</p>
        </div>
      `;

      // Menambahkan konten destinasi ke dalam elemen destinasiCol
      destinasiCol.innerHTML = destinasiContent;

      // Menambahkan elemen destinasiCol ke dalam div row
      destinasiRow.appendChild(destinasiCol);
    });
  }

  // Fungsi untuk mengambil destinasi acak dari array destinasi
  function getRandomDestinations(destinasiArray, jumlah) {
    const destinasiAcak = [];
    const copyDestinasiArray = [...destinasiArray]; // Copy array destinasi untuk menghindari perubahan pada array asli

    for (let i = 0; i < jumlah; i++) {
      const randomIndex = Math.floor(Math.random() * copyDestinasiArray.length);
      destinasiAcak.push(copyDestinasiArray.splice(randomIndex, 1)[0]);
    }

    return destinasiAcak;
  }

  // Panggil fungsi tampilkanDestinasi untuk pertama kali
  tampilkanDestinasi();

  // Set interval untuk memperbarui destinasi setiap 10 detik
  setInterval(tampilkanDestinasi, 10000);
}

// Memilih elemen carousel
const carouselElement = document.querySelector("#ceritaCarousel");

// Mengecek apakah elemen carousel ditemukan
if (carouselElement) {
  // Inisialisasi carousel dengan menggunakan Bootstrap
  const carousel = new bootstrap.Carousel(carouselElement, {
    pause: "hover", // Menjeda carousel saat kursor melayang di atasnya
    interval: 5000, // Mengatur interval perpindahan slide menjadi 5 detik
  });

  // Mendapatkan elemen div dengan class carousel-inner
  const carouselInner = carouselElement.querySelector(".carousel-inner");

  // Loop melalui setiap cerita dalam data JSON
  ceritaData.keterlibatanMasyarakat.forEach((cerita, index) => {
    // Membuat elemen div untuk setiap cerita
    const ceritaItem = document.createElement("div");
    ceritaItem.classList.add("carousel-item");

    // Menandai elemen pertama sebagai aktif
    if (index === 0) {
      ceritaItem.classList.add("active");
    }

    // Membuat konten cerita
    const ceritaContent = `
      <section class="cerita-kita">
  <blockquote class="blockquote">
    <center>
      <img
        class="mb-3"
        src="${cerita.foto_profile}"
        alt="${cerita.nama}"
        class="profil-image"
        width="120"
        height="120"
      />
      <h3>${cerita.nama}</h3>
      <p class="waktu-unggah">${new Date(cerita.waktu_upload).toLocaleString(
        "id-ID",
        { dateStyle: "medium", timeStyle: "short" }
      )}</p>
    </center>
    <p class="detail-cerita">${cerita.cerita}</p>
  </blockquote>
</section>
    `;

    // Menambahkan konten cerita ke dalam elemen ceritaItem
    ceritaItem.innerHTML = ceritaContent;

    // Menambahkan elemen ceritaItem ke dalam carouselInner
    carouselInner.appendChild(ceritaItem);
  });

  // Menambahkan event listener untuk tombol "Previous" dan "Next"
  const prevButton = carouselElement.querySelector(".carousel-control-prev");
  const nextButton = carouselElement.querySelector(".carousel-control-next");

  prevButton.addEventListener("click", () => {
    carousel.prev();
  });

  nextButton.addEventListener("click", () => {
    carousel.next();
  });
}

// Memilih elemen spesies-section
const spesiesSection = document.querySelector(".spesies-section");

// Mengecek apakah elemen spesies-section ditemukan
if (spesiesSection) {
  // Fungsi untuk menampilkan data spesies
  function tampilkanSpesies() {
    // Ambil data spesies dari JSON
    const species = spesiesData.BasisDataSpesies;

    // Populate the images and overlays
    if (species.length >= 5) {
      document.getElementById("image1").src = species[0].gambar;
      document.getElementById("overlay1").innerText = species[0].kelas;

      document.getElementById("image2").src = species[1].gambar;
      document.getElementById("overlay2").innerText = species[1].kelas;

      document.getElementById("image3").src = species[2].gambar;
      document.getElementById("overlay3").innerText = species[2].kelas;

      document.getElementById("image4").src = species[3].gambar;
      document.getElementById("overlay4").innerText = species[3].kelas;

      document.getElementById("image5").src = species[4].gambar;
      document.getElementById("overlay5").innerText = species[4].kelas;
    }
  }

  // Panggil fungsi tampilkanSpesies untuk pertama kali
  tampilkanSpesies();
}

// Memilih elemen edukasi-section
const edukasiSection = document.querySelector(".edukasi-section");

// Mengecek apakah elemen edukasi-section ditemukan
if (edukasiSection) {
  // Mendapatkan div dengan id edukasiContainer di dalam edukasi-section
  const edukasiContainer = edukasiSection.querySelector("#edukasiContainer");

  // Fungsi untuk menampilkan data edukasi
  function tampilkanEdukasi() {
    // Kosongkan kontainer sebelum menambahkan edukasi baru
    edukasiContainer.innerHTML = "";

    // Ambil data edukasi dari JSON
    const edukasiDataArray = edukasiData.edukasi_dan_kesadaran_lingkungan_hutan;

    // Loop melalui data edukasi dan ambil hanya dua data pertama
    edukasiDataArray.slice(0, 2).forEach((edukasi, index) => {
      // Membuat elemen div untuk setiap edukasi
      const edukasiItem = document.createElement("div");
      edukasiItem.classList.add("flex-item");

      // Membuat konten edukasi
      const edukasiContent = `
        <div class="inner-flex-container row${index + 1}">
          <div class="text-container">
            <h3 style="font-size: 1.8rem">${edukasi.nama_isu}</h3>
            <div class="text">${edukasi.deskripsi} ${edukasi.dampak}</div>
          </div>
          <div class="image-edukasi"><img src="${edukasi.gambar}" alt="${
        edukasi.nama_isu
      }" /></div>
        </div>
      `;

      // Menambahkan konten edukasi ke dalam elemen edukasiItem
      edukasiItem.innerHTML = edukasiContent;

      // Menambahkan elemen edukasiItem ke dalam edukasiContainer
      edukasiContainer.appendChild(edukasiItem);
    });
  }

  // Panggil fungsi tampilkanEdukasi untuk pertama kali
  tampilkanEdukasi();
}
