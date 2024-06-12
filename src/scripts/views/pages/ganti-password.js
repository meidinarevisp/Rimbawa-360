import UrlParser from "../../routes/url-parser";
import { gantiPasswordTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const gantiPassword = {
  async render() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.username) {
      throw new Error("User data not found or invalid.");
    }
    const renderedTemplate = gantiPasswordTemplate(user);
    return renderedTemplate;
  },

  async afterRender() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const form = document.getElementById("gantiPasswordForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;

      const formData = new FormData();
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/api/auth/change-password/${user.username}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          toastr.success(data.message).css("margin-top", "90px");

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error("Error changing password:", error);
        toastr.error(error.message).css("margin-top", "90px");
      }
    });
  },
};

export default gantiPassword;
