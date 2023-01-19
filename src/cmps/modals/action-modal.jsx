export const ActionModal = ({ onRemoveTodo, onRemoveGroup }) => {
    return (
        <>
            <section className="action-modal">
                <button onClick={onRemoveTodo ? onRemoveTodo : onRemoveGroup}>Remove This List...</button>
                <button >Add a card</button>
            </section>
        </>
    )
}