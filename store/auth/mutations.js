export function set_hash(state, payload) {
  sessionStorage.clear();
  localStorage.clear();
  state.hash = payload.hash;
  sessionStorage.setItem("hash", payload.hash);
}
export function set_login(state, payload) {
  state.username = payload.username;
  state.role = payload.position;
  state.key = payload.token;
  state.level = payload.level;
  sessionStorage.setItem("level", payload.level);
  sessionStorage.setItem("username", payload.username);
  sessionStorage.setItem("role", payload.position);
  sessionStorage.setItem("token", payload.token);
}
