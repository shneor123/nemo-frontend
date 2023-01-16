import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { utilService } from '../../../services/basic/util.service'

import FastAverageColor from 'fast-average-color'
import { FaWindowMaximize } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import { DynamicModalCmp } from '../../general/dynamic-modal-cmp'

export function TaskDetailsCover({ task, boardId, groupId }) {
  const modalDetails = useRef()
  const modalTitle = useRef()
  const buttonRef = useRef()
  const [bgColor, setBgColor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)


  const fac = new FastAverageColor()

  useEffect(() => {
    if (task?.style?.imgUrl) loadBgColor()
    // eslint-disable-next-line
  }, [task])

  const loadBgColor = async () => {
    try {
      const color = await fac.getColorAsync(task.style.imgUrl)
      setBgColor(color.hexa)
    } catch (err) {
      setBgColor('white')
    }
  }

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }

  return (
    <header>
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          type={modalTitle}
          boardId={boardId}
          groupId={groupId}
          task={task}
          onCloseModal={onCloseModal}
        />
      )}
      {task?.style?.bgColor && (
        <div className="task-details-cover color" style={{ backgroundColor: `${task.style.bgColor}` }}>
          <button
            ref={buttonRef} onClick={(ev) => { onOpenModal(ev, 'Cover') }}>
            {' '}<FaWindowMaximize /> Cover{' '}
          </button>
        </div>
      )}
      {task?.style?.imgUrl && utilService.getExtension(task.style.imgUrl) === 'image' && (
        <div
          className="task-details-cover img point"
          onClick={onFullScreen}
          style={{ backgroundColor: bgColor, backgroundImage: `url('${task.style.imgUrl}')` }}
        >
          <button ref={buttonRef} onClick={(ev) => { onOpenModal(ev, 'Cover') }}>
            <FaWindowMaximize /> Cover
          </button>
        </div>
      )}
      {task?.style?.imgUrl && utilService.getExtension(task.style.imgUrl) === 'video' && (
        <div className="task-details-cover img">
          <video height="160" width="100%" muted controls>
            <source src={task.style.imgUrl} type="video/mp4"></source>
          </video>
          <button ref={buttonRef} onClick={(ev) => { onOpenModal(ev, 'Cover') }}>
            <FaWindowMaximize />Cover
          </button>
        </div>
      )}

      
      {/* {isFullScreen && (
        <div className="background-blur" onClick={onGoBack}>
          <button className="go-back-button" onClick={onGoBack}>
            <VscClose className="close-icon" style={{ color: '#ffffff' }} />
          </button>
          <div className="full-screen">
            <div
              className="task-details-cover img"
              style={{ backgroundImage: `url('${task.style.imgUrl}')`, height: '80vh' }}
            ></div>
          </div>
        </div>
      )}
      {isFullScreen && (
        <div className="background-blur">
          <button className="go-back-button" onClick={onGoBack}>
            <VscClose className="close-icon" style={{ color: '#ffffff' }} />
          </button>
          <div className="full-screen">
            <div
              className="task-details-cover img"
              style={{ backgroundImage: `url('${task.style.imgUrl}')`, height: '80vh' }}
            ></div>
          </div>
        </div>
      )} */}
    </header>
  )
}
