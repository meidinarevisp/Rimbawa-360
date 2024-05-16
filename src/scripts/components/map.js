const mapContainer = document.getElementById("map");
mapContainer.innerHTML = `
  <div class="container py-5">
    <h2 class="text-success mb-4">Peta Ekowisata</h2>
    <div class="map-container">
      <div id="map-canvas" style="height: 500px;"></div>
    </div>
  </div>
`;

// Kode untuk menginisialisasi peta interaktif menggunakan API Peta (misalnya, Google Maps API)
function initMap() {
  const mapCanvas = document.getElementById("map-canvas");
  const mapOptions = {
    center: new google.maps.LatLng(-2.548926, 118.0148634),
    zoom: 6,
  };
  const map = new google.maps.Map(mapCanvas, mapOptions);

  // Tambahkan penanda lokasi kawasan konservasi dan destinasi ekowisata ke peta
  const markers = [
    // Data penanda lokasi...
  ];

  markers.forEach((marker) => {
    const markerInstance = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      map,
      title: marker.title,
    });
  });
}
