export const ChecklistDelete = ({ onRemoveChecklist, checklist, isEditOpen }) => {
  return (
    <section className="modal-delete">
      <p className="warning-msg">Deleting a checklist is permanent and there is no way to get it back.</p>
      <button className="delete-btn" onClick={() => onRemoveChecklist(checklist.id)}>
        Delete checklist
      </button>
    </section>
  )
}
