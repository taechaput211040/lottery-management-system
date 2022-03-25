export default function() {
  return {
    username:
      sessionStorage.getItem("username") ||
      null ||
      localStorage.getItem("username"),
    hash:
      sessionStorage.getItem("hash") || null || localStorage.getItem("hash"),
    key:
      sessionStorage.getItem("token") || null || localStorage.getItem("token"),
    role: sessionStorage.getItem("role") || null || localStorage.getItem("role")
  };
}
