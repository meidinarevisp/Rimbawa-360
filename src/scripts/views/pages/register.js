import UrlParser from "../../routes/url-parser";
import { registerTemplate } from "../templates/template-creator";
import registerImage from "../../../public/images/login.png";
import logoImage from "../../../public/rimbawa-360.png";

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
  },
};

export default Register;
