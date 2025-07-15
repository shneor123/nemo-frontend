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
import { DynamicFilter } from "./haeder/dynamic-filter"
import { SearchModal } from "./haeder/search-modal"
import { ThemeModalContent } from "./theme-modal"

export const DynamicModalCmp = ({ isPreviewEnd }) => {
  const dispatch = useDispatch()
  const deleteMember = useRef()
  const buttonRef = useRef()
  const editLabel = useRef()
  const modalRef = useRef()
  const { modal } = useSelector(({ appModule }) => appModule)
  const [position, setPosition] = useState(null)

  useEffect(() => {
    window.addEventListener('resize', debouncedAdjust);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', debouncedAdjust);
      window.removeEventListener('keydown', handleKeyDown); // Remove the event listener on component unmount
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch(setModal(null));
    }
  };

  useEffect(() => {
    adjustPosition()
  }, [modal.element])

const adjustPosition = () => {
  if (!modal.element || !modalRef.current) return;

  const triggerRect = modal.element.getBoundingClientRect();
  const modalEl = modalRef.current;
  const margin = 10;

  let top = triggerRect.bottom + 8; // ברירת מחדל: למטה
  let left = triggerRect.left;

  // אם לא נכנס למטה — נפתח למעלה
  if (top + modalEl.offsetHeight + margin > window.innerHeight) {
    top = triggerRect.top - modalEl.offsetHeight - 8;
  }

  // אם לא נכנס שמאלה — נדחף פנימה
  if (left + modalEl.offsetWidth + margin > window.innerWidth) {
    left = window.innerWidth - modalEl.offsetWidth - margin;
  }

  // אם בכל זאת עבר שמאלה — תוקן
  if (left < margin) {
    left = margin;
  }

  setPosition({ top: Math.max(top, margin), left });
};


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
      cmp = <CoverModal {...modal.props} />
      break;
    case "Actions":
      cmp = <ActionModal {...modal.props} />
      break;
    case "Create Board":
      cmp = <AddBoard {...modal.props} />;
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
    case 'Dynamic filter':
      cmp = <DynamicFilter {...modal.props} />
      break
    case 'Search modal':
      cmp = <SearchModal {...modal.props} />
      break
    case 'Theme':
      cmp = <ThemeModalContent {...modal.props} />
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
            modal.category === 'Img modal' ? 'pos-img ' : modal.category === 'Members side' ? 'wide-side' :
              modal.category === 'Dynamic filter' ? 'wide-dynamic-filter' :
                modal.category === 'Search modal' ? 'hehigt-dynamic-search' :
                  modal.category === 'Theme' ? 'theme-modal' : ''}`}
      style={{ ...position, borderRadius: isPreviewEnd ? '10px' : '3px', }}
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