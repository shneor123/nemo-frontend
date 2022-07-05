import { GroupPreview } from "./group-preview.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { saveGroup, setGroups } from "../../../store/actions/group.action.js";
import { IoMdClose } from "react-icons/io";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { userService } from "../../../services/user.service.js";

export const GroupList = ({ groups, boardId, activities, labelOpenState }) => {
  const dispatch = useDispatch();
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [groupTitle, setGroupTitle] = useState({ title: "" });

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setGroupTitle({ [field]: value });
  };

  const onAddGroup = (ev = null) => {
    ev.preventDefault();
    var groupId
    if (!groupTitle.title) return;
    const activity = {
      boardTxt: 'added ' + groupTitle.title + ' to this board',
      byMember: userService.getLoggedinUser()
    }
    dispatch(saveGroup(groupTitle, boardId));
    setIsAddGroup(false);
    setGroupTitle({ title: "" });
  }



  return (
    <>
      <Droppable droppableId="all-groups" type="group" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="group-list-container flex"
          >
            {groups &&
              groups.map((group, index) => {
                return (
                  <GroupPreview
                    groupTitle={groupTitle}
                    key={group.id}
                    group={group}
                    boardId={boardId}
                    index={index}
                    labelOpenState={labelOpenState}
                    activities={activities}
                  />
                );
              })}

            {!isAddGroup && (
              <div className="group-preview-wrapper">
                <div
                  className="add-group flex"
                  onClick={() => setIsAddGroup(true)}
                >
                  <IoAdd /> <p>Add another list</p>
                </div>
              </div>
            )}
            {isAddGroup && (
              <div className="group-preview-wrapper">
                <div className="add-group-open">
                  <form onSubmit={(ev) => onAddGroup(ev)}>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter list title..."
                      value={groupTitle.title}
                      onChange={handleChange}
                    />
                    <div className="add-group-btn group-btn flex align-center">
                      <button className="save-group ">Add list</button>
                      <button
                        className="close-group group-btn"
                        onClick={() => setIsAddGroup(false)}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </>
  );
};
