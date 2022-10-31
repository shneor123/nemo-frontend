


// export const DynamicForm = ({ height, placeholder, mainbuttons, sidebuttons }) => {
//     // always stretches to 100% width
//     // has open and unopened state
//     // unopened height and opened height can be different
//     // mainbuttons under textarea from props
//     // hover style

//     {!isAddGroup && <div className="add-group flex" onClick={() => setIsAddGroup(true)} > <IoAdd /> <p >Add another list</p></div>}
//     {isAddGroup && <div className="add-group-open">
//         <form onSubmit={onAddGroup}>
//             <input type="text" name="title" placeholder="Enter list title..." value={groupTitle.title} onChange={handleChange} />
//             <div className='add-group-btn group-btn flex align-center'> <button className='save-group '>Add list</button>
//                 <button className='close-group group-btn' onClick={() => setIsAddGroup(false)}><IoMdClose /></button></div>
//         </form>
//     </div>}
//     return <textarea name="" id="" cols="30" rows="10"></textarea>
// }