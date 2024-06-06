import UrlParser from "../../routes/url-parser";
import { detailSpesiesTemplate } from "../templates/template-creator";
import SpesiesData from "../../../data/Spesies.json";

const detailSpesies = {
  async render() {
    return detailSpesiesTemplate();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const spesiesId = parseInt(url.id);

    const spesies = SpesiesData.BasisDataSpesies.find(
      (s) => s.id === spesiesId
    );

    if (spesies) {
      document.getElementById("spesies-image").src = spesies.gambar;
      document.getElementById("spesies-image").alt = spesies.namaHewan;
      document.getElementById("spesies-name").textContent = spesies.namaHewan;
      document.getElementById("spesies-description").textContent =
        spesies.deskripsi;
      document.getElementById("spesies-kerajaan").textContent =
        spesies.kerajaan;
      document.getElementById("spesies-kelas").textContent = spesies.kelas;
      document.getElementById("spesies-status-konservasi").textContent =
        spesies.statusKonservasi;
      document.getElementById("spesies-ordo").textContent = spesies.ordo;
      document.getElementById("spesies-spesies").textContent = spesies.spesies;
      document.getElementById("spesies-populasi").textContent =
        spesies.populasi;
      document.getElementById("spesies-rentangan-hidup").textContent =
        spesies.rentanganHidup;
      document.getElementById("spesies-panjang").textContent = spesies.panjang;
      document.getElementById("spesies-berat").textContent = spesies.berat;
      document.getElementById("spesies-kecepatan-tertinggi").textContent =
        spesies.kecepatanTertinggi;
    } else {
      document.getElementById("main-content").innerHTML =
        "<p>Spesies tidak ditemukan.</p>";
    }

    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", goBack);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
};

function goBack() {
  window.location.href = "/#/spesies";
}

export default detailSpesies;
