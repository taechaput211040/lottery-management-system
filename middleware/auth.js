export default function({ store, redirect }) {
  // If the user is not authenticated
  if (
    !store.state.auth.key &&
    !store.state.auth.username &&
    !store.state.auth.hash
  ) {
    return redirect("/login");
  }
}
