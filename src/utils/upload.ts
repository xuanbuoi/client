export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ml_default2')
  formData.append('cloud_name', 'dq5qtk4nn')
  const res = await fetch('https://api.cloudinary.com/v1_1/dq5qtk4nn/upload', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  return { public_id: data.public_id, url: data.secure_url }
}
