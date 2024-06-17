const sharp = require("sharp");

sharp("src/public/heros/hero-1.jpg")
  .resize(1200)
  .toFile("src/public/heros/hero-1-large.jpg", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });

sharp("src/public/heros/hero-1.jpg")
  .resize(600)
  .toFile("src/public/heros/hero-1-small.jpg", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });

sharp("src/public/rimbawa-360.png")
  .resize({ width: 400 }) // Sesuaikan ukuran lebar sesuai kebutuhan navbar
  .toFile("src/public/rimbawa-360-small.png", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });

sharp("src/public/images/pohon.png")
  .resize(1200)
  .toFile("src/public/images/pohon-large.png", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });

sharp("src/public/images/pohon.png")
  .resize(600)
  .toFile("src/public/images/pohon-small.png", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
