import "../styles/style.css";
import ceritaData from "../data/Cerita.json";
import ekowisataData from "../data/Ekowisata.json";
import spesiesData from "../data/Spesies.json";
import edukasiData from "../data/Edukasi.json";

const destinasiSection = document.querySelector(".destinasi-section");

if (destinasiSection) {
  const destinasiRow = destinasiSection.querySelector(".row");

  function tampilkanDestinasi() {
    destinasiRow.innerHTML = "";

    const destinasiAcak = getRandomDestinations(
      ekowisataData.ekowisata_hutan,
      3
    );

    destinasiAcak.forEach((destinasi) => {
      const destinasiCol = document.createElement("div");
      destinasiCol.classList.add("col-md-4");

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

      destinasiCol.innerHTML = destinasiContent;

      destinasiRow.appendChild(destinasiCol);
    });
  }

  function getRandomDestinations(destinasiArray, jumlah) {
    const destinasiAcak = [];
    const copyDestinasiArray = [...destinasiArray];

    for (let i = 0; i < jumlah; i++) {
      const randomIndex = Math.floor(Math.random() * copyDestinasiArray.length);
      destinasiAcak.push(copyDestinasiArray.splice(randomIndex, 1)[0]);
    }

    return destinasiAcak;
  }

  tampilkanDestinasi();

  setInterval(tampilkanDestinasi, 10000);
}

const carouselElement = document.querySelector("#ceritaCarousel");

if (carouselElement) {
  const carousel = new bootstrap.Carousel(carouselElement, {
    pause: "hover",
    interval: 5000,
  });

  const carouselInner = carouselElement.querySelector(".carousel-inner");

  ceritaData.keterlibatanMasyarakat.slice(0, 3).forEach((cerita, index) => {
    const ceritaItem = document.createElement("div");
    ceritaItem.classList.add("carousel-item");

    if (index === 0) {
      ceritaItem.classList.add("active");
    }

    const ceritaContent = `
    <section class="cerita-kita cerita-${index + 1}">
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
          <p class="waktu-unggah">${new Date(
            cerita.waktu_upload
          ).toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
          })}</p>
        </center>
        <p class="detail-cerita">${cerita.cerita}</p>
      </blockquote>
    </section>
  `;

    ceritaItem.innerHTML = ceritaContent;

    carouselInner.appendChild(ceritaItem);
  });

  const prevButton = carouselElement.querySelector(".carousel-control-prev");
  const nextButton = carouselElement.querySelector(".carousel-control-next");

  prevButton.addEventListener("click", () => {
    carousel.prev();
  });

  nextButton.addEventListener("click", () => {
    carousel.next();
  });
}

const spesiesSection = document.querySelector(".spesies-section");

if (spesiesSection) {
  function tampilkanSpesies() {
    const species = spesiesData.BasisDataSpesies;

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

  tampilkanSpesies();
}

const edukasiSection = document.querySelector(".edukasi-section");

if (edukasiSection) {
  const edukasiContainer = edukasiSection.querySelector("#edukasiContainer");

  function tampilkanEdukasi() {
    edukasiContainer.innerHTML = "";

    const edukasiDataArray = edukasiData.edukasi_dan_kesadaran_lingkungan_hutan;

    edukasiDataArray.slice(0, 2).forEach((edukasi, index) => {
      const edukasiItem = document.createElement("div");
      edukasiItem.classList.add("flex-item");

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

      edukasiItem.innerHTML = edukasiContent;

      edukasiContainer.appendChild(edukasiItem);
    });
  }

  tampilkanEdukasi();
}

function setActiveNavLink() {
  const url = window.location.href;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (link.href === url) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Call the function when the page is loaded
window.onload = setActiveNavLink;
