

export const ActionModal = ({ onRemoveTodo, onRemoveGroup }) => {
    return (
        <section className="action-modal">
            <button onClick={onRemoveTodo ? onRemoveTodo : onRemoveGroup}>Archive List...</button>
        </section>
    )
}