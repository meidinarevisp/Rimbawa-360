import "regenerator-runtime";
import "../styles/style.css";
import "../scripts/components/Navbar";
import "../scripts/components/Footer";
import App from "./views/app";
import swRegister from "../utils/sw-register";
import userIcon from "../public/images/user.png";

const app = new App({
  content: document.querySelector("#mainContent"),
});

function isLoginPage() {
  return window.location.hash.toLowerCase().includes("login");
}

function isRegisterPage() {
  return window.location.hash.toLowerCase().includes("register");
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
  removeSpecialPageImages();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
  setActiveNavLink();
  toggleNavFooter();
  removeSpecialPageImages();
});

function toggleNavFooter() {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (isLoginPage() || isRegisterPage()) {
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";
  } else {
    if (navbar) navbar.style.display = "block";
    if (footer) footer.style.display = "block";
  }
}

function removeSpecialPageImages() {
  const loginBackground = document.querySelector(".login-background");
  const loginLogo = document.querySelector(".login-logo");
  const registerBackground = document.querySelector(".register-background");
  const registerLogo = document.querySelector(".register-logo");

  if (!isLoginPage() && loginBackground) loginBackground.remove();
  if (!isLoginPage() && loginLogo) loginLogo.remove();
  if (!isRegisterPage() && registerBackground) registerBackground.remove();
  if (!isRegisterPage() && registerLogo) registerLogo.remove();
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

document.addEventListener("DOMContentLoaded", () => {
  const forumButton = document.querySelector(".btn-forum");
  const forumContainer = document.querySelector(".forum-container");
  const forumForm = document.getElementById("forumForm");
  const forumPosts = document.querySelector("#forumPosts");

  if (forumButton && forumContainer) {
    forumButton.classList.add("show"); // Ensure the button is displayed initially

    forumButton.addEventListener("click", () => {
      forumContainer.classList.toggle("show");
      if (forumContainer.classList.contains("show")) {
        // eslint-disable-next-line no-use-before-define
        loadPosts();
      }
    });

    forumForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("forumName").value;
      const title = document.getElementById("forumTitle").value;
      const deskripsi = document.getElementById("forumDeskripsi").value;
      if (name && title && deskripsi) {
        const post = {
          name,
          title,
          deskripsi,
          time: new Date().toLocaleString("id-ID"),
        };
        savePost(post);
        document.getElementById("forumName").value = "";
        document.getElementById("forumTitle").value = "";
        document.getElementById("forumDeskripsi").value = "";
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
      <div class="post-header">
        <img class="user-icon" src="${userIcon}" alt="User Icon">
        <div class="user-info">
          <h4>${post.name}</h4>
          <small>${post.time}</small>
        </div>
      </div>
      <div class="user-mid">
        <h6>${post.title}</h6>
        <p>${post.deskripsi}</p>
      </div>
      <div class="actions">
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-delete" data-index="${index}">Delete</button>
      </div>
    `;
      forumPosts.appendChild(postElement);
    });
  }

  forumPosts.addEventListener("click", (event) => {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    if (event.target.classList.contains("btn-edit")) {
      const { index } = event.target.dataset;
      const post = posts[index];
      Swal.fire({
        title: "Edit Deskripsi:",
        input: "textarea",
        inputValue: post.deskripsi,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-info",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          post.deskripsi = result.value;
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
          const { index } = event.target.dataset;
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
