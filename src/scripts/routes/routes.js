import Beranda from "../views/pages/beranda";
import Cerita from "../views/pages/cerita";
import dashboardCerita from "../views/pages/dashboard-cerita";
import detailDirektori from "../views/pages/detail-direktori";
import detailSpesies from "../views/pages/detail-spesies";
import Direktori from "../views/pages/direktori";
import editCerita from "../views/pages/edit-cerita";
import editProfile from "../views/pages/edit-profile";
import Edukasi from "../views/pages/edukasi";
import Spesies from "../views/pages/spesies";
import Tentang from "../views/pages/tentang";
import Login from "../views/pages/login";
import Register from "../views/pages/register";

const routes = {
  "/": Beranda,
  "/login": Login,
  "/register": Register,
  "/cerita": Cerita,
  "/dashboard-cerita": dashboardCerita,
  "/detail-direktori": detailDirektori,
  "/detail-spesies/:id": detailSpesies,
  "/direktori": Direktori,
  "/edit-cerita": editCerita,
  "/edit-profile": editProfile,
  "/edukasi": Edukasi,
  "/spesies": Spesies,
  "/tentang": Tentang,
};

export default routes;
