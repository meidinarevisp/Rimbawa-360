const Logout = {
  async render() {},

  async afterRender() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.hash = "#/";
  },
};

export default Logout;
