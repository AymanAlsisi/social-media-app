import { useCallback } from 'react';
import { IoSend } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone'
import { IconBtn } from "../../components"

const ImageSelector = ({ form, setForm, close, username, sendMessage }) => {
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
        <div className='image-selector'>
            <div className="top">
                <p>Sending to "{username}"</p>
                <IconBtn
                    name={'close'}
                    size={25}
                    color={'white'}
                    action={() => {
                        setForm({
                            text: '',
                            img: ''
                        })
                        close()
                    }}
                />
            </div>
            {
                !form.img ?
                    (
                        <>
                            <div className="img-input" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <ion-icon name="image" />
                                <p className="drag">Drag an image here</p>
                                <h2>Or</h2>
                                <button>Choose from Gallary</button>
                                <p className="bottom">JPEG | PNG | SVG | HEIC</p>
                            </div>
                        </>
                    )
                    :
                    (
                        <div className="img-chosen">
                            <img src={form.img} alt="" />
                            <form className="form" onSubmit={e => sendMessage(e)}>
                                <input
                                    type="text"
                                    placeholder='Add a caption...'
                                    value={form.text}
                                    onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))}
                                />
                                <button type="submit"><IoSend size={25} color='white' cursor={'pointer'} /></button>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

export default ImageSelector