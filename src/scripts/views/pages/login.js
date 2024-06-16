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
    const passwordField = document.getElementById("password");

    showPasswordIcon.addEventListener("mousedown", () => {
      passwordField.type = "text";
    });

    showPasswordIcon.addEventListener("mouseup", () => {
      passwordField.type = "password";
    });

    showPasswordIcon.addEventListener("mouseleave", () => {
      passwordField.type = "password";
    });

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

          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");

          if (data.user.role_id === 1) {
            window.location.href = "/#/dashboard-admin";
          } else if (data.user.role_id === 2) {
            window.location.href = "/";
          }
        } else {
          toastr.error(data.errors ? data.errors.map((e) => e.msg).join(", ") : data.error);
        }
      } catch (error) {
        toastr.error("An error occurred during login.");
      }
    });
  },
};

export default Login;
