import { FiPlus } from "react-icons/fi";

export const LabelsDataCard = ({ task, labels }) => {
  if (!task.labelIds || !task.labelIds.length) return;
  const labelsToRender = labels.filter(label => task.labelIds.includes(label.id))
  return (
    <div className="label-data">
      <h3 className="data-gutter-card-title">Labels</h3>
      {labelsToRender.map((label) => {
          return (
            <div
              key={label.id}
              style={{ backgroundColor: label.color }}
              className="label-data-item"
            ></div>
          );
        }
      )}
      <div className="add-data-gutter-btn">
        <FiPlus />
      </div>
    </div>
  );
};
