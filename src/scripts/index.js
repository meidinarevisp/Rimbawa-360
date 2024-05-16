import "../styles/style.css";

// Memilih elemen carousel
const carouselElement = document.querySelector("#ceritaCarousel");

// Mengecek apakah elemen carousel ditemukan
if (carouselElement) {
  // Inisialisasi carousel dengan menggunakan Bootstrap
  const carousel = new bootstrap.Carousel(carouselElement, {
    pause: "hover", // Menjeda carousel saat kursor melayang di atasnya
    interval: 5000, // Mengatur interval perpindahan slide menjadi 5 detik
  });

  // Menambahkan event listener untuk tombol "Previous" dan "Next"
  const prevButton = carouselElement.querySelector(".carousel-control-prev");
  const nextButton = carouselElement.querySelector(".carousel-control-next");

  prevButton.addEventListener("click", () => {
    carousel.prev();
  });

  nextButton.addEventListener("click", () => {
    carousel.next();
  });
}
