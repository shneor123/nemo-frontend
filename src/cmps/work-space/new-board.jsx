
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/actions/app.actions";

export function CreateNewBoard() {
  const newRef = useRef()
  const dispatch = useDispatch()

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  return (
    <div className="new-board-container">
      <div className="new-board-preview" ref={newRef} onClick={(ev) => onOpenModal(ev, {
        element: newRef.current,
        category: 'Create Board',
        title: 'Create Board',
        props: { element: newRef.current },
      })}>
        <div className="board-details" >
          <span className="board-title">Create new board</span>
        </div>
      </div>
    </div>
  );
}