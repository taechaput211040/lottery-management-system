export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    config.headers["Authorization"] = `${store.getters["auth/token"]}`;
  });
  $axios.onError(error => {
    if (error.response.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      redirect("/login");
    }
  });
}
