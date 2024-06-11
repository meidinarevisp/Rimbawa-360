import UrlParser from "../../routes/url-parser";
import { editProfileTemplate } from "../templates/template-creator";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const editProfile = {
  async render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const renderedTemplate = editProfileTemplate(user);
    return renderedTemplate;
  },

  async afterRender() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const form = document.getElementById("editProfileForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const newUsername = document.getElementById("username").value;
      const profilePicture =
        document.getElementById("profile-picture").files[0];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("newUsername", newUsername);
      if (profilePicture) formData.append("image", profilePicture);

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/api/auth/update-profile/${user.username}`,
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
          const updatedUser = {
            ...user,
            name,
            email,
            username: newUsername,
            gambar: data.gambar,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          toastr.success(data.message).css("margin-top", "90px");
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toastr.error(error.message).css("margin-top", "90px");
      }
    });
  },
};

export default editProfile;
