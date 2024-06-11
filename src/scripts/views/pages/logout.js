const Logout = {
  async render() {},

  async afterRender() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.hash = "#/";
  },
};

export default Logout;
