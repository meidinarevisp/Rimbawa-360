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
