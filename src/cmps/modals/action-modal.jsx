export const ActionModal = ({ setIsAddTask, onRemoveTodo, onRemoveGroup }) => {
    return (
        <>
            <section className="action-modal">
                <button onClick={onRemoveTodo ? onRemoveTodo : onRemoveGroup}>Remove This List...</button>
                <button onClick={setIsAddTask}><a>Add card...</a></button>
            </section >
        </>
    )
}