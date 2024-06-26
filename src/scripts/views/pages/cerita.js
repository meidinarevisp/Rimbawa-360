import UrlParser from "../../routes/url-parser";
import { ceritaTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { gsap } from "gsap";

const Cerita = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = ceritaTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    const ceritaContainer = document.getElementById("ceritaContainer");
    const paginationContainer = document.getElementById("pagination");

    const itemsPerPage = 3;
    let currentPage = 1;

    async function fetchCeritaData() {
      try {
        const response = await fetch("http://localhost:3000/api/cerita");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching cerita data:", error);
        return [];
      }
    }

    async function displayCerita(page, ceritaData) {
      ceritaContainer.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const ceritaSlice = ceritaData.slice(start, end);

      ceritaSlice.forEach((cerita, index) => {
        const ceritaItem = document.createElement("div");
        ceritaItem.classList.add("page-cerita", `cerita-${index + 1}`);

        const ceritaContent = `
          <blockquote class="blockquote">
            <center>
              <img
                class="mb-3 rounded-circle profil-image"
                src="${cerita.gambar}"
                alt="${cerita.username}"
                width="120"
                height="120"
              />
              <h3>${cerita.username}</h3>
              <p class="waktu-unggah">${new Date(cerita.date_created).toLocaleString("id-ID", {
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

      gsap.from(".page-cerita", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
      });
    }
    gsap.from(".cerita-kita-page h2", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });

    async function setupPagination(ceritaData) {
      paginationContainer.innerHTML = "";

      const totalPages = Math.ceil(ceritaData.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const paginationItem = document.createElement("span");
        paginationItem.textContent = i;
        paginationItem.classList.add("pagination-item");

        if (i === currentPage) {
          paginationItem.classList.add("active");
        }

        paginationItem.addEventListener("click", async () => {
          currentPage = i;
          await displayCerita(currentPage, ceritaData);

          // Remove active class from all pagination items and add to the current one
          document.querySelectorAll(".pagination-item").forEach((item) => {
            item.classList.remove("active");
          });
          paginationItem.classList.add("active");

          window.scrollTo({ top: 0, behavior: "smooth" });
          gsap.from(".page-cerita", {
            y: 20,
            duration: 0.5,
            stagger: 0.2,
          });
        });

        paginationContainer.appendChild(paginationItem);
      }
    }

    const ceritaData = await fetchCeritaData();
    await displayCerita(currentPage, ceritaData);
    setupPagination(ceritaData);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      toastr.success(toastMessage).css("margin-top", "90px");
      localStorage.removeItem("toastMessage");
    }
  },
};

export default Cerita;
