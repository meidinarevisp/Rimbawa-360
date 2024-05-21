import SpesiesData from "../data/Spesies.json";
import "../styles/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const spesiesId = parseInt(params.get("id"));

  const spesies = SpesiesData.BasisDataSpesies.find((s) => s.id === spesiesId);

  if (spesies) {
    document.getElementById("spesies-image").src = spesies.gambar;
    document.getElementById("spesies-image").alt = spesies.namaHewan;
    document.getElementById("spesies-name").textContent = spesies.namaHewan;
    document.getElementById("spesies-description").textContent = spesies.deskripsi;
    document.getElementById("spesies-kerajaan").textContent = spesies.kerajaan;
    document.getElementById("spesies-kelas").textContent = spesies.kelas;
    document.getElementById("spesies-status-konservasi").textContent = spesies.statusKonservasi;
    document.getElementById("spesies-ordo").textContent = spesies.ordo;
    document.getElementById("spesies-spesies").textContent = spesies.spesies;
    document.getElementById("spesies-populasi").textContent = spesies.populasi;
    document.getElementById("spesies-rentangan-hidup").textContent = spesies.rentanganHidup;
    document.getElementById("spesies-panjang").textContent = spesies.panjang;
    document.getElementById("spesies-berat").textContent = spesies.berat;
    document.getElementById("spesies-kecepatan-tertinggi").textContent = spesies.kecepatanTertinggi;
  } else {
    document.getElementById("main-content").innerHTML = "<p>Spesies tidak ditemukan.</p>";
  }

  // Tambahkan event listener pada tombol "Kembali"
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", goBack);
});

function goBack() {
  window.location.href = "spesies.html";
}
