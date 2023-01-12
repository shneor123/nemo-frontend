export const AttachmentDelete = ({ onRemoveAttachment}) => {
  return (
    <section className="modal-delete">
      <div className="warning-msg">Deleting an attachment is permanent. There is no undo.</div>
      <button className="delete-btn" onClick={onRemoveAttachment}>
        Delete
      </button>
    </section>
  )
}
