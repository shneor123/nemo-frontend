import { Component } from 'react'
import { uploadService } from '../services/cloudinary.service'

export class ImgUploader extends Component {
  state = {
    imgUrl: null,
    isUploading: false
  }
  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url } = await uploadService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url })
    this.props.onUploaded && this.props.onUploaded(secure_url)
  }
  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    console.log(imgUrl)
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }
  render() {
    const { imgUrl } = this.state

    return (
      <div className='upload-pc-container flex align-center'>
        {imgUrl && <img src={imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
        {console.log(<img src={imgUrl} />)}
        <label htmlFor="upload-file-pc">{this.uploadMsg}</label>
        <input type="file" onChange={this.uploadImg} accept="img/*" id="upload-file-pc" />
      </div>
    )
  }
}