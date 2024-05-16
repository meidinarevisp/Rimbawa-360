import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const headerEl = document.getElementById('header')
headerEl.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
      <a class="navbar-brand" href="#">Rimbawa 360</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#map">Peta Ekowisata</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#species">Basis Data Spesies</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#forum">Forum Diskusi</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`
