import { FiPlus } from "react-icons/fi";
import { IconButton } from "@material-ui/core"


export const MembersDataCard = ({ task }) => {
  if (!task.members || !task.members.length) return;
  return (
    <div className="member-data">
      <h3 className="data-gutter-card-title">Members</h3>
      {task.members.map(member => {
        return <div key={member._id} style={{ background: `url(${member?.imgUrl}) center center / cover ` }} className="member-data-item user-avatar">
        </div>
      })}
      <div className="add-data-gutter-btn round-data-btn">
        <IconButton>
          <FiPlus />
        </IconButton>
      </div>
    </div>
  );
};
