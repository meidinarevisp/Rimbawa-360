import UrlParser from "../../routes/url-parser";
import { dashboardCeritaTemplate } from "../templates/template-creator";
import Swal from "sweetalert2";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const dashboardCerita = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardCeritaTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    const ceritaList = document.getElementById("cerita-list");

    try {
      const response = await fetch("http://localhost:3000/api/cerita/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const ceritaData = await response.json();

      ceritaData.forEach((cerita) => {
        const ceritaCard = document.createElement("div");
        ceritaCard.className = "col-md-4 mb-4";

        ceritaCard.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${cerita.username}</h5>
              <p class="card-text">${cerita.cerita}</p>
              <p class="card-text"><small class="text-muted">Uploaded on ${new Date(cerita.date_created).toLocaleDateString()}</small></p>
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

      ceritaList.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = event.currentTarget.dataset.id;
          window.location.href = `#/edit-cerita/${id}`;
        });
      });

      const deleteCerita = async (id) => {
        Swal.fire({
          title: "Anda yakin?",
          text: "Anda tidak akan dapat mengembalikan ini!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`http://localhost:3000/api/cerita/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              const result = await response.json();
              if (response.ok) {
                localStorage.setItem("toastMessage", "Cerita berhasil dihapus!");
                window.location.reload();
              } else {
                throw new Error(result.message);
              }
            } catch (error) {
              console.error("Failed to delete story:", error);
            }
          }
        });
      };

      const toastMessage = localStorage.getItem("toastMessage");
      if (toastMessage) {
        toastr.success(toastMessage).css("margin-top", "90px");
        localStorage.removeItem("toastMessage");
      }

      ceritaList.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = event.currentTarget.dataset.id;
          deleteCerita(id);
        });
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Failed to fetch user stories:", error);
    }
  },
};

export default dashboardCerita;
