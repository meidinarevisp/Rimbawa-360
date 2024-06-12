import UrlParser from "../../routes/url-parser";
import { formCeritaTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const formCerita = {
  async render() {
    const renderedTemplate = formCeritaTemplate();
    return renderedTemplate;
  },
  async afterRender() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const formCerita = document.getElementById("ceritaForm");
    formCerita.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ceritaInput = document.getElementById("cerita");
      const cerita = ceritaInput.value;

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/cerita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cerita }),
      });

      if (response.ok) {
        localStorage.setItem("toastMessage", "Cerita berhasil dikirim!");
        window.location.href = "#/cerita";
      } else {
        const error = await response.json();
        toastr
          .error(`Gagal mengirim cerita: ${error.message}`)
          .css("margin-top", "90px");
      }
    });
  },
};

export default formCerita;
