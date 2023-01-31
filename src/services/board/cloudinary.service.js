import axios from "axios";

const uploadImg = async (ev) => {
  const CLOUD_NAME = 'dxjt9fumq' 
  const UPLOAD_PRESET = 'kvmv1bdp' 
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FORM_DATA = new FormData();
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  FORM_DATA.append('file', ev.target.files[0])
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data
  } catch (err) {
    throw err
  }
}
export const uploadService = {
  uploadImg,
  getStickers
}



async function getStickers(search) {
  try {
    const res = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=rQgzccXSxZdfKDNtwJwPomi48MFP2ye1&limit=10&q=${search}`, { method: 'GET' })
    return res.json()
  } catch (err) {
    console.log('cannot get stickers', err)
  }
}