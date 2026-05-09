import * as React from "react";
import { motion } from "motion/react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LanguageProvider, useTranslation } from "@/contexts/LanguageContext";
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

export function LandingPage() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  
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
          <a href="#how-it-works" className="hover:text-accent transition-colors">{t("nav.howItWorks")}</a>
          <a href="#case-study" className="hover:text-accent transition-colors">{t("nav.results")}</a>
          <a href="#benefits" className="hover:text-accent transition-colors">{t("nav.benefits")}</a>
          <a href="#pricing" className="hover:text-accent transition-colors">{t("nav.pricing")}</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-muted/40 rounded-full p-0.5 md:p-1 border border-muted items-center shadow-sm">
            <button 
              onClick={() => navigate("/fr")}
              className={cn(
                "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black transition-all uppercase tracking-tighter",
                language === "fr" ? "bg-accent text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="md:hidden">FR</span>
              <span className="hidden md:inline">Français</span>
            </button>
            <button 
              onClick={() => navigate("/es")}
              className={cn(
                "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black transition-all uppercase tracking-tighter",
                language === "es" ? "bg-accent text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="md:hidden">ES</span>
              <span className="hidden md:inline">Español</span>
            </button>
          </div>
          <Button size="sm" className="bg-accent hover:bg-accent/90 uppercase font-black italic tracking-tighter text-xs md:text-sm px-4 md:px-6 whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>{t("nav.contact")}</Button>
        </div>
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
                {t("hero.badge")}
              </Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/20 rounded-full w-fit">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                <span className="text-[8px] font-black tracking-widest uppercase text-accent">{t("hero.availability")}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-[64px] font-display font-black leading-tight md:leading-[1.05] tracking-tighter text-balance">
              {t("hero.title")}<br className="hidden md:block" />
              <span className="relative">
                {t("hero.titleAccent")}
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-1 bg-accent/30 -z-10"
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium md:max-w-md">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-fit">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] items-center justify-center md:justify-start font-black uppercase tracking-widest text-accent flex gap-2">{t("hero.testLead")}</p>
                <Button size="lg" className="h-14 md:h-16 px-6 md:px-10 text-sm md:text-xl font-black bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/25 transition-all hover:scale-[1.02] uppercase tracking-tighter italic w-full md:w-fit whitespace-nowrap overflow-hidden text-ellipsis" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                  {t("hero.cta")}
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
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{t("hero.status.artisans")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent text-center md:text-left">{t("hero.status.produced")}</p>
              <div className="grid grid-cols-3 gap-2 md:gap-6 pt-4 border-t border-muted/50 w-full overflow-hidden">
                <div className="space-y-1 min-w-0">
                  <p className="text-xl md:text-2xl font-display font-black text-accent">+240%</p>
                  <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-black tracking-wider leading-tight">{t("hero.status.signed")}</p>
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xl md:text-2xl font-display font-black text-accent">€1.4M</p>
                  <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-black tracking-wider leading-tight">{t("hero.status.generated")}</p>
                </div>
                <div className="space-y-1 min-w-0 text-right md:text-left">
                  <p className="text-sm md:text-lg font-black uppercase text-accent leading-none">{t("hero.status.proven")}</p>
                  <p className="text-[8px] md:text-[10px] uppercase font-black tracking-widest opacity-60 text-muted-foreground leading-tight">{t("hero.status.field")}</p>
                </div>
              </div>
              <p className="text-[9px] font-bold text-muted-foreground italic uppercase tracking-widest text-center md:text-left">{t("hero.status.deploy")}</p>
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
              <h2 className="text-3xl md:text-6xl font-display font-black tracking-tighter leading-tight uppercase">
                {t("benefits.title")} <br/>
                <span className="text-accent italic">{t("benefits.titleAccent")}</span>
              </h2>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-tight text-balance">
                {t("benefits.description")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-muted rounded-full z-20 hidden md:flex items-center justify-center font-display font-black text-xs italic tracking-tighter shadow-2xl uppercase">{t("benefits.badge")}</div>
            
            {/* The Old Way */}
            <div className="group relative bg-muted/20 rounded-[2rem] p-10 border border-muted-foreground/10 overflow-hidden transition-all duration-500">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <X size={160} strokeWidth={1} />
               </div>
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full border border-red-500/20 flex items-center justify-center text-red-500/40 font-display font-black text-xl">01</div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/40">{t("benefits.old.badge")}</span>
                 </div>
                 
                 <div className="space-y-4">
                   <p className="text-muted-foreground/60 leading-relaxed font-medium">
                     {t("benefits.old.desc")}
                   </p>
                 </div>

                 <div className="space-y-4">
                   {[
                     { label: t("benefits.old.items.action.label"), val: t("benefits.old.items.action.val"), icon: X },
                     { label: t("benefits.old.items.prospect.label"), val: t("benefits.old.items.prospect.val"), icon: X },
                     { label: t("benefits.old.items.consequence.label"), val: t("benefits.old.items.consequence.val"), icon: X },
                     { label: t("benefits.old.items.result.label"), val: t("benefits.old.items.result.val"), icon: X }
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
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">{t("benefits.new.badge")}</span>
                 </div>

                 <div className="space-y-4">
                   <p className="text-accent text-sm font-black italic">{t("benefits.new.desc")}</p>
                 </div>

                 <div className="space-y-5">
                   {[
                     { label: t("benefits.new.items.engagement.label"), val: t("benefits.new.items.engagement.val"), icon: CheckCircle2 },
                     { label: t("benefits.new.items.result.label"), val: t("benefits.new.items.result.val"), icon: CheckCircle2 },
                     { label: t("benefits.new.items.decision.label"), val: t("benefits.new.items.decision.val"), icon: CheckCircle2 },
                     { label: t("benefits.new.items.status.label"), val: t("benefits.new.items.status.val"), icon: CheckCircle2 }
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
                       <Sparkles size={14} /> {t("benefits.new.resultLabel")}
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
                     <p className="text-[#FF4500] font-black text-sm md:text-lg mb-1 md:mb-2 uppercase tracking-tight">{t("success.badge")}</p>
                     <h3 className="text-2xl md:text-4xl font-display font-black leading-none mb-3 md:mb-4 uppercase italic text-white">Le Parquet Parisien</h3>
                     <div className="bg-[#1a1a1a] border border-[#FF4500]/30 p-4 md:p-6 rounded-2xl mb-4 md:mb-8">
                       <p className="text-white text-sm md:text-[15px] lg:text-lg leading-relaxed font-medium">
                         {t("success.aziz.quote")}
                         <br />
                         <span className="text-[#FF4500] font-black uppercase text-[10px] md:text-xs mt-3 md:mt-4 block tracking-widest">— Aziz</span>
                       </p>
                     </div>
                     <div className="p-3 md:p-4 bg-accent/20 border border-accent/30 rounded-xl mb-4 md:mb-8 inline-block backdrop-blur-sm max-w-full">
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#FF4500] leading-tight">{t("success.aziz.location")}</p>
                        <p className="text-[8px] font-bold uppercase text-white/50 mt-1">{t("success.aziz.status")}</p>
                     </div>
                     <div className="flex gap-8 md:gap-12 text-white">
                        <div><p className="text-xl md:text-2xl font-bold italic leading-none">{t("success.stats.views")}</p><p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">{t("success.stats.viewsDesc")}</p></div>
                        <div><p className="text-xl md:text-2xl font-bold italic leading-none">{t("success.stats.rate")}</p><p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-60">{t("success.stats.rateDesc")}</p></div>
                     </div>
                  </div>
                </div>
             </motion.div>
              <motion.div {...fadeInUp} className="order-1 lg:order-2 space-y-8">
               <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.9] text-balance">
                 {t("success.title")} <span className="text-accent underline decoration-4 underline-offset-8 italic">{t("success.titleAccent")}</span>
               </h2>
               <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                 <p aria-label="Success Content">
                   {t("success.content.p1")}
                 </p>
                 <p>
                   {t("success.content.p2").split(t("success.content.p2Highlight"))[0]}<span className="text-white font-black italic underline decoration-accent/40">{t("success.content.p2Highlight")}</span>{t("success.content.p2").split(t("success.content.p2Highlight"))[1]}
                 </p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic flex gap-4">
                   <Quote className="text-accent shrink-0" />
                   <p className="text-sm">{t("success.quote")}</p>
                 </div>
               </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-accent hover:bg-accent/90 h-14 md:h-20 font-black italic uppercase tracking-tighter text-sm md:text-lg px-8 group shadow-xl" 
                    onClick={() => window.open('https://leparquetparisien.fr', '_blank')}
                  >
                    <Globe size={20} className="mr-2" />
                    {t("success.cta.live")}
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 shrink-0" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 bg-white text-black hover:bg-white/90 h-14 md:h-20 font-black italic uppercase tracking-tighter text-sm md:text-lg px-8 group shadow-xl transition-all" 
                    onClick={() => window.open('https://www.instagram.com/leparquetparisien/', '_blank')}
                  >
                    <Instagram size={20} className="mr-2" />
                    {t("success.cta.instagram")}
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
             <Badge variant="outline" className="text-accent border-accent/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">{t("howItWorks.badge")}</Badge>
             <h2 className="text-4xl md:text-7xl font-display font-black uppercase text-ink leading-tight tracking-tighter">{t("howItWorks.title")} <br className="hidden md:block"/><span className="text-accent italic">{t("howItWorks.titleAccent")}</span></h2>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-12 relative">
            <div className="absolute top-12 left-0 w-full h-px bg-muted-foreground/20 z-0" />
            {(t("howItWorks.steps", { returnObjects: true }) as {num: string, step: string, desc: string}[]).map((s, i) => (
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
              {(t("howItWorks.steps", { returnObjects: true }) as {num: string, step: string, desc: string}[]).map((s, i) => (
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
            <h2 className="text-3xl font-display font-black text-white uppercase italic">{t("howItWorks.faq.title")}</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-white font-bold">{t("howItWorks.faq.q1")}</p>
                <p className="text-sm">{t("howItWorks.faq.a1")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold">{t("howItWorks.faq.q2")}</p>
                <p className="text-sm">{t("howItWorks.faq.a2")}</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block space-y-8 pt-8 md:pt-14">
             <div className="space-y-2">
                <p className="text-white font-bold">{t("howItWorks.faq.q3")}</p>
                <p className="text-sm">{t("howItWorks.faq.a3")}</p>
              </div>
              <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
                <p className="text-sm font-black italic">{t("howItWorks.faq.exclTitle")}</p>
                <p className="text-xs mt-1 leading-relaxed">{t("howItWorks.faq.exclDesc")}</p>
              </div>
          </div>

          {/* Mobile Version (Reduced) */}
          <div className="md:hidden space-y-8 text-center pt-8">
            <div className="space-y-4">
              <p className="text-white font-black text-2xl uppercase italic tracking-tight">{t("howItWorks.faq.q3")}</p>
              <p className="text-lg leading-tight">{t("howItWorks.faq.a3")}</p>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
              <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{t("howItWorks.faq.exclDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <OfferRecommender />
      </div>

      {/* Fix 2 — Pricing Anchor Section */}
      <section id="pricing" className="py-24 md:py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <Badge variant="outline" className="text-accent border-accent/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">{t("nav.pricing")}</Badge>
             <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">{t("pricing.title")}</h2>
             <p className="text-muted-foreground font-bold uppercase tracking-widest max-w-2xl mx-auto italic">{t("cta.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
            {/* CARD 1 — LANCEUR */}
            <Card className="p-10 border border-muted/20 bg-white flex flex-col rounded-[3rem] shadow-xl hover:shadow-2xl transition-all">
              <div className="space-y-2 mb-8">
                <h4 className="text-2xl font-display font-black uppercase italic tracking-tight">{t("pricing.plans.artisan.title")}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black italic">{t("pricing.plans.artisan.price")}</span>
                  <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">{t("pricing.plans.artisan.sub")}</span>
                </div>
                <p className="text-[10px] font-black text-accent uppercase tracking-widest">{t("pricing.plans.artisan.availability")}</p>
              </div>
              <ul className="flex-1 space-y-4 mb-10 border-t border-muted/10 pt-8">
                {(t("pricing.plans.artisan.features", { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-bold text-muted-foreground leading-tight items-start">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-16 border-2 border-ink font-black uppercase italic rounded-2xl" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                {t("pricing.plans.artisan.btn")}
              </Button>
            </Card>

            {/* CARD 2 — DOMINATEUR */}
            <Card className="p-10 border-4 border-accent bg-ink text-white flex flex-col rounded-[3rem] shadow-2xl md:scale-110 relative z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap">{t("pricing.plans.dominateur.availability")}</div>
              <div className="space-y-2 mb-8">
                <h3 className="text-3xl font-display font-black uppercase italic tracking-tight text-accent">{t("pricing.plans.dominateur.title")}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-black italic">{t("pricing.plans.dominateur.price")}</span>
                  <span className="text-white/40 font-bold text-sm tracking-widest uppercase">{t("pricing.plans.dominateur.sub")}</span>
                </div>
                <p className="text-[10px] font-black text-accent uppercase tracking-widest">{t("pricing.plans.dominateur.availability")}</p>
              </div>
              <ul className="flex-1 space-y-4 mb-10 border-t border-white/10 pt-8 text-white">
                {(t("pricing.plans.dominateur.features", { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-black uppercase italic tracking-tight items-start">
                    <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-20 bg-accent hover:bg-accent/90 text-white font-black uppercase italic rounded-2xl shadow-xl shadow-accent/20" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                {t("pricing.plans.dominateur.btn")}
              </Button>
            </Card>

            {/* CARD 3 — EMPIRE */}
            <Card className="p-10 border border-muted/20 bg-white flex flex-col rounded-[3rem] shadow-xl hover:shadow-2xl transition-all">
              <div className="space-y-2 mb-8">
                <h4 className="text-2xl font-display font-black uppercase italic tracking-tight">{t("pricing.plans.empire.title")}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black italic">{t("pricing.plans.empire.price")}</span>
                  <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">{t("pricing.plans.empire.sub")}</span>
                </div>
                <p className="text-[10px] font-black text-accent uppercase tracking-widest">{t("pricing.plans.empire.availability")}</p>
              </div>
              <ul className="flex-1 space-y-4 mb-10 border-t border-muted/10 pt-8">
                {(t("pricing.plans.empire.features", { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-bold text-muted-foreground leading-tight items-start">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-16 border-2 border-ink font-black uppercase italic rounded-2xl" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                {t("pricing.plans.empire.btn")}
              </Button>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground italic">
              {t("pricing.desc1")}
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BLACK SECTION */}
      <section className="py-16 md:py-32 px-6 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-5xl font-display font-black uppercase tracking-tight italic text-balance">{t("cta.title")} <span className="text-accent">{t("cta.titleAccent")}</span></h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  {t("pricing.plans.dominateur.availability")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button size="lg" className="w-full h-20 md:h-28 bg-accent hover:bg-accent/90 text-lg md:text-3xl font-black uppercase italic rounded-2xl shadow-2xl shadow-accent/20 group relative overflow-hidden px-4" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
              <span className="relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">{t("cta.btn").toUpperCase()}</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] italic">{t("demo.result.freeNoEngagement")}</p>
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
          aria-label={language === "fr" ? "Contactez-nous sur WhatsApp" : "Contáctanos en WhatsApp"}
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
            {t("hero.cta")}
            <ArrowRight size={24} />
          </Button>
        </motion.div>
      </div>

      <footer className="py-12 px-6 border-t border-muted/50 text-center pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 grayscale opacity-50">
              <span className="font-display font-black text-sm uppercase tracking-widest text-accent italic">KONTRAKD</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© 2026 KONTRAKD. {t("demo.result.proCount")}.</p>
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-50">
              <a href="#demo" className="hover:text-accent">{t("nav.demo")}</a>
              <a href="#how-it-works" className="hover:text-accent">{t("nav.howItWorks")}</a>
              <a href="#pricing" className="hover:text-accent">{t("nav.pricing")}</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

function LanguageRedirect() {
  const { language } = useTranslation();
  return <Navigate to={`/${language}`} replace />;
}

function MainLayout() {
  const { lang } = useParams();
  const { setLanguage, language } = useTranslation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (lang === "fr" || lang === "es") {
      if (lang !== language) {
        setLanguage(lang as "fr" | "es");
      }
    } else {
      navigate(`/${language}`, { replace: true });
    }
  }, [lang, language, setLanguage, navigate]);

  const metadata = {
    fr: {
      title: "KONTRAKD | Propulsez vos ventes de rénovation avec l'IA",
      description: "Multipliez vos ventes de rénovation par 3. Montrez à vos clients leur projet fini en 8 secondes avant même de signer le devis.",
      ogImage: "https://i.postimg.cc/0jBZjYSs/Generated-Image-April-04-2026-3-02PM.jpg"
    },
    es: {
      title: "KONTRAKD | Impulsa tus ventas de reformas con IA",
      description: "Multiplica tus ventas de reformas por 3. Muestra a tus clientes su proyecto terminado en 8 segundos incluso antes de firmar el presupuesto.",
      ogImage: "https://i.postimg.cc/0jBZjYSs/Generated-Image-April-04-2026-3-02PM.jpg"
    }
  };

  const currentMeta = metadata[language as keyof typeof metadata];

  return (
    <>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <link rel="canonical" href={`https://kontrakd.com/${language}`} />
        <link rel="alternate" hrefLang="fr" href="https://kontrakd.com/fr" />
        <link rel="alternate" hrefLang="es" href="https://kontrakd.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://kontrakd.com/fr" />
        
        {/* OpenGraph */}
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="og:image" content={currentMeta.ogImage} />
        <meta property="og:url" content={`https://kontrakd.com/${language}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMeta.title} />
        <meta name="twitter:description" content={currentMeta.description} />
        <meta name="twitter:image" content={currentMeta.ogImage} />
      </Helmet>
      <LandingPage />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/:lang" element={<MainLayout />} />
          <Route path="/" element={<LanguageRedirect />} />
          <Route path="*" element={<LanguageRedirect />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
