import UrlParser from "../../routes/url-parser";
import { editCeritaTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const editCerita = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const ceritaId = urlParams.id;

    const renderedTemplate = editCeritaTemplate(ceritaId);

    return renderedTemplate;
  },

  async afterRender() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const ceritaId = UrlParser.parseActiveUrlWithoutCombiner().id;
    const ceritaForm = document.getElementById("ceritaForm");

    const response = await fetch(
      `http://localhost:3000/api/cerita/${ceritaId}`
    );
    const cerita = await response.json();

    const ceritaInput = document.getElementById("cerita");
    ceritaInput.value = cerita.cerita;

    ceritaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ceritaValue = ceritaInput.value;

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/cerita/${ceritaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cerita: ceritaValue }),
        }
      );

      if (response.ok) {
        toastr.success("Cerita berhasil diperbarui!").css("margin-top", "90px");
        window.location.href = "#/dashboard-cerita";
      } else {
        const error = await response.json();
        toastr
          .error(`Gagal memperbarui cerita: ${error.message}`)
          .css("margin-top", "90px");
      }
    });
  },
};

export default editCerita;
