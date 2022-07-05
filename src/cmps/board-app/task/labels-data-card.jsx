import { FiPlus } from "react-icons/fi";

export const LabelsDataCard = ({ task, labels }) => {
  // if there are no labelIds do not render anything
  if (!task.labelIds || !task.labelIds.length) return;
  return (
    <div className="label-data">
      <h3 className="data-gutter-card-title">Labels</h3>
      {labels.map((label) => {
        if (task.labelIds.includes(label.id)) {
          return (
            <div
              key={label.id}
              style={{ backgroundColor: label.color }}
              className="label-data-item"
            ></div>
          );
        }
      })}
      <div className="add-data-gutter-btn">
        <FiPlus />
      </div>
    </div>
  );
};
