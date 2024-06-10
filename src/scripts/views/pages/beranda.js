import UrlParser from "../../routes/url-parser";
import { berandaTemplate } from "../templates/template-creator";
import ceritaData from "../../../data/Cerita.json";
import ekowisataData from "../../../data/Ekowisata.json";
import spesiesData from "../../../data/Spesies.json";
import edukasiData from "../../../data/Edukasi.json";
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
  CustomEase,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  ScrollTrigger
);

const Beranda = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner(); // Perbaikan: Gunakan metode yang sesuai
    const renderedTemplate = berandaTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    gsap.from(".hero-image", {
      duration: 1.5,
      opacity: 0,
      scale: 1.1,
      ease: "power4.out",
    });

    gsap.from(".hero-section h1", {
      duration: 1,
      opacity: 0,
      x: -50,
      ease: "power4.out",
      delay: 0.5,
    });

    gsap.from(".hero-section p", {
      duration: 1,
      opacity: 0,
      x: 50,
      ease: "power4.out",
      delay: 0.7,
    });

    gsap.from(".btn-jelajah", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.7)",
      delay: 1,
    });

    gsap.from(".btn-link", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2,
    });
    gsap.from(".edukasi-section h2", {
      scrollTrigger: {
        trigger: ".edukasi-section h2",
        start: "top 90%", // Adjusted start position
        once: true,
        toggleActions: "play none none none",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
    });

    gsap.from(".edukasi-section .flex-container", {
      scrollTrigger: {
        trigger: ".edukasi-section .flex-container",
        start: "top 90%", // Adjusted start position
        once: true,
        toggleActions: "play none none none",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".edukasi-section .btn", {
      scrollTrigger: {
        trigger: ".edukasi-section .btn",
        start: "top 90%", // Adjusted start position
        once: true,
        toggleActions: "play none none none",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
      delay: 1,
    });

    gsap.from(".tentang-kami-section h2", {
      scrollTrigger: {
        trigger: ".tentang-kami-section h2",
        start: "top 100%",
        once: true,
        visibility: 0,
        toggleActions: "play none none none",
      },
      duration: 2,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2,
    });
    gsap.from(".tentang-kami-section .image-tentang img", {
      scrollTrigger: {
        trigger: ".tentang-kami-section .image-tentang img",
        start: "top 100%",
        once: true,
        visibility: 0,
        toggleActions: "play none none none",
      },
      duration: 2,
      opacity: 0,
      x: -60,
      rotation: 10,
      scale: 0.8,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".tentang-kami-section .text p", {
      scrollTrigger: {
        trigger: ".tentang-kami-section .text p",
        start: "top 100%",
        once: true,
        visibility: 0,
        toggleActions: "play none none none",
      },
      duration: 2,
      opacity: 0,
      x: 60,
      scale: 0.8,
      ease: "power2.out",
      delay: 0.5,
      stagger: 0.3,
    });

    const destinasiSection = document.querySelector(".destinasi-section");

    if (destinasiSection) {
      const destinasiRow = destinasiSection.querySelector(".row");

      async function tampilkanDestinasi() {
        destinasiRow.innerHTML = "";
        try {
          const response = await fetch("http://localhost:3000/api/direktori");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const destinasiData = await response.json();
          console.log("Fetched direktori data:", destinasiData);
          if (!Array.isArray(destinasiData)) {
            throw new Error("Data direktori bukan array!");
          }
          const destinasiAcak = getRandomDestinations(destinasiData, 3);

          destinasiAcak.forEach((destinasi) => {
            const destinasiCol = document.createElement("div");
            destinasiCol.classList.add("col-md-4");

            const truncatedDeskripsi = truncateText(destinasi.deskripsi, 200);

            const destinasiContent = `
          <div class="image-container">
            <img src="/uploads/${destinasi.gambar}" alt="${destinasi.nama_tempat}" class="img-fluid" />
            <h1>${destinasi.lokasi}</h1>
          </div>
          <div class="text-content">
            <h4>${destinasi.nama_tempat}</h4>
            <p>${truncatedDeskripsi}</p>
          </div>
        `;

            destinasiCol.innerHTML = destinasiContent;

            destinasiRow.appendChild(destinasiCol);
          });
        } catch (error) {
          console.error("Error fetching direktori data:", error);
          destinasiRow.innerHTML = "<p>Gagal memuat data destinasi.</p>";
        }
      }

      function getRandomDestinations(destinasiArray, jumlah) {
        const destinasiAcak = [];
        const copyDestinasiArray = [...destinasiArray];

        for (let i = 0; i < jumlah; i++) {
          const randomIndex = Math.floor(
            Math.random() * copyDestinasiArray.length
          );
          destinasiAcak.push(copyDestinasiArray.splice(randomIndex, 1)[0]);
        }

        return destinasiAcak;
      }

      function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
          return text;
        }
        return text.slice(0, maxLength) + "...";
      }

      tampilkanDestinasi();

      setInterval(tampilkanDestinasi, 10000);
    }

    const carouselElement = document.querySelector("#ceritaCarousel");

    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        pause: "hover",
        interval: 5000,
      });

      const carouselInner = carouselElement.querySelector(".carousel-inner");

      ceritaData.keterlibatanMasyarakat.slice(0, 3).forEach((cerita, index) => {
        const ceritaItem = document.createElement("div");
        ceritaItem.classList.add("carousel-item");

        if (index === 0) {
          ceritaItem.classList.add("active");
        }

        const ceritaContent = `
          <section class="cerita-kita cerita-${index + 1}">
            <blockquote class="blockquote">
              <center>
                <img
                  class="mb-3"
                  src="${cerita.foto_profile}"
                  alt="${cerita.nama}"
                  class="profil-image"
                  width="120"
                  height="120"
                />
                <h3>${cerita.nama}</h3>
                <p class="waktu-unggah">${new Date(
                  cerita.waktu_upload
                ).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}</p>
              </center>
              <p class="detail-cerita">${cerita.cerita}</p>
            </blockquote>
          </section>
        `;

        ceritaItem.innerHTML = ceritaContent;

        carouselInner.appendChild(ceritaItem);
      });

      const prevButton = carouselElement.querySelector(
        ".carousel-control-prev"
      );
      const nextButton = carouselElement.querySelector(
        ".carousel-control-next"
      );

      prevButton.addEventListener("click", () => {
        carousel.prev();
      });

      nextButton.addEventListener("click", () => {
        carousel.next();
      });
    }

    const spesiesSection = document.querySelector(".spesies-section");

    if (spesiesSection) {
      async function tampilkanSpesies() {
        try {
          const response = await fetch("http://localhost:3000/api/spesies");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const spesiesData = await response.json();
          console.log("Fetched spesies data:", spesiesData);

          if (spesiesData.length >= 5) {
            document.getElementById(
              "image1"
            ).src = `/uploads/${spesiesData[0].gambar}`;
            document.getElementById("overlay1").innerText =
              spesiesData[0].kelas;

            document.getElementById(
              "image2"
            ).src = `/uploads/${spesiesData[1].gambar}`;
            document.getElementById("overlay2").innerText =
              spesiesData[1].kelas;

            document.getElementById(
              "image3"
            ).src = `/uploads/${spesiesData[2].gambar}`;
            document.getElementById("overlay3").innerText =
              spesiesData[2].kelas;

            document.getElementById(
              "image4"
            ).src = `/uploads/${spesiesData[3].gambar}`;
            document.getElementById("overlay4").innerText =
              spesiesData[3].kelas;

            document.getElementById(
              "image5"
            ).src = `/uploads/${spesiesData[4].gambar}`;
            document.getElementById("overlay5").innerText =
              spesiesData[4].kelas;
          }
        } catch (error) {
          console.error("Error fetching spesies data:", error);
        }
      }

      tampilkanSpesies();
    }

    const edukasiSection = document.querySelector(".edukasi-section");

    if (edukasiSection) {
      const edukasiContainer =
        edukasiSection.querySelector("#edukasiContainer");

      function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
        return text;
      }

      async function tampilkanEdukasi() {
        try {
          const response = await fetch("http://localhost:3000/api/edukasi");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const edukasiDataArray = await response.json();
          console.log("Fetched edukasi data:", edukasiDataArray);

          edukasiDataArray.slice(0, 2).forEach((edukasi, index) => {
            const edukasiItem = document.createElement("div");
            edukasiItem.classList.add("flex-item");

            const truncatedDampak = truncateText(edukasi.dampak, 150);

            const edukasiContent = `
          <div class="inner-flex-container row${index + 1}">
            <div class="text-container">
              <h3 style="font-size: 1.8rem">${edukasi.nama_isu}</h3>
              <div class="text">${edukasi.deskripsi} ${truncatedDampak}</div>
            </div>
            <div class="image-edukasi"><img src="/uploads/${
              edukasi.gambar
            }" alt="${edukasi.nama_isu}" /></div>
          </div>
        `;

            edukasiItem.innerHTML = edukasiContent;

            edukasiContainer.appendChild(edukasiItem);
          });
        } catch (error) {
          console.error("Error fetching edukasi data:", error);
          edukasiContainer.innerHTML = "<p>Gagal memuat data edukasi.</p>";
        }
      }

      tampilkanEdukasi();
    }
  },
};

export default Beranda;
