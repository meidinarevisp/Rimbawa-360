class HeroRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
 <section class="hero-section">
 <picture>
          <source
            media="(min-width: 1200px)"
            srcset="./heros/hero-1-large.webp"
          />
          <source
            media="(min-width: 1200px)"
            srcset="./heros/hero-1-large.jpg"
          />
          <source
            media="(max-width: 768px)"
            srcset="./heros/hero-1-small.webp"
          />
          <source
            media="(max-width: 768px)"
            srcset="./heros/hero-1-small.jpg"
          />
          <source
            srcset="./heros/hero-1-large.webp"
            type="image/webp"
          />
          <img
        src="./heros/hero-1-large.jpg"
        alt="Hero Image"
        class="img-fluid hero-image"
      />
        </picture>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1>
              <strong>
                Selamat Datang di<br />Rimbawa 360</span
                >
              </strong>
            </h1>
            <p>
              Menjelajahi
              <span style="color: #d2e0bb"><strong>Bumi</strong></span>
              Menyatukan Jejak
              <span style="color: #d2e0bb"><strong>Hijau.</strong></span>
            </p>
            <a class="btn btn-jelajah" href="/#/direktori"
              >Jelajahi Sekarang</a
            >
            <a href="#tentang-kami" id="main-content" class="btn btn-link"
              >Selengkapnya <i class="fas fa-arrow-right m-lg-3"></i
            ></a>
          </div>
        </div>
      </div>
    </section>
    `;

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.addEventListener("click", (event) => {
        event.preventDefault();
        const exploreContentSection = document.getElementById("tentang-kami");
        if (exploreContentSection) {
          const headerHeight = document.querySelector("nav").offsetHeight;

          window.scrollTo({
            top: exploreContentSection.offsetTop - headerHeight,
            behavior: "smooth",
          });
        }
      });
    }
  }
}

customElements.define("hero-rimbawa", HeroRimbawa);
