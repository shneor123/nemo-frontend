import { useState } from "react"
import { useDispatch } from "react-redux"
import { utilService } from "../../services/basic/util.service"
import { uploadService } from "../../services/board/cloudinary.service"
import { taskService } from "../../services/board/task.service"
import { saveTask } from "../../store/actions/task.action"


export const CoverModal = ({ boardId, groupId, task }) => {
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState('uncover')
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState(task)
    let fileURL = ''

    const coverColors = [
        { id: 'c1', color: '#61bd4f' },
        { id: 'c2', color: '#f2d600' },
        { id: 'c3', color: '#ff9f1a' },
        { id: 'c4', color: '#ed5a46' },
        { id: 'c5', color: '#c377e0' },
        { id: 'c6', color: '#5ba4cf' },
        { id: 'c7', color: '#00c2e0' },
        { id: 'c8', color: '#51e898' },
        { id: 'c9', color: '#ff78cb' },
        { id: 'c10', color: '#344563' }
    ]

    const chooseColor = (color) => {
        setSelectedColor(color)
        saveColor(color.color)
    }

    const chooseSize = (size) => {
        setSelectedSize(size)
        saveColor(selectedColor.color, size)
    }

    const saveColor = (color, size) => {
        let taskAfterCopy = JSON.parse(JSON.stringify(task));
        taskAfterCopy.style.backgroundColor = color
        if (!size) taskAfterCopy.coverSize = selectedSize
        else taskAfterCopy.coverSize = size
        dispatch(saveTask(taskAfterCopy, boardId, groupId))
    }

    // const onPickAttachments = (attach) => {
    //     const updatedTask = { ...newTask }
    //     const style = { imgUrl: attach, coverSize: selectedSize }
    //     updatedTask.style = style
    //     dispatch(saveTask(updatedTask, boardId, groupId))
    //     setNewTask(updatedTask)
    // }

    // const addAttachment = async (ev) => {
    //     console.log(ev.target.files);
    //     ev.preventDefault()

    //     if (!ev.target.files) ev.target.files = [fileURL]
    //     if (!newTask.attachments) newTask.attachments = []
    //     let attachment = taskService.getEmptyAttachment()
    //     const updatedTask = { ...newTask }

    //     try {
    //         const res = await uploadService.uploadImg(ev)
    //         attachment.fileName = res.original_filename
    //         attachment.url = res.secure_url
    //         updatedTask.attachments.unshift(attachment)
    //         dispatch(saveTask(updatedTask, boardId, groupId))
    //         setNewTask(updatedTask)
    //     } catch (err) {
    //         attachment.fileName = fileURL
    //         attachment.url = fileURL
    //         updatedTask.attachments.unshift(attachment)
    //         dispatch(saveTask(updatedTask, boardId, groupId))
    //         setNewTask(updatedTask)
    //     }
    // }

    return (
        <section className="cover-modal-container">
            <div className="cover-size">
                <h4>Size</h4>
                <div className="size-choice-container">
                    <div className={`uncover-choice choice ${(selectedSize !== 'uncover') ? '' : 'selected'}`}
                        onClick={() => chooseSize('uncover')}>
                        <div className="upper-background" style={{ backgroundColor: selectedColor?.color }}>
                        </div>
                        <div className="lower-background">
                            <div className="two-text-stripes-module">
                                <div className="upper-stripe" style={{ backgroundColor: selectedColor?.color }}></div>
                                <div className="lower-stripe" style={{ backgroundColor: selectedColor?.color }}></div>
                                <div className="lower-dummy-btns-area">
                                    <div className="flex">
                                        <div className="simple-dummy-short" style={{ backgroundColor: selectedColor?.color }}> </div>
                                        <div className="simple-dummy-short" style={{ backgroundColor: selectedColor?.color }}> </div>
                                    </div>
                                    <div className="dummy-circle" style={{ backgroundColor: selectedColor?.color }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`uncover-choice choice ${(selectedSize !== 'uncover') ? '' : 'selected'}`}
                        onClick={() => chooseSize('cover')}
                        style={{ backgroundColor: selectedColor?.color }} >
                        <div className="two-text-stripes-module">
                            <div className="upper-stripe"></div>
                            <div className="lower-stripe" ></div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="wide-cover-btn" onClick={() => chooseColor('')}>Remove cover</button>
            <h4>colors</h4>
            <div className="color-selection">
                {coverColors.map((color) => {
                    return (
                        <div key={color.id} className="choose-color-container">
                            <div
                                style={{ backgroundColor: color.color }}
                                className={`color-view ${(color.id === selectedColor?.id) ? 'selected' : ''}`}
                                onClick={() => chooseColor(color)}
                            >
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <div className={`cover-choice choice ${selectedSize === 'cover' ? 'selected' : ''}`}
             onClick={() => chooseSize('uncover')}
            >
                <div className="attachments-section">
                    <h3 className="label">Attachments</h3>
                    <div className="box-container">
                        {newTask?.attachments &&
                            !!newTask?.attachments.length &&
                            newTask?.attachments.map(
                                (attachment) =>
                                    utilService.isValidImg(attachment.url) && (
                                        <button
                                            key={attachment.id}
                                            onClick={() => onPickAttachments(attachment.url)}
                                            className="box-full"
                                            style={{ backgroundImage: `url(${attachment.url})` }}
                                        ></button>
                                    )
                            )}
                    </div>

                    <label htmlFor="file-upload" className="custom-file-upload cover-btn">
                        <i className=""></i> Upload a cover image
                    </label>
                    <input id="file-upload" type="file" onInput={addAttachment} />
                </div>
            </div> */}
        </section>
    )
}