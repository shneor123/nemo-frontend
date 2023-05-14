import { useRef, useState } from "react"
import QRCode from "react-qr-code"
import { saveAs } from 'file-saver'

export function ShareModal() {
    const [isQRShown, setIsQRShown] = useState()
    const qrRef = useRef(null)

    const downloadFile = () => {
        const url = 'blob:https://web.whatsapp.com/6377ab36-01a2-49d2-b3f9-abf31d5991ea'
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                saveAs(blob, 'img.jpg')
            })
    }


    return (
        <section className='share-card'>
            <h4>Link to this card <span class="members-icon"></span></h4>
            <input type="text" autofocus className="custom-input" value={`https://ca-nemo-react.onrender.com/`} />
            <div className="share-btn-container">
                <a className="facebook" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fca-nemo-react.onrender.com%2F%23%2Fboard%2F%2Fedit`} target="_blank">
                    <i className="fab fa-facebook-f"></i>Facebook
                </a>
                <a className="whatsapp" href={``} target="_blank" data-action="share/whatsapp/share">
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>Whatsapp
                </a>
            </div>
            <a className="show-hide" onClick={() => { setIsQRShown(prevIsQRShown => !prevIsQRShown) }}>{!isQRShown ? 'Show QR Code' : 'Hide QR Code'}</a>
            {isQRShown && <section className="QRShown flex justify-center" ref={qrRef}>
                <div className="qr-code">
                    <QRCode size={80} value={`https://ca-nemo-react.onrender.com/`} />
                </div>
                <div className='flex-row'>
                    <p>Link anyone to this card by sending them this QR code:</p>
                    {/* <button onClick={downloadFile}>Download</button> */}
                </div>
            </section>}
        </section>
    )
}
