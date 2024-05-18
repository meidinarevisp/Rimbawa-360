import "../styles/style.css";

function setActiveNavLink() {
  const url = window.location.href;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (link.href === url) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Call the function when the page is loaded
window.onload = setActiveNavLink;

// Fungsi untuk menampilkan atau menyembunyikan jawaban FAQ
