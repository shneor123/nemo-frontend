import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setFilter } from "../../store/actions/board.action";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { saveLabel } from "../../store/actions/label.action";


export const FilterMenu = ({ isFilterModalOpen, board }) => {
    const dispatch = useDispatch()
    const [currFilter, setCurrFilter] = useState({ txt: '', labelIds: [], memberIds: [] })
    // const { users } = useSelector((storeState) => storeState.userModule)

    // const [filterLabels, setFilterLabels] = useState(null)

    useEffect(() => {
        onSetFilter()
    }, [currFilter])



    const onHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setCurrFilter(() => ({ ...currFilter, [field]: value }))

    }

    const onSetFilter = () => {
        dispatch(setFilter(currFilter))
    }

    const setLabelChecked = (labelId) => {
        const [currLabel] = board.labels.filter(label => label.id === labelId)
        if (!currLabel.checked) currLabel.checked = true
        else currLabel.checked = false
        const labelIdx = board.labels.findIndex(label => labelId === label.id)
        board.labels[labelIdx] = currLabel
        const labels = board.labels
        const labelsToShow = labels.filter(label => label.checked)
        const labelIds = labelsToShow.map(label => label.id)
        setCurrFilter(() => ({ ...currFilter, labelIds }))
        dispatch(setFilter(currFilter))
    }

    const setMemberChecked = (memberId) => {
        const [currMember] = board.members.filter(member => member._id === memberId)
        if (!currMember.checked) currMember.checked = true
        else currMember.checked = false
        const memberIdx = board.members.findIndex((member => memberId === member._id))
        board.members[memberIdx] = currMember
        const membersToShow = board.members.filter(member => member.checked)
        const memberIds = membersToShow.map(member => member._id)
        setCurrFilter(() => ({ ...currFilter, members: memberIds }))
        dispatch(setFilter(currFilter))
    }

    board.labels[3].title = 'Important'

    return <section className="filter-container" style={{ display: isFilterModalOpen }}>
        <p className="sub-title">Keyword</p>
        <div className="search-container">
            <input
                type="search"
                name="txt"
                placeholder="Enter a keyword..."
                value={currFilter.txt}
                onChange={onHandleChange}
            />

        </div>
        <p className="sub-info-title">Search cards, members, labels, and more.</p>
        <div>
            <p className="sub-title">Members</p>
        </div>
        <ul className="clean-list">
            {board.members && board.members.map((member) => {
                return (
                    <li key={member._id}>
                        <div className="user-preview-conainer" onClick={() => setMemberChecked(member._id)}>
                            {!member.checked && < MdCheckBoxOutlineBlank className="check-box-blank" onClick={() => setMemberChecked(member._id)} />}
                            {member.checked && < MdCheckBox className="check-box-full" onClick={() => setMemberChecked(member._id)} />}
                            <div className="user-info">
                                <div className="user-img-container ">
                                    <img src={member.imgUrl} />
                                </div>
                                <span className="user-name">{member.fullname}</span>

                            </div>
                        </div>

                    </li>
                )
            })}
        </ul>
        <hr />
        <div>
            <p className="sub-title">
                Labels
            </p>
        </div>
        <ul className="labels-filter-list clean-list">
            {board.labels && board.labels.map((label) => {
                return (
                    <li key={label.id} className="labels-filter-preview">
                        <div className="label-filter-container" onClick={() => setLabelChecked(label.id)}>
                            {!label.checked && < MdCheckBoxOutlineBlank className="check-box-blank" />}
                            {label.checked && < MdCheckBox className="check-box-full" />}
                        </div>
                        <div className="label-preview-bg"
                            onClick={() => setLabelChecked(label.id)}
                            style={{ backgroundColor: label.color }}>
                            {label.title && (
                                <span className="label-txt">{label.title}</span>
                            )}
                        </div>
                    </li>
                )
            })}
        </ul>


    </section>
}
