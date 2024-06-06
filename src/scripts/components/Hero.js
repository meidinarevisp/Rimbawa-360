class HeroRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
 <section class="hero-section">
      <img
        src="/heros/hero-1.jpg"
        alt="Hero Image"
        class="img-fluid hero-image"
      />
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
            <a href="#tentang-kami" class="btn btn-link"
              >Selengkapnya <i class="fas fa-arrow-right m-lg-3"></i
            ></a>
          </div>
        </div>
      </div>
    </section>
    `;
  }
}

customElements.define("hero-rimbawa", HeroRimbawa);
