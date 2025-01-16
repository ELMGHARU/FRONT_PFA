import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  // États
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Références pour la vidéo et le canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Convertir un fichier en base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Traiter l'image via l'API OCR
  const handleProcessImage = async (imageBase64) => {
    try {
      setIsProcessing(true);
      const response = await axios.post(
        'https://zjuya3ty6i.execute-api.us-east-1.amazonaws.com/prod/extract',
        { image: imageBase64 }
      );
      setOcrResult(response.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors de l'extraction des données OCR");
      console.error('Erreur:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gérer l'upload de fichier
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    try {
      const imageBase64 = await fileToBase64(selectedFile);
      handleProcessImage(imageBase64);
    } catch (err) {
      setError('Erreur lors de la conversion du fichier en Base64');
      console.error('Erreur:', err);
    }
  };

  // Activer la caméra
  const startCamera = () => {
    setIsCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        setError("Erreur lors de l'activation de la caméra");
        console.error(err);
      });
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  // Capturer une image depuis la caméra
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL('image/jpeg').split(',')[1];
    handleProcessImage(imageBase64);
    stopCamera();
  };

  // Rendu du composant
  return (
    <div className="dashboard">
      <div className="container">
        {/* En-tête */}
        <div className="header">
          <h1>Extracteur OCR - CIN</h1>
          <p className="subtitle">Scanner et extraire les informations de CIN</p>
        </div>

        {/* Texte d'introduction ou instructions */}
        <div className="instructions">
          <p>
            Bienvenue dans l'extracteur OCR pour CIN. Vous pouvez soit uploader une image de votre CIN, soit utiliser votre caméra pour capturer une image. Une fois l'image traitée, les informations extraites seront affichées ci-dessous.
          </p>
        </div>

        {/* Section des boutons */}
        <div className="button-section">
          {/* Section d'upload de fichier */}
          <div className="upload-section">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="image/*"
              className="file-input"
              disabled={isProcessing}
            />
            <button
              className="upload-button"
              onClick={handleFileUpload}
              disabled={!selectedFile || isProcessing}
            >
              {isProcessing ? 'Traitement en cours...' : 'Extraire depuis un fichier'}
            </button>
          </div>

          {/* Section de la caméra */}
          <div className="camera-section">
            {!isCameraActive ? (
              <button className="camera-button" onClick={startCamera}>
                Activer la caméra
              </button>
            ) : (
              <div className="camera-controls">
                <video ref={videoRef} className="video-preview"></video>
                <button className="capture-button" onClick={captureImage}>
                  Capturer
                </button>
                <button className="stop-button" onClick={stopCamera}>
                  Arrêter la caméra
                </button>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>

        {/* Affichage des erreurs */}
        {error && <div className="error-message">{error}</div>}

        {/* Affichage des résultats OCR */}
        {ocrResult && (
          <div className="result-section">
            <h2>Résultat de l'analyse</h2>
            <pre className="text-content">{JSON.stringify(ocrResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;