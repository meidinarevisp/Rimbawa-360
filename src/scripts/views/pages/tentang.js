import UrlParser from "../../routes/url-parser";
import { tentangTemplate } from "../templates/template-creator";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tentang = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();

    const renderedTemplate = tentangTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    // Animasi untuk elemen-elemen saat halaman dimuat
    gsap.from(".tentang-kami-page h2", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });

    gsap.from(".tentang-kami-page .tentang-kami-img img", {
      duration: 1,
      opacity: 0,
      x: -50,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".tentang-kami-page .text p", {
      duration: 1,
      opacity: 0,
      x: 50,
      ease: "power2.out",
      delay: 0.5,
      stagger: 0.3,
    });

    gsap.from(".tim-kami-section h2", {
      scrollTrigger: {
        trigger: ".tim-kami-section h2",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });

    gsap.from(".tim-kami-section p", {
      scrollTrigger: {
        trigger: ".tim-kami-section p",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".tim-kami-section .team-member", {
      scrollTrigger: {
        trigger: ".tim-kami-section .team-member",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
      stagger: 0.3,
    });

    gsap.from(".wrapper h2", {
      scrollTrigger: {
        trigger: ".wrapper h2",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });

    gsap.from(".faq", {
      scrollTrigger: {
        trigger: ".faq",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
      stagger: 0.3,
    });

    // Animasi untuk accordion pada FAQ section
    document.querySelectorAll(".accordion").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const icon = button.querySelector("i");

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          gsap.to(panel, {
            duration: 0.5,
            maxHeight: panel.scrollHeight + "px",
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotation: 180,
            ease: "power2.out",
          });
        } else {
          gsap.to(panel, {
            duration: 0.5,
            maxHeight: 0,
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotation: 0,
            ease: "power2.out",
          });
        }
      });
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
};

export default Tentang;
