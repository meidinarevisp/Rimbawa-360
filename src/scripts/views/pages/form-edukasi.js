import UrlParser from "../../routes/url-parser";
import { formEdukasiTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const formEdukasi = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = formEdukasiTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const form = document.getElementById("edukasiForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const gambarFile = formData.get("gambar");
      if (!gambarFile || gambarFile.size === 0) {
        toastr.error("Silakan pilih file gambar!");
        return;
      }

      const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFileTypes.includes(gambarFile.type)) {
        toastr.error("Hanya file gambar (jpg, jpeg, png, gif) yang diizinkan!");
        return;
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const response = await fetch("http://localhost:3000/api/edukasi", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Network response was not ok");
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message,
        }).then(() => {
          window.location.href = "/#/dashboard-edukasi";
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambahkan data: " + error.message);
      }
    });
  },
};

export default formEdukasi;
