import React, { useState } from 'react'
import QRCode from "react-qr-code";

export const ShareModal = ({ boardId }) => {
    const [isQRShown, setIsQRShown] = useState(false)

    return (
        <section className='share-card'>
            <h4>Link to this card <span class="members-icon"></span></h4>
            <input type="text" autofocus className="custom-input" value={`https://ca-nemo-react.onrender.com/${boardId}`} />
            <div class="share-btn-container">
                <a className="facebook" href="`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftrelloxx.herokuapp.com%2F%23%2Fboard%2F${this.$route.params.boardId}%2Fedit%2F${card.id}`" target="_blank"><i class="fab fa-facebook-f "></i>Facebook</a>
                <a className="whatsapp" href="`whatsapp://send?text=https%3A%2F%2Fhttps://ca-nemo-react.onrender.com%2F%23%2Fboard%2F${this.$route.params.boardId}%2Fedit%2F${card.id}`" target="_blank" data-action="share/whatsapp/share"><i class="fa fa-whatsapp " aria-hidden="true"></i>Whatsapp</a>
            </div>

            <a className="show-hide" onClick={() => { setIsQRShown(prevIsQRShown => !prevIsQRShown) }}>{!isQRShown ? 'Show QR Code' : 'Hide QR Code'}</a>
            {isQRShown && <section className="QRShown flex justify-center">
                <div className="qr-code">
                    <QRCode size={80} value={`https://ca-nemo-react.onrender.com/${boardId}`} />
                </div>
                <div className='flex-row'>
                    <p>Link anyone to this card by sending them this QR code:</p>
                    <button>Download</button>
                </div>
            </section>}
        </section>
    )
}
