import { useDispatch } from "react-redux"
import { setModal } from "../../store/actions/app.actions"

export const ChecklistDelete = ({ onRemoveChecklist, checklist, isEditOpen }) => {
  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(setModal(null))
  }

  return (
    <section className="modal-delete">
      <p className="warning-msg">Deleting a checklist is permanent and there is no way to get it back.</p>
      <button className="delete-btn"
        onClick={() => {
          onRemoveChecklist(checklist.id);
          onCloseModal();
        }}
      >
        Delete checklist
      </button>
    </section>
  )
}
