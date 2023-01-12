export const TaskDelete = ({ OnDelete }) => {

  return (
    <section className="modal-delete">
      <p className="warning-msg">
        All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.
      </p>
      <button className="delete-btn" onClick={OnDelete}>
        Delete
      </button>
    </section>
  )
}
