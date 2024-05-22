import UrlParser from "../../routes/url-parser";
import { dashboardCeritaTemplate } from "../templates/template-creator";
import ceritaData from "../../../data/Cerita.json";

const dashboardCerita = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardCeritaTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    const ceritaList = document.getElementById("cerita-list");

    // Loop through the imported JSON data and create HTML elements
    ceritaData.keterlibatanMasyarakat.forEach((cerita) => {
      const ceritaCard = document.createElement("div");
      ceritaCard.className = "col-md-4 mb-4";

      ceritaCard.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${cerita.nama}</h5>
            <p class="card-text">${cerita.cerita}</p>
            <p class="card-text"><small class="text-muted">Uploaded on ${new Date(
              cerita.waktu_upload
            ).toLocaleDateString()}</small></p>
            <div class="button-group">
              <button class="btn edit-button" data-id="${cerita.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn delete-button" data-id="${cerita.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      ceritaList.appendChild(ceritaCard);
    });

    // Add event listeners for edit and delete buttons
    ceritaList.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.dataset.id;
        editCerita(id);
      });
    });

    ceritaList.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.dataset.id;
        deleteCerita(id);
      });
    });
  },
};

export default dashboardCerita;
