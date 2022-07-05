import { GroupList } from "../cmps/board-app/group/group-list.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { handleDrag, loadBoard } from "../store/actions/board.action";
import { useEffect } from "react";
import { ToolBar } from "../cmps/general/toolbar.jsx";
import { loadUsers } from "../store/actions/user.actions.js";
import { socketService } from "../services/socket.service.js";
import { DragDropContext } from "react-beautiful-dnd";

export const BoardApp = () => {
  const { boardId } = useParams();
  const { board } = useSelector((storeState) => storeState.boardModule);
  const { users } = useSelector((storeState) => storeState.userModule);
 
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket()
    socketService.emit('join board', boardId)
    onLoadBoard();
    onLoadUsers();
    socketService.off('update-board')
    socketService.on('update-board', async (boardFromSocket) => {
      onLoadBoard(boardFromSocket._id)
    })
  }, []);


  const setSocket = () => {
    try {
      socketService.emit('join-board', boardId);
    } catch (err) {
      console.log('Cannot load board', err)
    }
  }

  const onLoadUsers = () => {
    dispatch(loadUsers());
  };

  const onLoadBoard = () => {
    dispatch(loadBoard(boardId));
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    dispatch(
      handleDrag(
        board,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        type
      )
    );
  };

  if (!board) return <p>.</p>;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={board.style} className="board-app-wrapper">
          <Outlet />
          <div className="board-app">
            <ToolBar boardId={boardId} board={board} users={users} />
            {board && (
              <GroupList
                labelOpenState={board.labelOpenState}
                groups={board.groups}
                boardId={boardId}
              />
            )}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};
