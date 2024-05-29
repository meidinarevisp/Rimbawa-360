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
    <div class="forum-container">
  <div class="forum-content">
    <h2>Forum Diskusi</h2>
    <form id="forumForm">
      <div class="mb-3">
        <label for="forumName" class="form-label">Nama:</label>
        <input type="text" id="forumName" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="forumMessage" class="form-label">Pesan:</label>
        <textarea id="forumMessage" class="form-control" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-kirim">Kirim</button>
    </form>
    <hr />
    <div id="forumPosts"></div>
  </div>
</div>
    `;
  }
}

customElements.define("footer-rimbawa", FooterRimbawa);
