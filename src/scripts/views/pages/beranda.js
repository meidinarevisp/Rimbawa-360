import UrlParser from "../../routes/url-parser";
import { berandaTemplate } from "../templates/template-creator";
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
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
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
        start: "top 90%",
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
        start: "top 90%",
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
        start: "top 90%",
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
        try {
          const response = await fetch("http://localhost:3000/api/direktori");
          const data = await response.json();
          const destinasiAcak = getRandomDestinations(data, 3);

          destinasiRow.innerHTML = "";
          destinasiAcak.forEach((destinasi) => {
            const destinasiCol = document.createElement("div");
            destinasiCol.classList.add("col-md-4");

            const deskripsiPendek =
              destinasi.deskripsi.length > 200
                ? destinasi.deskripsi.substring(0, 200) + "..."
                : destinasi.deskripsi;

            const destinasiContent = `
              <div class="image-container">
                <img src="uploads/${destinasi.gambar}" alt="${destinasi.nama_tempat}" class="img-fluid" />
                <h1>${destinasi.lokasi}</h1>
              </div>
              <div class="text-content">
                <h4>${destinasi.nama_tempat}</h4>
                <p>${deskripsiPendek}</p>
              </div>
            `;

            destinasiCol.innerHTML = destinasiContent;
            destinasiRow.appendChild(destinasiCol);
          });
        } catch (error) {
          console.error("Error fetching ekowisata data:", error);
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

      await tampilkanDestinasi();
      setInterval(tampilkanDestinasi, 10000);
    }

    const carouselElement = document.querySelector("#ceritaCarousel");

    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        pause: "hover",
        interval: 5000,
      });

      const carouselInner = carouselElement.querySelector(".carousel-inner");

      try {
        const response = await fetch("http://localhost:3000/api/cerita"); // Ganti dengan endpoint API yang sesuai
        if (!response.ok) {
          throw new Error("Jaringan bermasalah");
        }
        const ceritaData = await response.json();

        ceritaData.slice(0, 3).forEach((cerita, index) => {
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
                    class="mb-3 rounded-circle profil-image"
                    src="${cerita.gambar}" 
                    alt="${cerita.username}"
                    width="120"
                    height="120"
                  />
                  <h3>${cerita.username}</h3>
                  <p class="waktu-unggah">${new Date(
                    cerita.date_created
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
      } catch (error) {
        console.error("Gagal memuat data cerita:", error);
      }

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
          const species = await response.json();

          if (species.length >= 5) {
            for (let index = 0; index < species.length; index++) {
              var elId = index + 1;
              document.getElementById("image" + elId).src =
                "uploads/" + species[index].gambar;
              document.getElementById("overlay" + elId).innerText =
                species[index].kelas;
            }
          }
        } catch (error) {
          console.error("Failed to fetch species data:", error);
        }
      }

      await tampilkanSpesies();
    }

    const edukasiSection = document.querySelector(".edukasi-section");

    if (edukasiSection) {
      const edukasiContainer =
        edukasiSection.querySelector("#edukasiContainer");

      async function fetchEdukasiData() {
        try {
          const response = await fetch("http://localhost:3000/api/edukasi");
          const edukasiData = await response.json();
          return edukasiData;
        } catch (error) {
          console.error("Error fetching edukasi data:", error);
          return [];
        }
      }

      function truncateText(text, maxLength) {
        return text.length > maxLength
          ? text.substring(0, maxLength) + "..."
          : text;
      }

      async function tampilkanEdukasi() {
        edukasiContainer.innerHTML = "";

        const edukasiDataArray = await fetchEdukasiData();

        edukasiDataArray.slice(0, 2).forEach((edukasi, index) => {
          const edukasiItem = document.createElement("div");
          edukasiItem.classList.add("flex-item");

          const truncatedDeskripsi = truncateText(edukasi.deskripsi, 200);

          const edukasiContent = `
            <div class="inner-flex-container row${index + 1}">
              <div class="text-container">
                <h3 style="font-size: 1.5rem">${edukasi.nama_isu}</h3>
                <hr>
                <div class="text">${truncatedDeskripsi}</div>
              </div>
              <div class="image-edukasi"><img src="/uploads/${
                edukasi.gambar
              }" alt="${edukasi.nama_isu}" /></div>
            </div>
          `;

          edukasiItem.innerHTML = edukasiContent;

          edukasiContainer.appendChild(edukasiItem);
        });
      }

      await tampilkanEdukasi();
    }
  },
};

export default Beranda;
