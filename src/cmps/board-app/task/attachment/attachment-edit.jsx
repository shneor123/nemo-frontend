import { useState } from "react"

export function AttachmentEdit({ editTitle, attachmentTitle }) {
    const [title, setTitle] = useState(attachmentTitle)

    const onEditTitle = (ev) => {
        ev.preventDefault()
        editTitle(title)
    }
    
    return (
        <section className="attachment-edit">
            <div className="pop-over-content">
                <form>
                    <label htmlFor="linkInput" className="input-label">
                        Link name
                    </label>
                    <input
                        id="linkInput"
                        autoFocus
                        className="link-input"
                        type="text"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                    <input className="attach-btn"
                        type="submit"
                        value={"update"}
                        onClick={(ev) => onEditTitle(ev)}
                    />
                </form>
            </div>
        </section>
    )
}