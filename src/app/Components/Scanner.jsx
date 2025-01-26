"use client";
import React, { useState, useRef } from "react";

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const openCameraButton = useRef(null);
  const stopButton = useRef(null);
  const streamRef = useRef(null);

  const startScanning = () => {
    const scanInterval = setInterval(() => {
      if (scanning) {
        const canvasContext = canvasElement.current.getContext("2d");

        if (
          videoElement.current.videoWidth === 0 ||
          videoElement.current.videoHeight === 0
        ) {
          return;
        }

        canvasElement.current.width = videoElement.current.videoWidth;
        canvasElement.current.height = videoElement.current.videoHeight;

        canvasContext.drawImage(
          videoElement.current,
          0,
          0,
          canvasElement.current.width,
          canvasElement.current.height
        );

        const imageData = canvasContext.getImageData(
          0,
          0,
          canvasElement.current.width,
          canvasElement.current.height
        );
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          const qrData = qrCode.data;
          setQrResult(qrData);

          if (qrData.startsWith("http")) {
            window.location.href = qrData;
          } else {
            alert("Invalid QR Code: No URL found.");
          }

          clearInterval(scanInterval);
          stopCamera();
        }
      }
    }, 500);
  };

  const stopScanning = () => {
    setScanning(false);
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      videoElement.current.srcObject = null;
    }
    stopButton.current.style.display = "none";
    openCameraButton.current.style.display = "inline-block";
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      videoElement.current.srcObject = stream;
      setScanning(true);

      openCameraButton.current.style.display = "none";
      stopButton.current.style.display = "inline-block";

      videoElement.current.onloadedmetadata = () => {
        startScanning();
      };
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert(
        "Unable to access the camera. Please check your browser permissions."
      );
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial",
        backgroundColor: "#f7f7f7",
        padding: "20px",
      }}
    >
      <div
        id="camera-container"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          aspectRatio: "1",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          backgroundColor: "#fff",
          margin: "0 auto",
        }}
      >
        <video
          ref={videoElement}
          id="video"
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
        <div
          id="overlay"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "80%",
            border: "3px solid #111827",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            borderRadius: "10px",
          }}
        ></div>
      </div>
      <canvas
        ref={canvasElement}
        id="canvas"
        style={{ display: "none" }}
      ></canvas>
      <button
        ref={openCameraButton}
        onClick={openCamera}
        id="openCameraButton"
        style={{
          backgroundColor: "#111827",
          color: "white",
          fontSize: "16px",
          padding: "12px 25px",
          margin: "10px",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-rounded">Scan</span>
      </button>
      <button
        ref={stopButton}
        onClick={stopScanning}
        style={{
          display: "none",
          backgroundColor: "#111827",
          color: "white",
          fontSize: "16px",
          padding: "12px 25px",
          borderRadius: "30px",
        }}
      >
        Stop Camera
      </button>

      <div id="result">
        <div
          id="qrResult"
          style={{
            marginTop: "20px",
            fontSize: "18px",
            color: "#333",
            textAlign: "center",
          }}
        >
          {qrResult && (
            <div
              style={{
                fontWeight: "bold",
                color: "#60241A",
                marginTop: "10px",
              }}
            >
              {qrResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
