import UrlParser from "../../routes/url-parser";
import { registerTemplate } from "../templates/template-creator";
import registerImage from "../../../public/images/login.png";
import logoImage from "../../../public/rimbawa-360.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Register = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = registerTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {
    const imgBackground = document.createElement("img");
    imgBackground.src = registerImage;
    imgBackground.classList.add("register-background");
    document.body.appendChild(imgBackground);

    const logoElement = document.createElement("img");
    logoElement.src = logoImage;
    logoElement.classList.add("register-logo");
    document.body.appendChild(logoElement);

    const showPasswordIcon = document.getElementById("showPasswordIcon");
    const showConfirmPasswordIcon = document.getElementById("showConfirmPasswordIcon");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("password1");

    // Add event listeners
    showPasswordIcon.addEventListener("mousedown", () => {
      passwordField.type = "text";
    });

    showPasswordIcon.addEventListener("mouseup", () => {
      passwordField.type = "password";
    });

    showPasswordIcon.addEventListener("mouseleave", () => {
      passwordField.type = "password";
    });

    showConfirmPasswordIcon.addEventListener("mousedown", () => {
      confirmPasswordField.type = "text";
    });

    showConfirmPasswordIcon.addEventListener("mouseup", () => {
      confirmPasswordField.type = "password";
    });

    showConfirmPasswordIcon.addEventListener("mouseleave", () => {
      confirmPasswordField.type = "password";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const password1 = document.getElementById("password1").value;

      if (password !== password1) {
        toastr.error("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toastr.success(data.message);
          window.location.href = "/#/login";
        } else {
          toastr.error(data.errors ? data.errors.map((e) => e.msg).join(", ") : data.error);
        }
      } catch (error) {
        toastr.error("An error occurred during registration.");
      }
    });
  },
};

export default Register;
