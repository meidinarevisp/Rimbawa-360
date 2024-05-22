import UrlParser from "../../routes/url-parser";
import { tentangTemplate } from "../templates/template-creator";

const Tentang = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();

    const renderedTemplate = tentangTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    observeAnimatedElements();
    document.querySelectorAll(".accordion").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const icon = button.querySelector("i");

        button.classList.toggle("active"); // Tambahkan atau hapus kelas "active" pada tombol

        if (button.classList.contains("active")) {
          panel.style.maxHeight = panel.scrollHeight + "px";
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        } else {
          panel.style.maxHeight = 0;
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        }
      });
    });
  },
};

export default Tentang;

function observeAnimatedElements() {
  const animatedElements = document.querySelectorAll(
    ".animated-content, .animated-text"
  );

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || "0s";
        entry.target.style.setProperty("--animation-delay", `${delay}s`);
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}
