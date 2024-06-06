import UrlParser from "../../routes/url-parser";
import { editFormSpesiesTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";

const editFormSpesies = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const id = urlParams.id;

    const response = await fetch(`http://localhost:3000/api/spesies/${id}`);
    const data = await response.json();

    const renderedTemplate = editFormSpesiesTemplate(data);

    return renderedTemplate;
  },

  async afterRender() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const id = urlParams.id;

    const form = document.getElementById("spesiesForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const response = await fetch(`http://localhost:3000/api/spesies/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Success!", "Data berhasil diperbarui", "success").then(
          () => {
            window.location.href = `/#/dashboard-spesies`;
          }
        );
      } else {
        console.error("Error:", await response.json());
      }
    });
  },
};

export default editFormSpesies;
