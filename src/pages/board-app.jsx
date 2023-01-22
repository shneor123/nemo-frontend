import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router"
import { Loader } from "../cmps/general/loader"
import { ToolBar } from "../cmps/general/toolbar"
import { GroupList } from "../cmps/board-app/group/group-list"
import { handleDrag, loadBoard } from "../store/actions/board.action"
import { loadUsers } from "../store/actions/user.actions"
import { socketService } from "../services/basic/socket.service"
import { DragDropContext } from "react-beautiful-dnd"

export const BoardApp = () => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const { board } = useSelector((storeState) => storeState.boardModule)
  const { users } = useSelector((storeState) => storeState.userModule)

  useEffect(() => {
    setSocket()
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
    dispatch(loadUsers())
  }

  const onLoadBoard = () => {
    dispatch(loadBoard(boardId))
  }

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


  if (!board) return <Loader />
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{ background: board.style.background ? `${board.style.background}` : `url(${board.style.bgImg})center center / cover`, backgroundColor: `${board.style.backgroundColor}` }}
          className="board-app-wrapper">
          <Outlet />
          <div className="board-app">
            <ToolBar boardId={boardId} board={board} users={users} />
            {board && (
              <GroupList
                labelOpenState={board.labelOpenState}
                groups={board.groups}
                boardId={boardId}
                labels={board.labels}
                boardMembers={board.members}
              />
            )}
          </div>

        </div>
      </DragDropContext>
    </>
  );
};
