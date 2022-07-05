import {MembersDataCard} from './members-data-card.jsx'
import { LabelsDataCard } from "./labels-data-card.jsx";
import {DateDataCard} from "./date-data-card.jsx"
export const DataGutter = ({ task, boardId, groupId, labels }) => {
  return (
    <div className="data-gutter">
      <div className="data-gutter-card">
        <MembersDataCard task={task} />
      </div>
      <div className="data-gutter-card">
        <LabelsDataCard task={task} labels={labels} />
      </div>
      <div className="data-gutter-card">
        <DateDataCard boardId={boardId} groupId={groupId} task={task} />
      </div>
    </div>
  );
};