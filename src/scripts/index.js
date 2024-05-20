import "../styles/style.css";
import "./components/Navbar";
import "./components/Footer";
import "./components/Hero";
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

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");
  const forumButton = document.querySelector(".btn-forum");
  const forumContainer = document.querySelector(".forum-container");
  const forumForm = document.getElementById("forumForm");
  const forumPosts = document.getElementById("forumPosts");

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backButton.classList.add("show");
      } else {
        backButton.classList.remove("show");
      }
    });
  }

  if (forumButton && forumContainer) {
    forumButton.classList.add("show"); // Ensure the button is displayed initially

    forumButton.addEventListener("click", function () {
      forumContainer.classList.toggle("show");
      if (forumContainer.classList.contains("show")) {
        loadPosts();
      }
    });

    forumForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("forumName").value;
      const message = document.getElementById("forumMessage").value;

      if (name && message) {
        const post = {
          name,
          message,
          time: new Date().toLocaleString("id-ID"),
        };
        savePost(post);
        document.getElementById("forumName").value = "";
        document.getElementById("forumMessage").value = "";
        loadPosts();
      }
    });
  }

  function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.push(post);
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }

  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    forumPosts.innerHTML = "";
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("forum-post");
      postElement.innerHTML = `
      <div>
        <h4>${post.name}</h4>
        <p>${post.message}</p>
      </div>
        <small>${post.time}</small>
        <div class="actions">
          <button class="btn-edit" data-index="${index}">Edit</button>
          <button class="btn-delete" data-index="${index}">Delete</button>
        </div>
    `;
      forumPosts.appendChild(postElement);
    });
  }

  forumPosts.addEventListener("click", function (event) {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    if (event.target.classList.contains("btn-edit")) {
      const index = event.target.dataset.index;
      const post = posts[index];
      Swal.fire({
        title: "Edit pesan:",
        input: "textarea",
        inputValue: post.message,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-info",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          post.message = result.value;
          posts[index] = post;
          localStorage.setItem("forumPosts", JSON.stringify(posts));
          loadPosts();
        }
      });

      // Set z-index for SweetAlert popup
      const swalPopup = document.querySelector(".swal2-popup");
      if (swalPopup) {
        swalPopup.style.zIndex = "9999";
      }
    } else if (event.target.classList.contains("btn-delete")) {
      Swal.fire({
        title: "Anda yakin ingin menghapus pesan ini?",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const index = event.target.dataset.index;
          posts.splice(index, 1);
          localStorage.setItem("forumPosts", JSON.stringify(posts));
          loadPosts();
        }
      });

      // Set z-index for SweetAlert popup
      const swalPopup = document.querySelector(".swal2-popup");
      if (swalPopup) {
        swalPopup.style.zIndex = "9999";
      }
    }
  });
});
