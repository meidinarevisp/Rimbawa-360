import UrlParser from "../../routes/url-parser";
import { dashboardEdukasiTemplate } from "../templates/template-creator";

const DashboardEdukasi = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardEdukasiTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const edukasiContainer = document.querySelector("#dashboard-edukasi");

    try {
      const response = await fetch("http://localhost:3000/api/edukasi");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      data.forEach((item) => {
        const truncatedDeskripsi =
          item.deskripsi.length > 150
            ? `${item.deskripsi.substring(0, 100)}...`
            : item.deskripsi;
        const itemElement = document.createElement("div");
        itemElement.classList.add("card", "mb-3");
        itemElement.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="/uploads/${item.gambar}" class="img-fluid rounded-start" alt="${item.nama_isu}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nama_isu}</h5>
                            <p class="card-text">${truncatedDeskripsi}</p>
                            <div class="d-flex justify-content-end">
                                <a href="/#/edit-form-edukasi/${item.id}"><button class="btn btn-edit rounded-circle me-2"><i class="fas fa-edit"></i></button></a>
                                <button class="btn btn-hapus rounded-circle" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        edukasiContainer.appendChild(itemElement);

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
                `http://localhost:3000/api/edukasi/${id}`,
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
      edukasiContainer.innerHTML =
        "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
    }
  },
};

export default DashboardEdukasi;
