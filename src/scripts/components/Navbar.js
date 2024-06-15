class NavbarRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentPath = window.location.hash.slice(2) || "/";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

    this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-lg d-flex justify-content-between">
          <a class="navbar-brand" href="/">
            <img src="rimbawa-360.png" alt="Logo" />
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
                  ["direktori", "edukasi", "spesies", "cerita"].includes(
                    currentPath
                  )
                    ? "active"
                    : ""
                }" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Jelajahi
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
            </ul>
            <div class="d-flex align-items-center ms-auto">
              ${
                isLoggedIn
                  ? `
                    <div class="dropdown">
                      <button class="btn btn-outline-secondary dropdown-toggle me-2" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="${user.gambar}" alt="User" width="45" height="45" class="gambar-user rounded-circle me-2">
                        ${user.username}
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item dropdown-item-profile" href="/#/edit-profile">Edit Profile</a></li>
                        <li><a class="dropdown-item dropdown-item-profile" href="/#/ganti-password">Ganti Password</a></li>
                        <li><a class="dropdown-item dropdown-item-profile" href="/#/dashboard-cerita">Cerita Kamu</a></li>
                        <li><a class="dropdown-item dropdown-item-profile" href="/#/logout">Logout</a></li>
                      </ul>
                    </div>
                  `
                  : `
                    <a class="btn login-btn me-2" href="/#/login">Login</a>
                    <a class="btn daftar-btn" href="/#/register">Daftar</a>
                  `
              }
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const profileToggle = document.querySelector(".gambar-user");
  const profileDropdown = document.querySelector(".profile-dropdown");

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", function () {
      profileDropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
      if (
        !profileDropdown.contains(event.target) &&
        !profileToggle.contains(event.target)
      ) {
        profileDropdown.classList.remove("active");
      }
    });
  }
});

customElements.define("navbar-rimbawa", NavbarRimbawa);
