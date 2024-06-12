import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const { resource, id, verb, hash } =
      UrlParser.parseActiveUrlWithoutCombiner();
    const url = UrlParser._urlCombiner({ resource, id, verb });
    const { page, title } = routes[url] || {};

    if (!page) {
      // Handle the case when the page is not found
      document.title = "Rimbawa 360 - Page Not Found";
      this._content.innerHTML = "<center><h1>Page Not Found</h1></center>";
      return;
    }

    document.title = title;
    this._content.innerHTML = await page.render();
    await page.afterRender();

    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
          const offsetPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight -
            20;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }
}

export default App;
