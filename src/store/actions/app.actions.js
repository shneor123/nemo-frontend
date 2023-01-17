export const setModal = (modal) => {
  console.log("🚀 ~ file: app.actions.js:2 ~ setModal ~ modal", modal)
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MODAL', modal })
  }
}
