import "../styles/style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ekowisataData from "../data/Ekowisata.json";

document.addEventListener("DOMContentLoaded", () => {
  const destinasiSection = document.querySelector(".destinasi-page");

  if (destinasiSection) {
    const destinasiRow = destinasiSection.querySelector(".row");
    const paginationContainer = destinasiSection.querySelector(".pagination");

    const itemsPerRow = 3;
    const itemsPerColumn = 3;
    const itemsPerPage = itemsPerRow * itemsPerColumn;
    let currentPage = 1;

    function renderPagination(totalPages) {
      paginationContainer.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
          currentPage = i;
          renderDestinasi();
          // Set scroll to top
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        if (i === currentPage) {
          pageButton.classList.add("active");
        }
        paginationContainer.appendChild(pageButton);
      }

      const allButtons = paginationContainer.querySelectorAll("button");
      if (currentPage === 1) {
        allButtons[0].setAttribute("disabled", true);
      } else {
        allButtons[0].removeAttribute("disabled");
      }
      if (currentPage === totalPages) {
        allButtons[totalPages - 1].setAttribute("disabled", true);
      } else {
        allButtons[totalPages - 1].removeAttribute("disabled");
      }
    }

    function renderDestinasi() {
      destinasiRow.innerHTML = "";

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const destinasiData = ekowisataData.ekowisata_hutan.slice(start, end);

      for (let i = 0; i < itemsPerColumn; i++) {
        const row = document.createElement("div");
        row.classList.add("row", "mb-3");

        for (let j = 0; j < itemsPerRow; j++) {
          const index = i * itemsPerRow + j;
          if (index < destinasiData.length) {
            const destinasi = destinasiData[index];
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
            row.appendChild(destinasiCol);
          }
        }

        destinasiRow.appendChild(row);
      }

      renderPagination(
        Math.ceil(ekowisataData.ekowisata_hutan.length / itemsPerPage)
      );
    }

    renderDestinasi();

    // Create Map
    const map = L.map("map").setView([-2.5, 118], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    });

    ekowisataData.ekowisata_hutan.forEach((place) => {
      const marker = L.marker([place.titik.latitude, place.titik.longitude], {
        icon: customIcon,
      }).addTo(map);
      marker.bindPopup(`<b>${place.nama_tempat}</b><br>${place.deskripsi}`);
    });
  }
});
