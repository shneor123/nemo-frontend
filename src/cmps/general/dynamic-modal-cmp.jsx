import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { debounce } from "lodash"
import { setModal } from "../../store/actions/app.actions"
import { IoIosArrowBack } from 'react-icons/io'
import { CgClose } from 'react-icons/cg'
import { utilService } from "../../services/basic/util.service"

import { AttachmentModal } from "../board-app/task/attachment/attachment-modal"
import { TaskDateModal } from "../board-app/task/dates/task-date-modal"
import { ModalLabelChange } from "../modals/modal-label-change"
import { ModalLabelCreate } from "../modals/modal-label-create"
import { InviteModal } from "../modals/members/invite-modal"
import { MemberModal } from "../modals/members/member-modal"
import { ChecklistModal } from "../modals/checklist-modal"
import { ActionModal } from "../modals/action-modal"
import { ShareModal } from "../modals/share-modal"
import { LabelModal } from "../modals/label-modal"
import { CoverModal } from "../modals/cover-modal"
import { CopyModal } from "../modals/copy-modal"
import { ImgModal } from "../modals/img-modal"
import { AiModal } from "../modals/ai-modal"
import { AddBoard } from "../work-space/add-board"
import { Menu } from "./menu"
import { FilterMenu } from "../menu/filter-menu"
import { Dashboard } from "../dashboard/dashboard"
import { AccountActions } from "../modals/members/account-actions"
import { MemberActions } from "../modals/members/member-actions"
import { MoreMembers } from "../modals/members/more-members"
import { AttachmentDelete } from "../modals/attachment-delete"
import { ChecklistDelete } from "../modals/checklist-delete"
import { TaskDelete } from "../modals/task-delete"
import { DateDelete } from "../modals/date-delete"
import { AttachmentEdit } from "../board-app/task/attachment/attachment-edit"
import { MembersSide } from "../modals/members/members-side"

export const DynamicModalCmp = () => {
  const dispatch = useDispatch()
  const deleteMember = useRef()
  const buttonRef = useRef()
  const editLabel = useRef()
  const modalRef = useRef()
  const { modal } = useSelector(({ appModule }) => appModule)
  const [position, setPosition] = useState(null)


  useEffect(() => {
    window.addEventListener('resize', debouncedAdjust)
    return () => window.removeEventListener('resize', debouncedAdjust)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    adjustPosition()
  }, [modal.element])

  const adjustPosition = () => {
    const position = utilService.getPosition(modal.element)
    // Gives the modal some space from the element that triggered it, equal to 1/4 of that element height
    position.top += modal.element.offsetHeight * 1.25

    // Pushes the modal into the viewport when it does not have enough space to open up, + 10 px from the edge of the viewport.
    if (position.top + modalRef.current.offsetHeight >= window.innerHeight) {
      position.top = window.innerHeight - modalRef.current.offsetHeight - 100
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
      cmp = <AttachmentModal {...modal.props} />
      break;
    case "Cover":
      cmp =
        <CoverModal {...modal.props} />
      break;
    case "Actions":
      cmp = <ActionModal {...modal.props} />
      break;
    case "Create Board":
      cmp = <AddBoard{...modal.props} />;
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
      break;
    case "Filter":
      cmp = <FilterMenu {...modal.props} />;
      break;
    case "dashboard":
      cmp = <Dashboard {...modal.props} />
      break;
    case "account actions":
      cmp = <AccountActions {...modal.props} />
      break;
    case "member actions":
      cmp = <MemberActions {...modal.props} />
      break;
    case "more members":
      cmp =
        <MoreMembers {...modal.props} />
      break;
    case "Create label":
      cmp = <ModalLabelCreate {...modal.props} />
      break;
    case "Change label":
      cmp =
        <ModalLabelChange{...modal.props} editLabel={editLabel.current} />
      break;
    case 'attachment-delete':
      cmp =
        <AttachmentDelete {...modal.props} />
      break
    case 'checklist-delete':
      cmp =
        <ChecklistDelete{...modal.props} />
      break
    case 'task-delete':
      cmp =
        <TaskDelete {...modal.props} />
      break
    case 'date-delete':
      cmp =
        <DateDelete {...modal.props} />
      break
    case 'Img modal':
      cmp =
        <ImgModal {...modal.props} />
      break
    case 'Copy card':
      cmp = <CopyModal {...modal.props} />
      break
    case 'Move card':
      cmp = <CopyModal {...modal.props} />
      break
    case 'Attachment edit':
      cmp = <AttachmentEdit {...modal.props} />
      break
    case 'Members side':
      cmp = <MembersSide {...modal.props} />
      break
    case 'Share':
      cmp = <ShareModal {...modal.props} />
      break
  }

  const onOpenModal = (ev, category) => {
    ev.stopPropagation()
    dispatch(
      setModal({ element: modal.element, category, title: category, props: { ...modal.props, }, })
    )
  }

  return (
    <div
      className={`dynamic-modal ${modal.category === 'Filter' ? 'wide' :
        modal.category === 'dashboard' ? 'wide-dashboard' :
          modal.category === 'Dates' ? 'wide-filter' :
            modal.category === 'Img modal' ? 'pos-img ' : modal.category === 'Members side' ? 'wide-side' : ''}`}
      style={{ ...position }}
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {modal.category !== 'member actions' && (
        <header>
          {modal.category === 'Create label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span><IoIosArrowBack /></span>
            </button>
          )}
          {modal.category === 'Change label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span><IoIosArrowBack /></span>
            </button>
          )}
          <div className="label">{modal.title ? modal.title : modal.category}</div>
          <button className="sidebar-icon-right" onClick={() => dispatch(setModal(null))}>
            <span><CgClose /></span>
          </button>
        </header>
      )}
      <main className="main-modal">{cmp}</main>
    </div>
  )
}