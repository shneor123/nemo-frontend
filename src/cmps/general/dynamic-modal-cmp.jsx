import { LabelModal } from "../modals/label-modal";
import { ChecklistModal } from "../modals/checklist-modal";
import { CoverModal } from "../modals/cover-modal.jsx";
import { ActionModal } from "../modals/action-modal.jsx";
import { TaskDateModal } from "../board-app/task/dates/task-date-modal";
import { AttachmentModal } from "../board-app/task/attachment/attachment-modal";
import { AddBoard } from "../work-space/add-board";
import { MemberModal } from "../modals/member-modal.jsx";
import { Menu } from "./menu";
import { InviteModal } from "../modals/invite-modal.jsx";
import { AiModal } from "../modals/ai-modal";
import { FilterMenu } from "../menu/filter-menu";
import { Dashboard } from "../dashboard/dashboard";
import { AccountActions } from "../modals/account-actions";
import { MemberActions } from "../modals/member-actions";
import { useEffect, useRef, useState } from "react";
import { MoreMembers } from "../modals/more-members";
import { ModalLabelCreate } from "../modals/modal-label-create";
import { ModalLabelChange } from "../modals/modal-label-change";
import { AttachmentDelete } from "../modals/attachment-delete";
import { ChecklistDelete } from "../modals/checklist-delete";
import { TaskDelete } from "../modals/task-delete";
import { DateDelete } from "../modals/date-delete";
import { ImgModal } from "../modals/img-modal";
import { CopyModal } from "../modals/copy-modal";
import { AttachmentEdit } from "../board-app/task/attachment/attachment-edit";
import { CreateModal } from "../modals/create-modal";


import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setModal } from "../../store/actions/app.actions";


import { IoIosArrowBack } from 'react-icons/io'
import { CgClose } from 'react-icons/cg'
import { utilService } from "../../services/basic/util.service";
import { ShareModal } from "../modals/share-modal";




export const DynamicModalCmp = () => {
  const { modal } = useSelector(({ appModule }) => appModule)
  const [position, setPosition] = useState(null)
  const dispatch = useDispatch()
  const deleteMember = useRef()
  const editLabel = useRef()
  const buttonRef = useRef()
  const modalRef = useRef()


  useEffect(() => {
    window.addEventListener('resize', debouncedAdjust)
    return () => window.removeEventListener('resize', debouncedAdjust)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    adjustPosition()
    // eslint-disable-next-line
  }, [modal.element])

  const adjustPosition = () => {
    const position = utilService.getPosition(modal.element)
    // Gives the modal some space from the element that triggered it, equal to 1/4 of that element height
    position.top += modal.element.offsetHeight * 1.25

    // Pushes the modal into the viewport when it does not have enough space to open up, + 10 px from the edge of the viewport.
    if (position.top + modalRef.current.offsetHeight >= window.innerHeight) {
      position.top = window.innerHeight - modalRef.current.offsetHeight - 10
    }
    if (position.left + modalRef.current.offsetWidth >= window.innerWidth) {
      position.left = window.innerWidth - modalRef.current.offsetWidth - 10
    }

    setPosition(position)
  }

  const changeEditLabel = (label) => {
    editLabel.current = label
  }
  const deleteMemberFromBoard = (id) => {
    deleteMember.current = id
  }

  const debouncedAdjust = debounce(adjustPosition, 200)

  var cmp
  switch (modal.category) {
    case "Members":
      cmp = <MemberModal {...modal.props} />
      // <MemberModal boardId={boardId}groupId={groupId}task={task}onCloseModal={onCloseModal}boardMembers={boardMembers}/>
      break;
    case "Labels":
      cmp = <LabelModal {...modal.props} changeEditLabel={changeEditLabel} />
      break;
    case "Checklist":
      cmp = <ChecklistModal {...modal.props} />
      break;
    case "Dates":
      cmp = <TaskDateModal {...modal.props} />
      break;
    case "Attachment":
      cmp =
        <AttachmentModal {...modal.props} />
      // <AttachmentModal boardId={boardId}groupId={groupId}task={task}attachments={task.attachments}/>

      break;
    case "Cover":
      cmp =
        <CoverModal {...modal.props} />
      // <CoverModal boardId={boardId} groupId={groupId} task={task} />

      break;
    case "Actions":
      cmp = <ActionModal {...modal.props} />
      // modalTypeToOpen = <ActionModal onRemoveTodo={onRemoveTodo} onRemoveGroup={onRemoveGroup} />;
      break;
    case "Create Board":
      cmp = <AddBoard{...modal.props} />;
      // modalTypeToOpen = <AddBoard onCloseModal={onCloseModal} />;
      break;
    case "Menu":
      cmp = <Menu {...modal.props} />;
      break;
    case "Invite to board":
      cmp = <InviteModal {...modal.props} deleteMemberFromBoard={deleteMemberFromBoard} />
      break;
    case "AI Clara":
      cmp =
        <AiModal {...modal.props} />
      // <AiModal onCloseModal={onCloseModal}boardId={boardId}groupId={groupId}task={task}groupTitle={groupTitle}/>

      break;
    case "Filter":
      cmp = <FilterMenu {...modal.props} />;
      // modalTypeToOpen = <FilterMenu board={board} />;
      break;
    case "dashboard":
      cmp = <Dashboard {...modal.props} />
      // modalTypeToOpen = <Dashboard task={task} />;
      break;
    case "account actions":
      cmp = <AccountActions {...modal.props} />
      // modalTypeToOpen = <AccountActions user={user} onCloseModal={onCloseModal} />)
      break;
    case "member actions":
      cmp =
        <MemberActions {...modal.props} />
      // <MemberActions task={task}board={board}onCloseModal={onCloseModal}member={member}/>
      break;
    case "more members":
      cmp =
        <MoreMembers {...modal.props} />
      // <MoreMembers board={board}task={task}onCloseModal={onCloseModal}element={element}moreMembers={moreMembers}member={member}/>
      break;
    case "Create label":
      cmp = <ModalLabelCreate {...modal.props} />
      break;
    case "Change label":
      cmp =
        <ModalLabelChange{...modal.props} editLabel={editLabel.current} />
      // <ModalLabelChange task={task}labels={labels}editLabel={editLabel.current}onCloseModal={onCloseModal}/>
      break;
    case 'attachment-delete':
      cmp =
        <AttachmentDelete {...modal.props} />
      // <AttachmentDelete onRemoveAttachment={onRemoveAttachment} />
      break
    case 'checklist-delete':
      cmp =
        <ChecklistDelete{...modal.props} />
      // <ChecklistDelete onRemoveChecklist={onRemoveChecklist} checklist={checklist} />
      break
    case 'task-delete':
      cmp =
        <TaskDelete {...modal.props} />
      // <TaskDelete OnDelete={OnDelete} />
      break
    case 'date-delete':
      cmp =
        <DateDelete {...modal.props} />
      // <DateDelete onRemove={onRemove} />
      break
    case 'Img modal':
      cmp =
        <ImgModal {...modal.props} />
      // <ImgModal member={member} />
      break
    case 'Copy card':
      cmp = <CopyModal {...modal.props} />
      break
    case 'Move card':
      cmp = <CopyModal {...modal.props} />
      // <CopyModal task={task} group={group} isMove={isMove} event={event} />
      break
    case 'Attachment edit':
      cmp =
        <AttachmentEdit {...modal.props} />
      // <AttachmentEdit editTitle={editTitle} attachmentTitle={attachmentTitle} />
      break
    case 'Create':
      cmp = <CreateModal{...modal.props} />
      break
    case 'Share':
      cmp = <ShareModal{...modal.props} />
      break
  }

  const onOpenModal = (ev, category) => {
    ev.stopPropagation()
    dispatch(
      setModal({
        element: modal.element,
        category,
        title: category,
        props: {
          ...modal.props,
        },
      })
    )
  }


  return (
    <div
      className={`dynamic-modal ${modal.category === 'task-filter' ? 'wide' : modal.category === 'dashboard' ? 'wide-dashboard' : ''}`}
      style={{ ...position }}
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {modal.category !== 'member-actions' && (
        <header>
          {modal.category === 'Create label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span>
                <IoIosArrowBack />
              </span>
            </button>
          )}
          {modal.category === 'Change label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span>
                <IoIosArrowBack />
              </span>
            </button>
          )}
          <div className="label">{modal.title ? modal.title : modal.category}</div>
          <button className="sidebar-icon-right" onClick={() => dispatch(setModal(null))}>
            <span>
              <CgClose />
            </span>
          </button>
        </header>
      )}
      <main className="main-modal">{cmp}</main>
    </div>
  )
}