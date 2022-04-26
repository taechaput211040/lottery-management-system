export default function() {
  return {
    level:
      localStorage.getItem("level") ||
      sessionStorage.getItem("level") ||
      null,

    username:
      localStorage.getItem("username") ||
      sessionStorage.getItem("username") ||
      null,

    hash:
      sessionStorage.getItem("hash") || null || localStorage.getItem("hash"),
    key:
      sessionStorage.getItem("token") || null || localStorage.getItem("token"),
    role: sessionStorage.getItem("role") || null || localStorage.getItem("role")
  };
}
