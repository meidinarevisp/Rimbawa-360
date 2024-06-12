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
import emailReset from "../views/pages/email-reset";
import forgotPassword from "../views/pages/reset-password";
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
  "/": { page: Beranda, title: "Rimbawa 360 - Beranda" },
  "/login": { page: Login, title: "Rimbawa 360 - Login" },
  "/reset-password/:id": {
    page: forgotPassword,
    title: "Rimbawa 360 - Reset Kata Sandi",
  },
  "/email-reset": {
    page: emailReset,
    title: "Rimbawa 360 - Reset Kata Sandi",
  },
  "/register": { page: Register, title: "Rimbawa 360 - Register" },
  "/cerita": { page: Cerita, title: "Cerita" },
  "/dashboard-cerita": {
    page: dashboardCerita,
    title: "Rimbawa 360 - Dashboard Cerita",
  },
  "/detail-direktori/:id": {
    page: detailDirektori,
    title: "Rimbawa 360 - Detail Direktori",
  },
  "/detail-spesies/:id": {
    page: detailSpesies,
    title: "Rimbawa 360 - Detail Spesies",
  },
  "/direktori": { page: Direktori, title: "Rimbawa 360 - Direktori" },
  "/direktori#peta": {
    page: Tentang,
    title: "Rimbawa 360 - Direktori",
    hash: "peta",
  },
  "/form-cerita": { page: formCerita, title: "Rimbawa 360 - Form Cerita" },
  "/edit-cerita/:id": { page: editCerita, title: "Rimbawa 360 - Edit Cerita" },
  "/edit-profile": { page: editProfile, title: "Rimbawa 360 - Edit Profile" },
  "/ganti-password": {
    page: gantiPassword,
    title: "Rimbawa 360 - Ganti Password",
  },
  "/edukasi": { page: Edukasi, title: "Rimbawa 360 - Edukasi" },
  "/spesies": { page: Spesies, title: "Rimbawa 360 - Spesies" },
  "/tentang": { page: Tentang, title: "Rimbawa 360 - Tentang" },
  "/tentang#tim-kami": {
    page: Tentang,
    title: "Rimbawa 360 - Tentang",
    hash: "tim-kami",
  },
  "/tentang#faq": {
    page: Tentang,
    title: "Rimbawa 360 - Tentang",
    hash: "faq",
  },
  "/dashboard-admin": {
    page: DashboardAdmin,
    title: "Rimbawa 360 - Dashboard Admin",
  },
  "/dashboard-direktori": {
    page: DashboardDirektori,
    title: "Rimbawa 360 - Direktori",
  },
  "/dashboard-edukasi": {
    page: DashboardEdukasi,
    title: "Rimbawa 360 - Edukasi",
  },
  "/dashboard-spesies": {
    page: DashboardSpesies,
    title: "Rimbawa 360 - Spesies",
  },
  "/form-direktori": {
    page: formDirektori,
    title: "Rimbawa 360 - Form Direktori",
  },
  "/form-edukasi": { page: formEdukasi, title: "Rimbawa 360 - Form Edukasi" },
  "/form-spesies": { page: formSpesies, title: "Rimbawa 360 - Form Spesies" },
  "/edit-form-edukasi/:id": {
    page: editFormEdukasi,
    title: "Rimbawa 360 - Edit Form Edukasi",
  },
  "/edit-form-spesies/:id": {
    page: editFormSpesies,
    title: "Rimbawa 360 - Edit Form Spesies",
  },
  "/edit-form-direktori/:id": {
    page: editFormDirektori,
    title: "Rimbawa 360 - Edit Form Direktori",
  },
  "/logout": { page: Logout, title: "Rimbawa 360 - Logout" },
};

export default routes;
