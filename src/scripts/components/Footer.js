import "../../scripts/components/Forum";
import "../components/Forum";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

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
        <button class="btn btn-comment btn-forum" aria-label="Button Forum">
          <i class="fas fa-comment"></i>
        </button>
        <div class="row">
          <div class="col-md-3 text-center">
            <h5>Ikuti Kami</h5>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin fa-2x"></i></a>
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
              <li><a href="/#/direktori#peta">Peta Interaktif</a></li>
              <li><a href="/">Forum</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>Tentang</h5>
            <ul class="list-unstyled">
              <li><a href="/#/tentang">Tentang Kami</a></li>
              <li><a href="/#/tentang#tim-kami">Tim Kami</a></li>
              <li><a href="/#/tentang#faq">FAQ</a></li>
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
      forumButton.classList.add("show");

      forumButton.addEventListener("click", () => {
        forumContainer.classList.toggle("show");
        if (forumContainer.classList.contains("show")) {
          loadPosts();
        }
      });

      document.addEventListener("click", function (event) {
        if (
          !forumButton.contains(event.target) &&
          !forumContainer.contains(event.target)
        ) {
          forumContainer.classList.remove("show");
        }
      });

      forumForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("forumTitle").value;
        const deskripsi = document.getElementById("forumDeskripsi").value;
        if (title && deskripsi) {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              window.location.href = "#/login"; // Redirect to login page
              toastr.warning("Login dulu yaa");
              return;
            }

            const response = await fetch("http://localhost:3000/api/forum", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                judul: title,
                deskripsi: deskripsi,
              }),
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              toastr
                .success("Forum berhasil ditambahkan")
                .css("margin-top", "90px");

              // Tambahkan post baru ke daftar forum posts tanpa reload halaman
              const newPost = {
                id: data.id,
                judul: title,
                deskripsi: deskripsi,
                date_created: new Date().toISOString(),
                id_user: data.id_user,
                username: data.username,
                gambar: data.gambar,
              };
              renderPosts([newPost], data.id_user, true);

              // Reset form input fields
              forumForm.reset();

              // Tutup forum container setelah berhasil menambahkan
              const forumContainer = document.querySelector(".forum-container");
              if (forumContainer) {
                forumContainer.classList.remove("show");
              }
            } else if (response.status === 401) {
              throw new Error("Unauthorized: Token expired or invalid");
            } else {
              throw new Error("Failed to add forum");
            }
          } catch (error) {
            console.error(error);
            toastr.error("Gagal menambahkan forum");
          }
        } else {
          toastr.warning("Mohon lengkapi judul dan deskripsi forum");
        }
      });
    }

    async function loadPosts() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const currentUserId = decodedToken.id;

        const response = await fetch("http://localhost:3000/api/forum");
        if (response.ok) {
          const data = await response.json();
          renderPosts(data[0], currentUserId);
        } else {
          throw new Error("Gagal memuat forum");
        }
      } catch (error) {
        console.error(error);
      }
    }

    function renderPosts(posts, currentUserId, append = false) {
      posts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

      if (!append) {
        forumPosts.innerHTML = "";
      }

      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("forum-post");
        const postDate = new Date(post.date_created);
        const formattedDate = postDate.toLocaleString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        });

        postElement.innerHTML = `
        <div class="post-header">
            <img class="user-icon rounded-circle" src="${
              post.gambar
            }" alt="User Icon" width="50" height="50">
            <div class="user-info">
                <h4>${post.username}</h4>
                <small>${formattedDate}</small>
            </div>
            ${
              post.id_user === currentUserId
                ? `
                    <div class="burger-menu" data-index="${index}">
                        <div class="burger-dot"></div>
                        <div class="burger-dot"></div>
                        <div class="burger-dot"></div>
                    </div>
                    <div class="actions" id="actions-${index}">
                        <button class="btn-edit" data-index="${index}">Edit</button>
                        <button class="btn-delete" data-index="${index}">Delete</button>
                    </div>`
                : ""
            }
        </div>
        <div class="user-mid">
            <hr>
            <h6>${post.judul}</h6>
            <p>${post.deskripsi}</p>
        </div>
      `;

        if (append) {
          forumPosts.insertBefore(postElement, forumPosts.firstChild);
        } else {
          forumPosts.appendChild(postElement);
        }
      });

      const burgerMenus = document.querySelectorAll(".burger-menu");
      burgerMenus.forEach((burgerMenu) => {
        burgerMenu.addEventListener("click", (event) => {
          const index = event.currentTarget.getAttribute("data-index");
          const actionsMenu = document.querySelector(`#actions-${index}`);
          actionsMenu.classList.toggle("show");
          event.stopPropagation();
        });
      });

      document.addEventListener("click", (event) => {
        const actionsMenus = document.querySelectorAll(".actions");
        actionsMenus.forEach((actionsMenu) => {
          if (!actionsMenu.contains(event.target)) {
            actionsMenu.classList.remove("show");
          }
        });
      });

      forumPosts.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-edit")) {
          const { index } = event.target.dataset;
          const post = posts[index];
          Swal.fire({
            title: "Edit Forum",
            html: `<input id="editForumTitle" class="swal2-input" value="${post.judul}" placeholder="Judul">
                            <textarea id="editForumDeskripsi" class="swal2-textarea" placeholder="Deskripsi">${post.deskripsi}</textarea>`,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            preConfirm: () => {
              const title =
                Swal.getPopup().querySelector("#editForumTitle").value;
              const deskripsi = Swal.getPopup().querySelector(
                "#editForumDeskripsi"
              ).value;
              editPost(post.id, title, deskripsi);
            },
          });
          event.stopPropagation(); // Mencegah penutupan modal
        } else if (event.target.classList.contains("btn-delete")) {
          const { index } = event.target.dataset;
          const post = posts[index];
          Swal.fire({
            title: "Hapus Forum",
            text: "Anda yakin ingin menghapus forum ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              deletePost(post.id);
            }
          });
          event.stopPropagation(); // Mencegah penutupan modal
        }
      });

      async function editPost(postId, title, deskripsi) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/forum/${postId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                judul: title,
                deskripsi: deskripsi,
              }),
            }
          );
          if (response.ok) {
            Swal.fire("Sukses", "Forum berhasil diubah", "success");
            // Update forum post locally without page reload
            const editedPost = posts.find((p) => p.id === postId);
            if (editedPost) {
              editedPost.judul = title;
              editedPost.deskripsi = deskripsi;
              renderPosts(posts, editedPost.id_user);
            }
          } else {
            throw new Error("Gagal mengedit forum");
          }
        } catch (error) {
          console.error(error);
        }
      }

      async function deletePost(postId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/forum/${postId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            Swal.fire("Sukses", "Forum berhasil dihapus", "success");
            // Remove deleted post from local data without page reload
            const index = posts.findIndex((p) => p.id === postId);
            if (index !== -1) {
              posts.splice(index, 1);
              renderPosts(posts, null);
            }
          } else {
            throw new Error("Gagal menghapus forum");
          }
        } catch (error) {
          console.error(error);
        }
      }

      forumPosts.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-edit")) {
          const { index } = event.target.dataset;
          const post = posts[index];
          console.log("Edit post:", post);
        } else if (event.target.classList.contains("btn-delete")) {
          const { index } = event.target.dataset;
          const post = posts[index];
          console.log("Delete post:", post);
        }
      });
    }
  }
}

customElements.define("footer-rimbawa", FooterRimbawa);
