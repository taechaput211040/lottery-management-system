export default function() {
  return {
    username: sessionStorage.getItem("username") || null,
    hash: sessionStorage.getItem("hash") || null,
    key: sessionStorage.getItem("token") || null
  };
}
