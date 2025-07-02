import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
// import imag2 from '../assets/imag2.jpg';
// import image from '../assets/image.png';
import { 
  Menu, 
  X, 
  Code, 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Send,
  ArrowRight,
  Globe,
  Server,
  ShoppingCart,
  Download,
  FileText
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Détection de la section active
      const sections = ['accueil', 'apropos', 'competences', 'projets', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation des barres de compétences
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach((bar: any) => {
              const width = bar.getAttribute('data-width');
              setTimeout(() => {
                bar.style.width = width + '%';
              }, 200);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Effacer les messages d'erreur lors de la saisie
    if (formStatus.type === 'error') {
      setFormStatus({ type: null, message: '' });
    }
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    
    if (name.trim().length < 2) {
      return 'Le nom doit contenir au moins 2 caractères';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Veuillez entrer une adresse email valide';
    }
    
    if (message.trim().length < 10) {
      return 'Le message doit contenir au moins 10 caractères';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setFormStatus({ type: 'error', message: validationError });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await emailjs.send(
        'service_u4odl8c', // Remplacez par votre Service ID
        'template_sws2tqm', // Remplacez par votre Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'MY05a8Pj6RvsXC3pU' // Remplacez par votre Public Key
      );

      if (result.status === 200) {
        setFormStatus({ 
          type: 'success', 
          message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.' 
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'HTML5', level: 90, color: 'bg-orange-500' },
    { name: 'CSS3', level: 60, color: 'bg-blue-500' },
    { name: 'JavaScript', level: 30, color: 'bg-yellow-500' },
    { name: 'PHP', level: 50, color: 'bg-purple-500' },
    { name: 'java', level: 30, color: 'bg-yellow-500' },
    { name: 'Microsoft Word', level: 85, color: 'bg-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-md'
      } border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meli Divine
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'apropos', label: 'À propos' },
                { id: 'competences', label: 'Compétences' },
                { id: 'projets', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-gray-700 hover:text-blue-600 transition-colors relative ${
                    activeSection === item.id ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'apropos', label: 'À propos' },
                { id: 'competences', label: 'Compétences' },
                { id: 'projets', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img 
                  src= {`${import.meta.env.BASE_URL}images/imag2.jpg`}
                  alt="Meli Fouomene Divine" 
                  className="w-44 h-44 rounded-full object-cover"
                  />
                  </div>
                </div>
                
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Meli Fouomene
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Divine
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Développeuse en Génie Logiciel spécialisée dans le développement logiciel
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <a 
                href="assets/CVMFD.pdf"
                download
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger mon CV
              </a> */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="apropos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">À propos de moi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Mon parcours</h3>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Passionnée par le développement web et les technologies numériques, je suis une développeuse en génie logiciel 
                spécialisée dans la création de solutions  innovantes .
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Avec des connaissances en HTML5, CSS3, JavaScript et PHP, je conçois et développe des plateformes 
                web, depuis l'interface utilisateur jusqu'à la gestion backend. Mon approche combine 
                rigueur technique et créativité pour créer des expériences utilisateur.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Je recherche actuellement des opportunités pour rejoindre une équipe dynamique où je pourrai contribuer 
                au développement de projets ambitieux, continuer à perfectionner mes compétences et participer 
                à l'innovation dans le domaine logiciel.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                  <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">E-commerce</span>
                </div>
                <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                  <Globe className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Développement Web</span>
                </div>
                <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                  <Server className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Backend PHP</span>
                </div>
                <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                  <FileText className="w-5 h-5 text-blue-800 mr-2" />
                  <span className="text-gray-700">Microsoft Word</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mes Compétences</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Voici un aperçu de mes compétences techniques et de mon niveau de maîtrise dans chaque technologie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`skill-progress h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                    data-width={skill.level}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies supplémentaires */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Technologies & Outils</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['MySQL', 'Responsive Design', 'Bootstrap'].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mon Projet E-commerce</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez mon projet de développement e-commerce qui démontre mes connaissances dans la création de solutions commerciales 
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                     src= {`${import.meta.env.BASE_URL}images/image.png`}
                    alt="Projet E-commerce"
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <a 
                        href="https://github.com/divineDEV-git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      <a 
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Plateforme E-commerce encours</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Site de commerce électronique avec gestion des produits, panier d'achat, système de paiement 
                    et interface d'administration. Cette plateforme offre une expérience utilisateur fluide et 
                    intuitive pour les clients, ainsi qu'un panneau d'administration complet pour la gestion 
                    des produits, commandes et statistiques.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Fonctionnalités clés :</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Catalogue produits',
                        'Panier d\'achat',
                        'Gestion commandes',
                        'Interface admin',
                        'Responsive design'
                      ].map((feature) => (
                        <span key={feature} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies utilisées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-moi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vous avez un projet e-commerce en tête ? N'hésitez pas à me contacter pour en discuter
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulaire */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-moi un message</h3>
                
                {formStatus.message && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Décrivez votre projet ..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Informations de contact */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href="mailto:m.f.divine2@gmail.com" className="text-gray-900 hover:text-blue-600 transition-colors">
                          m.f.divine2@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Linkedin className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">LinkedIn</p>
                        <a 
                          href="https://www.linkedin.com/in/divine2-undefined-7b249b35b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          Profil LinkedIn
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Github className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">GitHub</p>
                        <a 
                          href="https://github.com/divineDEV-git" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          github.com/divineDEV-git
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Meli Fouomene Divine</span>
          </div>
          <p className="text-gray-400 mb-4">
            Développeuse en Génie Logiciel 
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="mailto:m.f.divine2@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/divine2-undefined-7b249b35b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/divineDEV-git" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Meli Divine. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;