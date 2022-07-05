import { useDispatch } from "react-redux";
import { toggleLabel } from "../../store/actions/label.action";
import { BsPencil } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

export const LabelModal = ({ boardId, groupId, task, labels }) => {
  const dispatch = useDispatch();

  const onToggleLabel = (labelId) => {
    dispatch(toggleLabel(boardId, groupId, task.id, labelId));
  };

  return (
    <div className="label-modal-container">
      <input
        placeholder="Search labels..."
        className="label-modal-main-input"
        type="text"
      />
      <h4 className="modal-small-title">Labels</h4>
      <div className="edit-modal-labels">
        <div>
          {labels.map((label) => {
            return (
              <div key={label.id} className="edit-label-container">
                <button className="edit-label-btn">
                  <BsPencil />
                </button>
                <div
                  style={{ backgroundColor: label.color }}
                  className="task-label"
                  onClick={() => onToggleLabel(label.id)}
                >
                  {label.title && (
                    <span className="edit-label-title">{label.title}</span>
                  )}
                  {task.labelIds.includes(label.id) && (
                    <span className="label-check-icon">
                      <FiCheck />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
