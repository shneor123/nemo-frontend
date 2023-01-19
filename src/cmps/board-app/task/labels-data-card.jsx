import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/actions/app.actions";
import { FiPlus } from "react-icons/fi";

export const LabelsDataCard = ({ board, task, labels, boardId, groupId }) => {
  const labelsRef = useRef()
  const dispatch = useDispatch()

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  if (!task.labelIds || !task.labelIds.length) return;
  const labelsToRender = labels.filter(label => task.labelIds.includes(label.id))
  return (
    <div className="label-data">
      <h3 className="data-gutter-card-title">Labels</h3>
      {labelsToRender.map((label) => {
        return (
          <div
            key={label.id}
            style={{ backgroundColor: label.color, color: "#ffff" }}
            className="label-data-item"
          >
            {label.title}
          </div>
        );
      }
      )}
      <div className="add-data-gutter-btn" ref={labelsRef}
        onClick={(ev) => onOpenModal(ev, {
          element: labelsRef.current,
          category: 'Labels',
          title: 'Labels',
          props: { element: labelsRef.current, boardId, groupId, task, board, labels },
        })}>
        <FiPlus />
      </div>
    </div>
  );
};
