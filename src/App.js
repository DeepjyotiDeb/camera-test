import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  // const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState(undefined);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          noiseSuppression: true,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment',
          frameRate: { ideal: 90 },
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const takePicture = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = 720;
    photo.height = 1280;
    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, photo.width, photo.height);
    const data = photo.toDataURL('image/png');
    console.log('cideo', data);
    setImage(data);
    // setHasPhoto(true);
  };

  return (
    <div className='App'>
      <div className='camera'>
        <video ref={videoRef} style={{ width: '100%', height: '50vh' }} />
        <button onClick={takePicture}>CLICK</button>
      </div>
      <div>
        <canvas ref={photoRef} style={{ display: 'none' }} />
        <img src={image} alt='not found' />
      </div>
    </div>
  );
}

export default App;
