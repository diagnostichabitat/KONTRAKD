import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Target, Briefcase, AlertTriangle, Sparkles, MapPin, Loader2, Zap } from "lucide-react";
import { getGenAI } from "@/lib/gemini";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

interface RecommendationResult {
  diagnosis: string;
  recommendation: "Artisan" | "Domination";
  focusBullets: string[];
  irresistibleOfferTitle: string;
}

export function OfferRecommender() {
  const [step, setStep] = React.useState<Step>(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selections, setSelections] = React.useState({
    goal: "",
    business: "",
    problem: "",
    hasSite: "",
    runsAds: "",
    city: ""
  });
  const [result, setResult] = React.useState<RecommendationResult | null>(null);

  const nextStep = () => setStep((s) => (s + 1) as Step);

  const handleAudit = async () => {
    setIsLoading(true);
    setStep(5);
    try {
      const genAI = getGenAI();
      
      const prompt = `You are a world-class strategic consultant for high-end renovation businesses. 
      You are performing an "Irresistible Offer Audit" for a professional in ${selections.city}.
      
      USER DATA:
      - Objective: ${selections.goal}
      - Business: ${selections.business}
      - Core Struggle: ${selections.problem}
      - Digital Presence: ${selections.hasSite === 'yes' ? 'Has a website' : 'No website'}
      - Traffic: ${selections.runsAds === 'yes' ? 'Runs paid ads' : 'No ads / Organic only'}
      
      OFFER CONTEXT:
      - "Pack Artisan 597€" is for professionals needing to close deals on the spot and justify higher margins with visualization.
      - "Système de Domination 1997€" is for companies aiming for total market control, city-wide exclusivity, and high-volume lead flow. 
      
      TASK:
      1. Use Search to understand the specific renovation market competition in ${selections.city}.
      2. Provide a brutal, 1-line diagnosis of their situation in French. Highlight the gap between their ${selections.business} skill and their digital conversion.
      3. Recommend ONE of the two options.
      4. Create a personalized, high-value "Irresistible Package" name in French (e.g., "Le Protocole de Signature Inévitable - ${selections.city}").
      5. List 3 high-impact outcomes in French.
      
      Important: Return ONLY a valid JSON object.
      {
        "diagnosis": "...",
        "recommendation": "Artisan" | "Domination",
        "focusBullets": ["...", "...", "..."],
        "irresistibleOfferTitle": "..."
      }`;

      const response = await (genAI.models as any).generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        tools: [{ googleSearch: {} }],
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text);
      setResult(data);
    } catch (error) {
      console.error("Audit error:", error);
      setResult({
        diagnosis: "Votre infrastructure actuelle ne vous permet pas d'encaisser la valeur réelle de votre savoir-faire.",
        recommendation: selections.goal === "leads" || selections.runsAds === "no" ? "Domination" : "Artisan",
        focusBullets: ["Capture de leads premium automatisée", "Destruction de la concurrence locale", "Verrouillage territorial"],
        irresistibleOfferTitle: `Système de Capture & Domination - ${selections.city || 'Secteur Local'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-accent border-accent/30 tracking-widest px-4 py-1 text-[8px] md:text-xs">Pour quel métier ?</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full text-center">
              {[
                { id: "Parquet", label: "Parquet", image: "https://i.postimg.cc/MGBCbQrb/new-white-oak-select-1.webp" },
                { id: "Cuisines", label: "Cuisines", image: "https://i.postimg.cc/FRgwwQvd/hbx050123napiers-005-preview-642dcd73da1ca.avif" },
                { id: "Bains", label: "Bains", image: "https://i.postimg.cc/02NhX3Bj/Qube-Wall-Mounted-Pebble-Grey-Gloss.jpg" },
                { id: "Peinture", label: "Peinture", image: "https://i.postimg.cc/y8M5dNYd/183805968-s.jpg" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelections({ ...selections, business: opt.id }); nextStep(); }}
                  className="relative group h-32 md:h-auto md:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 transition-all active:scale-[0.98] hover:border-accent/50"
                >
                  <img src={opt.image} alt={opt.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent md:bg-ink/40 md:group-hover:bg-ink/20 transition-colors" />
                  
                  <div className="relative h-full flex items-center justify-between md:justify-center p-8 md:p-6 md:flex-col gap-4">
                    <span className="font-display font-black text-2xl md:text-xs uppercase tracking-widest md:tracking-[0.3em] text-white/90 group-hover:text-white drop-shadow-lg">{opt.label}</span>
                    <div className="p-3 bg-white/10 rounded-full md:hidden">
                       <ArrowRight className="text-accent" size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-red-500 border-red-500/30 tracking-widest px-4 py-1">DETECTION DE FRICTION</Badge>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none tracking-tighter">
                Quelle <span className="text-red-500 italic text-5xl">Incertitude</span> vous tue ?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { id: "hesitation", label: "Le client hesité & compare", desc: "La mort lente du deal par le doute" },
                { id: "quotes", label: "Volume de devis fantômes", desc: "Travail gratuit sans signature finale" },
                { id: "justify", label: "Négociation agressive", desc: "Le client ne voit pas la valeur ajoutée" },
                { id: "loss", label: "Concurrence déloyale", desc: "Perdre face aux moins qualifiés" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelections({ ...selections, problem: opt.id }); nextStep(); }}
                  className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/40 transition-all text-left flex flex-col gap-2 group"
                >
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-display font-black text-2xl text-white/90 group-hover:text-white uppercase leading-none">{opt.label}</span>
                     <AlertTriangle size={24} className="text-red-500/20 group-hover:text-red-500 transition-colors" />
                  </div>
                  <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] group-hover:text-red-500/60">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-accent border-accent/30 tracking-widest px-4 py-1">INFRASTRUCTURE DIGITALE</Badge>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none tracking-tighter">
                Votre <span className="text-accent italic">Présence</span> Actuelle
              </h3>
            </div>
            
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 text-center block">Avez-vous un site web ?</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[{ id: "yes", label: "OUI" }, { id: "no", label: "NON" }].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelections({ ...selections, hasSite: opt.id })}
                      className={cn(
                        "p-6 rounded-3xl border transition-all font-display font-black text-2xl uppercase italic",
                        selections.hasSite === opt.id ? "bg-accent border-accent text-white" : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selections.hasSite && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-4 border-t border-white/5">
                    <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 text-center block">Lancez-vous des publicités ?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[{ id: "yes", label: "OUI" }, { id: "no", label: "NON" }].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelections({ ...selections, runsAds: opt.id });
                            setTimeout(nextStep, 300);
                          }}
                          className={cn(
                            "p-6 rounded-3xl border transition-all font-display font-black text-2xl uppercase italic",
                            selections.runsAds === opt.id ? "bg-accent border-accent text-white" : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-accent border-accent/30 tracking-widest px-4 py-1">ANALYSE TERRITORIALE</Badge>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none tracking-tighter italic">
                Secteur à <span className="text-accent">Verrouiller</span> ?
              </h3>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Nous vérifions la disponibilité de votre ville en temps réel.</p>
            </div>
            <div className="relative">
              <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 text-accent" size={32} />
              <input 
                type="text"
                autoFocus
                placeholder="Ex: Paris, Lyon, Bordeaux..."
                className="w-full bg-white/5 border-2 border-white/10 rounded-[3rem] px-20 py-10 text-3xl text-white font-display focus:border-accent outline-none placeholder:text-white/10 tracking-tight"
                value={selections.city}
                onChange={e => setSelections({...selections, city: e.target.value})}
                onKeyDown={e => e.key === 'Enter' && selections.city && handleAudit()}
              />
            </div>
            <Button 
               disabled={!selections.city}
               onClick={handleAudit}
               className="w-full h-24 bg-accent hover:bg-accent/90 text-2xl font-black uppercase italic rounded-full shadow-[0_20px_60px_-15px_rgba(242,125,38,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              LANCER L'AUDIT DE MARCHÉ
              <ArrowRight className="ml-4" size={28} />
            </Button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            {isLoading ? (
              <div className="text-center space-y-8 py-24">
                <div className="relative w-32 h-32 mx-auto">
                   <div className="absolute inset-0 border-4 border-accent/10 rounded-full animate-pulse" />
                   <div className="absolute inset-0 border-4 border-t-accent rounded-full animate-spin" />
                   <Loader2 size={48} className="absolute inset-0 m-auto text-accent opacity-50 animate-bounce" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-black uppercase tracking-[0.8em] text-accent animate-pulse pl-3">Neural Audit Engine Active</p>
                  <p className="text-white/30 text-lg font-display italic tracking-tight">Analyse de la concurrence à {selections.city}...</p>
                </div>
              </div>
            ) : result && (
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-16">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <Badge className="bg-white text-ink border-none rounded-full px-8 py-2 font-black uppercase tracking-widest text-xs shadow-xl animate-bounce">Diagnostic Stratégique Débloqué</Badge>
                  <h3 className="text-3xl md:text-5xl font-sans font-black text-white leading-tight uppercase italic tracking-tight">
                    <Markdown>{result.diagnosis}</Markdown>
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                  <div className="space-y-8 md:space-y-10 order-2 lg:order-1">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Votre Audit Stratégique</p>
                        <h4 className="text-4xl md:text-7xl font-sans font-black uppercase text-white tracking-tighter leading-tight md:leading-none">{result.irresistibleOfferTitle}</h4>
                     </div>
                     <div className="space-y-4 md:space-y-6">
                        {result.focusBullets.map((bullet, i) => (
                           <motion.div 
                             initial={{ x: -20, opacity: 0 }}
                             animate={{ x: 0, opacity: 1 }}
                             transition={{ delay: i * 0.2 }}
                             key={i} 
                             className="flex items-center gap-4 md:gap-6 text-white/70 bg-white/5 p-5 md:p-4 rounded-2xl border border-white/5"
                           >
                              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 shadow-lg shadow-accent/10">
                                 <CheckCircle2 size={16} className="text-accent" />
                              </div>
                              <span className="font-sans font-bold uppercase leading-tight text-base md:text-lg italic tracking-tight">{bullet}</span>
                           </motion.div>
                        ))}
                     </div>
                     <div className="pt-6 md:pt-10">
                        <Button 
                          className="w-full md:w-fit h-20 md:h-24 px-10 md:px-16 bg-accent hover:bg-accent/90 text-xl md:text-3xl font-black uppercase italic rounded-full shadow-[0_30px_80px_-20px_rgba(242,125,38,0.4)] group overflow-hidden relative"
                          onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            SÉCURISER CETTE EXCLUSIVITÉ
                            <ChevronRightIcon className="group-hover:translate-x-3 transition-transform" size={24} />
                          </span>
                        </Button>
                        <div className="flex items-center gap-3 mt-6 text-white/30 justify-center lg:justify-start">
                           <MapPin size={14} className="text-accent" />
                           <p className="text-[10px] font-black uppercase tracking-[0.3em]">Accord Territorial Disponsible : {selections.city}</p>
                        </div>
                     </div>
                  </div>

                  <div className="relative group order-1 lg:order-2">
                     <div className="absolute -inset-4 bg-accent/20 blur-[150px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                     <Card className="relative p-8 md:p-12 bg-white/5 border border-white/10 rounded-[3rem] md:rounded-[4rem] backdrop-blur-3xl space-y-8 md:space-y-12 overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                           <Sparkles size={250} />
                        </div>
                        <div className="space-y-4 md:space-y-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-[1px] bg-white/20" />
                              <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.5em] text-white/40">Audit Data Insights</p>
                           </div>
                           <div className="text-white/90 text-lg md:text-xl font-sans leading-relaxed italic opacity-95">
                              <Markdown>
                                 {`En analysant le marché de **${selections.city}**, votre profil d'expert en **${selections.business}** ne peut plus se permettre d'être comparé. Vous avez besoin d'une approche **${result.recommendation === 'Domination' ? 'Agressive de Domination' : 'Chirurgicale de Signature'}** pour briser le plafond actuel.`}
                              </Markdown>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                           <div className="p-6 md:p-8 bg-white/5 rounded-[2.5rem] md:rounded-[2.5rem] border border-white/5 flex flex-col items-center">
                              <p className="text-accent font-black text-3xl md:text-5xl tracking-tighter italic leading-none">98%</p>
                              <p className="text-[8px] md:text-[10px] uppercase font-black text-white/30 mt-2 tracking-widest leading-none text-center">Match Score</p>
                           </div>
                           <div className="p-6 md:p-8 bg-white/5 rounded-[2.5rem] md:rounded-[2.5rem] border border-white/5 flex flex-col items-center">
                              <p className="text-white font-black text-3xl md:text-5xl tracking-tighter italic leading-none">CRITIQUE</p>
                              <p className="text-[8px] md:text-[10px] uppercase font-black text-white/30 mt-2 tracking-widest leading-none text-center">Urgency</p>
                           </div>
                        </div>
                     </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-40 px-6 bg-ink relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[6rem] p-6 md:p-32 min-h-[500px] md:min-h-[700px] flex flex-col justify-center backdrop-blur-[2px] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ChevronRightIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
