import UrlParser from "../../routes/url-parser";
import { dashboardSpesiesTemplate } from "../templates/template-creator";

const DashboardSpesies = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardSpesiesTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const spesiesContainer = document.querySelector("#dashboard-spesies");

    try {
      const response = await fetch("http://localhost:3000/api/spesies"); // Adjust this URL to match your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      data.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("card", "mb-3");
        itemElement.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="/uploads/${item.gambar}" class="img-fluid rounded-start" alt="${item.namaHewan}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.namaSpesies}</h5>
                            <p class="card-text">${item.statusKonservasi}</p>
                            <div class="d-flex justify-content-end">
                                <a href="/#/edit-form-spesies/${item.id}"><button class="btn btn-edit rounded-circle me-2"><i class="fas fa-edit"></i></button></a>
                                <button class="btn btn-hapus rounded-circle" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        spesiesContainer.appendChild(itemElement);

        // Add event listener for delete button
        const deleteButton = itemElement.querySelector(".btn-hapus");
        deleteButton.addEventListener("click", async () => {
          const id = deleteButton.getAttribute("data-id");
          const confirmation = await Swal.fire({
            title: "Apakah Anda yakin ingin menghapus data ini?",
            text: "Data yang dihapus tidak dapat dipulihkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
          });

          if (confirmation.isConfirmed) {
            try {
              const deleteResponse = await fetch(
                `http://localhost:3000/api/spesies/${id}`,
                {
                  method: "DELETE",
                }
              );
              if (deleteResponse.ok) {
                itemElement.remove();
                Swal.fire("Data berhasil dihapus!", "", "success");
              } else {
                Swal.fire("Gagal menghapus data", "", "error");
              }
            } catch (err) {
              console.error("Error:", err);
              Swal.fire("Terjadi kesalahan saat menghapus data", "", "error");
            }
          }
        });
      });
    } catch (err) {
      console.error("Error:", err);
      spesiesContainer.innerHTML =
        "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
    }
  },
};

export default DashboardSpesies;
