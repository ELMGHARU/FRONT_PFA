import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import "./VerifyQRPage.css";

const VerifyQRPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [secretKey, setSecretKey] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = new URLSearchParams(location.search).get("email");
  const storedSecretKey = new URLSearchParams(location.search).get("secretKey");

  useEffect(() => {
    if (storedSecretKey && email) {
      const otpauthUrl = `otpauth://totp/YourApp:${encodeURIComponent(email)}?secret=${storedSecretKey}&issuer=YourApp`;
      setSecretKey(otpauthUrl);
    } else if (!email) {
      setMessage("Erreur : Email manquant");
    } else if (!storedSecretKey) {
      setMessage("Erreur : Clé secrète manquante");
    } else {
      setMessage("Erreur : Informations manquantes pour générer le QR code");
    }
  }, [storedSecretKey, email]);

  const verifyQRCode = async () => {
    if (code.length !== 6) {
      setMessage("Le code doit contenir 6 chiffres");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/rest/auth/verify-qr-code?email=${encodeURIComponent(email)}&code=${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }
      });
  
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      if (response.ok) {
        setMessage(typeof data === 'string' ? data : "Code QR vérifié avec succès !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(typeof data === 'string' ? data : (data.error || "Code incorrect. Veuillez réessayer."));
        setCode("");
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setMessage(`Erreur de traitement de la réponse: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="verify-qr-container">
      <h1 className="verify-qr-title">Vérification du QR code</h1>
      <p className="verify-qr-subtitle">
        Scannez le QR code avec une application d'authentification (comme Google Authenticator) pour obtenir le code à 6 chiffres.
      </p>

      <div className="qr-code-container">
        {secretKey ? (
          <QRCodeSVG value={secretKey} size={200} />
        ) : (
          <p>Impossible de générer le QR code : {message}</p>
        )}
      </div>

      <input
        type="text"
        maxLength="6"
        placeholder="Entrez le code à 6 chiffres"
        value={code}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '').substr(0, 6);
          setCode(value);
          setMessage("");
        }}
        className={`code-input ${message && message.includes('incorrect') ? 'error' : ''}`}
      />

      <button
        onClick={verifyQRCode}
        className="verify-button"
        disabled={code.length !== 6 || isLoading || !secretKey}
      >
        {isLoading ? "Vérification..." : "Vérifier"}
      </button>

      {message && (
        <p className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default VerifyQRPage;