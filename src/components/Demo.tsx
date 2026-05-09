import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Paintbrush, ArrowRight, Loader2, Sparkles, CheckCircle2, X, MapPin, MessageSquare, Video, Play, Maximize2, Instagram } from "lucide-react";
import { generateVisual, analyzeSpaceAdvanced, getLocalRenovationIntelligence, generateRenovationVideo } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";
import Markdown from "react-markdown";

type Industry = "Flooring" | "Kitchen" | "Bathroom" | "Painting" | "Menuiserie";

interface IndustryConfig {
  id: Industry;
  label: string;
  image: string;
  prompt: string;
}

const INDUSTRIES: IndustryConfig[] = [
  { 
    id: "Flooring", 
    label: "Parquet", 
    image: "https://i.postimg.cc/MGBCbQrb/new-white-oak-select-1.webp", 
    prompt: "high-quality parquet wood flooring" 
  },
  { 
    id: "Kitchen", 
    label: "Cuisines", 
    image: "https://i.postimg.cc/FRgwwQvd/hbx050123napiers-005-preview-642dcd73da1ca.avif", 
    prompt: "modern kitchen with stylish cabinets" 
  },
  { 
    id: "Bathroom", 
    label: "Salles de Bain", 
    image: "https://i.postimg.cc/02NhX3Bj/Qube-Wall-Mounted-Pebble-Grey-Gloss.jpg", 
    prompt: "luxury bathroom with tiles" 
  },
  { 
    id: "Painting", 
    label: "Peinture", 
    image: "https://i.postimg.cc/y8M5dNYd/183805968-s.jpg", 
    prompt: "living room with freshly painted walls" 
  },
  { 
    id: "Menuiserie", 
    label: "Menuiserie", 
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop", 
    prompt: "custom wood carpentry and detailed woodwork in a modern home" 
  },
];

const STYLES: Record<Industry, string[]> = {
  Flooring: ["Vernis Mat", "Finition Satinée", "Aspect Huilé", "Ponçage à Neuf", "Vitrification Brillante"],
  Kitchen: ["Relooking Blanc", "Modernisation Anthracite", "Rénovation Plan de Travail", "Éclat Premium", "Polissage Intégral"],
  Bathroom: ["Finition Spa", "Restauration Joints", "Polissage Marbre/Pierre", "Aspect Blanc Neuf"],
  Painting: ["Beige Chaleureux", "Gris Contemporain", "Blanc Éclatant", "Teinte Sable", "Finition Mat Profond"],
  Menuiserie: ["Restauration de l'Existant", "Ponçage et Vernis", "Changement de Teinte", "Vitrification Meuble/Escalier"],
};

export function Demo() {
  const { t } = useTranslation();
  const [step, setStep] = React.useState(1);
  const [leadCaptured, setLeadCaptured] = React.useState(false);
  const [leadData, setLeadData] = React.useState({ name: "", email: "", phone: "" });
  const [industry, setIndustry] = React.useState<Industry>("Flooring");
  const [region, setRegion] = React.useState("Paris, France");
  const [userInstructions, setUserInstructions] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [style, setStyle] = React.useState<string>(STYLES.Flooring[0]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState<"analysis" | "impact" | "generation">("analysis");
  const [diagnostics, setDiagnostics] = React.useState<string | null>(null);
  const [localTrends, setLocalTrends] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [resolution, setResolution] = React.useState<"1K" | "2K" | "4K">("1K");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const sampleImages: Record<Industry, string> = {
    Flooring: "https://i.postimg.cc/MGBCbQrb/new-white-oak-select-1.webp",
    Kitchen: "https://i.postimg.cc/FRgwwQvd/hbx050123napiers-005-preview-642dcd73da1ca.avif",
    Bathroom: "https://i.postimg.cc/02NhX3Bj/Qube-Wall-Mounted-Pebble-Grey-Gloss.jpg",
    Painting: "https://i.postimg.cc/y8M5dNYd/183805968-s.jpg",
    Menuiserie: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        setStep(3);
        
        // Start intelligent processing immediately
        setIsGenerating(true);
        setLoadingText("analysis");
        try {
          const analysis = await analyzeSpaceAdvanced(base64, industry);
          setDiagnostics(analysis);
        } catch (err) {
          console.error("Prep error:", err);
        } finally {
          setIsGenerating(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = async () => {
    if (!result) return;
    
    try {
      if (typeof window !== "undefined" && (window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
        }
      }
    } catch (e) {
      console.error("API Key selection error:", e);
    }

    setIsGeneratingVideo(true);
    try {
      const vid = await generateRenovationVideo(result, style);
      setVideoUrl(vid);
    } catch (err: any) {
      console.error("Video error:", err);
      if (err?.message?.includes("Requested entity was not found")) {
        if (typeof window !== "undefined" && (window as any).aistudio) {
           await (window as any).aistudio.openSelectKey();
        }
      }
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setIsGenerating(true);
    setStep(4);
    
    // Reset indicators for timed reveal
    const storedAnalysis = diagnostics as any;
    setDiagnostics(null);
    setLocalTrends(null);
    setResult(null);

    try {
      setLoadingText("analysis");
      
      let analysisResult: any;
      if (storedAnalysis && typeof storedAnalysis === 'object' && storedAnalysis.system_tags) {
        analysisResult = storedAnalysis;
      } else {
        analysisResult = await analyzeSpaceAdvanced(image, industry);
      }
      
      // Reveal System Tags (0-2s)
      setDiagnostics(analysisResult.system_tags.join(" • "));
      await new Promise(r => setTimeout(r, 2000));

      // Reveal Market Intel (2-4s)
      setLoadingText("impact");
      setLocalTrends(analysisResult.market_intel.join(" • "));
      await new Promise(r => setTimeout(r, 2000));

      setLoadingText("generation");
      
      const analysisContext = analysisResult?.system_tags?.join(". ") || "";
      const RENOVATION_DNA = `
        YOU ARE A PROFESSIONAL RENOVATION VISUALIZATION AI FOR KONTRAKD.
        MISSION: Create a PHOTOREALISTIC "AFTER RENOVATION" version of the EXACT SAME space.
        
        CRITICAL RULES:
        1. PRESERVE ROOM IDENTITY: Exact same structure, architecture, perspective, camera angle, proportions, and dimensions.
        2. NO REDESIGN: Do not modernize, do not replace materials, do not invent new textures.
        3. LAYOUT INTEGRITY: Keep all furniture, lighting, and architectural details 100% IDENTICAL to the source.
        4. FLOOR PRESERVATION: Keep exact same flooring type, wood species, grain, parquet pattern, and plank orientation.
        5. ALLOWED ACTIONS: Remove scratches/stains, repair damaged zones, simulate professional sanding/polishing, restore shine and cleanliness.
        
        NEGATIVE CONSTRAINTS: NO new floor, NO different wood, NO luxury redesign, NO Pinterest fantasy, NO hallucinated furniture.
        
        ANALYSIS OF SOURCE: ${analysisContext}.
        USER REQUEST: ${userInstructions}.
      `;

      const tradePrompts: Record<string, string> = {
        "Flooring": `${RENOVATION_DNA} 
        ACTION: Restore the existing floor to a perfect ${style} finish. Maintain the original wood or tiling pattern EXACTLY. Focus on technical surface restoration.`,
        "Kitchen": `${RENOVATION_DNA} 
        ACTION: Renovate/refresh existing cabinet surfaces and countertops with a ${style} treatment. Keep the exact same kitchen layout and cabinet structure.`,
        "Bathroom": `${RENOVATION_DNA} 
        ACTION: Professional deep clean and restoration of existing tiles and fixtures to a ${style} state. Zero layout changes.`,
        "Painting": `${RENOVATION_DNA} 
        ACTION: Repaint original walls with a high-quality ${style} finish. Maintain all trim, moldings, and window frames exactly as they are.`,
        "Menuiserie": `${RENOVATION_DNA} 
        ACTION: Restoration of the existing woodwork (stairs, paneling, built-ins) with a professional ${style} finish. Technical restoration only.`
      };

      const prompt = (tradePrompts[industry] || `${RENOVATION_DNA} High-end restoration in ${style} style.`) + " RESULT MUST BE ARCHITECTURAL PHOTOGRAPHY OF A RESTORED SPACE. NO REDESIGN.";

      const generatedImage = await generateVisual({
        prompt,
        imageSize: resolution,
        aspectRatio: "1:1",
        base64Image: image
      });

      setResult(generatedImage);
      setStep(5);
    } catch (error) {
      console.error("Transformation Error:", error);
      setIsGenerating(false);
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-accent border-accent/20">{t("demo.badge1")}</Badge>
              <h3 className="text-2xl font-display font-bold">{t("demo.title1")}</h3>
            </div>
            
            <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                <MapPin size={10} className="text-accent" /> {t("demo.labelCity")}
              </Label>
              <input 
                type="text"
                value={region}
                className="w-full bg-muted/20 border-muted rounded-lg px-4 py-2 text-xs focus:ring-1 focus:ring-accent outline-none"
                placeholder={t("demo.placeholderCity")}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  className={cn(
                    "relative h-24 rounded-2xl overflow-hidden group transition-all duration-500 border-2 text-left shadow-lg hover:shadow-xl",
                    industry === ind.id ? "border-accent ring-4 ring-accent/10" : "border-transparent opacity-90 hover:opacity-100"
                  )}
                  onClick={() => {
                    setIndustry(ind.id);
                    setStyle(STYLES[ind.id][0]);
                    setStep(2);
                  }}
                >
                  <img src={ind.image} alt={ind.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent group-hover:from-black/60 transition-colors" />
                  <div className="relative p-6 h-full flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-white font-black text-xl uppercase tracking-tighter block">{t(`demo.industries.${ind.id}`)}</span>
                      <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest italic flex items-center gap-1">
                        <Sparkles size={8} className="text-accent" /> {t("demo.intel.activeIntel")}
                      </p>
                    </div>
                    <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300" size={24} />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-accent border-accent/20">{t("demo.badge2")}</Badge>
              <h3 className="text-2xl font-display font-bold">{t("demo.title2")}</h3>
              <p className="text-muted-foreground text-sm">{t("demo.desc2")}</p>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload}
            />

            <div 
              className="border-2 border-dashed border-muted hover:border-accent/40 rounded-3xl p-16 min-h-[200px] flex flex-col items-center justify-center text-center space-y-6 bg-muted/20 cursor-pointer transition-all hover:bg-muted/30 group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-accent group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div className="space-y-2">
                <p className="font-black text-xl">{t("demo.uploadTitle")}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t("demo.uploadDesc")}</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-2 text-muted-foreground font-bold italic">{t("demo.orTest")}</span></div>
            </div>

            <Button
              variant="secondary"
              className="w-full h-12 rounded-xl"
              onClick={() => {
                setImage(sampleImages[industry]);
                setStep(3);
              }}
            >
              {t("demo.useSample")}
            </Button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center space-y-1">
              <Badge variant="outline" className="text-accent border-accent/20">{t("demo.badge3")}</Badge>
              <h3 className="text-2xl font-display font-bold">{t("demo.title3")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex-1 bg-muted/30 rounded-xl p-3 border border-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <Sparkles size={10} /> {t("demo.intel.systemTags")}
                  </p>
                  {isGenerating && <Loader2 size={10} className="animate-spin text-accent" />}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground line-clamp-2 md:line-clamp-none">
                  <Markdown>{diagnostics ? (typeof diagnostics === 'object' ? (diagnostics as any).system_tags.join(' • ') : diagnostics) : t("demo.analysisInProgress")}</Markdown>
                </div>
              </div>
              <div className="flex-1 bg-accent/5 rounded-xl p-3 border border-accent/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2 underline">{t("demo.intel.marketIntel")}</p>
                <div className="text-[10px] font-mono italic text-muted-foreground line-clamp-2 md:line-clamp-none">
                  <Markdown>{localTrends ? (typeof localTrends === 'object' ? (localTrends as any).market_intel.join(' • ') : localTrends) : t("demo.scanInProgress")}</Markdown>
                </div>
              </div>
            </div>

            <div className="relative h-32 rounded-xl overflow-hidden border border-muted bg-muted shadow-inner group">
              <img src={image!} alt="Uploaded" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button 
                onClick={() => { setImage(null); setStep(2); }}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <MessageSquare size={12} className="text-accent" /> {t("demo.visionLabel")}
                </Label>
                <textarea 
                  className="w-full h-20 bg-muted/20 border-muted rounded-xl p-3 text-xs focus:ring-1 focus:ring-accent outline-none resize-none"
                  placeholder={t("demo.visionPlaceholder")}
                  value={userInstructions}
                  onChange={(e) => setUserInstructions(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <Paintbrush size={12} className="text-accent" /> {t("demo.finishLabel")}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {(t(`demo.styles.${industry}`, { returnObjects: true }) as string[]).map((s) => (
                    <button
                      key={s}
                      className={cn(
                        "px-4 py-3 text-[10px] md:text-xs font-black rounded-xl border transition-all text-left flex items-center justify-between group",
                        style === s 
                          ? "bg-accent text-white border-accent shadow-xl shadow-accent/20" 
                          : "bg-background border-muted hover:border-accent/40"
                      )}
                      onClick={() => setStyle(s)}
                    >
                      <span className="truncate mr-2">{s}</span>
                      {style === s && <Sparkles size={10} className="animate-pulse shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 py-6 text-lg font-black group shadow-xl shadow-accent/20" onClick={handleGenerate} disabled={isGenerating}>
              {t("demo.transformBtn")}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-accent/20 rounded-full" />
              <div className="relative bg-background p-8 rounded-full border-2 border-accent shadow-2xl">
                <Loader2 size={40} className="animate-spin text-accent" />
              </div>
            </div>
            <div className="text-center space-y-3">
              <h4 className="text-xl font-black font-display uppercase tracking-tight">{t(`demo.loading.${loadingText}`)}</h4>
              <p className="text-xs text-muted-foreground animate-pulse font-mono">{t("demo.loading.osActive")}</p>
              
              {/* Dynamic reveal bars */}
              {(diagnostics || localTrends) && (
                <div className="mt-8 space-y-4 max-w-md mx-auto">
                   {diagnostics && (
                     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-[10px] font-mono text-accent">
                        [SCAN SYSTÈME]: {diagnostics}
                     </motion.div>
                   )}
                   {localTrends && (
                     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-muted-foreground italic">
                        [INFO MARCHÉ]: {localTrends}
                     </motion.div>
                   )}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="text-center space-y-1">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 animate-pulse">{t("demo.result.badge")}</Badge>
              <h3 className="text-xl font-display font-bold">{t("demo.result.title")}</h3>
              <p className="text-muted-foreground text-[10px] uppercase font-black">{t("demo.result.subtitle")}</p>
            </div>

            {/* Partial Result View */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-muted bg-neutral-900 shadow-3xl">
              <div className={cn("absolute inset-0 transition-all duration-1000", leadCaptured ? "" : "blur-xl saturate-[0.1]")}>
                <img src={result!} alt="Result" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              {!leadCaptured && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                  <div className="bg-accent p-3 rounded-full mb-4 shadow-2xl">
                    <Loader2 size={32} className="text-white animate-spin" />
                  </div>
                  <p className="text-white font-black text-lg uppercase italic tracking-tight">{t("demo.result.ready")}</p>
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-2">{t("demo.result.unlock")}</p>
                </div>
              )}
              
              {leadCaptured && (
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t("demo.result.imagine")}</div>
                </div>
              )}
            </div>

            {!leadCaptured ? (
              <Card className="p-6 space-y-6 border-accent bg-accent/5 relative overflow-hidden">
                <div className="space-y-2 text-center relative z-10">
                  <h4 className="text-xl font-display font-black uppercase">{t("demo.result.fullResultTitle")}</h4>
                  <p className="text-xs text-muted-foreground">{t("demo.result.fullResultDesc")}</p>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("demo.result.nameLabel")}</Label>
                      <input 
                        type="text" 
                        placeholder={t("demo.result.namePlaceholder")} 
                        className="w-full bg-background border-muted rounded-lg px-3 py-2 text-xs" 
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("demo.result.phoneLabel")}</Label>
                      <input 
                        type="tel" 
                        placeholder={t("demo.result.phonePlaceholder")} 
                        className="w-full bg-background border-muted rounded-lg px-3 py-2 text-xs" 
                        value={leadData.phone}
                        onChange={e => setLeadData({...leadData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("demo.result.emailLabel")}</Label>
                    <input 
                      type="email" 
                      placeholder={t("demo.result.emailPlaceholder")} 
                      className="w-full bg-background border-muted rounded-lg px-3 py-2 text-xs" 
                      value={leadData.email}
                      onChange={e => setLeadData({...leadData, email: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 min-h-[3.5rem] h-auto py-3 text-sm sm:text-base md:text-lg font-black italic group shadow-xl shadow-accent/20 relative z-10 flex items-center justify-center gap-2 px-4 whitespace-normal leading-tight"
                  onClick={() => {
                    if (leadData.name && leadData.email) {
                      setLeadCaptured(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {t("demo.result.unlockBtn")}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center justify-center gap-6 pt-2 border-t border-muted/20 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-accent">1,200+</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground">{t("demo.result.proCount")}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-muted/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-accent">{t("demo.result.instant")}</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground">{t("demo.result.boosted")}</span>
                  </div>
                </div>

                <p className="text-[8px] text-center text-muted-foreground relative z-10">{t("demo.result.noSpam")}</p>
              </Card>
            ) : (
              <div className="space-y-5">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-muted bg-neutral-900 shadow-3xl group cursor-ew-resize select-none"
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const updateSlider = (clientX: number) => {
                      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
                      setSliderValue([Math.round((x / rect.width) * 100)]);
                    };
                    const onMouseMove = (moveEvent: MouseEvent) => updateSlider(moveEvent.clientX);
                    const onMouseUp = () => {
                      window.removeEventListener("mousemove", onMouseMove);
                      window.removeEventListener("mouseup", onMouseUp);
                    };
                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                    updateSlider(e.clientX);
                  }}
                  onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                    setSliderValue([Math.round((x / rect.width) * 100)]);
                  }}
                >
                  {videoUrl ? (
                    <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <img src={result!} alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <img src={image!} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }} referrerPolicy="no-referrer" />
                      <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none" style={{ left: `${sliderValue[0]}%` }}>
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-2xl z-10 transition-transform group-active:scale-95">
                          <div className="flex gap-1"><div className="w-0.5 h-3 bg-accent/40 rounded-full" /><div className="w-0.5 h-3 bg-accent/40 rounded-full" /></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto min-h-12 border-accent text-accent hover:bg-accent/5 font-bold text-[10px] md:text-xs uppercase tracking-widest group whitespace-normal leading-tight py-2 px-3"
                    onClick={handleGenerateVideo}
                    disabled={isGeneratingVideo || !!videoUrl}
                  >
                    {isGeneratingVideo ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        {t("demo.result.generating")}
                      </>
                    ) : (
                      <>
                        <Video size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                        {t("demo.result.vidBtn")}
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 border-muted hover:bg-muted/50 font-bold text-xs uppercase tracking-widest text-muted-foreground"
                    onClick={() => { setStep(1); setResult(null); setImage(null); setVideoUrl(null); setLeadCaptured(false); }}
                  >
                    {t("demo.result.newProject")}
                  </Button>
                </div>

                <div className="py-8 text-center space-y-8">
                   <div className="space-y-4">
                      <h4 className="text-3xl font-display font-black uppercase italic tracking-tighter">{t("demo.result.simulatorReady")}</h4>
                      <p className="text-muted-foreground text-sm font-medium">{t("demo.result.deployDesc")}</p>
                   </div>
                   
                   <div className="p-6 bg-accent/5 border border-accent/20 rounded-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Instagram size={40} /></div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-4 text-left">{t("demo.result.toolPreview")}</p>
                      <div className="aspect-video bg-ink rounded-xl border border-white/10 flex items-center justify-center p-4">
                        <div className="text-center space-y-2">
                          <p className="font-display font-black text-white text-xs uppercase tracking-tight">SIMULATEUR IA {t(`demo.industries.${industry}`).toUpperCase()}</p>
                          <p className="text-accent text-[8px] font-bold uppercase tracking-widest">{region.toUpperCase()}</p>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                    <Button className="w-full h-16 md:h-20 bg-accent hover:bg-accent/90 text-sm md:text-lg font-black shadow-2xl shadow-accent/25 uppercase tracking-tight italic" onClick={() => window.location.href = 'https://cal.com/kontrakd/verifier-ma-ville'}>
                      {t("demo.result.reserveBtn")}
                    </Button>
                    <Button variant="ghost" className="w-full text-muted-foreground hover:bg-transparent hover:text-white font-bold uppercase tracking-widest text-xs" onClick={() => {
                        const worksElement = document.getElementById('how-it-works');
                        if (worksElement) worksElement.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      {t("demo.result.seeHowItWorks")} →
                    </Button>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest italic">
                      {t("demo.result.freeNoEngagement")}
                    </p>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full mx-auto border-muted-foreground/10 shadow-3xl overflow-hidden backdrop-blur-xl bg-background/60">
      <div className="p-5">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </Card>
  );
}
