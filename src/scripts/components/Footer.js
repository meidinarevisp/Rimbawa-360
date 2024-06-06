import "../../scripts/components/Forum";
import userIcon from "../../public/images/user.png";
import "../components/Forum";

class FooterRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
  <footer class="py-4">
      <div class="container-lg">
        <button class="btn btn-up btn-back-to-top">
          <i class="fas fa-arrow-up"></i>
        </button>
        <button class="btn btn-comment btn-forum">
          <i class="fas fa-comment"></i>
        </button>
        <div class="row">
          <div class="col-md-3 text-center">
            <h5>Ikuti Kami</h5>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-instagram fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-linkedin fa-2x"></i></a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>Jelajahi</h5>
            <ul class="list-unstyled">
              <li><a href="/#/direktori">Destinasi</a></li>
              <li><a href="/#/edukasi">Edukasi</a></li>
              <li><a href="/#/spesies">Spesies</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>Fitur</h5>
            <ul class="list-unstyled">
              <li><a href="/#/cerita">Cerita Kita</a></li>
              <li><a href="#">Peta Interaktif</a></li>
              <li><a href="#">Forum</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>Tentang</h5>
            <ul class="list-unstyled">
              <li><a href="/#/tentang">Tentang Kami</a></li>
              <li><a href="#">Tim Kami</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <p class="text-center">
          Copyright &copy; 2024 Rimbawa 360. All rights reserved.
        </p>
      </div>
    </footer>
    <forum-rimbawa></forum-rimbawa>
    `;

    const backButton = this.querySelector(".btn-back-to-top");

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
  }
}

customElements.define("footer-rimbawa", FooterRimbawa);
