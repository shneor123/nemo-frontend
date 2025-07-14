export const DateDelete = ({ onRemove }) => {
  return (
    <section className="modal-delete">
      <p className="warning-msg">Deleting a Date is permanent and there is no way to get it back.</p>
      <button className="delete-btn" onClick={onRemove}>
        Delete Date
      </button>
    </section>
  )
}