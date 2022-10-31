import { GroupPreview } from "./group-preview.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { saveGroup } from "../../../store/actions/group.action.js";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "../../../hooks/useForm.js";

export const GroupList = ({ groups, boardId, activities, labelOpenState, labels, boardMembers }) => {
  const dispatch = useDispatch();
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [newGroup, handleChange, clearFields] = useForm({ title: "" });

  const onAddGroup = (ev = null) => {
    ev.preventDefault();
    if (!newGroup.title) return;
    // const activity = {
    //   boardTxt: 'added ' + groupTitle.title + ' to this board',
    //   byMember: userService.getLoggedinUser()
    // }
    dispatch(saveGroup(newGroup, boardId));
    setIsAddGroup(false);
    clearFields();
  };

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
                    key={group.id}
                    group={group}
                    boardId={boardId}
                    index={index}
                    labelOpenState={labelOpenState}
                    activities={activities}
                    labels={labels}
                    boardMembers={boardMembers}
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
                      value={newGroup.title}
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
