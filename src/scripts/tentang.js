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

document.querySelectorAll(".accordion").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const icon = button.querySelector("i");

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      panel.style.display = "block";
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      panel.style.display = "none";
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });
});
