import "../styles/style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import data from "../data/Ekowisata.json";

function createMap() {
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

  data.ekowisata_hutan.forEach((place) => {
    const marker = L.marker([place.lokasi.latitude, place.lokasi.longitude], {
      icon: customIcon,
    }).addTo(map);
    marker.bindPopup(`<b>${place.nama_tempat}</b><br>${place.deskripsi}`);
  });
}

document.addEventListener("DOMContentLoaded", createMap);
