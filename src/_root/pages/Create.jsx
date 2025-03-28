import { useState, useCallback } from "react"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import { useDropzone } from 'react-dropzone'
import axios from "axios"
import "../CSS/Create.css"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { getCurrentTime } from "../../assets/time/time"
import { IconBtn, Spiner } from "../../components"

const Create = () => {
  const { token } = useStateProvider()
  const [form, setForm] = useState({
    caption: '',
    img: ''
  })

  const [isPosting, setIsPosting] = useState(false)

  const navigate = useNavigate()

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const createPost = async (e) => {
    e.preventDefault()
    try {
      setIsPosting(true)
      const res = await axios.post(`${protocols.http}/post`, JSON.stringify({
        img: form.img,
        caption: form.caption,
        time: getCurrentTime(),
        post_type: 'post'
      }), config)
      setIsPosting(false)
      navigate('/')
      return toast.success("Posted successfully!")
    } catch (error) {
      setIsPosting(false)
      return toast.error("Couldn't make new post!")

    } finally {
      setForm({
        caption: "",
        img: ""
      })
    }
  }

  const encodeImageFileAsURL = file => {
    var reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, img: reader.result }))
    }
    reader.readAsDataURL(file);
  }

  const onDrop = useCallback(acceptedFiles => {
    encodeImageFileAsURL(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      {
        !isPosting ? (
          <div className="create">
            <form onSubmit={(e) => createPost(e)} className="form">
              <textarea value={form.caption} onChange={(e) => setForm(prev => ({ ...prev, caption: e.target.value }))} placeholder="Caption"></textarea>
              {
                !form.img ?
                  (
                    <>
                      <div className="img-input" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <ion-icon name="image" />
                        <p className="drag">Drag an image here</p>
                        <h2>Or</h2>
                        <button type="button">Choose from Gallary</button>
                        <p className="bottom">JPEG | PNG | SVG | HEIC</p>
                      </div>
                    </>
                  )
                  :
                  (
                    <div className="img-chosen">
                      <IconBtn
                        name={'close'}
                        color={'#FFF'}
                        size={'20px'}
                        action={() => setForm(prev => ({ ...prev, img: '' }))}
                        style={{ alignSelf: 'flex-end' }}
                      />
                      <img src={form.img} alt="" />
                    </div>
                  )
              }
              <button
                type="submit"
                className="submit-btn"
                disabled={form.img === ""}
              >
                Submit Post
              </button>
            </form>
          </div>
        )
          :
          <Spiner h={'70vh'} />
      }
    </>
  )
}

export default Create