import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadService } from '../../../../services/board/cloudinary.service'
import { userService } from '../../../../services/basic/user.service'
import { utilService } from '../../../../services/basic/util.service'
import { saveTask } from '../../../../store/actions/task.action'

export const AttachmentModal = ({ task, boardId, groupId }) => {
    const dispatch = useDispatch()
    const [attachData, setAttachData] = useState({ url: '' })

    const onAttachLink = ev => {
        ev.preventDefault()
        const { url } = attachData
        if (!url) return
        const isValid = utilService.isValidUrl(url)
        if (isValid) onAddFile(attachData)
    }

    const onUploadFile = async (ev) => {
        try {
            const url = await uploadService.uploadImg(ev)
            onAddFile({ url })
        } catch (err) {
            console.log('error in getting url From Cloudinary', err)
        }
    }

    const onAddFile = (attachData) => {
        const updateAttachment = attachData
        updateAttachment.id = utilService.makeId()
        updateAttachment.createdAt = Date.now()
        updateAttachment.name = 'Media Url'
        task.attachments.push(updateAttachment)
        const activity = {
            txt: 'add attachment in this card',
            boardTxt: `added ${updateAttachment.name} in this attachment card`,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
        }
        dispatch(saveTask(task, boardId, groupId, activity))
    }


    return (
        <section className='attachment-modal-content'>
            <div className='upload-pc-container flex align-center'>
                <label htmlFor='upload-file-pc'>Computer</label>
                <input type='file'
                    onChange={onUploadFile}
                    accept='img/*'
                    id='upload-file-pc'>
                </input>
            </div>

            <div className='upload-url-container '>
                <label htmlFor='upload-file-url'>Attach a link</label>
                <input type='text'
                    accept='img/*'
                    id='upload-file-url'
                    onChange={ev => setAttachData({ ...attachData, url: ev.target.value })}
                    placeholder='paste img link here'>
                </input>
            </div>
            <button className='primary-btn' onClick={ev => onAttachLink(ev)}>Attach</button>
        </section >
    )
}