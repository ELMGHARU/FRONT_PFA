import React from 'react';
import { Shield, Users, Database, Scan, FileText, Clock, Globe, Mail, Phone } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Données sécurisées selon les normes les plus strictes"
    },
    {
      icon: Scan,
      title: "Scan Intelligent",
      description: "Reconnaissance automatique des champs de la CIN"
    },
    {
      icon: FileText,
      title: "Extraction Précise",
      description: "Extraction automatique des données avec haute précision"
    },
    {
      icon: Clock,
      title: "Rapidité d'Exécution",
      description: "Traitement en quelques secondes"
    },
    {
      icon: Database,
      title: "Stockage Sécurisé",
      description: "Conservation cryptée des données"
    },
    {
      icon: Users,
      title: "Multi-Utilisateurs",
      description: "Gestion avancée des permissions"
    }
  ];

  const testimonials = [
    {
      name: "Mehdi Alami",
      role: "Directeur IT",
      comment: "Une solution remarquable pour l'extraction des CIN"
    },
    {
      name: "Fatima Bennis",
      role: "Responsable RH",
      comment: "Interface intuitive et résultats précis"
    },
    {
      name: "Karim Idrissi",
      role: "Chef de Projet",
      comment: "Excellent outil pour notre processus KYC"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Précision" },
    { number: "1M+", label: "Documents Traités" },
    { number: "24/7", label: "Support Client" }
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#testimonials">Témoignages</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-auth">
            <a href="/login">Connexion</a>
            <a href="/register" className="btn-primary">Inscription</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Extraction Intelligente de <span>Cartes d'Identité</span></h1>
            <p>Automatisez l'extraction des données des CIN marocaines avec une précision inégalée.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Démarrer</button>
              <button className="btn-secondary">En savoir plus</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Fonctionnalités</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>À propos de Notre Solution</h2>
              <p>Notre solution d'extraction de CIN utilise l'intelligence artificielle 
                pour automatiser la capture et le traitement des données d'identité, 
                tout en garantissant un niveau de sécurité maximal.</p>
              <ul className="about-features">
                <li>Reconnaissance automatique des champs</li>
                <li>Validation instantanée des données</li>
                <li>Conformité aux normes de sécurité</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2>Ce que disent nos clients</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-comment">{testimonial.comment}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contactez-nous</h2>
          <div className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Nom complet" />
                  <input type="email" placeholder="Email" />
                </div>
                <textarea placeholder="Message"></textarea>
                <button type="submit" className="btn-primary">Envoyer</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Téléphone</h4>
                  <p>+212 6667890</p>
                </div>
              </div>
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>hia@gmail.com</p>
                </div>
              </div>
              <div className="info-item">
                <Globe className="info-icon" />
                <div>
                  <h4>Adresse</h4>
                  <p>Marrakech, Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Footer */}
<footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>À propos</h3>
              <p>Notre solution d'extraction de CIN utilise l'IA pour automatiser la capture et le traitement des données d'identité.</p>
            </div>
            <div className="footer-section">
              <h3>Liens utiles</h3>
              <ul>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#about">À propos</a></li>
                <li><a href="#testimonials">Témoignages</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <ul>
                <li><Phone className="icon" /> +212 6667890</li>
                <li><Mail className="icon" /> hia@gmail.com</li>
                <li><Globe className="icon" /> Marrakech, Maroc</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 OCR Scanner. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;