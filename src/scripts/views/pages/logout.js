import Toastr from "toastr";

const Logout = {
  async render() {},

  async afterRender() {
    try {
      const userRole = getUserRole();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect pengguna ke halaman yang sesuai berdasarkan role
      if (userRole === 1) {
        window.location.hash = "#/login";
      } else if (userRole === 2) {
        window.location.hash = "/";
      }

      // Tampilkan notifikasi sukses setelah logout
      Toastr.success("Anda telah berhasil logout", "Berhasil Logout").css(
        "margin-top",
        "90px"
      );
    } catch (error) {
      // Tangani error jika terjadi
      console.error("Terjadi kesalahan saat logout:", error);
      Toastr.error("Terjadi kesalahan saat logout", "Gagal Logout").css(
        "margin-top",
        "90px"
      );
    }
  },
};

function getUserRole() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role_id || null;
}

export default Logout;
