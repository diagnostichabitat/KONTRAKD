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
  MessageCircle,
  AlertTriangle,
  Instagram,
  Globe,
  X
} from "lucide-react";
import { Demo } from "@/components/Demo";
import { OfferRecommender } from "@/components/OfferRecommender";
import { cn } from "@/lib/utils";

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
          <a href="#case-study" className="hover:text-accent transition-colors">Résultats</a>
          <a href="#benefits" className="hover:text-accent transition-colors">Ce que vous gagnez</a>
          <a href="#pricing" className="hover:text-accent transition-colors">Tarifs</a>
        </div>
        <Button size="sm" className="bg-accent hover:bg-accent/90 uppercase font-black italic tracking-tighter text-xs md:text-sm px-4 md:px-6 whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>RÉSERVER MA VILLE</Button>
      </nav>

      {/* Hero Section */}
      <section id="demo" className="relative pt-28 md:pt-32 pb-8 md:pb-20 px-6 overflow-hidden glow-mesh">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 min-w-0 flex flex-col gap-6 items-center md:items-start"
          >
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Badge variant="secondary" className="w-fit max-w-[400px] text-wrap px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] bg-accent text-white border-accent shadow-xl shadow-accent/20 leading-relaxed">
                1 SEUL ARTISAN PAR VILLE. C'EST TOUT.
              </Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/20 rounded-full w-fit">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                <span className="text-[8px] font-black tracking-widest uppercase text-accent">Lyon : PRIS. CHERCHEZ UNE AUTRE VILLE.</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-[64px] font-display font-black leading-tight md:leading-[1.05] tracking-tighter text-balance">
              Montrez à votre client le résultat fini.<br className="hidden md:block" />
              <span className="relative">
                Avant même de lui envoyer un devis.
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-1 bg-accent/30 -z-10"
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium md:max-w-md">
              Vos clients voient le résultat en 8 secondes. Ils signent le jour même. Pas dans 3 semaines.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-fit">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] items-center justify-center md:justify-start font-black uppercase tracking-widest text-accent flex gap-2">Testez ici — c'est ce que voit votre client.</p>
                <Button size="lg" className="h-14 md:h-16 px-6 md:px-10 text-sm md:text-xl font-black bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/25 transition-all hover:scale-[1.02] uppercase tracking-tighter italic w-full md:w-fit whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                  VOIR LA DÉMO
                  <ArrowRight size={20} className="ml-2 shrink-0" />
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-4 px-4 bg-muted/10 py-3 rounded-full border border-muted/20 w-fit">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-background" referrerPolicy="no-referrer" alt="user" />
                  ))}
                </div>
                <div className="text-left">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-80">1 200 artisans l'utilisent déjà</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-6 pt-8 border-t border-muted/50 w-full overflow-hidden">
               <div className="space-y-1 min-w-0">
                 <p className="text-xl md:text-2xl font-display font-black text-accent">+240%</p>
                 <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-black tracking-wider leading-tight">chantiers signés</p>
               </div>
               <div className="space-y-1 min-w-0">
                 <p className="text-xl md:text-2xl font-display font-black text-accent">€1.4M</p>
                 <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-black tracking-wider leading-tight">générés</p>
               </div>
               <div className="space-y-1 min-w-0">
                 <p className="text-xl md:text-2xl font-display font-black text-accent italic tracking-tighter">KONTRAKD</p>
                 <p className="text-[8px] md:text-[10px] uppercase font-black tracking-widest opacity-60 text-muted-foreground leading-tight">Pour artisans</p>
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
      <section id="benefits" className="hidden md:block py-16 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-20">
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase">
                Pourquoi vous perdez <br/>
                <span className="text-accent italic">des chantiers que vous méritez.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-tight text-balance">
                Vos clients ne signent pas parce qu'ils n'arrivent pas à imaginer le résultat. <span className="text-foreground font-black italic">Montrez-leur.</span> Le problème disparaît.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-muted rounded-full z-20 hidden md:flex items-center justify-center font-display font-black text-xs italic tracking-tighter shadow-2xl uppercase">Hier <span className="text-accent mx-1">vs</span> Demain</div>
            
            {/* The Old Way */}
            <div className="group relative bg-muted/20 rounded-[2rem] p-10 border border-muted-foreground/10 overflow-hidden transition-all duration-500">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <X size={160} strokeWidth={1} />
               </div>
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full border border-red-500/20 flex items-center justify-center text-red-500/40 font-display font-black text-xl">01</div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/40">Ce que vous faites aujourd'hui</span>
                 </div>
                 
                 <div className="space-y-4">
                   <p className="text-muted-foreground/60 leading-relaxed font-medium">
                     Vous envoyez des photos de vos anciens chantiers. Votre client essaie d'imaginer son salon. Il n'y arrive pas. Il ne répond plus.
                   </p>
                 </div>

                 <div className="space-y-4">
                   {[
                     { label: "Action", val: "Vous envoyez un catalogue", icon: X },
                     { label: "Prospect", val: "Il dit 'je réfléchis'", icon: X },
                     { label: "Conséquence", val: "Il signe chez un concurrent moins cher", icon: X },
                     { label: "Bilan", val: "Vous perdez de l'argent", icon: X }
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
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Ce qui se passe avec KONTRAKD</span>
                 </div>

                 <div className="space-y-4">
                   <p className="text-accent text-sm font-black italic">"Il voit son propre sol rénové. En 8 secondes."</p>
                 </div>

                 <div className="space-y-5">
                   {[
                     { label: "Engagement", val: "Il envoie une photo de son sol à 22h", icon: CheckCircle2 },
                     { label: "Résultat", val: "Il voit le résultat tout de suite", icon: CheckCircle2 },
                     { label: "Décision", val: "Il vous appelle pour savoir quand vous pouvez venir", icon: CheckCircle2 },
                     { label: "Statut", val: "Il ne demande plus le prix", icon: CheckCircle2 }
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
                       <Sparkles size={14} /> Résultat : il signe. Vous travaillez.
                     </p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story / Le Parquet Parisien */}
      <section id="case-study" className="py-12 md:py-24 px-6 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp} className="order-2 lg:order-1 relative">
                <div className="aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-3xl relative">
                  <img src="https://i.postimg.cc/0jBZjYSs/Generated-Image-April-04-2026-3-02PM.jpg" alt="Le Parquet Parisien" className="w-full h-full object-cover transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-6 md:p-12">
                     <p className="text-[#FF4500] font-black text-sm md:text-lg mb-1 md:mb-2 uppercase tracking-tight">Ça marche vraiment. Voici la preuve.</p>
                     <h3 className="text-2xl md:text-4xl font-display font-black leading-none mb-3 md:mb-4 uppercase italic text-white">Le Parquet Parisien</h3>
                     <div className="bg-[#1a1a1a] border border-[#FF4500]/30 p-4 md:p-6 rounded-2xl mb-4 md:mb-8">
                       <p className="text-white text-sm md:text-[15px] lg:text-lg leading-relaxed font-medium">
                         "En 6 mois, 500 000 vues organiques. Des chantiers qui se remplissent pendant que je pose du bois."
                         <br />
                         <span className="text-[#FF4500] font-black uppercase text-[10px] md:text-xs mt-3 md:mt-4 block tracking-widest">— Aziz</span>
                       </p>
                     </div>
                     <div className="p-3 md:p-4 bg-accent/20 border border-accent/30 rounded-xl mb-4 md:mb-8 inline-block backdrop-blur-sm max-w-full">
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#FF4500] leading-tight">Chantier commercial 400m², Luxembourg</p>
                        <p className="text-[8px] font-bold uppercase text-white/50 mt-1">Signé après simulation · Showroom Micadoni</p>
                     </div>
                     <div className="flex gap-8 md:gap-12 text-white">
                        <div><p className="text-xl md:text-2xl font-bold italic leading-none">500 000</p><p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">vues en 6 mois</p></div>
                        <div><p className="text-xl md:text-2xl font-bold italic leading-none">+64%</p><p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">de clients qui signent</p></div>
                     </div>
                  </div>
                </div>
             </motion.div>
             <motion.div {...fadeInUp} className="order-1 lg:order-2 space-y-8">
               <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.9] text-balance">
                 Voici ce que <span className="text-accent underline decoration-4 underline-offset-8 italic">ça donne en vrai.</span>
               </h2>
               <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                 <p aria-label="Success Content">
                   Le Parquet Parisien envoie le simulateur avant même de rappeler le client.
                 </p>
                 <p>
                   Pourquoi expliquer pendant 1h quand votre client peut <span className="text-white font-black italic underline decoration-accent/40">voir le résultat</span> en 8 secondes ?
                 </p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic flex gap-4">
                   <Quote className="text-accent shrink-0" />
                   <p className="text-sm">"Le simulateur n'est pas un gadget. C'est ce qui fait qu'un client arrête de chercher ailleurs et m'appelle moi."</p>
                 </div>
               </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-accent hover:bg-accent/90 h-14 md:h-20 font-black italic uppercase tracking-tighter text-sm md:text-lg px-8 group shadow-xl" 
                    onClick={() => window.open('https://leparquetparisien.fr', '_blank')}
                  >
                    <Globe size={20} className="mr-2" />
                    VOIR LE SIMULATEUR LIVE
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 shrink-0" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 bg-white text-black hover:bg-white/90 h-14 md:h-20 font-black italic uppercase tracking-tighter text-sm md:text-lg px-8 group shadow-xl transition-all" 
                    onClick={() => window.open('https://www.instagram.com/leparquetparisien/', '_blank')}
                  >
                    <Instagram size={20} className="mr-2" />
                    VOIR L'INSTAGRAM
                  </Button>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 md:py-24 bg-muted/20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-display font-black uppercase tracking-tight">COMMENT ÇA MARCHE</h2>
            <p className="text-muted-foreground italic max-w-xl mx-auto">Vous n'avez rien à faire. On s'occupe de tout. Prêt en 48h.</p>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-12 relative">
            <div className="absolute top-12 left-0 w-full h-px bg-muted-foreground/20 z-0" />
            {[
              { num: "01", step: "On apprend votre métier", desc: "On entre vos matériaux et vos finitions dans le système." },
              { num: "02", step: "On installe tout", desc: "Sur votre site et vos réseaux. Prêt en 48h." },
              { num: "03", step: "Vos clients testent", desc: "Ils uploadent une photo. Ils voient leur résultat." },
              { num: "04", step: "Vous signez", desc: "Le client arrive déjà convaincu. Vous validez la date." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 space-y-4">
                <div className="w-24 h-24 bg-background border border-muted flex items-center justify-center text-4xl font-display font-black text-accent shadow-lg rounded-3xl">
                  {s.num}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">{s.step}</h4>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden space-y-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
              {[
                { num: "01", step: "On apprend votre métier", desc: "On entre vos matériaux et vos finitions dans le système." },
                { num: "02", step: "On installe tout", desc: "Sur votre site et vos réseaux. Prêt en 48h." },
                { num: "03", step: "Vos clients testent", desc: "Ils uploadent une photo. Ils voient leur résultat." },
                { num: "04", step: "Vous signez", desc: "Le client arrive déjà convaincu. Vous validez la date." }
              ].map((s, i) => (
                <div key={i} className="min-w-[85%] snap-start snap-always bg-background border border-muted p-8 rounded-3xl space-y-6 shadow-xl">
                  <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl font-display font-black text-accent rounded-2xl">
                    {s.num}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold">{s.step}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-accent/20" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objection / Hesitation */}
      <section className="py-12 md:py-24 bg-ink text-white/70 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Desktop Version */}
          <div className="hidden md:block space-y-6">
            <h2 className="text-3xl font-display font-black text-white uppercase italic">Vos questions</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-white font-bold">"Est-ce que mes clients vont vraiment utiliser ça ?"</p>
                <p className="text-sm">Oui. Tout le monde cherche déjà son résultat sur Pinterest et YouTube. Vous leur donnez juste le vrai résultat, chez eux, maintenant.</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold">"Est-ce que le résultat ressemble vraiment à mon travail ?"</p>
                <p className="text-sm">Oui. On entre vos matériaux exacts, vos finitions, vos couleurs. Ce n'est pas une image générique. C'est votre catalogue.</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block space-y-8 pt-8 md:pt-14">
             <div className="space-y-2">
                <p className="text-white font-bold">"Combien ça coûte ?"</p>
                <p className="text-sm">Un seul chantier signé grâce à l'outil rembourse 2 ans d'abonnement. On en parle en 20 minutes.</p>
              </div>
              <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
                <p className="text-sm font-black italic">Territoire Exclusif :</p>
                <p className="text-xs mt-1 leading-relaxed">Votre ville est à vous. Votre concurrent ne peut pas utiliser notre système sur votre territoire. Un artisan par ville. C'est la règle.</p>
              </div>
          </div>

          {/* Mobile Version (Reduced) */}
          <div className="md:hidden space-y-8 text-center">
            <div className="space-y-4">
              <p className="text-white font-black text-2xl uppercase italic tracking-tight">"Combien ça coûte ?"</p>
              <p className="text-lg leading-tight">Un seul chantier signé rembourse 2 ans. <br/> <span className="text-accent font-black uppercase text-xl">On en parle en 20 minutes.</span></p>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
              <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Un seul artisan par ville. Votre ville est à vous.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <OfferRecommender />
      </div>

      {/* Pricing Section - The Money Decision */}
      <section id="pricing" className="py-12 md:py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          
          {/* Battle-Tested High-Conversion Reframe */}
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-ink/5 border border-muted/20 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side: The Pain (Death by Quote) */}
              <div className="p-10 md:p-16 space-y-10 bg-white border-b md:border-b-0 md:border-r border-muted/20 relative">
                 <div className="space-y-6">
                   <Badge variant="outline" className="text-red-600 border-red-600/20 uppercase font-black px-4 py-1 text-[10px] tracking-widest">La Réalité Brutale</Badge>
                   <h4 className="text-3xl md:text-4xl font-display font-black leading-[0.9] italic uppercase tracking-tighter">
                     "Je vais y réfléchir" = <br/>
                     <span className="text-red-600">Le Deal est mort.</span>
                   </h4>
                   <p className="text-sm font-bold text-muted-foreground/60 uppercase">Dans 85% des cas, le client ne rappelle jamais.</p>
                 </div>
                 <ul className="space-y-6">
                   {[
                     "L'Ancienne Méthode (Lente)",
                     "Envoyer un devis froid par email",
                     "Expliquer les matériaux pendant 1h",
                     "Attendre 2 semaines une réponse"
                   ].map((t, i) => (
                     <li key={i} className={cn("flex gap-4 text-sm font-bold text-muted-foreground", i > 0 && "line-through decoration-red-500/50 opacity-60")}>
                       {i === 0 ? <AlertTriangle size={18} className="shrink-0 text-red-500" /> : <X size={18} className="shrink-0 text-red-500/30" />}
                       <span className={cn(i === 0 && "uppercase tracking-widest text-ink")}>{t}</span>
                     </li>
                   ))}
                 </ul>
              </div>
              
              {/* Right Side: The Gain (Instant Decision) */}
              <div className="p-10 md:p-16 space-y-10 bg-ink text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 text-accent rotate-12 -translate-y-8 translate-x-8"><Zap size={300} /></div>
                 
                 <div className="space-y-6 relative z-10">
                   <Badge variant="outline" className="text-accent border-accent/20 uppercase font-black px-4 py-1 text-[10px] tracking-widest">La Solution Visuelle</Badge>
                   <h4 className="text-3xl md:text-4xl font-display font-black leading-[0.9] italic uppercase tracking-tighter">
                     Votre client voit. <br/>
                     <span className="text-accent underline decoration-accent/30 underline-offset-8">Il signe. Point.</span>
                   </h4>
                   <p className="text-sm font-bold text-white/40 uppercase">Supprimez l'hésitation. Signez sur place.</p>
                 </div>

                 <ul className="space-y-6 relative z-10">
                   {[
                     "La Méthode Visuelle™ (Décisive)",
                     "Montrer la transformation en direct",
                     "Supprimer l'incertitude du client",
                     "Récupérer l'acompte sur place"
                   ].map((t, i) => (
                     <li key={i} className={cn("flex gap-4 text-sm font-black uppercase italic tracking-tight", i === 0 ? "text-accent" : "text-white")}>
                       {i === 0 ? <Sparkles size={18} className="shrink-0 animate-pulse" /> : <CheckCircle2 size={18} className="shrink-0 text-accent" />}
                       <span className={cn(i === 0 && "tracking-widest")}>{t}</span>
                     </li>
                   ))}
                 </ul>

                 <div className="pt-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest">
                       Objectif : Décision Instantanée
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-10 md:mb-20 px-6">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter">Choisissez comment vous voulez travailler.</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Un seul artisan par ville. Si votre concurrent signe avant vous, votre ville est prise.</p>
          </div>

          {/* Offer Structure */}
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 items-stretch">
            
            {/* Domination (Premium) - Shown first on mobile, right on desktop */}
            <Card className="flex-1 p-10 space-y-8 border-none shadow-2xl bg-ink text-white rounded-[40px] relative flex flex-col md:scale-105 z-20 md:order-2 overflow-visible">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-30 whitespace-nowrap">Leader Local</div>
              
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight italic">SYSTÈME DE DOMINATION</h4>
                <p className="text-sm text-white/50 font-bold uppercase tracking-widest">Pour être le seul artisan de votre métier dans votre ville.</p>
              </div>

              <div className="flex-1 space-y-6 py-8 border-t border-white/10">
                <div className="space-y-4">
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Exclusivité territoriale totale</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Les clients arrivent à vous. Vous ne les cherchez plus.</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> On vous aide à signer les grands chantiers</p>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic text-center">1 chantier clôturé = système payé pour l'année.</p>
                <Button className="w-full h-16 md:h-20 bg-accent hover:bg-accent/90 text-sm md:text-xl font-black uppercase italic rounded-2xl shadow-2xl shadow-accent/20 transition-all active:scale-[0.98] px-4 whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                  JE PRENDS MA VILLE
                </Button>
              </div>
            </Card>

            {/* Croissance (Entry) */}
            <Card className="flex-1 p-10 space-y-8 border border-muted/20 shadow-xl bg-white text-ink rounded-[40px] flex flex-col md:order-1 overflow-visible">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight italic">PACK ARTISAN</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Pour signer plus de chantiers cette semaine.</p>
              </div>

              <div className="flex-1 space-y-6 py-8 border-t border-muted/10">
                <div className="space-y-4">
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Votre client voit son résultat avant de signer</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Vous passez 3x moins de temps à convaincre</p>
                  <p className="flex items-center gap-4 text-base font-bold"><CheckCircle2 size={20} className="text-accent shrink-0" /> Vous semblez plus pro que vos concurrents</p>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-muted/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic text-center">1 chantier clôturé = système payé pour l'année.</p>
                <Button variant="outline" className="w-full h-16 md:h-20 border-2 border-ink text-sm md:text-xl font-black uppercase italic rounded-2xl hover:bg-ink hover:text-white transition-all active:scale-[0.98] px-4 whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                  PROFIL ARTISAN
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center py-8 md:py-20">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground opacity-60 italic">
              Investissement calibré selon votre ville et votre secteur.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BLACK SECTION */}
      <section className="py-16 md:py-32 px-6 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-5xl font-display font-black uppercase tracking-tight italic text-balance">Votre ville est-elle encore disponible ?</h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  3 villes disponibles en Île-de-France aujourd'hui
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button size="lg" className="w-full h-20 md:h-28 bg-accent hover:bg-accent/90 text-lg md:text-3xl font-black uppercase italic rounded-2xl shadow-2xl shadow-accent/20 group relative overflow-hidden px-4" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
              <span className="relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">JE VÉRIFIE MA VILLE</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] italic">Gratuit. Sans engagement. On regarde ensemble en 20 minutes.</p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Bubble */}
      <div className="fixed bottom-20 right-6 z-[110] md:bottom-8 md:right-8">
        <motion.a
          href="https://wa.me/33600000000"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all"
          aria-label="Contactez-nous sur WhatsApp"
        >
          <MessageCircle size={28} fill="currentColor" className="text-white" />
        </motion.a>
      </div>

      {/* Footer */}
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <Button 
            className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-black uppercase italic shadow-[0_-10px_40px_rgba(242,125,38,0.2)] flex items-center justify-center gap-3 text-lg rounded-none border-t border-white/20"
            onClick={() => {
              const demoElement = document.getElementById('demo');
              if (demoElement) {
                demoElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            ESSAYER LA DÉMO
            <ArrowRight size={24} />
          </Button>
        </motion.div>
      </div>

      <footer className="py-12 px-6 border-t border-muted/50 text-center pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 grayscale opacity-50">
              <span className="font-display font-black text-sm uppercase tracking-widest text-accent italic">KONTRAKD</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© 2026 KONTRAKD. Fait pour les artisans.</p>
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-50">
              <a href="#demo" className="hover:text-accent">Voir la démo</a>
              <a href="#how-it-works" className="hover:text-accent">Comment ça marche</a>
              <a href="#pricing" className="hover:text-accent">Tarifs</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
