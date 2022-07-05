

export const ActionModal = ({ onRemoveTodo }) => {
    return <section className="action-modal">
        <button onClick={onRemoveTodo}>Delete </button>
    </section>
}