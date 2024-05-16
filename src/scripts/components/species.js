const speciesContainer = document.getElementById("species");
speciesContainer.innerHTML = `
  <div class="container py-5">
    <h2 class="text-success mb-4">Basis Data Spesies</h2>
    <div class="species-list">
      <ul class="list-group">
        <!-- Daftar spesies akan ditambahkan di sini -->
      </ul>
    </div>
  </div>
`;

// Fungsi untuk mengambil data spesies dari API atau sumber data lainnya
function fetchSpeciesData() {
  // Lakukan permintaan API atau ambil data dari sumber lainnya
  const speciesData = [
    // Data spesies...
  ];

  const speciesList = document.querySelector(".species-list ul");
  speciesData.forEach((species) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
      <h5>${species.name}</h5>
      <p>${species.description}</p>
      <p>Status Konservasi: ${species.conservationStatus}</p>
    `;
    speciesList.appendChild(listItem);
  });
}

fetchSpeciesData();
