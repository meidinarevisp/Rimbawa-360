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

    button.classList.toggle("active"); // Tambahkan atau hapus kelas "active" pada tombol

    if (button.classList.contains("active")) {
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      panel.style.maxHeight = 0;
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animated-content");

  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || "0s";
        entry.target.style.setProperty("--animation-delay", `${delay}s`);
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Unobserve after animating
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  const animatedTexts = document.querySelectorAll(".animated-text");
  animatedTexts.forEach((el, index) => {
    const delay = index * 0.5; // Adjust the delay for text elements
    el.style.animationDelay = `${delay}s`;
    observer.observe(el);
  });
});

// File: script.js
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");

  // Tambahkan event listener untuk menggulir ke atas saat tombol diklik
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Tambahkan event listener untuk memeriksa saat pengguna menggulir halaman
    window.addEventListener("scroll", function () {
      // Jika pengguna menggulir lebih dari 200px dari atas, tampilkan tombol
      if (window.scrollY > 200) {
        backButton.classList.add("show");
      } else {
        // Jika tidak, sembunyikan tombol
        backButton.classList.remove("show");
      }
    });
  }
});
