class NavbarRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentPath = window.location.hash.slice(2) || "/";
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
           <a class="nav-link ${
             currentPath === "/" ? "active" : ""
           }" href="/">Beranda</a>
        </li>
        <li class="nav-item dropdown">
           <a class="nav-link dropdown-toggle ${
             ["direktori", "edukasi", "spesies", "cerita"].includes(currentPath)
               ? "active"
               : ""
           }" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Jelajahi
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item ${
                    currentPath === "direktori" ? "active" : ""
                  }" href="/#/direktori">Destinasi</a></li>
                  <li><a class="dropdown-item ${
                    currentPath === "edukasi" ? "active" : ""
                  }" href="/#/edukasi">Edukasi</a></li>
                  <li><a class="dropdown-item ${
                    currentPath === "spesies" ? "active" : ""
                  }" href="/#/spesies">Spesies</a></li>
                  <li><a class="dropdown-item ${
                    currentPath === "cerita" ? "active" : ""
                  }" href="/#/cerita">Cerita Kita</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link ${
            currentPath === "tentang" ? "active" : ""
          }" href="/#/tentang">Tentang</a>
              </li>
        </li>
      </ul>
    </div>
    <div class="d-flex ms-auto">
      <a class="btn btn-outline-primary me-2 login-btn" href="/#/login">Login</a>
      <a class="btn btn-daftar daftar-btn" href="/#/register">Daftar</a>
    </div>
  </div>
</nav>
    `;
  }
}

customElements.define("navbar-rimbawa", NavbarRimbawa);
