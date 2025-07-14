import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function ShareModal({ board, boardId, groupId, task }) {
    const [isQRShown, setIsQRShown] = useState(false);
    const qrRef = useRef(null);

    if (!board || !task) {
        return <p>No task to share</p>;
    }

    const boardUrl = `https://nemo-backend-xcav.onrender.com/board/${boardId}/${groupId}/${task.id}`;

    return (
        <section className='share-card'>
            <h4>Link to this card <span className="members-icon"></span></h4>
            <input type="text" autoFocus className="custom-input" value={boardUrl} readOnly />
            <div className="share-btn-container">
                <a
                    className="facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(boardUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                    className="whatsapp"
                    href={`https://wa.me/?text=${encodeURIComponent(boardUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fa fa-whatsapp" aria-hidden="true"></i> Whatsapp
                </a>
            </div>
            <a
                className="show-hide"
                onClick={() => setIsQRShown(!isQRShown)}
            >
                {isQRShown ? "Hide QR Code" : "Show QR Code"}
            </a>
            {isQRShown && (
                <div className="QRShown qr-code flex justify-center" ref={qrRef}>
                    <QRCodeSVG size={120} value={boardUrl} />
                </div>
            )}
        </section>
    );
}
