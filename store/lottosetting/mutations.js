export function set_lottotype(state, payload) {
  state.lottotype = payload;
  localStorage.setItem("lottotype", JSON.stringify(payload));
  sessionStorage.setItem("lottotype", JSON.stringify(payload));
}
