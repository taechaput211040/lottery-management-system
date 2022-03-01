export default function() {
  return {
    username: localStorage.getItem("username") || null,
    hash: localStorage.getItem("hash") || null,
    key: localStorage.getItem("token") || null
  };
}
