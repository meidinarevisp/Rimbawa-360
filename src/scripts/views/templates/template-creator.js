import "../../components/Hero";
import "../../components/Navbar";
import "../../components/Footer";

const berandaTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
  <hero-rimbawa></hero-rimbawa>
    <section class="edukasi-section">
      <div class="container">
        <h2>
          Apa aja sih Dampak <span style="color: #56ab2e">Kerusakan Alam</span
          ><br />
          yang dilakukan oleh Manusia ?
        </h2>
        <br />
        <div class="flex-container" id="edukasiContainer"></div>
        <center>
          <a href="/#/edukasi" class="btn btn-primary mt-3">Selengkapnya</a>
        </center>
      </div>
    </section>
    <section class="tentang-kami-section" id="tentang-kami">
      <div class="container">
        <h2 style="text-align: center"><strong>Tentang Kami</strong></h2>
        <div class="content-flex">
          <div class="image-tentang">
            <img src="images/pohon.png" alt="Tentang Kami Image" />
          </div>
          <div class="text">
            <h1><strong>Apa Itu Rimbawa 360?</strong></h1>
            <p>
              Rimbawa 360 adalah sebuah platform yang berkomitmen untuk
              mengedukasi masyarakat tentang pentingnya menjaga kelestarian
              hutan dan kehidupan liar di Indonesia. Melalui informasi dan fitur
              yang disediakan, Rimbawa 360 berupaya untuk membangun kesadaran
              akan isu-isu lingkungan serta mempromosikan partisipasi aktif
              dalam upaya pelestarian alam.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="spesies-section">
      <div class="container">
        <h2>
          <strong>
            Semua yg ingin Kamu <br />ketahui tentang
            <span style="color: #56ab2e">Spesies</span>
          </strong>
        </h2>
        <br />
        <div class="row image-row">
          <div class="col-md-3 d-flex flex-column">
            <div class="image-container mb-3 small-img">
              <img src="" alt="Spesies 1" class="img-fluid" id="image1" />
              <div class="overlay" id="overlay1"></div>
            </div>
            <div class="image-container large-img">
              <img src="" alt="Spesies 2" class="img-fluid" id="image2" />
              <div class="overlay" id="overlay2"></div>
            </div>
          </div>
          <div
            class="col-md-6 d-flex align-items-center justify-content-center">
            <div class="image-container full-height">
              <img src="" alt="Spesies 3" class="img-fluid" id="image3" />
              <div class="overlay" id="overlay3"></div>
            </div>
          </div>
          <div class="col-md-3 d-flex flex-column">
            <div class="image-container mb-3 large-img">
              <img src="" alt="Spesies 4" class="img-fluid" id="image4" />
              <div class="overlay" id="overlay4"></div>
            </div>
            <div class="image-container small-img">
              <img src="" alt="Spesies 5" class="img-fluid" id="image5" />
              <div class="overlay" id="overlay5"></div>
            </div>
          </div>
        </div>
        <center>
          <a href="/#/spesies" class="btn btn-primary mt-3">Selengkapnya</a>
        </center>
      </div>
    </section>
    <section class="destinasi-section">
      <div class="container">
        <h2>
          <strong>
            Yuk, Intip <span style="color: #56ab2e">Destinasi Ekowisata</span>
            <br />
            yang Ada di Indonesia...
          </strong>
        </h2>
        <br />
        <div class="row"></div>
        <center>
          <a href="/#/direktori" class="btn btn-primary mt-3">Selengkapnya</a>
        </center>
      </div>
    </section>
    <section class="cerita-kita-section">
      <div class="container">
        <center><h2 class="mb-5">Apa Cerita Kamu?</h2></center>
        <div id="ceritaCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner"></div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#ceritaCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#ceritaCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="text-center mt-5">
          <a href="/#/cerita" class="link-cerita"
            >Simak Cerita Lainnya <i class="fas fa-arrow-right m-lg-2"></i
          ></a>
        </div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const ceritaTemplate = () => `
<style>
body {
background-color: #f0efeb;
}
</style>
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
  <section class="cerita-kita-page">
      <div class="container">
        <center>
          <h2 class="mb-5">
            Apa <span style="color: #56ab2e">Cerita</span> Kamu?
          </h2>
        </center>
        <div class="pagination" id="pagination"></div>
        <a href="/#/form-cerita" class="btn-tambah-container text-decoration-none"><button class="btn btn-tambah rounded-circle"><i class="fas fa-plus"></i></button><span class="tambah-text">Tambah Cerita</span></a>
        <div class="carousel-inner row" id="ceritaContainer"></div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const dashboardCeritaTemplate = () => `
<style>
body {
background-color: #f0efeb;
}
</style>
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section id="cerita-kamu" class="container my-5">
      <h2>Cerita <span style="color: #56ab2e">Kamu</span></h2>
       <a href="/#/form-cerita" class="btn-tambah-container text-decoration-none"><button class="btn btn-tambah rounded-circle"><i class="fas fa-plus"></i></button><span class="tambah-text">Tambah Cerita</span></a>
      <div id="cerita-list" class="row">
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const detailDirektoriTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="detail-direktori-section">
      <div class="container">
        <h2 id="place-name" class="mb-4"></h2>
        <div class="row">
          <div class="col-md-6">
            <img id="place-image" src="" alt="" class="img-fluid mt-3" />
          </div>
          <div class="col-md-6">
            <h4><i class="fas fa-map-marker-alt"></i> Lokasi</h4>
            <p id="place-location"></p>
            <h4><i class="fas fa-info-circle"></i> Deskripsi</h4>
            <p id="place-description"></p>
            <div class="row">
              <div class="col-md-6">
                <h4><i class="fas fa-tasks"></i> Aktivitas</h4>
                <ul id="place-activities" class="list-unstyled"></ul>
              </div>
              <div class="col-md-6">
                <h4><i class="fas fa-toolbox"></i> Fasilitas</h4>
                <ul id="place-facilities" class="list-unstyled"></ul>
              </div>
            </div>
            <h4><i class="fas fa-door-open"></i> Akses</h4>
            <p id="place-access"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="peta-interaktif-section">
      <div class="container">
        <h2 style="text-align: center" class="mb-lg-5">
          <strong>Peta Interaktif Ekowisata</strong>
        </h2>
        <div id="map"></div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const detailSpesiesTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="detail-spesies">
      <div class="spesies-detail-container">
        <div class="spesies-image-container">
          <img id="spesies-image" class="spesies-detail-image" src="" alt="Spesies Image" />
          <p id="spesies-description" class="spesies-description"></p>
        </div>
        <div class="spesies-detail-wrapper">
          <div class="spesies-detail-text">
            <h2 id="spesies-name"></h2>
            <hr />
            <p class="detail-label"><strong>Kerajaan</strong> <span id="spesies-kerajaan"></span></p>
            <p class="detail-label"><strong>Kelas</strong> <span id="spesies-kelas"></span></p>
            <p class="detail-label"><strong>Ordo</strong> <span id="spesies-ordo"></span></p>
            <p class="detail-label"><strong>Spesies</strong> <span id="spesies-spesies"></span></p>
          </div>
          <div class="spesies-detail-row">
            <hr />
            <div class="detail-row">
              <p>
                <strong>Populasi<br /> </strong> <span id="spesies-populasi"></span>
              </p>
              <p>
                <strong>Rentangan Hidup<br /></strong> <span id="spesies-rentangan-hidup"></span>
              </p>
            </div>
            <hr />
            <div class="detail-row">
              <p>
                <strong>Panjang <br /></strong> <span id="spesies-panjang"></span>
              </p>
              <p>
                <strong>Berat <br /></strong> <span id="spesies-berat"></span>
              </p>
            </div>
            <hr />
            <div class="detail-row">
              <p>
                <strong>Kecepatan Tertinggi <br /></strong> <span id="spesies-kecepatan-tertinggi"></span>
              </p>
              <p>
                <strong>Status Konservasi <br /></strong> <span id="spesies-status-konservasi"></span>
              </p>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <button class="btn-back" id="backButton">Kembali</button>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const direktoriTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="destinasi-page">
      <div class="container">
        <h2>Jelajahi</h2>
        <h1>
          <strong
            >Direktori Ekowisata
            <span style="color: #56ab2e">Hutan</span></strong
          >
        </h1>
        <hr />
        <br />
        <div class="row"></div>
        <div class="pagination"></div>
      </div>
    </section>
    <section class="peta-interaktif-section">
      <div class="container" id="peta">
        <h2 style="text-align: center" class="mb-lg-5">
          <strong>Peta Interaktif Ekowisata</strong>
        </h2>
        <div id="map"></div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const formCeritaTemplate = () => `
  <navbar-rimbawa id="navbar"></navbar-rimbawa>
  <section class="edit-cerita-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="/images/cerita-kamu.png" alt="Gambarmu" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h2>
            Form Cerita <span style="color: #56ab2e">Kamu</span>
          </h2>
          <form method="POST" id="ceritaForm">
            <div class="form-group">
              <label for="cerita"></label>
              <textarea
                class="form-control"
                id="cerita"
                name="cerita"
                rows="7"
                maxlength="345"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-kirim-cerita">
              Kirim Cerita
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <footer-rimbawa id="footer"></footer-rimbawa>
`;
const editCeritaTemplate = (ceritaId) => `
  <navbar-rimbawa id="navbar"></navbar-rimbawa>
  <section class="edit-cerita-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="/images/cerita-kamu.png" alt="Gambarmu" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h2>
            Edit Cerita <span style="color: #56ab2e">Kamu</span>
          </h2>
          <form method="POST" id="ceritaForm" data-id="${ceritaId}">
            <div class="form-group">
              <label for="cerita"></label>
              <textarea class="form-control" id="cerita" name="cerita" rows="7" maxlength="345" required></textarea>
            </div>
            <button type="submit" class="btn btn-kirim-cerita">
              Perbarui Cerita
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <footer-rimbawa id="footer"></footer-rimbawa>
`;
const editProfileTemplate = (user) => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="container mt-5 edit-profile">
      <div class="row justify-content-end">
        <div class="col-md-6">
         <img
            src="/images/edit.png"
            alt="Profile Picture"
            class="img-fluid profile-picture"
          />
        </div>
        <div class="col-md-6">
          <h2>Edit Profile</h2>
          <form id="editProfileForm" enctype="multipart/form-data" method="post">
            <div class="mb-3 row align-items-center">
              <label for="name" class="col-md-4 col-form-label">Nama</label>
              <div class="col-md-8">
                <input type="text" class="form-control" id="name" value="${user.name}" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="username" class="col-md-4 col-form-label">Username</label>
              <div class="col-md-8">
                <input type="text" class="form-control" id="username" value="${user.username}" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="email" class="col-md-4 col-form-label">Email</label>
              <div class="col-md-8">
                <input type="email" class="form-control" id="email" value="${user.email}" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="profile-picture" class="col-md-4 col-form-label">Upload Foto Profil</label>
              <div class="col-md-8">
                <input type="file" class="form-control" id="profile-picture" accept="image/*" />
                <span id="file-name" class="" style="font-size: 0.8em;">${user.gambar}</span>
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-ubah">Ubah</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const gantiPasswordTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="container mt-5 edit-profile">
      <div class="row justify-content-end">
        <div class="col-md-6">
          <img
            src="/images/edit.png"
            alt="Profile Picture"
            class="img-fluid profile-picture"
          />
        </div>
        <div class="col-md-6">
          <h2>Ganti Password</h2>
          <form id="gantiPasswordForm" method="post">
            <div class="mb-3 row align-items-center">
              <label for="current-password" class="col-md-4 col-form-label">Password Saat Ini</label>
              <div class="col-md-8">
                <input type="password" class="form-control" id="current-password" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="new-password" class="col-md-4 col-form-label">Password Baru</label>
              <div class="col-md-8">
                <input type="password" class="form-control" id="new-password" />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-ubah">Ubah</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const edukasiTemplate = () => `
  <navbar-rimbawa id="navbar"></navbar-rimbawa>
  <section class="edukasi-page">
    <div class="container">
      <h2 class="mb-4">Jelajahi</h2>
      <p class="judul-edukasi">
        Sudahkah Kamu Berkontribusi Dalam Upaya
        <br /><span class="text-green">Pelestarian Hutan?</span>
      </p>
      <div class="edukasi-buttons">
      </div>
    </div>
  </section>
  <section class="edukasi-content"> 
    <div class="container">
      <div id="edukasi-content"></div>
    </div>
  </section>
  <footer-rimbawa id="footer"></footer-rimbawa>
`;
const spesiesTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="spesies-page">
      <div class="container">
        <h2>
          <strong>
            Semua yg ingin Kamu <br />ketahui tentang
            <span style="color: #56ab2e">Spesies</span>
          </strong>
        </h2>
        <br />
        <div class="row" id="dataContainer"></div>
        <div class="pagination"></div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const tentangTemplate = () => `
 <navbar-rimbawa id="navbar"></navbar-rimbawa>
 <section class="tentang-kami-page" id="tentang-page">
      <div class="container">
        <h2><strong>Tentang Kami</strong></h2>
        <div class="content-flex">
          <div class="tentang-kami-img">
            <img src="rimbawa-360.png" alt="Tentang Kami Image" />
          </div>
          <div class="text">
            <h1><strong>Apa Itu Rimbawa 360?</strong></h1>
            <p>
              Rimbawa 360 adalah sebuah platform yang berkomitmen untuk
              mengedukasi masyarakat tentang pentingnya menjaga kelestarian
              hutan dan kehidupan liar di Indonesia. Melalui informasi dan fitur
              yang disediakan, Rimbawa 360 berupaya untuk membangun kesadaran
              akan isu-isu lingkungan serta mempromosikan partisipasi aktif
              dalam upaya pelestarian alam.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tim-kami-section">
      <div class="container" id="tim-kami">
        <h2><strong>Tim Kami</strong></h2>
        <p>
          Di SIB Dicoding, kami tak hanya belajar, tapi juga berkarya. Rimbawa
          360 adalah masterpiece kami, buah dari kolaborasi dan tekad tim yang
          solid.
        </p>
        <div class="row">
          <div class="col-md-4">
            <div class="team-member">
              <img
                src="tim/fikrin.jpg"
                alt="Team Member 1"
                class="img-fluid team-img"
              />
              <div class="overlay">
                <div class="social-icons">
                  <a
                    href="https://www.instagram.com/fkrn_werdiansyah/"
                    target="_blank"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://github.com/Pikrinwerdiansyh76"
                    target="_blank"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fkrn-werdiansyah-1904062b7/"
                    target="_blank"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <h4>
                Fikrin<br />
                Werdiansyah
              </h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-member">
              <img
                src="tim/revi.png"
                alt="Team Member 2"
                class="img-fluid team-img"
              />
              <div class="overlay">
                <div class="social-icons">
                  <a href="https://instagram.com/meidinarevisp" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="https://github.com/meidinarevisp" target="_blank">
                    <i class="fab fa-github"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/meidina-revi-589a692a3"
                    target="_blank"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <h4>
                Meidina Revi<br />
                Sandra Pertiwi
              </h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-member">
              <img
                src="tim/abdan.png"
                alt="Team Member 3"
                class="img-fluid team-img"
              />
              <div class="overlay">
                <div class="social-icons">
                  <a href="https://instagram.com/rifqiiabdan" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="https://github.com/rifqiiabdan" target="_blank">
                    <i class="fab fa-github"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/moh-rifqi-abdan-04b52a30a/"
                    target="_blank"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <h4>
                Mohammad<br />
                Rifqi Abdan
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-faq">
      <div class="wrapper" id="faq">
        <h2><strong>FAQ</strong></h2>
        <br />
        <div class="faq">
          <button class="accordion">
            Apa yang membuat Rimbawa 360 unik sebagai sumber informasi ekowisata
            hutan di Indonesia?
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              Rimbawa 360 tidak hanya memberikan informasi tentang destinasi
              ekowisata, tetapi juga mengedukasi tentang konservasi lingkungan
              di Indonesia.
            </p>
          </div>
        </div>
        <div class="faq">
          <button class="accordion">
            Mengapa penting bagi masyarakat untuk mengunjungi destinasi
            ekowisata yang terdaftar di Rimbawa 360?
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              Kunjungan ke destinasi ekowisata Rimbawa 360 mendukung langsung
              konservasi lingkungan sambil memberikan pengalaman alam yang
              berharga.
            </p>
          </div>
        </div>
        <div class="faq">
          <button class="accordion">
            Bagaimana Rimbawa 360 meningkatkan kesadaran masyarakat tentang
            isu-isu lingkungan?
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              Rimbawa 360 menyediakan konten edukatif tentang deforestasi,
              perburuan liar, dan pemanasan global untuk meningkatkan kesadaran
              masyarakat tentang lingkungan.
            </p>
          </div>
        </div>
        <div class="faq">
          <button class="accordion">
            Bagaimana masyarakat dapat terlibat dalam upaya konservasi melalui
            Rimbawa 360?
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              Masyarakat dapat berbagi cerita, pengalaman, dan inisiatif
              konservasi mereka melalui platform yang disediakan oleh Rimbawa
              360.
            </p>
          </div>
        </div>
        <div class="faq">
          <button class="accordion">
            Apa fitur utama yang tersedia di Rimbawa 360 untuk membantu pengguna
            dalam mengeksplorasi dan berkontribusi pada upaya konservasi
            lingkungan?
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              Rimbawa 360 menawarkan peta interaktif, basis data spesies, dan
              forum diskusi sebagai fitur utama untuk mendukung pengguna dalam
              upaya konservasi lingkungan.
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer-rimbawa id="footer"></footer-rimbawa>
`;
const loginTemplate = () => `
<section class="login-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card p-3">
          <div class="card-body">
            <h2 class="text-center">Masuk</h2>
            <form>
              <div class="form-group mb-2">
                <label for="loginInput">Email atau Nama Pengguna</label>
                <input type="text" class="form-control" id="loginInput" placeholder="Masukkan email atau nama pengguna" required>
              </div>
              <div class="form-group mb-2">
                <label for="password">Kata Sandi</label>
                <div class="input-group">
                  <input type="password" class="form-control" style="border-radius: 5px;" id="password" placeholder="Masukkan kata sandi" required>
                  <div class="input-group-append">
                    <div class="input-group-text show-password-icon" id="showPasswordIcon" style="cursor: pointer;">
                      <span class="fa fa-eye" aria-label="Show password"></span>
                    </div>
                  </div>
                </div>
                <div class="lupa-password">
                  <p><a href="/#/email-reset">Lupa kata sandi?</a></p>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-login" style="width: 350px;">Masuk</button>
              </div>
            </form>
            <p class="text-center mt-3">Belum memiliki akun?<a href="/#/register"> Daftar disini!</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
const emailResetTemplate = () => `
<section class="email-reset-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card p-3">
          <div class="card-body">
            <h2 class="text-center">Reset Kata Sandi</h2>
            <p class="text-center mt-3">Masukkan Email untuk Reset Kata Sandi</p>
            <form>
              <div class="form-group mb-2">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Masukkan email" required>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-email-reset" style="width: 350px;">Reset Kata Sandi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
const forgotPasswordTemplate = () => `
<section class="reset-password-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card p-3">
          <div class="card-body">
            <h2 class="text-center">Reset Kata Sandi</h2>
            <form>
              <div class="form-group mb-2">
                <label for="password">Kata Sandi Baru</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password" placeholder="Masukkan kata sandi" required>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span id="showPasswordIcon" class="fa fa-eye" aria-label="Show password"></span>
                    </div>
                  </div>
                </div>
                <div class="form-group mt-3">
                <label for="password1">Konfirmasi Kata Sandi</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password1" placeholder="Konfirmasi kata sandi" required>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span id="showConfirmPasswordIcon" class="fa fa-eye" aria-label="Show confirm password"></span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-reset-password" style="width: 350px;">Reset Kata Sandi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
const registerTemplate = () => `
<section class="register-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-3">
          <div class="card-body">
            <h2 class="text-center">Daftar</h2>
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Nama Lengkap</label>
                    <input type="text" class="form-control" id="name" placeholder="Masukkan nama lengkap" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="username">Nama Pengguna</label>
                    <input type="text" class="form-control" id="username" placeholder="Masukkan nama pengguna" required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Masukkan email" required>
              </div>
              <div class="form-group">
                <label for="password">Kata Sandi</label>
                <div class="input-group">
                  <input type="password" class="form-control" style="border-radius: 5px;" id="password" placeholder="Masukkan kata sandi" required>
                  <div class="input-group-append">
                    <div class="input-group-text show-password-icon" id="showPasswordIcon" style="cursor: pointer;">
                      <span class="fa fa-eye" aria-label="Show password"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="password1">Konfirmasi Kata Sandi</label>
                <div class="input-group">
                  <input type="password" class="form-control" style="border-radius: 5px;" id="password1" placeholder="Konfirmasi kata sandi" required>
                  <div class="input-group-append">
                    <div class="input-group-text show-password-icon" id="showConfirmPasswordIcon" style="cursor: pointer;">
                      <span class="fa fa-eye" aria-label="Show password"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-register">Daftar</button>
              </div>
            </form>
            <p class="text-center mt-3">Sudah memiliki akun?<a href="/#/login"> Masuk disini!</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
const dashboardAdminTemplate = () => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
   <section class="dashboard-section">
  <div class="background-animate"></div>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Selamat Datang di Dashboard!</h1>
      </div>
      <div class="col-12 text-center mt-4">
        <img src="rimbawa-360.png" alt="Rimbawa 360" style="max-width: 500px;">
      </div>
      <div class="col-12 text-center mt-4">
        <a href="/#/dashboard-direktori" class="btn btn-dashboard btn-lg me-3">Ekowisata</a>
        <a href="/#/dashboard-spesies" class="btn btn-dashboard btn-lg me-3">Spesies</a>
        <a href="/#/dashboard-edukasi" class="btn btn-dashboard btn-lg">Edukasi</a>
      </div>
      <button class="btn-offcanvas"><a href="#/logout" class="btn btn-logout"><i class="fas fa-sign-out-alt"></i></a></button>
    </div>
  </div>
</section>
`;
const dashboardDirektoriTemplate = () => `
<style>
body {
  background-color: #f6f2f2;
}

#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
<section class="dashboard-direktori">
   <div class="container mt-4">
        <div class="row">
            <div class="col-10">
                <a href="/#/dashboard-admin">
                  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
                </a>
                <div class="dropdown d-flex justify-content-between align-items-center">
                    <h1 class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Direktori Ekowisata Hutan
                    </h1>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="/#/dashboard-edukasi">Edukasi</a></li>
                        <li><a class="dropdown-item" href="/#/dashboard-spesies">Spesies</a></li>
                    </ul>
                    <a href="/#/form-direktori"><button class="btn btn-tambah rounded-circle"><i class="fas fa-plus"></i></button></a>
                </div>
                <section id="dashboard-direktori" class="mt-4">
                </section>
            </div>
        </div>
    </div>
    </section>
`;
const dashboardEdukasiTemplate = () => `
<style>
body {
  background-color: #f6f2f2;
}

#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
  <section class="dashboard-edukasi">
   <div class="container mt-4">
        <div class="row">
            <div class="col-10">
                <a href="/#/dashboard">
                  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
                </a>
                <div class="dropdown d-flex justify-content-between align-items-center">
                    <h1 class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Edukasi
                    </h1>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="/#/dashboard-direktori">Direktori Ekowisata Hutan</a></li>
                        <li><a class="dropdown-item" href="/#/dashboard-spesies">Spesies</a></li>
                    </ul>
                    <a href="/#/form-edukasi"><button class="btn btn-tambah rounded-circle"><i class="fas fa-plus"></i></button></a>
                </div>
                <section id="dashboard-edukasi" class="mt-4">
                </section>
            </div>
        </div>
    </div>
    </section>
`;
const dashboardSpesiesTemplate = () => `
<style>
body {
  background-color: #f6f2f2;
}

#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
  <section class="dashboard-spesies">
   <div class="container mt-4">
        <div class="row">
            <div class="col-10">
                <a href="/#/dashboard">
                  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
                </a>
                <div class="dropdown d-flex justify-content-between align-items-center">
                    <h1 class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Spesies
                    </h1>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="/#/dashboard-direktori">Direktori Ekowisata Hutan</a></li>
                        <li><a class="dropdown-item" href="/#/dashboard-edukasi">Edukasi</a></li>
                    </ul>
                    <a href="/#/form-spesies"><button class="btn btn-tambah rounded-circle"><i class="fas fa-plus"></i></button></a>
                </div>
                <section id="dashboard-spesies" class="mt-4">
                </section>
            </div>
        </div>
    </div>
    </section>
`;
const formDirektoriTemplate = () => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
<section class="form-direktori">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Form Direktori Ekowisata Hutan</h2>
  <form id="direktoriForm" enctype="multipart/form-data" method="post">
    <div class="form-container">
      <div class="form-column">
        <div class="form-group">
          <label for="nama_tempat">Nama:</label>
          <input type="text" id="nama_tempat" name="nama_tempat" required>
        </div>
        <div class="form-group">
          <label for="lokasi">Lokasi:</label>
          <input type="text" id="lokasi" name="lokasi" required>
        </div>
        <div class="form-group">
          <label for="deskripsi">Deskripsi:</label>
          <textarea class="mb-2" id="deskripsi" name="deskripsi" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="aktivitas">Aktivitas:</label>
          <input type="text" id="aktivitas" name="aktivitas" required>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="fasilitas">Fasilitas:</label>
          <input type="text" id="fasilitas" name="fasilitas" required>
        </div>
        <div class="form-group">
          <label for="akses">Akses:</label>
          <input type="text" id="akses" name="akses" required>
        </div>
        <div class="form-group">
          <label for="latitude">Latitude:</label>
          <input type="text" id="latitude" name="latitude" required>
        </div>
        <div class="form-group">
          <label for="longitude">Longitude:</label>
          <input type="text" id="longitude" name="longitude" required>
        </div>
        <div class="form-group">
          <label for="gambar">Gambar:</label>
          <input type="file" id="gambar" name="gambar" accept="image/*">
        </div>
      </div>
    </div>
    <div class="buttons">
      <a href="/#/dashboard-direktori"><button type="button" class="btn-batal">Batal</button></a>
      <button type="submit" class="btn-simpan">Simpan</button>
    </div>
  </form>
</section>
`;
const formEdukasiTemplate = () => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
<section class="form-edukasi">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Form Edukasi</h2>
  <form id="edukasiForm" enctype="multipart/form-data" method="post">
    <div class="form-group">
      <label for="nama_isu">Nama Isu:</label>
      <input type="text" id="nama_isu" name="nama_isu" required>
    </div>
    <div class="form-group">
      <label for="deskripsi">Deskripsi:</label>
      <textarea id="deskripsi" name="deskripsi" rows="4" required></textarea>
    </div>
    <div class="form-group">
      <label for="dampak">Dampak:</label>
      <textarea id="dampak" name="dampak" rows="3" required></textarea>
    </div>
    <div class="form-group">
      <label for="solusi">Solusi:</label>
      <textarea id="solusi" name="solusi" rows="3" required></textarea>
    </div>
    <div class="form-group">
      <label for="gambar">Gambar:</label>
      <input type="file" id="gambar" name="gambar" accept="image/*" required>
    </div>
    <div class="buttons">
    <a href="/#/dashboard-edukasi"><button type="button" class="btn-batal">Batal</button></a>
    <button type="submit" class="btn-simpan">Simpan</button>
  </div>
  </form>
</section>
`;
const editFormEdukasiTemplate = (data) => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
  <section class="form-edukasi">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Form Edit Edukasi</h2>
  <form id="edukasiForm" enctype="multipart/form-data" method="put">
    <div class="form-group">
      <label for="nama_isu">Nama Isu:</label>
      <input type="text" id="nama_isu" name="nama_isu" value="${data.nama_isu}" required>
    </div>
    <div class="form-group">
      <label for="deskripsi">Deskripsi:</label>
      <textarea id="deskripsi" name="deskripsi" rows="4" required>${data.deskripsi}</textarea>
    </div>
    <div class="form-group">
      <label for="dampak">Dampak:</label>
      <textarea id="dampak" name="dampak" rows="3" required>${data.dampak}</textarea>
    </div>
    <div class="form-group">
      <label for="solusi">Solusi:</label>
      <textarea id="solusi" name="solusi" rows="3" required>${data.solusi}</textarea>
    </div>
    <div class="form-group">
      <label for="gambar">Gambar:</label>
      <input type="file" id="gambar" name="gambar" accept="image/*">
      <span id="file-name">${data.gambar}</span>
    </div>
    <div class="buttons">
    <a href="/#/dashboard-edukasi"><button type="button" class="btn-batal">Batal</button></a>
    <button type="submit" class="btn-simpan">Simpan</button>
  </div>
  </form>
</section>
`;
const formSpesiesTemplate = () => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
  <section class="form-spesies">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Form Spesies</h2>
  <form id="spesiesForm" enctype="multipart/form-data" method="put">
    <div class="form-container">
      <div class="form-column">
        <div class="form-group">
          <label for="namaSpesies">Nama:</label>
          <input type="text" id="namaSpesies" name="namaSpesies" required>
        </div>
        <div class="form-group">
          <label for="deskripsi">Deskripsi:</label>
          <textarea id="deskripsi" name="deskripsi" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="kerajaan">Kerajaan:</label>
          <select id="kerajaan" name="kerajaan" required>
            <option value="">Pilih jenis kerajaan</option>
            <option value="-">-</option>
            <option value="Animalia">Animalia</option>
            <option value="Plantae">Plantae</option>
            <option value="Fungi">Fungi</option>
            <option value="Protista">Protista</option>
            <option value="Archaea">Archaea</option>
            <option value="Bacteria">Bacteria</option>
          </select>
        </div>
        <div class="form-group">
          <label for="kelas">Kelas:</label>
          <select id="kelas" name="kelas" required>
            <option value="">Pilih jenis kelas</option>
            <option value="-">-</option>
            <option value="Mammalia">Mammalia</option>
            <option value="Aves">Aves</option>
            <option value="Reptilia">Reptilia</option>
            <option value="Amphibia">Amphibia</option>
            <option value="Actinopterygii">Actinopterygii</option>
            <option value="Insecta">Insecta</option>
            <option value="Arachnida">Arachnida</option>
            <option value="Magnoliopsida">Magnoliopsida (Dikotil)</option>
            <option value="Liliopsida">Liliopsida (Monokotil)</option>
            <option value="Bryopsida">Bryopsida (Lumut Daun)</option>
            <option value="Pteridopsida">Pteridopsida (Pakis)</option>
            <option value="Ascomycota">Ascomycota (Jamur Kantung)</option>
            <option value="Basidiomycota">Basidiomycota (Jamur Basidium)</option>
            <option value="Chlorophyta">Chlorophyta (Alga Hijau)</option>
            <option value="Ciliophora">Ciliophora (Ciliata)</option>
            <option value="Euryarchaeota">Euryarchaeota</option>
            <option value="Crenarchaeota">Crenarchaeota</option>
            <option value="Proteobacteria">Proteobacteria</option>
            <option value="Firmicutes">Firmicutes</option>
        </select>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="statusKonservasi">Status Konservasi:</label>
          <select id="statusKonservasi" name="statusKonservasi" required>
            <option value="">Pilih jenis status konservasi</option>
            <option value="-">-</option>
            <option value="Punah">Extinct (EX) - Punah</option>
            <option value="Punah di Alam Liar">Extinct in the Wild (EW) - Punah di Alam Liar</option>
            <option value="Kritis">Critically Endangered (CR) - Kritis</option>
            <option value="Terancam">Endangered (EN) - Terancam</option>
            <option value="Rentan">Vulnerable (VU) - Rentan</option>
            <option value="Hampir Terancam">Near Threatened (NT) - Hampir Terancam</option>
            <option value="Risiko Rendah">Least Concern (LC) - Risiko Rendah</option>
            <option value="Data Kurang">Data Deficient (DD) - Data Kurang</option>
            <option value="Belum Dievaluasi">Not Evaluated (NE) - Belum Dievaluasi</option>
          </select>
        </div>
        <div class="form-group">
          <label for="ordo">Ordo:</label>
          <select id="ordo" name="ordo" required>
            <option value="">Pilih jenis ordo</option>
            <option value="-">-</option>
            <option value="Primates">Primates</option>
            <option value="Carnivora">Carnivora</option>
            <option value="Cetacea">Cetacea</option>
            <option value="Rodentia">Rodentia</option>
            <option value="Chiroptera">Chiroptera</option>
            <option value="Passeriformes">Passeriformes</option>
            <option value="Accipitriformes">Accipitriformes</option>
            <option value="Strigiformes">Strigiformes</option>
            <option value="Anseriformes">Anseriformes</option>
            <option value="Psittaciformes">Psittaciformes</option>
            <option value="Squamata">Squamata</option>
            <option value="Testudines">Testudines</option>
            <option value="Crocodylia">Crocodylia</option>
            <option value="Anura">Anura</option>
            <option value="Caudata">Caudata</option>
            <option value="Gymnophiona">Gymnophiona</option>
            <option value="Coleoptera">Coleoptera</option>
            <option value="Lepidoptera">Lepidoptera</option>
            <option value="Diptera">Diptera</option>
            <option value="Hymenoptera">Hymenoptera</option>
            <option value="Orthoptera">Orthoptera</option>
        </select>
        </div>
        <div class="form-group">
          <label for="spesies">Spesies:</label>
          <input type="text" id="spesies" name="spesies" required>
        </div>
        <div class="form-group">
          <label for="populasi">Populasi:</label>
          <input type="text" id="populasi" name="populasi" required>
        </div>
        <div class="form-group">
          <label for="rentanganHidup">Rentangan Hidup:</label>
          <input type="text" id="rentanganHidup" name="rentanganHidup" required>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="panjang">Panjang:</label>
          <input type="text" id="panjang" name="panjang" required>
        </div>
        <div class="form-group">
          <label for="berat">Berat:</label>
          <input type="text" id="berat" name="berat" required>
        </div>
        <div class="form-group">
          <label for="kecepatanTertinggi">Kecepatan Tertinggi:</label>
          <input type="text" id="kecepatanTertinggi" name="kecepatanTertinggi" required>
        </div>
        <div class="form-group">
          <label for="gambar">Gambar:</label>
          <input type="file" id="gambar" name="gambar" accept="image/*" required>
        </div>
      </div>
    </div>
    <div class="buttons">
    <a href="/#/dashboard-spesies"><button type="button" class="btn-batal">Batal</button></a>
    <button type="submit" class="btn-simpan">Simpan</button>
  </div>
  </form>
</section>
`;

const editFormDirektoriTemplate = (data) => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
<section class="edit-form-direktori">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Edit Form Direktori Ekowisata Hutan</h2>
  <form id="direktoriForm" enctype="multipart/form-data" method="put">
    <div class="form-container">
      <div class="form-column">
        <div class="form-group">
          <label for="nama_tempat">Nama:</label>
          <input type="text" id="nama_tempat" name="nama_tempat" value="${data.nama_tempat}" required>
        </div>
        <div class="form-group">
          <label for="lokasi">Lokasi:</label>
          <input type="text" id="lokasi" name="lokasi" value="${data.lokasi}" required>
        </div>
        <div class="form-group">
          <label for="deskripsi">Deskripsi:</label>
          <textarea class="mb-2" id="deskripsi" name="deskripsi" rows="4" required>${data.deskripsi}</textarea>
        </div>
        <div class="form-group">
          <label for="aktivitas">Aktivitas:</label>
          <input type="text" id="aktivitas" name="aktivitas" value="${data.aktivitas}" required>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="fasilitas">Fasilitas:</label>
          <input type="text" id="fasilitas" name="fasilitas" value="${data.fasilitas}" required>
        </div>
        <div class="form-group">
          <label for="akses">Akses:</label>
          <input type="text" id="akses" name="akses" value="${data.akses}" required>
        </div>
        <div class="form-group">
          <label for="latitude">Latitude:</label>
          <input type="text" id="latitude" name="latitude" value="${data.latitude}" required>
        </div>
        <div class="form-group">
          <label for="longitude">Longitude:</label>
          <input type="text" id="longitude" name="longitude" value="${data.longitude}" required>
        </div>
        <div class="form-group">
          <label for="gambar">Gambar:</label>
          <input type="file" id="gambar" name="gambar" accept="image/*">
          <span id="file-name">${data.gambar}</span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <a href="/#/dashboard-direktori"><button type="button" class="btn-batal">Batal</button></a>
      <button type="submit" class="btn-simpan">Simpan</button>
    </div>
  </form>
</section>
`;

const editFormSpesiesTemplate = (data) => `
<style>
#mainContent {
  padding-top: 0;
}

section {
  padding: 0;
}
</style>
<section class="form-spesies">
  <img src="rimbawa-360.png" alt="Logo Rimbawa 360" class="logo">
  <h2>Form Spesies</h2>
  <form id="spesiesForm" enctype="multipart/form-data" method="put">
    <div class="form-container">
      <div class="form-column">
        <div class="form-group">
          <label for="namaSpesies">Nama:</label>
          <input type="text" id="namaSpesies" name="namaSpesies" value="${data.namaSpesies}" required>
        </div>
        <div class="form-group">
          <label for="deskripsi">Deskripsi:</label>
          <textarea id="deskripsi" name="deskripsi" rows="4" required>${data.deskripsi}</textarea>
        </div>
        <div class="form-group">
          <label for="kerajaan">Kerajaan:</label>
          <select id="kerajaan" name="kerajaan" required>
            <option value="${data.kerajaan}">${data.kerajaan}</option>
            <option value="-">-</option>
            <option value="Animalia">Animalia</option>
            <option value="Plantae">Plantae</option>
            <option value="Fungi">Fungi</option>
            <option value="Protista">Protista</option>
            <option value="Archaea">Archaea</option>
            <option value="Bacteria">Bacteria</option>
          </select>
        </div>
        <div class="form-group">
          <label for="kelas">Kelas:</label>
          <select id="kelas" name="kelas" required>
            <option value="${data.kelas}">${data.kelas}</option>
            <option value="-">-</option>
            <option value="Mammalia">Mammalia</option>
            <option value="Aves">Aves</option>
            <option value="Reptilia">Reptilia</option>
            <option value="Amphibia">Amphibia</option>
            <option value="Actinopterygii">Actinopterygii</option>
            <option value="Insecta">Insecta</option>
            <option value="Arachnida">Arachnida</option>
            <option value="Magnoliopsida">Magnoliopsida (Dikotil)</option>
            <option value="Liliopsida">Liliopsida (Monokotil)</option>
            <option value="Bryopsida">Bryopsida (Lumut Daun)</option>
            <option value="Pteridopsida">Pteridopsida (Pakis)</option>
            <option value="Ascomycota">Ascomycota (Jamur Kantung)</option>
            <option value="Basidiomycota">Basidiomycota (Jamur Basidium)</option>
            <option value="Chlorophyta">Chlorophyta (Alga Hijau)</option>
            <option value="Ciliophora">Ciliophora (Ciliata)</option>
            <option value="Euryarchaeota">Euryarchaeota</option>
            <option value="Crenarchaeota">Crenarchaeota</option>
            <option value="Proteobacteria">Proteobacteria</option>
            <option value="Firmicutes">Firmicutes</option>
        </select>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="statusKonservasi">Status Konservasi:</label>
          <select id="statusKonservasi" name="statusKonservasi" required>
            <option value="${data.statusKonservasi}">${data.statusKonservasi}</option>
            <option value="-">-</option>
            <option value="Punah">Extinct (EX) - Punah</option>
            <option value="Punah di Alam Liar">Extinct in the Wild (EW) - Punah di Alam Liar</option>
            <option value="Kritis">Critically Endangered (CR) - Kritis</option>
            <option value="Terancam">Endangered (EN) - Terancam</option>
            <option value="Rentan">Vulnerable (VU) - Rentan</option>
            <option value="Hampir Terancam">Near Threatened (NT) - Hampir Terancam</option>
            <option value="Risiko Rendah">Least Concern (LC) - Risiko Rendah</option>
            <option value="Data Kurang">Data Deficient (DD) - Data Kurang</option>
            <option value="Belum Dievaluasi">Not Evaluated (NE) - Belum Dievaluasi</option>
          </select>
        </div>
        <div class="form-group">
          <label for="ordo">Ordo:</label>
          <select id="ordo" name="ordo" required>
            <option value="${data.ordo}">${data.ordo}</option>
            <option value="-">-</option>
            <option value="Primates">Primates</option>
            <option value="Carnivora">Carnivora</option>
            <option value="Cetacea">Cetacea</option>
            <option value="Rodentia">Rodentia</option>
            <option value="Chiroptera">Chiroptera</option>
            <option value="Passeriformes">Passeriformes</option>
            <option value="Accipitriformes">Accipitriformes</option>
            <option value="Strigiformes">Strigiformes</option>
            <option value="Anseriformes">Anseriformes</option>
            <option value="Psittaciformes">Psittaciformes</option>
            <option value="Squamata">Squamata</option>
            <option value="Testudines">Testudines</option>
            <option value="Crocodylia">Crocodylia</option>
            <option value="Anura">Anura</option>
            <option value="Caudata">Caudata</option>
            <option value="Gymnophiona">Gymnophiona</option>
            <option value="Coleoptera">Coleoptera</option>
            <option value="Lepidoptera">Lepidoptera</option>
            <option value="Diptera">Diptera</option>
            <option value="Hymenoptera">Hymenoptera</option>
            <option value="Orthoptera">Orthoptera</option>
        </select>
        </div>
        <div class="form-group">
          <label for="spesies">Spesies:</label>
          <input type="text" id="spesies" name="spesies" value="${data.spesies}" required>
        </div>
        <div class="form-group">
          <label for="populasi">Populasi:</label>
          <input type="text" id="populasi" name="populasi" value="${data.populasi}" required>
        </div>
        <div class="form-group">
          <label for="rentanganHidup">Rentangan Hidup:</label>
          <input type="text" id="rentanganHidup" name="rentanganHidup" value="${data.rentanganHidup}" required>
        </div>
      </div>
      <div class="form-column">
        <div class="form-group">
          <label for="panjang">Panjang:</label>
          <input type="text" id="panjang" name="panjang" value="${data.panjang}" required>
        </div>
        <div class="form-group">
          <label for="berat">Berat:</label>
          <input type="text" id="berat" name="berat" value="${data.berat}" required>
        </div>
        <div class="form-group">
          <label for="kecepatanTertinggi">Kecepatan Tertinggi:</label>
          <input type="text" id="kecepatanTertinggi" name="kecepatanTertinggi" value="${data.kecepatanTertinggi}" required>
        </div>
        <div class="form-group">
          <label for="gambar">Gambar:</label>
          <input type="file" id="gambar" name="gambar" accept="image/*">
          <span id="file-name">${data.gambar}</span>
        </div>
      </div>
    </div>
    <div class="buttons">
    <a href="/#/dashboard-spesies"><button type="button" class="btn-batal">Batal</button></a>
    <button type="submit" class="btn-simpan">Simpan</button>
  </div>
  </form>
</section>
`;

export {
  berandaTemplate,
  ceritaTemplate,
  dashboardCeritaTemplate,
  detailDirektoriTemplate,
  detailSpesiesTemplate,
  direktoriTemplate,
  formCeritaTemplate,
  editCeritaTemplate,
  editProfileTemplate,
  gantiPasswordTemplate,
  edukasiTemplate,
  spesiesTemplate,
  tentangTemplate,
  loginTemplate,
  emailResetTemplate,
  forgotPasswordTemplate,
  registerTemplate,
  dashboardAdminTemplate,
  dashboardDirektoriTemplate,
  dashboardEdukasiTemplate,
  dashboardSpesiesTemplate,
  formDirektoriTemplate,
  formEdukasiTemplate,
  formSpesiesTemplate,
  editFormEdukasiTemplate,
  editFormDirektoriTemplate,
  editFormSpesiesTemplate,
};
