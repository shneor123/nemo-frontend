import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineStar, AiFillStar, AiOutlineDashboard } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { Menu } from "./menu";
import { DynamicModalCmp } from "./dynamic-modal-cmp";
import { userService } from "../../services/user.service";
import { updateBoard } from "../../store/actions/board.action";
import { useNavigate } from "react-router";


export const ToolBar = ({ boardId, board, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null)
  const modalDetails = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dashboardRef = useRef()

  const user = userService.getLoggedinUser();

  const onOpenMenu = () => {
    setIsMenuOpen(true);
  };
  const onCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    modalDetails.current = ev.target.getBoundingClientRect();
    setModalTitle(txt)
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };


  const onToggleStar = () => {
    board.isStar = !board.isStar
    dispatch(updateBoard(board))
  }

  return (
    <div className="toolbar">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle}
          users={users}
          boardMembers={board.members}
          onCloseModal={onCloseModal}
          boardId={boardId}
          board={board}
        />
      )}

      <Menu
        isMenuOpen={isMenuOpen}
        onCloseMenu={onCloseMenu}
        board={board}
        activities={board.activities}
      />
      <div className="toolbar-left">
        <span className="board-toolbar-title-container">
          <h1 className="board-toolbar-title">{board.title}</h1>
        </span>
        <span onClick={onToggleStar} className="toolbar-btn star-btn">
          {board.isStar ? (
            <AiFillStar color={"gold"} size={17} />
          ) : (
            <AiOutlineStar size={17} />
          )}
        </span>
        <span className="toolbar-divider"></span>
        <div className="toolbar-members">
          {board.members.map((member) => {
            return (
              <div
                key={member._id}
                style={{
                  background: `url(${member?.imgUrl}) center center / cover `,
                }}
                className="user-avatar"
              ></div>
            );
          })}
        </div>
        <button onClick={(ev) => onOpenModal(ev, 'Invite to board')} className="share-btn">
          <BsPersonPlus /> Share
        </button>
      </div>
      <div className="toolbar-right">
        <div>
          <span className="toolbar-btn toolbar-menu-btn" ref={dashboardRef} onClick={() => navigate(`/board/${board._id}/dashboard`)}>
            <AiOutlineDashboard /> <span className="tool-title">Dashboard</span>
          </span>
          <span className="toolbar-divider"></span>

          <span onClick={(ev) => onOpenModal(ev, 'Filter')} className="toolbar-btn filter-btn">
            <MdOutlineFilterList /> <span className="tool-title">Filter</span>{" "}
          </span>
          <span className="toolbar-divider"></span>

          <span onClick={onOpenMenu} className="toolbar-btn toolbar-menu-btn">
            <FaEllipsisH /> <span className="tool-title">Show menu</span>
          </span>
        </div>
      </div>
    </div>
  );
};
