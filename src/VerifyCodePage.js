import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyCodePage.css";

const VerifyCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(300);
  const [isLoading, setIsLoading] = useState(false);

  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const requestNewCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/rest/auth/sendVerificationCode?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("Nouveau code envoyé !");
        setTimer(300);
        setCode("");
      } else {
        setMessage(data.message || "Erreur lors de l'envoi du nouveau code.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (code.length !== 6) {
      setMessage("Le code doit contenir 6 chiffres");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/rest/auth/verifyCode?email=${encodeURIComponent(email)}&code=${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("Code vérifié avec succès !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(data.message || "Code incorrect. Veuillez réessayer.");
        setCode("");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h1 className="verify-title">Vérification du code</h1>
      <p className="verify-subtitle">
        Nous avons envoyé un code de confirmation à <strong>{email}</strong>
      </p>

      <p className="timer">
        Temps restant : {formatTime(timer)}
      </p>

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
        onClick={verifyCode}
        className="verify-button"
        disabled={code.length !== 6 || isLoading}
      >
        {isLoading ? "Vérification..." : "Vérifier"}
      </button>

      {timer === 0 && (
        <button
          onClick={requestNewCode}
          className="resend-button"
          disabled={isLoading}
        >
          {isLoading ? "Envoi en cours..." : "Renvoyer un nouveau code"}
        </button>
      )}

      {message && (
        <p className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default VerifyCodePage;