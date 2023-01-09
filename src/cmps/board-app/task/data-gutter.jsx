import { MembersDataCard } from './members-data-card.jsx'
import { LabelsDataCard } from "./labels-data-card.jsx";
import { DateDataCard } from "./date-data-card.jsx"
export const DataGutter = ({ board, task, boardId, groupId, labels, boardMembers }) => {
  return (
    <div className="data-gutter">
      <div className="data-gutter-card">
        <MembersDataCard boardId={boardId} groupId={groupId} task={task} boardMembers={boardMembers} />
      </div>
      <div className="data-gutter-card">
        <LabelsDataCard board={board} task={task} boardId={boardId} groupId={groupId} labels={labels} />
      </div>
      <div className="data-gutter-card">
        <DateDataCard boardId={boardId} groupId={groupId} task={task} />
      </div>
    </div>
  );
};