const Logout = {
  async render() {},

  async afterRender() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.hash = "#/";
  },
};

export default Logout;
