import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/actions/board.action";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { utilService } from "../../services/basic/util.service";


export const FilterMenu = ({ isFilterModalOpen, board }) => {
    const dispatch = useDispatch()
    const [currFilter, setCurrFilter] = useState({ txt: '', labelIds: [], memberIds: [], })
    const [filteredMembers, setFilteredMembers] = useState(board.members);
    const [filteredLabels, setFilteredLabels] = useState(board.labels);

    useEffect(() => {
        onSetFilter()
    }, [currFilter])

    const onHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setCurrFilter((prevFilter) => ({ ...prevFilter, [field]: value }));

        const searchKeyword = value.toLowerCase();
        const newFilteredMembers = board.members.filter(
            (member) =>
                member.fullname.toLowerCase().includes(searchKeyword) ||
                (member.email && member.email.toLowerCase().includes(searchKeyword))
        );
        setFilteredMembers(newFilteredMembers);

        const newFilteredLabels = board.labels.filter(
            (label) =>
                label.title.toLowerCase().includes(searchKeyword)
        );
        setFilteredLabels(newFilteredLabels);
    };
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

    return (
        <section className="filter-container" style={{ display: isFilterModalOpen }}>
            <p className="sub-title">Keyword</p>
            <div className="search-container">
                <input type="search" name="txt" placeholder="Enter a keyword..." value={currFilter.txt} onChange={onHandleChange} />
            </div>
            <div className="scrollable-content">
                <p className="sub-info-title">Search cards, members, labels, and more.</p>
                <p className="sub-title">Members</p>
                <ul className="clean-list">
                    {filteredMembers && filteredMembers.map((member) => {
                        return (
                            <li key={member._id}>
                                <div className="user-preview-conainer" onClick={() => setMemberChecked(member._id)}>
                                    {!member.checked && < MdCheckBoxOutlineBlank className="check-box-blank" onClick={() => setMemberChecked(member.id)} />}
                                    {member.checked && < MdCheckBox className="check-box-full" onClick={() => setMemberChecked(member.id)} />}
                                    <div className="user-info">
                                        <div className="user-img-container ">
                                            {member?.imgUrl
                                                ? <img src={member.imgUrl} className="user-img" alt={utilService.getInitials(member.fullname)} />
                                                : <span className="user-initial">{utilService.getInitials(member.fullname)}</span>
                                            }
                                        </div>
                                        <span className="user-name">{member.fullname}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                {/* <hr /> */}
                <p className="sub-title"> Labels </p>
                <ul className="labels-filter-list clean-list">
                    {filteredLabels && filteredLabels.map((label) => {
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
            </div>
        </section >
    )
}