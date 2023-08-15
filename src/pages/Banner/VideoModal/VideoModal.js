import React,{useState} from 'react'
// import 'node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video'

const VideoModal = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="SkpfASZ9TGI" onClose={() => setOpen(false)} />

      <button className=" animation-button"  onClick={()=> setOpen(true)}> <i class="far fa-play-circle"> </i> </button>
    </React.Fragment>
  )
}

export default VideoModal