import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router"
import { DragDropContext } from "react-beautiful-dnd"

import { Loader } from "../cmps/general/loader"
import { BoardHeader } from "../cmps/general/board-header"
import { GroupList } from "../cmps/board-app/group/group-list"
import { socketService } from "../services/basic/socket.service"

import { handleDrag, loadBoard, setFilter } from "../store/actions/board.action"
import { loadUsers } from "../store/actions/user.actions"

export const BoardApp = ({ isPreviewEnd, setPreviewEndTrue, setPreviewEndFalse }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const { board } = useSelector((storeState) => storeState.boardModule)
  const { boards } = useSelector((storeState) => storeState.boardModule)
  const { users } = useSelector((storeState) => storeState.userModule)
  let { filterBy } = useSelector((storeState) => storeState.boardModule);


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
    const { source, destination, type } = result
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
        <div className="board-app-wrapper"
          // style={{
          //   background: board.style.background ? `${board.style.background}` : `${board.style.bgImg
          //     ? `url(${board.style.bgImg})center center / cover` : `url(${board.style.imgUrl})center center / cover`}`,
          //   backgroundColor: `${board.style.backgroundColor}`
          // }}>

          style={{
            background: board.style && board.style.background
              ? `${board.style.background}`
              : `url(${board.style && (board.style.bgImg || board.style.imgUrl)}) center center / cover`,
            backgroundColor: board.style && `${board.style.backgroundColor}`
          }}>
          <div className="board-app">
            <BoardHeader boardId={boardId} board={board} users={users} boards={boards} />
            <GroupList filterBy={filterBy} boards={boards} board={board} labelOpenState={board.labelOpenState} groups={board.groups} boardId={boardId} labels={board.labels} boardMembers={board.members} isPreviewEnd={isPreviewEnd} setPreviewEndTrue={setPreviewEndTrue} setPreviewEndFalse={setPreviewEndFalse} />
            <Outlet />
          </div>
        </div>
      </DragDropContext>
    </>
  )
}