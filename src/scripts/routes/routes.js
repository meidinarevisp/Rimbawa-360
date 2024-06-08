import Beranda from "../views/pages/beranda";
import Cerita from "../views/pages/cerita";
import dashboardCerita from "../views/pages/dashboard-cerita";
import detailDirektori from "../views/pages/detail-direktori";
import detailSpesies from "../views/pages/detail-spesies";
import Direktori from "../views/pages/direktori";
import formCerita from "../views/pages/form-cerita";
import editCerita from "../views/pages/edit-cerita";
import editProfile from "../views/pages/edit-profile";
import gantiPassword from "../views/pages/ganti-password";
import Edukasi from "../views/pages/edukasi";
import Spesies from "../views/pages/spesies";
import Tentang from "../views/pages/tentang";
import Login from "../views/pages/login";
import Register from "../views/pages/register";
import DashboardAdmin from "../views/pages/dashboard-admin";
import DashboardDirektori from "../views/pages/dashboard-direktori";
import DashboardEdukasi from "../views/pages/dashboard-edukasi";
import DashboardSpesies from "../views/pages/dashboard-spesies";
import formDirektori from "../views/pages/form-direktori";
import formSpesies from "../views/pages/form-spesies";
import formEdukasi from "../views/pages/form-edukasi";
import editFormEdukasi from "../views/pages/edit-form-edukasi";
import editFormSpesies from "../views/pages/edit-form-spesies";
import editFormDirektori from "../views/pages/edit-form-direktori";
import Logout from "../views/pages/logout";

const routes = {
  "/": Beranda,
  "/login": Login,
  "/register": Register,
  "/cerita": Cerita,
  "/dashboard-cerita": dashboardCerita,
  "/detail-direktori/:id": detailDirektori,
  "/detail-spesies/:id": detailSpesies,
  "/direktori": Direktori,
  "/form-cerita": formCerita,
  "/edit-cerita": editCerita,
  "/edit-profile": editProfile,
  "/ganti-password": gantiPassword,
  "/edukasi": Edukasi,
  "/spesies": Spesies,
  "/tentang": Tentang,
  "/dashboard-admin": DashboardAdmin,
  "/dashboard-direktori": DashboardDirektori,
  "/dashboard-edukasi": DashboardEdukasi,
  "/dashboard-spesies": DashboardSpesies,
  "/form-direktori": formDirektori,
  "/form-edukasi": formEdukasi,
  "/form-spesies": formSpesies,
  "/edit-form-edukasi/:id": editFormEdukasi,
  "/edit-form-spesies/:id": editFormSpesies,
  "/edit-form-direktori/:id": editFormDirektori,
  "/logout": Logout,
};

export default routes;
