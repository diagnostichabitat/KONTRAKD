import * as React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Quote,
  LayoutGrid,
  Sparkles,
  ChevronRight,
  X
} from "lucide-react";
import { Demo } from "@/components/Demo";
import { OfferRecommender } from "@/components/OfferRecommender";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-muted/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight leading-none uppercase text-accent">KONTRAKD</span>
            <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 mt-0.5">by Aziz · Le Parquet Parisien · Paris</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#how-it-works" className="hover:text-accent transition-colors">Comment ça marche</a>
          <a href="#case-study" className="hover:text-accent transition-colors">Étude de Cas</a>
          <a href="#benefits" className="hover:text-accent transition-colors">Bénéfices</a>
          <a href="#pricing" className="hover:text-accent transition-colors">Tarifs</a>
        </div>
        <Button size="sm" className="bg-accent hover:bg-accent/90 uppercase font-black italic tracking-tighter" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>VERROUILLER MON SECTEUR</Button>
      </nav>

      {/* Hero Section */}
      <section id="demo" className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-6 overflow-hidden glow-mesh">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 min-w-0 flex flex-col gap-6 items-center md:items-start"
          >
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Badge variant="secondary" className="w-fit max-w-[400px] text-wrap px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] bg-accent text-white border-accent shadow-xl shadow-accent/20 leading-relaxed">
                PROTOCOLE D'EXCLUSIVITÉ : 1 SEUL ARTISAN PAR VILLE.
              </Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/20 rounded-full w-fit">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                <span className="text-[8px] font-black tracking-widest uppercase text-accent">Secteur Lyon (69) : FERMÉ — Domination en cours</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-[64px] font-display font-black leading-tight md:leading-[1.05] tracking-tighter text-balance">
              Signez en <span className="text-accent italic">8 secondes.</span><br className="hidden md:block" />
              <span className="relative">
                Expulsez vos concurrents.
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-1 bg-accent/30 -z-10"
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium md:max-w-md">
              Nous ne travaillons qu'avec un seul partenaire par ville. Soyez celui qui possède le marché, pas celui qui court après les miettes.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-fit">
              <Button size="lg" className="h-16 px-10 text-xl font-black bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/25 transition-all hover:scale-[1.02] uppercase tracking-tighter italic w-full md:w-fit" onClick={() => window.location.href = '#pricing'}>
                DÉPLOYER MON MOTEUR
                <ArrowRight size={24} className="ml-2" />
              </Button>
              <div className="hidden md:flex items-center gap-4 px-4 bg-muted/10 py-3 rounded-full border border-muted/20 w-fit">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-background" referrerPolicy="no-referrer" alt="user" />
                  ))}
                </div>
                <div className="text-left">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-80">1,200+ Professionals</p>
                   <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Industry Standard Established</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-muted/50 w-full">
               <div className="space-y-1">
                 <p className="text-2xl font-display font-black text-accent">+240%</p>
                 <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Signatures</p>
               </div>
               <div className="space-y-1">
                 <p className="text-2xl font-display font-black text-accent">€1.4M+</p>
                 <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Chiffre d'Affaires</p>
               </div>
               <div className="hidden md:block space-y-1 text-accent/80">
                 <p className="text-2xl font-display font-black italic tracking-tight text-accent">KONTRAKD</p>
                 <p className="text-[9px] uppercase font-bold tracking-wider opacity-60">Architectural Precision</p>
               </div>
            </div>
          </motion.div>

          {/* Interactive Demo in Hero - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[48%] lg:max-w-[560px] relative mt-4 md:mt-12 lg:mt-0"
          >
            <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full opacity-50" />
            <div className="relative z-10 scale-90 md:scale-100 origin-top">
              <Demo />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Shift - The Great Transformation */}
      <section id="benefits" className="py-16 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-20">
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              <Badge className="bg-ink text-white rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">L'ÉWOLUTION INÉVITABLE</Badge>
              <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase">
                Le Grand <br/>
                <span className="text-accent italic">Nettoyage.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-tight text-balance">
                Le "Faites-moi confiance" est mort. Vos prospects achètent maintenant une <span className="text-foreground font-black">Certitude Visuelle.</span> Ceux qui ne la donnent pas disparaissent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-muted rounded-full z-20 hidden md:flex items-center justify-center font-display font-black text-xs italic tracking-tighter shadow-2xl uppercase">Mort <span className="text-accent mx-1">vs</span> Vie</div>
            
            {/* The Old Way */}
            <div className="group relative bg-muted/20 rounded-[2rem] p-10 border border-muted-foreground/10 overflow-hidden transition-all duration-500">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <X size={160} strokeWidth={1} />
               </div>
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full border border-red-500/20 flex items-center justify-center text-red-500/40 font-display font-black text-xl">01</div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/40">L'échec silencieux</span>
                 </div>
                 
                 <div className="space-y-4">
                   <h3 className="text-4xl font-display font-black uppercase tracking-tighter opacity-40 italic">La Méthode PDF</h3>
                   <p className="text-muted-foreground/60 leading-relaxed font-medium">
                     Vous envoyez des photos de vos chantiers passés. Ils essaient d'imaginer leur propre salon. Ils n'y arrivent pas. Ils ghostent.
                   </p>
                 </div>

                 <div className="space-y-4">
                   {[
                     { label: "Action", val: "Envoi manuel d'un catalogue froid", icon: X },
                     { label: "Prospect", val: "\"Je vais réfléchir...\"", icon: X },
                     { label: "Délai", val: "Perte de l'impulsion d'achat", icon: X },
                     { label: "Bilan", val: "Argent laissé sur la table", icon: X }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 opacity-40">
                       <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">{item.label}</span>
                       <div className="flex items-center gap-2 text-sm font-bold line-through">
                         <item.icon size={14} className="text-red-500" /> {item.val}
                       </div>
                     </div>
                   ))}
                 </div>
                 
                 <div className="pt-8 border-t border-muted-foreground/5" />
               </div>
            </div>

            {/* The New Way */}
            <div className="group relative bg-ink text-white rounded-[2rem] p-10 overflow-hidden transition-all duration-700 ring-1 ring-white/10 hover:ring-accent/50 shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity text-accent">
                 <Zap size={160} strokeWidth={1} />
               </div>
               
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-accent border border-accent flex items-center justify-center text-ink font-display font-black text-xl italic tracking-tighter">02</div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Le Mécanisme de Domination</span>
                 </div>

                 <div className="space-y-4">
                   <p className="text-accent text-sm font-black italic">"Il ne se projette plus. Il possède déjà son nouveau sol."</p>
                   <h3 className="text-4xl font-display font-black uppercase tracking-tighter leading-none">
                     Impulsion <br/>
                     <span className="text-accent italic">Irréversible.</span>
                   </h3>
                 </div>

                 <div className="space-y-5">
                   {[
                     { label: "Engagement", val: "Il upload sa photo à 22h", icon: CheckCircle2 },
                     { label: "Résultat", val: "Il voit sa propre maison transformée", icon: CheckCircle2 },
                     { label: "Décision", val: "Il ne demande plus de prix, il demande quand", icon: CheckCircle2 },
                     { label: "Statut", val: "Vous êtes l'artisan premium. Par défaut.", icon: CheckCircle2 }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1">
                       <span className="text-[9px] uppercase font-black tracking-widest text-accent/60">{item.label}</span>
                       <div className="flex items-center gap-2 text-sm font-black">
                         <item.icon size={14} className="text-accent" /> {item.val}
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className="pt-8 border-t border-white/10">
                   <div className="flex items-center justify-between">
                     <p className="text-xs font-black uppercase tracking-widest text-accent items-center flex gap-2 italic">
                       <Sparkles size={14} /> Succès : Dominez Votre Secteur.
                     </p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story / Le Parquet Parisien */}
      <section id="case-study" className="py-24 px-6 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp} className="order-2 lg:order-1 relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
                  <img src="https://i.postimg.cc/0jBZjYSs/Generated-Image-April-04-2026-3-02PM.jpg" alt="Le Parquet Parisien" className="w-full h-full object-cover transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                     <p className="text-accent font-bold text-lg mb-2">Preuve d'Impact</p>
                     <h3 className="text-4xl font-display font-black leading-none mb-4 uppercase italic">Le Parquet Parisien</h3>
                     <p className="text-white/60 mb-8 max-w-md">"En 6 mois, 500 000 vues organiques. Des chantiers qui se remplissent pendant que je pose du bois." — Aziz, Le Parquet Parisien</p>
                     <div className="p-4 bg-accent/20 border border-accent/30 rounded-xl mb-8 inline-block backdrop-blur-sm">
                        <p className="text-[10px] uppercase font-black tracking-widest text-accent leading-none">Chantier commercial 400m², Luxembourg</p>
                        <p className="text-[8px] font-bold uppercase text-white/50 mt-1">Signé après simulation · Showroom Micadoni</p>
                     </div>
                     <div className="flex gap-12">
                        <div><p className="text-2xl font-bold italic">500K</p><p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Vues Organiques</p></div>
                        <div><p className="text-2xl font-bold italic">+64%</p><p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Conversion</p></div>
                     </div>
                  </div>
                </div>
             </motion.div>
             <motion.div {...fadeInUp} className="order-1 lg:order-2 space-y-8">
               <Badge className="bg-accent/20 text-accent border-accent/30 rounded-full">Preuve d'Exécution</Badge>
               <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.9] text-balance">
                 Le Moteur est votre <span className="text-accent underline decoration-4 underline-offset-8">Avantage Injuste.</span>
               </h2>
               <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                 <p aria-label="Success Content">
                   Le Parquet Parisien n'attendait pas le prospect. Il créait le désir avant même le premier appel.
                 </p>
                 <p>
                   Pourquoi passer des heures à expliquer un catalogue quand votre prospect peut <span className="text-white font-black italic">vivre</span> sa rénovation en 8 secondes ?
                 </p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic flex gap-4">
                   <Quote className="text-accent shrink-0" />
                   <p className="text-sm">"Le simulateur n'est pas un gadget. C'est ce qui fait qu'un client arrête de chercher ailleurs et m'appelle moi."</p>
                 </div>
               </div>
               <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 py-7 font-black italic uppercase tracking-tighter text-lg px-12 group" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                 ACTIVER MON MOTEUR
                 <ChevronRight size={20} className="ml-2 group-hover:translate-x-1" />
               </Button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-muted/20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-display font-black uppercase tracking-tight">Le Chemin de l'Intégration</h2>
            <p className="text-muted-foreground italic">Pour les décideurs, pas pour les ingénieurs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-muted-foreground/20 z-0" />
            {[
              { num: "01", step: "Calibration", desc: "Nous injectons vos finitions et votre catalogue exact dans votre moteur IA." },
              { num: "02", step: "Déploiement", desc: "Nous intégrons le moteur sur votre site et vos réseaux. Prêt en 48h." },
              { num: "03", step: "Impulsion", desc: "Vos prospects simulent leurs projets à toute heure. Le désir est immédiat." },
              { num: "04", step: "Conversion", desc: "Le lead arrive avec sa simulation. Vous ne vendez plus, vous validez." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 space-y-4">
                <div className="w-24 h-24 bg-background border border-muted flex items-center justify-center text-4xl font-display font-black text-accent shadow-lg rounded-3xl mx-auto md:mx-0">
                  {s.num}
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h4 className="text-lg font-bold">{s.step}</h4>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Objection / Hesitation */}
      <section className="py-24 bg-ink text-white/70 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-black text-white uppercase italic">Supprimer l'Incertitude</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-white font-bold">"Mes clients sont-ils prêts ?"</p>
                <p className="text-sm">Vos clients utilisent déjà l'IA pour tout. S'ils ne le font pas avec vous, ils le feront avec quelqu'un d'autre. L'artisant qui donne la vision gagne le marché.</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold">"Comment garantir la précision ?"</p>
                <p className="text-sm">Notre moteur est calibré spécifiquement sur vos types de bois, peintures ou carrelages. Ce n'est pas une image générique, c'est VOTRE catalogue.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8 pt-8 md:pt-14">
             <div className="space-y-2">
                <p className="text-white font-bold">"Quel est l'Investissement ?"</p>
                <p className="text-sm">Un seul chantier de parquet de 40m² rentabilise 2 ans de <span className="text-accent font-bold">KONTRAKD</span>. Ne pas l'avoir vous coûte au moins 3 chantiers par mois.</p>
              </div>
              <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
                <p className="text-sm font-black">Territoire Exclusif :</p>
                <p className="text-xs mt-1 leading-relaxed">Une fois que vous signez, votre ville et votre secteur sont verrouillés. Vos concurrents ne pourront JAMAIS accéder à notre moteur sur votre territoire. Premier arrivé, premier servi.</p>
              </div>
          </div>
        </div>
      </section>

      <OfferRecommender />

      {/* Pricing Section - The Money Decision */}
      <section id="pricing" className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Emotional + Financial Hook */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="border-red-500 text-red-500 font-black uppercase px-4 py-1">Alerte : Fuite de Revenus</Badge>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight leading-none">
              Chaque seconde d'hésitation vous coûte <span className="text-red-500 italic">une signature.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-10 border-y border-muted/20">
              <div className="text-center md:text-left">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">La Réalité Brutale</p>
                <p className="text-xl font-medium italic">"Je vais y réfléchir" = Deal mort dans 85% des cas.</p>
              </div>
              <div className="hidden md:block w-[1px] h-12 bg-muted/20" />
              <div className="text-center md:text-left">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">La Solution Visuelle</p>
                <p className="text-xl font-medium italic">Le client voit le résultat. Le client signe. Point.</p>
              </div>
            </div>
          </div>

          {/* The Reframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">L'Ancienne Méthode (Lente)</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-muted-foreground line-through decoration-red-500/50"><span>Envoyer un devis froid par email</span></li>
                <li className="flex gap-3 text-muted-foreground line-through decoration-red-500/50"><span>Expliquer les matériaux pendant 1h</span></li>
                <li className="flex gap-3 text-muted-foreground line-through decoration-red-500/50"><span>Attendre 2 semaines une réponse</span></li>
              </ul>
            </div>
            <div className="space-y-6 bg-accent/5 p-8 rounded-3xl border border-accent/20">
              <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-accent">La Méthode Visuelle™ (Décisive)</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 font-bold text-ink"><span>Montrer la transformation en direct</span></li>
                <li className="flex gap-3 font-bold text-ink"><span>Supprimer l'incertitude du client</span></li>
                <li className="flex gap-3 font-bold text-ink"><span>Récupérer l'acompte sur place</span></li>
              </ul>
            </div>
          </div>

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-20 px-6">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter">CHOISISSEZ VOTRE NIVEAU DE DOMINATION</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Un seul artisan par ville. Votre concurrent regarde peut-être cette page en ce moment.</p>
          </div>

          {/* Offer Structure */}
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 items-stretch">
            
            {/* Mobile Rule: Premium First is handled by order-1/order-2 classes or logical order */}
            
            {/* Domination (Premium) - Shown first on mobile, right on desktop */}
            <Card className="flex-1 p-10 space-y-8 border-none shadow-2xl bg-ink text-white rounded-[40px] relative flex flex-col md:scale-105 z-20 md:order-2 overflow-visible">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-30 whitespace-nowrap">Recommandé : Leader Local</div>
              
              <div className="space-y-2">
                <h4 className="text-4xl font-display font-black uppercase tracking-tighter italic text-center md:text-left">LE SYSTÈME DE DOMINATION</h4>
                <p className="text-sm text-white/50 font-bold uppercase tracking-widest text-center md:text-left">Devenez le référent de votre ville</p>
              </div>

              <div className="flex-1 space-y-6 py-8 border-t border-white/10">
                <div className="space-y-4">
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Exclusivité territoriale totale</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Acquisition automatisée de leads</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Support Vente "Gros Chantiers"</p>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic text-center">1 chantier clôturé = système payé pour l'année.</p>
                <Button className="w-full h-20 bg-accent hover:bg-accent/90 text-xl font-black uppercase italic rounded-2xl shadow-2xl shadow-accent/20 transition-all active:scale-[0.98]" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                  Verrouiller mon territoire
                </Button>
              </div>
            </Card>

            {/* Croissance (Entry) */}
            <Card className="flex-1 p-10 space-y-8 border border-muted/20 shadow-xl bg-white text-ink rounded-[40px] flex flex-col md:order-1 overflow-visible">
              <div className="space-y-2">
                <h4 className="text-4xl font-display font-black uppercase tracking-tighter italic text-center md:text-left">PACK ARTISAN</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest text-center md:text-left">Clôturez plus, voyagez moins</p>
              </div>

              <div className="flex-1 space-y-6 py-8 border-t border-muted/10">
                <div className="space-y-4">
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Transformation visuelle en direct</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Réduction de 70% du temps de vente</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Image de marque ultra-premium</p>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-muted/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic text-center">1 chantier clôturé = système payé pour l'année.</p>
                <Button variant="outline" className="w-full h-20 border-2 border-ink text-xl font-black uppercase italic rounded-2xl hover:bg-ink hover:text-white transition-all active:scale-[0.98]" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                  Choisir ce pack
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center py-20">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground opacity-60 italic">
              Investissement calibré selon votre ville et votre secteur.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BLACK SECTION */}
      <section className="py-32 px-6 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter italic">VOTRE SECTEUR EST-IL <br /> ENCORE LIBRE ?</h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  3 secteurs disponibles en Île-de-France ce soir
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button size="lg" className="w-full h-24 md:h-28 bg-accent hover:bg-accent/90 text-2xl md:text-4xl font-black uppercase italic rounded-2xl shadow-2xl shadow-accent/20 group relative overflow-hidden" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
              <span className="relative z-10">VÉRIFIER MA VILLE — 20 MIN →</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] italic">Votre ville est peut-être encore libre ce soir.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] md:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto"
        >
          <Button 
            className="w-full h-16 bg-accent text-white font-black uppercase italic rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-lg"
            onClick={() => {
              const demoElement = document.getElementById('demo');
              if (demoElement) {
                demoElement.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '#demo';
              }
            }}
          >
            ESSAYER LE DÉMO
            <ChevronRight size={24} />
          </Button>
        </motion.div>
      </div>

      <footer className="py-12 px-6 border-t border-muted/50 text-center pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 grayscale opacity-50">
              <span className="font-display font-black text-sm uppercase tracking-widest text-accent">KONTRAKD</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© 2026 KONTRAKD. All rights reserved. Built for Renovators.</p>
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-50">
              <a href="#demo" className="hover:text-accent">DÉMO</a>
              <a href="#how-it-works" className="hover:text-accent">MÉTHODE</a>
              <a href="#pricing" className="hover:text-accent">TARIFS</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
