import axios from "axios";

const uploadImg = async (ev) => {
  const CLOUD_NAME = 'dxjt9fumq' 
  const UPLOAD_PRESET = 'kvmv1bdp' 
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FORM_DATA = new FormData();
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  FORM_DATA.append('file', ev.target.files[0])
  
//   try {
//       const res = await fetch(UPLOAD_URL, {
//           method: 'POST',
//           body: FORM_DATA
//       })
//       const { url } = await res.json()
//       return url
//   } catch (err) {
//       console.error('ERROR!', err)
//   }
// }

  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data
  } catch (err) {
    throw err
  }
}
export const uploadService = {
  uploadImg
}

