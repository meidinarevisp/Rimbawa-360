import SpesiesData from "../data/Spesies.json";
import "../styles/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const spesiesData = SpesiesData.BasisDataSpesies;

  function createSpesiesCard(spesies) {
    const card = document.createElement("div");
    card.classList.add("spesies-card");

    const img = document.createElement("img");
    img.src = spesies.gambar;
    img.alt = spesies.namaHewan;
    img.classList.add("spesies-image");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const text = document.createElement("div");
    text.classList.add("spesies-text");
    text.innerHTML = `
      <h3>${spesies.namaHewan}</h3>
      <hr>
      <p>${spesies.deskripsi}</p>
    `;

    const discoverMoreButton = document.createElement("a");
    discoverMoreButton.classList.add("discover-more-button");
    discoverMoreButton.innerHTML = `Detail Spesies <i class="fas fa-chevron-right"></i>`;
    discoverMoreButton.addEventListener("click", () => {
      window.location.href = `detail-spesies.html?id=${spesies.id}`;
    });

    textContainer.appendChild(text);
    textContainer.appendChild(discoverMoreButton);

    card.appendChild(img);
    card.appendChild(textContainer);

    return card;
  }

  function showSpesies(pageNumber) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = "";

    const start = (pageNumber - 1) * 5;
    const end = pageNumber * 5;

    for (let i = start; i < end && i < spesiesData.length; i++) {
      const spesies = spesiesData[i];
      const spesiesCard = createSpesiesCard(spesies);
      container.appendChild(spesiesCard);
    }

    // Otomatis scroll ke atas halaman
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createPagination() {
    const pagination = document.querySelector(".pagination");
    const totalPages = Math.ceil(spesiesData.length / 5);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.addEventListener("click", () => {
        showSpesies(i);
        updateActiveButton(i);
      });
      pagination.appendChild(button);

      if (i === 1) {
        button.classList.add("active");
      }
    }
  }

  function updateActiveButton(currentPage) {
    const buttons = document.querySelectorAll(".pagination button");
    buttons.forEach((button) => {
      button.classList.remove("active");
      if (parseInt(button.innerText) === currentPage) {
        button.classList.add("active");
      }
    });
  }

  showSpesies(1);
  createPagination();
});

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");

  // Tambahkan event listener untuk menggulir ke atas saat tombol diklik
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Tambahkan event listener untuk memeriksa saat pengguna menggulir halaman
    window.addEventListener("scroll", function () {
      // Jika pengguna menggulir lebih dari 200px dari atas, tampilkan tombol
      if (window.scrollY > 200) {
        backButton.classList.add("show");
      } else {
        // Jika tidak, sembunyikan tombol
        backButton.classList.remove("show");
      }
    });
  }
});
