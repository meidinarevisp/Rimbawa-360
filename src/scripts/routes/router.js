// router.js

const routes = [
  { path: "/", page: "home" },
  { path: "/tentang", page: "tentang" },
  { path: "/edukasi", page: "edukasi" },
  { path: "/spesies", page: "spesies" },
];

export default function Router() {
  const navigateTo = (path) => {
    history.pushState(null, null, path);
    router();
  };

  const router = () => {
    const currentPath = window.location.pathname;
    const route = routes.find((route) => route.path === currentPath);

    if (route) {
      document.getElementById(
        "app"
      ).innerHTML = `<${route.page}></${route.page}>`;
    } else {
      document.getElementById("app").innerHTML = "<not-found></not-found>";
    }
  };

  window.addEventListener("popstate", router);

  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
      if (event.target.matches("[data-link]")) {
        event.preventDefault();
        navigateTo(event.target.href);
      }
    });

    router();
  });
}
