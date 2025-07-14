import { useDispatch } from "react-redux"
import { setModal } from "../../store/actions/app.actions"

export const AttachmentDelete = ({ onRemoveAttachment }) => {

  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(setModal(null))
  }


  return (
    <section className="modal-delete">
      <div className="warning-msg">Deleting an attachment is permanent. There is no undo.</div>
      <button className="delete-btn"
        onClick={() => {
          onRemoveAttachment();
          onCloseModal();
        }}
      >
        Delete
      </button>
    </section>
  )
}
