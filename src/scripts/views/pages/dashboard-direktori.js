import UrlParser from "../../routes/url-parser";
import { dashboardDirektoriTemplate } from "../templates/template-creator";

const DashboardDirektori = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardDirektoriTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const direktoriContainer = document.querySelector("#dashboard-direktori");

    try {
      const response = await fetch("http://localhost:3000/api/direktori");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      data.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("card", "mb-3");
        const truncatedLocation =
          item.lokasi.length > 50
            ? item.lokasi.substring(0, 50) + "..."
            : item.lokasi;
        itemElement.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="/uploads/${item.gambar}" class="img-fluid" alt="${item.nama_tempat}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.nama_tempat}</h5>
            <p class="card-text">${truncatedLocation}</p>
            <div class="d-flex justify-content-end">
              <a href="/#/edit-form-direktori/${item.id}"><button class="btn btn-edit rounded-circle me-2"><i class="fas fa-edit"></i></button></a>
              <button class="btn btn-hapus rounded-circle" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;

        direktoriContainer.appendChild(itemElement);

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
                `http://localhost:3000/api/direktori/${id}`,
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
      direktoriContainer.innerHTML =
        "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
    }
  },
};

export default DashboardDirektori;
