import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IoTimeOutline } from 'react-icons/io5'
import { GrCheckboxSelected } from 'react-icons/gr'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { saveTask } from '../../../../store/actions/task.action'

export function DueDatePreview({ task, boardId, groupId, dueDate }) {
  const [isHover, setHover] = useState(false)
  const dispatch = useDispatch()

  const onToggleDone = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    task.isDone = !task.isDone
    dispatch(saveTask(boardId, groupId, task, task.id))
  }

  const getDueStatus = () => {
    if (task.isDone) return { className: 'complete' };
    if (Date.now() > task.dueDate) {
      return { className: 'over-due' };
    } else {
      const timeDiff = dueDate - Date.now();
      if (timeDiff < 90000000) return { className: 'due-soon' };
    }
  }

  if (!getDueStatus()) return <></>
  return (
    <div className={`due-date flex align-center ${getDueStatus().className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='badge-icon'>
        {!isHover ? <IoTimeOutline />
          : task.isDone ? <GrCheckboxSelected onClick={(ev) => onToggleDone(ev)} />
            : <MdCheckBoxOutlineBlank onClick={(ev) => onToggleDone(ev)} />}
      </div>
      <span className='due-date-str'>{new Date(dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}
      </span>
    </div>
  )
}