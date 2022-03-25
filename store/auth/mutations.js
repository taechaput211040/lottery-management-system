export function set_hash(state, payload) {
  sessionStorage.clear();
  state.hash = payload.hash;
  sessionStorage.setItem("hash", payload.hash);
  sessionStorage.setItem("username", payload.username);
}
export function set_login(state, payload) {
  state.role = payload.position;
  state.key = payload.token;
  sessionStorage.setItem("role", payload.position);
  sessionStorage.setItem("token", payload.token);
}
