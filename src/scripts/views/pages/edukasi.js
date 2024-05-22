import UrlParser from "../../routes/url-parser";
import { edukasiTemplate } from "../templates/template-creator";
import edukasiData from "../../../data/Edukasi.json";

const Edukasi = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = edukasiTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    // Fungsi untuk menampilkan konten edukasi
    function tampilkanKontenEdukasi(id, tombolAktifId = null) {
      const konten = edukasiData.edukasi_dan_kesadaran_lingkungan_hutan.find(
        (item) => item.id === id
      );

      const kontenHTML = `
    <h3>${konten.nama_isu}</h3>
    <img src="${konten.gambar}" alt="${konten.nama_isu}" class="img-fluid mb-3">
    <p class="m-5 text-center">${konten.deskripsi}</p>
    <div class="dampak">
      <h4>Dampak</h4>
      <p>${konten.dampak}</p>
    </div>
    <div class="solusi">
      <h4>Solusi</h4>
      <ul>
        ${konten.solusi.map((solusi) => `<li>${solusi}</li>`).join("")}
      </ul>
    </div>
  `;

      document.getElementById("edukasi-content").innerHTML = kontenHTML;

      // Menandai tombol yang dipilih sebagai aktif jika tombolAktifId tidak null
      if (tombolAktifId !== null) {
        tandaiMenuAktif(tombolAktifId);
      }
    }

    // Tampilkan konten deforestasi pada awal dan tandai tombol deforestasi sebagai aktif
    tampilkanKontenEdukasi(1, "deforestasi");

    // Tambahkan event listener untuk tombol edukasi
    const tombolEdukasi = document.querySelectorAll(".edukasi-btn");
    tombolEdukasi.forEach((tombol) => {
      tombol.addEventListener("click", () => {
        const id = tombol.dataset.id;
        let idEdukasi;

        switch (id) {
          case "deforestasi":
            idEdukasi = 1;
            break;
          case "perburuan-liar":
            idEdukasi = 2;
            break;
          case "pemanasan-global":
            idEdukasi = 3;
            break;
          case "kebakaran-hutan":
            idEdukasi = 4;
            break;
          default:
            idEdukasi = 1;
        }

        tampilkanKontenEdukasi(idEdukasi);
        tandaiMenuAktif(id);

        const edukasiSection = document.getElementById("edukasi");
        if (edukasiSection) {
          edukasiSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    function tandaiMenuAktif(id) {
      const tombolEdukasi = document.querySelectorAll(".edukasi-btn");
      tombolEdukasi.forEach((tombol) => {
        tombol.classList.remove("aktif");
        if (tombol.dataset.id === id) {
          tombol.classList.add("aktif");
        }
      });
    }
  },
};

export default Edukasi;

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");

  // Tambahkan event listener untuk menggulir ke atas saat tombol diklik
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Tambahkan event listener untuk memeriksa saat pengguna menggulir halaman
    window.addEventListener("scroll", function () {
      // Jika pengguna menggulir lebih dari 200px dari atas, tampilkan tombol
      if (window.scrollY > 200) {
        backButton.classList.add("show");
      } else {
        // Jika tidak, sembunyikan tombol
        backButton.classList.remove("show");
      }
    });
  }
});
