import UrlParser from "../../routes/url-parser";
import { berandaTemplate } from "../templates/template-creator";
import ceritaData from "../../../data/Cerita.json";
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

      async function fetchDestinasiData() {
        try {
          const response = await fetch("http://localhost:3000/api/direktori");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching ekowisata data:", error);
          return [];
        }
      }

      function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength - 3) + "...";
      }

      async function tampilkanDestinasi() {
        destinasiRow.innerHTML = "";

        const destinasiData = await fetchDestinasiData();
        const destinasiAcak = getRandomDestinations(destinasiData, 3);

        destinasiAcak.forEach((destinasi) => {
          const destinasiCol = document.createElement("div");
          destinasiCol.classList.add("col-md-4");

          const destinasiContent = `
            <div class="image-container">
              <img src="/uploads/${destinasi.gambar}" alt="${
            destinasi.nama_tempat
          }" class="img-fluid" />
              <h1>${destinasi.lokasi}</h1>
            </div>
            <div class="text-content">
              <h4>${destinasi.nama_tempat}</h4>
              <p>${truncateText(destinasi.deskripsi, 120)}</p>
            </div>
          `;

          destinasiCol.innerHTML = destinasiContent;

          destinasiRow.appendChild(destinasiCol);
        });
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
      async function fetchSpesiesData() {
        try {
          const response = await fetch("http://localhost:3000/api/spesies");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching spesies data:", error);
          return [];
        }
      }

      async function tampilkanSpesies() {
        const species = await fetchSpesiesData();

        if (species.length >= 5) {
          document.getElementById(
            "image1"
          ).src = `/uploads/${species[0].gambar}`;
          document.getElementById("overlay1").innerText = species[0].kelas;

          document.getElementById(
            "image2"
          ).src = `/uploads/${species[1].gambar}`;
          document.getElementById("overlay2").innerText = species[1].kelas;

          document.getElementById(
            "image3"
          ).src = `/uploads/${species[2].gambar}`;
          document.getElementById("overlay3").innerText = species[2].kelas;

          document.getElementById(
            "image4"
          ).src = `/uploads/${species[3].gambar}`;
          document.getElementById("overlay4").innerText = species[3].kelas;

          document.getElementById(
            "image5"
          ).src = `/uploads/${species[4].gambar}`;
          document.getElementById("overlay5").innerText = species[4].kelas;
        }
      }

      tampilkanSpesies();
    }

    const edukasiSection = document.querySelector(".edukasi-section");

    if (edukasiSection) {
      const edukasiContainer =
        edukasiSection.querySelector("#edukasiContainer");

      async function fetchEdukasiData() {
        try {
          const response = await fetch("http://localhost:3000/api/edukasi");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching edukasi data:", error);
          return [];
        }
      }

      async function tampilkanEdukasi() {
        edukasiContainer.innerHTML = "";

        const edukasiDataArray = await fetchEdukasiData();

        edukasiDataArray.slice(0, 2).forEach((edukasi, index) => {
          const edukasiItem = document.createElement("div");
          edukasiItem.classList.add("flex-item");

          const edukasiContent = `
            <div class="inner-flex-container row${index + 1}">
              <div class="text-container">
                <h3 style="font-size: 1.8rem">${edukasi.nama_isu}</h3>
                <div class="text">${edukasi.deskripsi} ${edukasi.dampak}</div>
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

      tampilkanEdukasi();
    }
  },
};

export default Beranda;
