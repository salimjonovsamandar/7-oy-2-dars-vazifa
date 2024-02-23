import React, { useRef } from 'react';
import styles from "./index.module.css";

function Index() {

    const videoRef = useRef(null);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => {
                console.error('Error accessing the camera:', err);
            });
    };

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

        // Olingan rasmni URL shaklida olish
        const imageUrl = canvas.toDataURL('image/png');

        // Rasmni kompyuterga saqlash
        saveImage(imageUrl);
    };

    const saveImage = (imageUrl) => {
        // Rasmni kompyuterga yuklash uchun a tag'ini yaratish
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'captured_image.png'; // Fayl nomini qo'yish
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className={styles.wrapper_video}>
                <video className={styles.video} ref={videoRef} autoPlay />
                <div className={styles.btn}>
                    <button className={styles.button} onClick={startCamera}>Camerani yoqing</button>
                    <button className={styles.button} onClick={captureImage}>Rasmga oling</button>
                </div>
            </div>
        </div>
    )
}

export default Index;
