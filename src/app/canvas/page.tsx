'use client'
import { useRef, useEffect, useState } from 'react';

const CanvasAudioRecorder = () => {
  const canvasRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    // Drawing simple animation on the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let x = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0099ff';
      ctx.fillRect(x, 50, 100, 100);
      x += 2;
      if (x > canvas.width) x = 0;
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  const startRecording = async () => {
    const canvas = canvasRef.current;
    const videoStream = canvas.captureStream(30); // Capture canvas video at 30fps

    // Capture audio from the microphone
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Combine the video and audio streams
    const combinedStream = new MediaStream([
      ...videoStream.getVideoTracks(),   // Canvas video stream
      ...audioStream.getAudioTracks(),   // Audio stream
    ]);

    // Setup the MediaRecorder to record the combined stream
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const recorder = new MediaRecorder(combinedStream, options);

    // Store video chunks as they become available
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  const downloadVideo = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'canvas-audio-recording.webm'; // WebM format
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <canvas ref={canvasRef} width="500" height="200" style={{ border: '1px solid black' }}></canvas>
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={downloadVideo}>Download Video</button>
      </div>
    </div>
  );
};

export default CanvasAudioRecorder;
