export function set_hash(state, payload) {
  sessionStorage.clear();
  state.hash = payload.hash;
  sessionStorage.setItem("hash", payload.hash);
  sessionStorage.setItem("username", payload.username);
}
export function set_login(state, payload) {
  state.key = payload.token;
  sessionStorage.setItem("token", payload.token);
}
