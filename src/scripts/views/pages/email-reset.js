import UrlParser from "../../routes/url-parser";
import { emailResetTemplate } from "../templates/template-creator";
import loginImage from "../../../public/images/login.png";
import logoImage from "../../../public/rimbawa-360.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const emailReset = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = emailResetTemplate(urlParams);

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

    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;

      try {
        const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          toastr.success(data.message);
          window.location.href = "/#/login";
        } else {
          toastr.error(data.error);
        }
      } catch (error) {
        toastr.error("An error occurred while requesting password reset.");
      }
    });
  },
};

export default emailReset;
