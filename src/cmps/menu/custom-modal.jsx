import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../services/basic/util.service'
import { boardService } from '../../services/board/board.service'
import { uploadService } from '../../services/board/cloudinary.service'
import { updateBoard } from '../../store/actions/board.action'

export const CustomModal = ({ board, isOpenCustom }) => {
  const [newTask, setNewTask] = useState(board)
  const dispatch = useDispatch()

  const onPickAttachments = (attach) => {
    const updatedTask = { ...newTask }
    const style = { imgUrl: attach }
    updatedTask.style = style
    setNewTask(updatedTask)
    dispatch(updateBoard(updatedTask, board))
  }

  const fileURL = ''

  const addAttachment = async (ev) => {
    ev.preventDefault()

    if (!ev.target.files) ev.target.files = [fileURL]
    if (!newTask.attachments) newTask.attachments = []
    let attachment = boardService.getEmptyBoardAttachment()
    const updatedTask = { ...newTask }

    try {
      const res = await uploadService.uploadImg(ev)
      attachment.fileName = res.original_filename
      attachment.url = res.secure_url
      updatedTask.attachments.unshift(attachment)
      dispatch(updateBoard(updatedTask, board))
      setNewTask(updatedTask)
    } catch (err) {
      attachment.fileName = fileURL
      attachment.url = fileURL
      updatedTask.attachments.unshift(attachment)
      setNewTask(updatedTask)
      dispatch(updateBoard(updatedTask, board))
    }
  }


  return (
    <section style={{ display: isOpenCustom }}>
      <div className="attachments-section">
        <h3 className="label">Attachments</h3>
        <div className="box-container">
          {newTask?.attachments &&
            !!newTask?.attachments.length &&
            newTask?.attachments.map(
              (attachment) =>
                utilService.isImage(attachment.url) && (
                  <button className="box-full" key={attachment.id}
                    onClick={() => onPickAttachments(attachment.url)}
                    style={{ backgroundImage: `url('${attachment.url}')` }}
                  ></button>
                )
            )}
        </div>

        <label className="custom-file-upload cover-btn">
          Upload image background
          <input type="file" onInput={addAttachment} />
        </label>
      </div>
    </section>
  )
}
