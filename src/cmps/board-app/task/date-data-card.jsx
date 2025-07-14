import { DatePreview } from "../../../cmps/board-app/task/dates/date-preview";

export const DateDataCard = ({ group, boardId, groupId, task }) => {
  return (
    task.dueDate && <section className="type-container">
      <h4 className="data-gutter-card-title">Due date</h4>
      <div className="items-container flex align-center">
        <DatePreview group={group} task={task} boardId={boardId} groupId={groupId} />
      </div>
    </section>
  );
};
