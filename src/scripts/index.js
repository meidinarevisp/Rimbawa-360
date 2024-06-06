import "regenerator-runtime";
import "../styles/style.css";
import App from "./views/app";
import swRegister from "../utils/sw-register";

const app = new App({
  content: document.querySelector("#mainContent"),
});

function isLoginPage() {
  return window.location.hash.toLowerCase().includes("login");
}

function isRegisterPage() {
  return window.location.hash.toLowerCase().includes("register");
}

window.addEventListener("hashchange", () => {
  app.renderPage();
  toggleNavFooter();
  removeSpecialPageImages();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
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
