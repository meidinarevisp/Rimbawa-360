import UrlParser from "../../routes/url-parser";
import { detailDirektoriTemplate } from "../templates/template-creator";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";

const detailDirektori = {
  async render() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const renderedTemplate = detailDirektoriTemplate(urlParams);
    return renderedTemplate;
  },

  async afterRender() {
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();
    const id = urlParams.id;

    try {
      const response = await fetch(`http://localhost:3000/api/direktori/${id}`);
      const selectedDestinasi = await response.json();

      if (selectedDestinasi) {
        const placeName = document.getElementById("place-name");
        const placeImage = document.getElementById("place-image");
        const placeLocation = document.getElementById("place-location");
        const placeDescription = document.getElementById("place-description");
        const placeActivities = document.getElementById("place-activities");
        const placeAccess = document.getElementById("place-access");
        const placeFacilities = document.getElementById("place-facilities");

        placeName.textContent = selectedDestinasi.nama_tempat;
        placeImage.src = `/uploads/${selectedDestinasi.gambar}`;
        placeImage.alt = selectedDestinasi.nama_tempat;
        placeLocation.textContent = selectedDestinasi.lokasi;
        placeDescription.textContent = selectedDestinasi.deskripsi;

        placeLocation.style.marginLeft = "30px";
        placeDescription.style.marginLeft = "30px";
        placeAccess.style.marginLeft = "30px";

        placeImage.style.width = "auto";
        placeImage.style.height = "400px";
        placeImage.style.borderRadius = "8px";

        placeActivities.innerHTML = "";
        if (selectedDestinasi.aktivitas) {
          const activities = selectedDestinasi.aktivitas.split(",");
          activities.forEach((activity) => {
            const activityItem = document.createElement("li");
            activityItem.innerHTML = `&bull; ${activity.trim()}`;
            activityItem.style.marginLeft = "30px";
            placeActivities.appendChild(activityItem);
          });
        } else {
          placeActivities.innerHTML = "<li>N/A</li>";
        }

        placeFacilities.innerHTML = "";
        if (selectedDestinasi.fasilitas) {
          const facilities = selectedDestinasi.fasilitas.split(",");
          facilities.forEach((facility) => {
            const facilityItem = document.createElement("li");
            facilityItem.innerHTML = `&bull; ${facility.trim()}`;
            facilityItem.style.marginLeft = "20px";
            placeFacilities.appendChild(facilityItem);
          });
        } else {
          placeFacilities.innerHTML = "<li>N/A</li>";
        }

        placeAccess.textContent = selectedDestinasi.akses || "N/A";

        const map = L.map("map").setView(
          [selectedDestinasi.latitude, selectedDestinasi.longitude],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: markerIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const marker = L.marker(
          [selectedDestinasi.latitude, selectedDestinasi.longitude],
          { icon: customIcon }
        ).addTo(map);

        marker.bindPopup(
          `<b>${selectedDestinasi.nama_tempat}</b><br>${selectedDestinasi.lokasi}`
        );
      }
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

export default detailDirektori;
