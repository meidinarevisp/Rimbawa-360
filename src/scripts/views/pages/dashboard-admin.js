import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UrlParser from "../../routes/url-parser";
import { dashboardAdminTemplate } from "../templates/template-creator";

gsap.registerPlugin(ScrollTrigger);

const DashboardAdmin = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = dashboardAdminTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    gsap.to(".background-animate", {
      duration: 1,
      x: "40%",
      ease: "power2.out",
    });

    gsap.from(".dashboard-section h1", {
      duration: 1,
      opacity: 0,
      y: -50,
      delay: 1,
      ease: "power2.out",
    });

    gsap.from(".dashboard-section img", {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      delay: 1.5,
      ease: "power2.out",
    });

    gsap.from(".dashboard-section a", {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      delay: 2,
      ease: "power2.out",
    });

    gsap.from(".dashboard-section button", {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      delay: 2,
      ease: "power2.out",
    });

    const buttons = document.querySelectorAll(".btn-dashboard");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button.querySelector(".btn-inner"), {
          duration: 0.3,
          x: 10,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button.querySelector(".btn-inner"), {
          duration: 0.3,
          x: 0,
          ease: "power2.out",
        });
      });

      button.addEventListener("mousedown", () => {
        gsap.to(button, {
          duration: 0.2,
          scale: 0.95,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseup", () => {
        gsap.to(button, {
          duration: 0.2,
          scale: 1,
          ease: "power2.out",
        });
      });
    });
  },
};

export default DashboardAdmin;
