export function set_hash(state, payload) {
  localStorage.clear();
  state.hash = payload.hash;
  localStorage.setItem("hash", payload.hash);
  localStorage.setItem("username", payload.username);
}
export function set_login(state, payload) {
  state.key = payload.token;
  localStorage.setItem("token", payload.token);
}
