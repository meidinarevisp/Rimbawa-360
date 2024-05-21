class NavbarRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
   <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-lg">
    <a class="navbar-brand" href="/">
      <img src="rimbawa-360.png" alt="Logo" width="100" />
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
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
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
            <li>
              <a class="dropdown-item" href="cerita.html">Cerita Kita</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="tentang.html">Tentang</a>
        </li>
      </ul>
    </div>
    <div class="d-flex ms-auto">
      <a class="btn btn-outline-primary me-2 login-btn" href="login.html">Login</a>
      <a class="btn btn-daftar daftar-btn" href="register.html">Daftar</a>
    </div>
  </div>
</nav>
    `;
  }
}

customElements.define("navbar-rimbawa", NavbarRimbawa);
