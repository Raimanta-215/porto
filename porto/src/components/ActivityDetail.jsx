import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Clock } from 'lucide-react';
import { activitiesData } from '../data/activitiesData'; // Import des données

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // On récupère les infos de l'activité correspondante
  const data = activitiesData[id];

  // Si l'activité n'existe pas, on affiche une erreur propre
  if (!data) return <div className="text-white p-20">ERREUR_404: ACTIVITÉ_NON_TROUVÉE</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono p-4 md:p-12">
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-emerald-500 hover:text-white mb-10 transition-all"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        BACK_TO_SYSTEM_LOGS
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Colonne de gauche : Infos rapides */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-emerald-500/20 p-6 rounded-lg">
              <p className="text-[10px] text-emerald-500 font-black mb-4 tracking-[0.3em]">METADATA</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-500">STATUS:</span>
                  <span className="text-xs text-emerald-400 font-bold">{data.status}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-500">DURATION:</span>
                  <span className="text-xs text-white font-bold">{data.heures}.00 HRS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">ID:</span>
                  <span className="text-xs text-white">0x00{id}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg text-center group cursor-pointer hover:border-emerald-500/40 transition">
              <FileText className="mx-auto mb-3 text-slate-500 group-hover:text-emerald-500" />
              <p className="text-[10px] font-bold text-slate-500">PREUVE_VERIFIABLE</p>
              <p className="text-xs text-emerald-500 underline mt-1">{data.preuve}</p>
            </div>
          </div>

          {/* Colonne de droite : L'analyse réflexive (Le gros du travail) */}
          <div className="md:col-span-2 bg-slate-900/30 border border-slate-800 p-8 md:p-12 rounded-xl">
            <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
              {data.titre}
            </h1>
            <div className="h-1 w-20 bg-emerald-500 mb-10"></div>

            <div className="space-y-12">
              <section>
                <h2 className="text-emerald-500 font-bold text-sm mb-4 flex items-center gap-2">
                  <Shield size={16} />_CADRE_ET_CONTEXTE
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">{data.contexte}</p>
              </section>

              <section>
                <h2 className="text-emerald-500 font-bold text-sm mb-4 flex items-center gap-2">
                  <Shield size={16} />_SAVOIRS_ACQUIS
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">{data.apprentissage}</p>
              </section>

              <section className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-emerald-500/20"></div>
                <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-emerald-500" />_ANALYSE_REFLEXIVE_APPROFONDIE
                </h2>
                <div className="text-slate-300 leading-relaxed text-lg space-y-4">
                  {/* C'est ici que tu devras écrire beaucoup (min 1 page) */}
                  <p>{data.reflexion}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;