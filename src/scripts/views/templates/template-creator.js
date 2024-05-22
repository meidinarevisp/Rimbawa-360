import "../../components/Hero";

const berandaTemplate = () => `
  <hero-rimbawa></hero-rimbawa>
    <!-- Edukasi Section -->
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

    <!-- Tentang Kami Section -->
    <section class="tentang-kami-section" id="tentang-kami">
      <div class="container">
        <h2 style="text-align: center"><strong>Tentang Kami</strong></h2>
        <div class="content-flex">
          <div class="image-tentang">
            <img src="images/pohon.png" alt="Tentang Kami Image" />
          </div>
          <div class="text">
            <p><strong>Apa Itu Rimbawa 360?</strong></p>
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

    <!-- Spesies Section -->
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
            class="col-md-6 d-flex align-items-center justify-content-center"
          >
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

    <!-- Cerita Kita Section -->
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
`;

const ceritaTemplate = () => `
  <section class="cerita-kita-page">
      <div class="container">
        <center>
          <h2 class="mb-5">
            Apa <span style="color: #56ab2e">Cerita</span> Kamu?
          </h2>
        </center>
        <div class="pagination" id="pagination"></div>
        <div class="carousel-inner row" id="ceritaContainer"></div>
      </div>
    </section>
`;

const dashboardCeritaTemplate = () => `
 <section id="cerita-kamu" class="container my-5">
      <h2>Cerita <span style="color: #56ab2e">Kamu</span></h2>
      <div id="cerita-list" class="row">
        <!-- Daftar cerita akan di-render di sini -->
      </div>
    </section>
`;
const detailDirektoriTemplate = () => `
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

    <!-- Peta Interaktif Section -->
    <section class="peta-interaktif-section">
      <div class="container">
        <h2 style="text-align: center" class="mb-lg-5">
          <strong>Peta Interaktif Ekowisata</strong>
        </h2>
        <div id="map"></div>
      </div>
    </section>
`;
const detailSpesiesTemplate = () => `
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
`;
const direktoriTemplate = () => `
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

    <!-- Peta Interaktif Section -->
    <section class="peta-interaktif-section">
      <div class="container">
        <h2 style="text-align: center" class="mb-lg-5">
          <strong>Peta Interaktif Ekowisata</strong>
        </h2>
        <div id="map"></div>
      </div>
    </section>
`;
const editCeritaTemplate = () => `
 <section class="edit-cerita-page">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              src="/images/cerita-kamu.png"
              alt="Gambarmu"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6">
            <h2 class="mb-5">
              Edit Cerita <span style="color: #56ab2e">Kamu</span>
            </h2>
            <form action="/submit_cerita" method="POST">
              <div class="form-group">
                <label for="nama">Nama :</label>
                <input
                  type="text"
                  class="form-control"
                  id="nama"
                  name="nama"
                  required
                />
              </div>
              <div class="form-group">
                <label for="cerita">Cerita :</label>
                <textarea
                  class="form-control"
                  id="cerita"
                  name="cerita"
                  rows="5"
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
`;
const editProfileTemplate = () => `
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
          <form>
            <div class="mb-3 row align-items-center">
              <label for="username" class="col-md-4 col-form-label"
                >Username</label
              >
              <div class="col-md-8">
                <input type="text" class="form-control" id="username" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="password" class="col-md-4 col-form-label"
                >Password</label
              >
              <div class="col-md-8">
                <input type="password" class="form-control" id="password" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="new-password" class="col-md-4 col-form-label"
                >New Password</label
              >
              <div class="col-md-8">
                <input type="password" class="form-control" id="new-password" />
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="profile-picture" class="col-md-4 col-form-label"
                >Upload Profile Picture</label
              >
              <div class="col-md-8">
                <input
                  type="file"
                  class="form-control"
                  id="profile-picture"
                  accept="image/*"
                />
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
`;
const edukasiTemplate = () => `
 <!-- Edukasi Section -->
    <section class="edukasi-page">
      <div class="container">
        <h2 class="mb-4">Jelajahi</h2>
        <p class="judul-edukasi">
          Sudahkah Kamu Berkontribusi Dalam Upaya
          <br /><span class="text-green">Pelestarian Hutan?</span>
        </p>
        <div>
          <button class="edukasi-btn" data-id="deforestasi">Deforestasi</button>
          <button class="edukasi-btn" data-id="perburuan-liar">
            Perburuan Liar
          </button>
          <button class="edukasi-btn" data-id="pemanasan-global">
            Pemanasan Global
          </button>
          <button class="edukasi-btn" data-id="kebakaran-hutan">
            Kebakaran Hutan
          </button>
        </div>
        </section>
        <section class="edukasi-content" id="edukasi"> 
            <div class="container">
       <div id="edukasi-content"></div>
      </div>
      </div>
      </section>
`;
const spesiesTemplate = () => `
 <section class="spesies-page">
      <div class="container">
        <h2>
          <strong>
            Semua yg ingin Kamu <br />ketahui tentang
            <span style="color: #527853">Spesies</span>
          </strong>
        </h2>
        <br />
        <div class="row" id="dataContainer"></div>
        <div class="pagination"></div>
      </div>
    </section>
`;
const tentangTemplate = () => `
 <section class="tentang-kami-page" id="tentang-page">
      <div class="container">
        <h2 class="animated-text1"><strong>Tentang Kami</strong></h2>
        <div class="content-flex">
          <div class="tentang-kami-img animated-content" data-delay="1">
            <img src="rimbawa-360.png" alt="Tentang Kami Image" />
          </div>
          <div class="text animated-content" data-delay="2">
            <p><strong>Apa Itu Rimbawa 360?</strong></p>
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

    <section class="tim-kami-section" id="tim-kami">
      <div class="container">
        <h2 class="animated-text1" data-delay="1"><strong>Tim Kami</strong></h2>
        <p class="animated-text1" data-delay="0">
          Di SIB Dicoding, kami tak hanya belajar, tapi juga berkarya. Rimbawa
          360 adalah masterpiece kami, buah dari kolaborasi dan tekad tim yang
          solid.
        </p>
        <div class="row">
          <div class="col-md-4 animated-content" data-delay="0">
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
          <div class="col-md-4 animated-content" data-delay="0.5">
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
          <div class="col-md-4 animated-content" data-delay="1">
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

    <!-- FAQ Section -->
    <div class="container">
      <section class="wrapper">
        <h2 class="animated-text1"><strong>FAQ</strong></h2>
        <br />
        <div class="faq animated-content" data-delay="1">
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
        <div class="faq animated-content" data-delay="2">
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
        <div class="faq animated-content" data-delay="3">
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
        <div class="faq animated-content" data-delay="4">
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
        <div class="faq animated-content" data-delay="5">
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
      </section>
    </div>
`;

export {
  berandaTemplate,
  ceritaTemplate,
  dashboardCeritaTemplate,
  detailDirektoriTemplate,
  detailSpesiesTemplate,
  direktoriTemplate,
  editCeritaTemplate,
  editProfileTemplate,
  edukasiTemplate,
  spesiesTemplate,
  tentangTemplate,
};
