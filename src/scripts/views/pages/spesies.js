import UrlParser from "../../routes/url-parser";
import { spesiesTemplate } from "../templates/template-creator";

const Spesies = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = spesiesTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    async function fetchSpesiesData() {
      try {
        const response = await fetch("http://localhost:3000/api/spesies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching spesies data:", error);
        return [];
      }
    }

    function createSpesiesCard(spesies) {
      const card = document.createElement("div");
      card.classList.add("spesies-card");

      const img = document.createElement("img");
      img.src = `/uploads/${spesies.gambar}`;
      img.alt = spesies.namaSpesies;
      img.classList.add("spesies-image");

      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");

      const text = document.createElement("div");
      text.classList.add("spesies-text");
      text.innerHTML = `
      <h3>${spesies.namaSpesies}</h3>
      <hr>
      <p>${spesies.deskripsi}</p>
    `;

      const discoverMoreButton = document.createElement("a");
      discoverMoreButton.classList.add("discover-more-button");
      discoverMoreButton.innerHTML = `Detail Spesies <i class="fas fa-chevron-right"></i>`;
      discoverMoreButton.addEventListener("click", () => {
        window.location.href = `/#/detail-spesies/${spesies.id}`;
      });

      textContainer.appendChild(text);
      textContainer.appendChild(discoverMoreButton);

      card.appendChild(img);
      card.appendChild(textContainer);

      return card;
    }

    async function showSpesies(pageNumber) {
      const container = document.getElementById("dataContainer");
      container.innerHTML = "";

      const spesiesData = await fetchSpesiesData();
      const start = (pageNumber - 1) * 5;
      const end = pageNumber * 5;

      for (let i = start; i < end && i < spesiesData.length; i++) {
        const spesies = spesiesData[i];
        const spesiesCard = createSpesiesCard(spesies);
        container.appendChild(spesiesCard);
      }

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

    const spesiesData = await fetchSpesiesData();
    showSpesies(1);
    createPagination();

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

export default Spesies;
