
export const ChecklistProgressBar = ({ checklist }) => {

//     const getCurrPresent = () => {
//         const checkedTodos = checklist.todos.filter(todo => todo.isDone)
//         const curPresent = (checkedTodos.length / checklist.todos.length) * 100

//         return Math.floor(curPresent) + '%'
//     }

//     return (
//         <section className="checklist-progress">
//             <div className="checklist-progress-bar">
//                 <div className={`checklist-progress-bar-current ${getCurrPresent() === '100%' ? 'done' : ''} `}
//                     style={{ width: getCurrPresent() === '100%' ? ' 93.8%' : getCurrPresent() }}>
//                 </div>
//             </div>
//             <span className="checklist-progress-percentage">{getCurrPresent() === 'NaN%' ? '0%' : getCurrPresent()}</span>
//         </section>
//     )
// }


const getTodosProgressData = () => {
    const { todos } = checklist
    const doneTodosAmount = todos.filter(todo => todo.isDone).length;
    const progress = (!doneTodosAmount) ? 0 : doneTodosAmount / todos.length * 100;
    
    return Math.floor(progress);
}



return (
    <section className="checklist-progress">
        <div className="checklist-progress-bar">
            <div className={`checklist-progress-bar-current
             ${(getTodosProgressData() === 100) ? 'done' : ''}`}
                style={{ width: getTodosProgressData() + '%' }} >
            </div>
        </div>
        <span className="checklist-progress-percentage">
            {getTodosProgressData() + '%'}
        </span>
    </section>
)
}





