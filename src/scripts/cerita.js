import "../styles/style.css";
import ceritaData from "../data/Cerita.json";

const ceritaContainer = document.getElementById("ceritaContainer");
const paginationContainer = document.getElementById("pagination");

const itemsPerPage = 3; // Jumlah cerita per halaman
let currentPage = 1;

function displayCerita(page) {
  ceritaContainer.innerHTML = ""; // Bersihkan kontainer cerita sebelum menambahkan cerita baru

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const ceritaSlice = ceritaData.keterlibatanMasyarakat.slice(start, end);

  ceritaSlice.forEach((cerita, index) => {
    const ceritaItem = document.createElement("div");
    ceritaItem.classList.add("page-cerita", `cerita-${index + 1}`);

    const ceritaContent = `
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
        <p class="cerita-detail">${cerita.cerita}</p>
      </blockquote>
    `;

    ceritaItem.innerHTML = ceritaContent;
    ceritaContainer.appendChild(ceritaItem);
  });
}

function setupPagination() {
  paginationContainer.innerHTML = ""; // Bersihkan kontainer pagination sebelum membuat pagination baru

  const totalPages = Math.ceil(
    ceritaData.keterlibatanMasyarakat.length / itemsPerPage
  );

  for (let i = 1; i <= totalPages; i++) {
    const paginationItem = document.createElement("span");
    paginationItem.textContent = i;
    paginationItem.classList.add("pagination-item");

    if (i === currentPage) {
      paginationItem.classList.add("active");
    }

    paginationItem.addEventListener("click", () => {
      currentPage = i;
      displayCerita(currentPage);

      // Hapus kelas 'active' dari semua pagination item, dan tambahkan 'active' hanya pada pagination item yang sedang aktif
      document.querySelectorAll(".pagination-item").forEach((item) => {
        item.classList.remove("active");
      });
      paginationItem.classList.add("active");
    });

    paginationContainer.appendChild(paginationItem);
  }
}

// Tampilkan cerita dan pagination saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  displayCerita(currentPage);
  setupPagination();
});
