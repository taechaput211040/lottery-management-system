export default function() {
  return {
    lottotype:
      JSON.parse(sessionStorage.getItem("lottotype")) ||
      null ||
      JSON.parse(localStorage.getItem("lottotype"))
  };
}
