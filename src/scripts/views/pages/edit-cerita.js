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

    // Mendapatkan data cerita dari server
    const response = await fetch(
      `http://localhost:3000/api/cerita/${ceritaId}`
    );
    const cerita = await response.json();

    // Mengisi nilai cerita pada form
    const ceritaInput = document.getElementById("cerita");
    ceritaInput.value = cerita.cerita;

    // Menambahkan event listener untuk form submit
    ceritaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ceritaValue = ceritaInput.value;

      // Mendapatkan token dari localStorage
      const token = localStorage.getItem("token");

      // Memperbarui cerita di server
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
        // Berhasil memperbarui cerita
        toastr.success("Cerita berhasil diperbarui!").css("margin-top", "90px"); // Gunakan toastr.success untuk pesan sukses
        // Redirect ke halaman dashboard cerita
        window.location.href = "#/dashboard-cerita";
      } else {
        // Gagal memperbarui cerita
        const error = await response.json();
        toastr
          .error(`Gagal memperbarui cerita: ${error.message}`)
          .css("margin-top", "90px"); // Gunakan toastr.error untuk pesan error
      }
    });
  },
};

export default editCerita;
