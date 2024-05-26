import "regenerator-runtime";
import "../styles/style.css";
import "../scripts/components/Navbar";
import "../scripts/components/Footer";
import App from "./views/app";
import swRegister from "../utils/sw-register";

const app = new App({
  content: document.querySelector("#mainContent"),
});

function isSpecialPage() {
  const currentHash = window.location.hash.toLowerCase();
  return currentHash.includes("login") || currentHash.includes("register");
}

function setActiveNavLink() {
  const currentUrl = window.location.href.toLowerCase();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.href.toLowerCase();

    // Add 'active' class only if the entire URL matches
    if (linkHref === currentUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("hashchange", () => {
  app.renderPage();
  setActiveNavLink();
  toggleNavFooter();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
  setActiveNavLink();
  toggleNavFooter();
});

function toggleNavFooter() {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (isSpecialPage()) {
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";
  } else {
    if (navbar) navbar.style.display = "block";
    if (footer) footer.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backButton.classList.add("show");
      } else {
        backButton.classList.remove("show");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".btn-back-to-top");
  const forumButton = document.querySelector(".btn-forum");
  const forumContainer = document.querySelector(".forum-container");
  const forumForm = document.getElementById("forumForm");
  const forumPosts = document.getElementById("forumPosts");

  if (forumButton && forumContainer) {
    forumButton.classList.add("show"); // Ensure the button is displayed initially

    forumButton.addEventListener("click", function () {
      forumContainer.classList.toggle("show");
      if (forumContainer.classList.contains("show")) {
        loadPosts();
      }
    });

    forumForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("forumName").value;
      const message = document.getElementById("forumMessage").value;

      if (name && message) {
        const post = {
          name,
          message,
          time: new Date().toLocaleString("id-ID"),
        };
        savePost(post);
        document.getElementById("forumName").value = "";
        document.getElementById("forumMessage").value = "";
        loadPosts();
      }
    });
  }

  function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.push(post);
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }

  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    forumPosts.innerHTML = "";
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("forum-post");
      postElement.innerHTML = `
      <div>
        <h4>${post.name}</h4>
        <p>${post.message}</p>
      </div>
        <small>${post.time}</small>
        <div class="actions">
          <button class="btn-edit" data-index="${index}">Edit</button>
          <button class="btn-delete" data-index="${index}">Delete</button>
        </div>
    `;
      forumPosts.appendChild(postElement);
    });
  }

  forumPosts.addEventListener("click", function (event) {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    if (event.target.classList.contains("btn-edit")) {
      const index = event.target.dataset.index;
      const post = posts[index];
      Swal.fire({
        title: "Edit pesan:",
        input: "textarea",
        inputValue: post.message,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-info",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          post.message = result.value;
          posts[index] = post;
          localStorage.setItem("forumPosts", JSON.stringify(posts));
          loadPosts();
        }
      });

      // Set z-index for SweetAlert popup
      const swalPopup = document.querySelector(".swal2-popup");
      if (swalPopup) {
        swalPopup.style.zIndex = "9999";
      }
    } else if (event.target.classList.contains("btn-delete")) {
      Swal.fire({
        title: "Anda yakin ingin menghapus pesan ini?",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const index = event.target.dataset.index;
          posts.splice(index, 1);
          localStorage.setItem("forumPosts", JSON.stringify(posts));
          loadPosts();
        }
      });

      // Set z-index for SweetAlert popup
      const swalPopup = document.querySelector(".swal2-popup");
      if (swalPopup) {
        swalPopup.style.zIndex = "9999";
      }
    }
  });
});
