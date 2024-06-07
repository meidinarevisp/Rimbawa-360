import UrlParser from "../../routes/url-parser";
import { loginTemplate } from "../templates/template-creator";
import loginImage from "../../../public/images/login.png";
import logoImage from "../../../public/rimbawa-360.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Login = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = loginTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const imgBackground = document.createElement("img");
    imgBackground.src = loginImage;
    imgBackground.classList.add("login-background");
    document.body.appendChild(imgBackground);

    const logoElement = document.createElement("img");
    logoElement.src = logoImage;
    logoElement.classList.add("login-logo");
    document.body.appendChild(logoElement);

    const showPasswordIcon = document.getElementById("showPasswordIcon");
    showPasswordIcon.addEventListener("click", () => {
      const passwordField = document.getElementById("password");
      if (passwordField.type === "password") {
        passwordField.type = "text";
        showPasswordIcon.classList.remove("fa-eye");
        showPasswordIcon.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password";
        showPasswordIcon.classList.remove("fa-eye-slash");
        showPasswordIcon.classList.add("fa-eye");
      }
    });

    // Menangani form submit untuk login
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const loginInput = document.getElementById("loginInput").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: loginInput, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toastr.success(data.message);

          // Simpan data pengguna di localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");

          // Mengarahkan pengguna berdasarkan peran
          if (data.user.role_id === 1) {
            window.location.href = "/#/dashboard-admin";
          } else if (data.user.role_id === 2) {
            window.location.href = "/";
          }
        } else {
          toastr.error(
            data.errors ? data.errors.map((e) => e.msg).join(", ") : data.error
          );
        }
      } catch (error) {
        toastr.error("An error occurred during login.");
      }
    });
  },
};

export default Login;
