import React from 'react'
import { utilService } from '../../services/basic/util.service'

export const ImgModal = ({ member }) => {
  return (
    <>
      {member && member.imgUrl ? < img src={member.imgUrl} alt={utilService.getInitials(member.fullname)} className="member-img-modal" />
        : <div>  {member.fullname}</div>
      }
    </>
  )
}
