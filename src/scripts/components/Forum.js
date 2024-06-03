class ForumRimbawa extends HTMLElement {
  constructor() {
    super();
  }

  createCommentButton() {
    const button = document.createElement("button");
    button.className = "btn btn-comment btn-forum";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    button.appendChild(icon);
    return button;
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      #forumForm {
        background-color: #ffffff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 20px;
        border: 0.5px solid #ccc;
        box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.1);
      }
    </style>
    <div class="forum-container">
      <div class="forum-content">
        <h2>Forum Diskusi</h2>
        <form id="forumForm">
          <div class="mb-3">
            <label for="forumName" class="form-label">Nama</label>
            <input type="text" id="forumName" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="forumName" class="form-label">Judul</label>
            <input type="text" id="forumTitle" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="forumDeskripsi" class="form-label">Deskripsi</label>
            <textarea id="forumDeskripsi" class="form-control" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-kirim">Kirim</button>
        </form>
        <hr />
        <div id="forumPosts"></div>
      </div>
    </div>
        `;
    this.appendChild(this.createCommentButton());
  }
}

customElements.define("forum-rimbawa", ForumRimbawa);
