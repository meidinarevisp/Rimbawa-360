import UrlParser from "../../routes/url-parser";
import { direktoriTemplate } from "../templates/template-creator";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { gsap } from "gsap";

const Direktori = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = direktoriTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    const destinasiSection = document.querySelector(".destinasi-page");

    if (destinasiSection) {
      const destinasiRow = destinasiSection.querySelector(".row");
      const paginationContainer = destinasiSection.querySelector(".pagination");

      const itemsPerRow = 3;
      const itemsPerColumn = 3;
      const itemsPerPage = itemsPerRow * itemsPerColumn;
      let currentPage = 1;
      let destinasiData = [];

      async function fetchEkowisataData() {
        try {
          const response = await fetch("http://localhost:3000/api/direktori");
          const data = await response.json();
          if (Array.isArray(data)) {
            destinasiData = data;
          } else {
            console.error("Data is not an array:", data);
          }
          renderDestinasi();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      function renderPagination(totalPages) {
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement("button");
          pageButton.textContent = i;
          pageButton.addEventListener("click", () => {
            currentPage = i;
            renderDestinasi();
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
        const currentData = destinasiData.slice(start, end);

        for (let i = 0; i < itemsPerColumn; i++) {
          const row = document.createElement("div");
          row.classList.add("row", "mb-3");

          for (let j = 0; j < itemsPerRow; j++) {
            const index = i * itemsPerRow + j;
            if (index < currentData.length) {
              const destinasi = currentData[index];
              const destinasiCol = document.createElement("div");
              destinasiCol.classList.add("col-md-4");

              const truncatedDesc = destinasi.deskripsi.substring(0, 180);
              const ellipsis = destinasi.deskripsi.length > 180 ? "..." : "";

              const destinasiContent = `
                <div class="image-container">
                  <img src="/uploads/${destinasi.gambar}" alt="${destinasi.nama_tempat}" class="img-fluid destinasi-item" data-id="${destinasi.id}" title="klik gambar untuk melihat detail ${destinasi.nama_tempat}" style="cursor: pointer;">
                  <h5>${destinasi.lokasi}</h5>
                </div>
                <div class="text-content">
                  <h4>${destinasi.nama_tempat}</h4>
                  <p>${truncatedDesc}${ellipsis}</p>
                </div>
              `;

              destinasiCol.innerHTML = destinasiContent;
              row.appendChild(destinasiCol);
            }
          }

          destinasiRow.appendChild(row);
        }

        renderPagination(Math.ceil(destinasiData.length / itemsPerPage));

        document.querySelectorAll(".destinasi-item").forEach((item) => {
          item.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            window.location.href = `/#/detail-direktori/${id}`;
          });
        });
      }

      await fetchEkowisataData();

      gsap.from(".destinasi-page h1", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".destinasi-page h2", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.from(".row", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.3,
      });

      const map = L.map("map").setView([-2.5, 118], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      destinasiData.forEach((place) => {
        const marker = L.marker([place.latitude, place.longitude], {
          icon: customIcon,
        }).addTo(map);
        marker.bindPopup(`<b>${place.nama_tempat}</b><br>${place.lokasi}`);
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

export default Direktori;
