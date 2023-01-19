import React from 'react'

export const ShareModal = () => {
    return (
        <section className='share-card'>
            <h4>Link to this card </h4>
            <input type="text" autofocus className="custom-input" />
            <a href=""> Show QR Code</a>
            <div class="share-btn-container">
                <a className="facebook" href="`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftrelloxx.herokuapp.com%2F%23%2Fboard%2F${this.$route.params.boardId}%2Fedit%2F${card.id}`" target="_blank"><i class="fab fa-facebook-f "></i>Facebook</a>
                <a className="whatsapp" href="`whatsapp://send?text=https%3A%2F%2Ftrelloxx.herokuapp.com%2F%23%2Fboard%2F${this.$route.params.boardId}%2Fedit%2F${card.id}`" target="_blank" data-action="share/whatsapp/share"><i class="fa fa-whatsapp " aria-hidden="true"></i>Whatsapp</a>
            </div>
        </section>
    )
}
