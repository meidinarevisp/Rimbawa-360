import UrlParser from "../../routes/url-parser";
import { edukasiTemplate } from "../templates/template-creator";
import { gsap } from "gsap";

const Edukasi = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = edukasiTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    async function tampilkanKontenEdukasi(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/edukasi/${id}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data edukasi");
        }
        const konten = await response.json();

        const kontenHTML = `
          <h3>${konten.nama_isu}</h3>
          <img src="/uploads/${konten.gambar}" alt="${konten.nama_isu}" class="img-fluid mb-3">
          <p class="m-5 text-center">${konten.deskripsi}</p>
          <div class="dampak">
            <h4>Dampak</h4>
            <p>${konten.dampak}</p>
          </div>
          <div class="solusi">
            <h4>Solusi</h4>
            <ul>
              ${konten.solusi
                .split(", ")
                .map((solusi) => `<li>${solusi}</li>`)
                .join("")}
            </ul>
          </div>
        `;

        gsap.to(".edukasi-content", {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: function () {
            document.getElementById("edukasi-content").innerHTML = kontenHTML;
            gsap.to(".edukasi-content", { opacity: 1, y: 0, duration: 1 });
            tandaiMenuAktif(id);
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function buatTombolIsuLingkungan() {
      try {
        const response = await fetch("http://localhost:3000/api/edukasi/isu-lingkungan");
        if (!response.ok) {
          throw new Error("Gagal mengambil daftar isu lingkungan");
        }
        const isuLingkungan = await response.json();

        const tombolContainer = document.querySelector(".edukasi-buttons");
        tombolContainer.innerHTML = isuLingkungan
          .map(
            (isu) => `
              <button class="edukasi-btn" data-id="${isu.id}">${isu.nama_isu}</button>
            `
          )
          .join("");

        gsap.from(".edukasi-buttons button", { opacity: 0, y: 20, duration: 1, stagger: 0.2 });

        const tombolEdukasi = document.querySelectorAll(".edukasi-btn");
        tombolEdukasi.forEach((tombol) => {
          tombol.addEventListener("click", () => {
            const id = tombol.dataset.id;
            tampilkanKontenEdukasi(id);

            const edukasiSection = document.querySelector(".edukasi-content");
            if (edukasiSection) {
              window.scrollTo({
                top: edukasiSection.offsetTop - 90,
                behavior: "smooth",
              });
            }
          });
        });

        if (isuLingkungan.length > 0) {
          tampilkanKontenEdukasi(isuLingkungan[0].id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    function tandaiMenuAktif(id) {
      const tombolEdukasi = document.querySelectorAll(".edukasi-btn");
      tombolEdukasi.forEach((tombol) => {
        tombol.classList.remove("aktif");
        if (tombol.dataset.id === id.toString()) {
          tombol.classList.add("aktif");
        }
      });
    }

    buatTombolIsuLingkungan();

    gsap.from(".judul-edukasi", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".edukasi-page h2", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".edukasi-buttons button", { opacity: 0, y: 20, duration: 1, stagger: 0.2 });

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

export default Edukasi;
