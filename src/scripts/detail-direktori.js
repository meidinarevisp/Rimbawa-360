import "../styles/style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";

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

    // Adding margin left to location, description, and access
    placeLocation.style.marginLeft = "30px";
    placeDescription.style.marginLeft = "30px";
    placeAccess.style.marginLeft = "30px";

    // Set image size
    placeImage.style.width = "auto"; // You can adjust the width as needed
    placeImage.style.height = "400px"; // You can adjust the height as needed
    placeImage.style.borderRadius = "8px";

    // Activities
    if (selectedDestinasi.aktivitas && selectedDestinasi.aktivitas.length > 0) {
      selectedDestinasi.aktivitas.forEach((activity) => {
        const activityItem = document.createElement("li");
        activityItem.innerHTML = `&bull; ${activity}`; // Changed to bullet point
        activityItem.style.marginLeft = "30px"; // Added left margin
        placeActivities.appendChild(activityItem);
      });
    } else {
      placeActivities.innerHTML = "<li>N/A</li>";
    }

    // Facilities
    if (selectedDestinasi.fasilitas && selectedDestinasi.fasilitas.length > 0) {
      selectedDestinasi.fasilitas.forEach((facility) => {
        const facilityItem = document.createElement("li");
        facilityItem.innerHTML = `&bull; ${facility}`; // Changed to bullet point
        facilityItem.style.marginLeft = "20px"; // Added left margin
        placeFacilities.appendChild(facilityItem);
      });
    } else {
      placeFacilities.innerHTML = "<li>N/A</li>";
    }

    // Access
    placeAccess.textContent = selectedDestinasi.akses || "N/A"; // Ensure you have these fields in your JSON data

    // Create Map with selected destination
    const map = L.map("map").setView(
      [selectedDestinasi.titik.latitude, selectedDestinasi.titik.longitude],
      13
    );

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

    const marker = L.marker(
      [selectedDestinasi.titik.latitude, selectedDestinasi.titik.longitude],
      {
        icon: customIcon,
      }
    ).addTo(map);

    marker.bindPopup(
      `<b>${selectedDestinasi.nama_tempat}</b><br>${selectedDestinasi.deskripsi}`
    );
  }
});
