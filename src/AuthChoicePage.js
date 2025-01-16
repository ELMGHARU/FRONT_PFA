import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthChoicePage.css";

const AuthChoicePage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setError("");
  };

  const handleConfirm = async () => {
    // Validation
    if (!selectedMethod) {
      setError("Veuillez sélectionner une méthode d'authentification");
      return;
    }

    if (!email) {
      setError("Veuillez entrer une adresse e-mail");
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse e-mail valide");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (selectedMethod === "Gmail") {
        const response = await fetch(`http://localhost:8081/rest/auth/sendVerificationCode?email=${encodeURIComponent(email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          }
        });

        const data = await response.text();

        if (response.ok) {
          navigate(`/verify-code?email=${encodeURIComponent(email)}`);
        } else {
          setError(data.message || "Erreur lors de l'envoi du code");
        }
      } else if (selectedMethod === "QR") {
        const response = await fetch(`http://localhost:8081/rest/auth/generate-qr?email=${encodeURIComponent(email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          }
        });

        const data = await response.json();

        if (response.ok) {
          navigate(`/verify-qr?email=${encodeURIComponent(email)}&secretKey=${data.secretKey}`);
        } else {
          setError(data.error || "Erreur lors de la génération du QR code");
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Authentification à deux facteurs</h1>
      <p className="auth-subtitle">Choisissez votre méthode de vérification :</p>

      <div className="auth-methods">
        <div
          className={`auth-method ${selectedMethod === "Gmail" ? "selected" : ""}`}
          onClick={() => handleMethodSelect("Gmail")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            alt="Gmail"
            className="method-icon"
          />
          <span>Gmail</span>
        </div>

     
      </div>

      {(selectedMethod === "Gmail" || selectedMethod === "QR") && (
        <div className="email-input-section">
          <input
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={`email-input ${error && !email ? "error" : ""}`}
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {selectedMethod && (
        <button
          className="auth-confirm-button"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Envoi en cours..." : "Confirmer"}
        </button>
      )}
    </div>
  );
};

export default AuthChoicePage;