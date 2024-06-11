import "regenerator-runtime";
import "../styles/style.css";
import App from "./views/app";
import swRegister from "../utils/sw-register";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const app = new App({
  content: document.querySelector("#mainContent"),
});

const publicPages = ["/", "#/beranda", "#/login", "#/register"];
const userPages = [
  "#/cerita",
  "#/dashboard-cerita",
  "#/detail-direktori",
  "#/detail-spesies",
  "#/direktori",
  "#/edit-cerita",
  "#/form-cerita",
  "#/edit-profile",
  "#/ganti-password",
  "#/edukasi",
  "#/spesies",
  "#/tentang",
];
const adminPages = [
  "#/dashboard-admin",
  "#/dashboard-direktori",
  "#/dashboard-edukasi",
  "#/dashboard-spesies",
  "#/form-direktori",
  "#/form-spesies",
  "#/form-edukasi",
  "#/edit-form-edukasi:id",
  "#/edit-form-spesies:id",
  "#/edit-form-direktori:id",
];

function isLoginPage() {
  return window.location.hash.toLowerCase().includes("login");
}

function isRegisterPage() {
  return window.location.hash.toLowerCase().includes("register");
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getUserRole() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role_id || null;
}

function isUser() {
  return isLoggedIn() && getUserRole() === 2;
}

function isAdmin() {
  return isLoggedIn() && getUserRole() === 1;
}

function checkPageAccess() {
  const currentPage = window.location.hash.toLowerCase();

  if (userPages.includes(currentPage)) {
    if (!isUser()) {
      toastr.warning("Login dulu yaa");
      window.location.hash = "#/login";
      return false;
    }
  } else if (adminPages.includes(currentPage)) {
    if (!isAdmin()) {
      toastr
        .error("Kamu tidak memiliki akses ke halaman itu!")
        .css("margin-top", "90px");
      window.location.hash = "/";
      return false;
    }
  } else if (
    (currentPage === "#/login" || currentPage === "#/register") &&
    isLoggedIn()
  ) {
    // Jika pengguna telah login, alihkan ke halaman yang sesuai
    window.location.hash = isAdmin() ? "#/dashboard-admin" : "/";
    return false;
  }

  return true;
}

window.addEventListener("hashchange", () => {
  if (checkPageAccess()) {
    app.renderPage();
    toggleNavFooter();
    removeSpecialPageImages();
  }
});

window.addEventListener("load", () => {
  if (checkPageAccess()) {
    app.renderPage();
    swRegister();
    toggleNavFooter();
    removeSpecialPageImages();
  }
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
