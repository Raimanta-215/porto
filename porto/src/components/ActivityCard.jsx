import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// J'ai ajouté les icônes manquantes ici pour éviter les erreurs

import { 
  BookOpen, Target, Award, Code, User, 
  ChevronRight, Lock, Zap, Cloud, Cpu 
} from 'lucide-react';

const CyberPortfolio = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar - Effet Flou (Glassmorphism) */}
      <nav className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          IT Portfolio 2026
        </h1>
        <div className="space-x-6 hidden md:flex text-sm font-medium">
          <a href="#projet" className="hover:text-blue-600 transition">Projet Pro</a>
          <a href="#activites" className="hover:text-blue-600 transition">Activités</a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Mon CV
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Section Projet Professionnel */}
        <motion.section 
          id="projet"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-32 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs bg-blue-50 px-3 py-1 rounded-full">
              Bachelor IT
            </span>
            <h2 className="text-4xl font-extrabold mt-4 mb-6 tracking-tight">
              Développeur & <span className="text-slate-400">Visionnaire.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Étudiant à l'EPHEC, je construis mon parcours autour de [Ton Projet ici]. 
              Mon objectif est de maîtriser les architectures modernes tout en gardant une approche centrée sur l'utilisateur.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 border-b-4 border-b-green-400">
                <p className="text-slate-900 font-bold mb-1">Forces</p>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-tighter">React • Analyse • UI/UX</p>
              </div>
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 border-b-4 border-b-red-400">
                <p className="text-slate-900 font-bold mb-1">Défis</p>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-tighter">Docker • Cybersécurité</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] blur opacity-20 animate-pulse"></div>
             <div className="relative bg-white h-80 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center border border-slate-100">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-slate-400" />
                </div>
                <p className="font-bold text-slate-800">Cliquer pour voir mon parcours</p>
                <p className="text-sm text-slate-400">Format Vidéo / Audio disponible</p>
             </div>
          </div>
        </motion.section>

        {/* Section Thèmes (Les 6 thèmes requis par l'EPHEC) */}
        <section id="activites" className="mb-20">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-black mb-4 text-slate-800 tracking-tight">
              Activités d'Acquisition
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 1, titre: "Développement Web", icone: <Code size={24} />, heures: 10, color: "text-blue-600" },
              { id: 2, titre: "Cyber-sécurité", icone: <Lock size={24} />, heures: 8, color: "text-red-500" },
              { id: 3, titre: "Soft Skills & Job Days", icone: <User size={24} />, heures: 6, color: "text-amber-500" },
              { id: 4, titre: "Hackathons", icone: <Zap size={24} />, heures: 10, color: "text-purple-600" },
              { id: 5, titre: "Cloud Computing", icone: <Cloud size={24} />, heures: 5, color: "text-sky-500" },
              { id: 6, titre: "Intelligence Artificielle", icone: <Cpu size={24} />, heures: 7, color: "text-emerald-500" },
            ].map((theme) => (
              <motion.div 
                key={theme.id}
                onClick={() => navigate(`/activite/${theme.id}`)}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200/40 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 ${theme.color} group-hover:scale-110 transition-transform duration-300`}>
                  {theme.icone}
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                  {theme.titre}
                </h3>
                
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Analyse de mon expérience lors de [Activité] et comment cela répond à mon besoin de développement.
                </p>

                <div className="flex justify-between items-center pt-5 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Temps réel</span>
                    <span className="text-sm font-black text-slate-700">{theme.heures} Heures</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      
      {/* Footer simple pour les crédits */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 - Portfolio Technologies de l’Informatique - EPHEC</p>
      </footer>
    </div>
  );
};

export default CyberPortfolio;