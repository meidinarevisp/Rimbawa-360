import "../styles/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const placeName = document.getElementById("place-name");
  const placeImage = document.getElementById("place-image");
  const placeLocation = document.getElementById("place-location");
  const placeDescription = document.getElementById("place-description");
  const placeActivities = document.getElementById("place-activities");
  const placeAccess = document.getElementById("place-access");
  const placeFacilities = document.getElementById("place-facilities");

  const selectedDestinasi = JSON.parse(
    localStorage.getItem("selectedDestinasi")
  );

  if (selectedDestinasi) {
    placeName.textContent = selectedDestinasi.nama_tempat;
    placeImage.src = selectedDestinasi.gambar;
    placeImage.alt = selectedDestinasi.nama_tempat;
    placeLocation.textContent = selectedDestinasi.lokasi;
    placeDescription.textContent = selectedDestinasi.deskripsi;
    placeActivities.textContent = selectedDestinasi.aktivitas || "N/A"; // Ensure you have these fields in your JSON data
    placeAccess.textContent = selectedDestinasi.akses || "N/A"; // Ensure you have these fields in your JSON data
    placeFacilities.textContent = selectedDestinasi.fasilitas || "N/A"; // Ensure you have these fields in your JSON data
  }

  // Create Map
  const map = L.map("map").setView([-2.5, 118], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  });

  ekowisataData.ekowisata_hutan.forEach((place) => {
    const marker = L.marker([place.titik.latitude, place.titik.longitude], {
      icon: customIcon,
    }).addTo(map);
    marker.bindPopup(`<b>${place.nama_tempat}</b><br>${place.deskripsi}`);
  });
});
