class NavbarRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
   <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-lg">
        <a class="navbar-brand" href="/">
          <img src="rimbawa-360.png" alt="Logo" width="70" height="60" />
          <span class="rimbawa">Rimbawa</span>
          <span class="three-sixty">360</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Beranda</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Jelajahi
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="direktori.html">Destinasi</a>
                </li>
                <li>
                  <a class="dropdown-item" href="edukasi.html">Edukasi</a>
                </li>
                <li>
                  <a class="dropdown-item" href="spesies.html">Spesies</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="cerita.html">Cerita Kita</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="forum.html">Forum</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="tentang.html">Tentang</a>
            </li>
            <li>
              <a class="nav-link" href="login.html"
                ><button class="btn btn-masuk">Masuk</button></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;
  }
}

customElements.define("navbar-rimbawa", NavbarRimbawa);
