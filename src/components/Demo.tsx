import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Paintbrush, ArrowRight, Loader2, Sparkles, CheckCircle2, X, MapPin, MessageSquare, Video, Play, Maximize2 } from "lucide-react";
import { generateVisual, analyzeSpaceAdvanced, getLocalRenovationIntelligence, generateRenovationVideo } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

type Industry = "Flooring" | "Kitchen" | "Bathroom" | "Painting" | "Cleaning";

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
    id: "Cleaning", 
    label: "Nettoyage", 
    image: "https://i.postimg.cc/HLf7Rf2K/Bond-Cleaning-New-Farm.avif", 
    prompt: "organized home space" 
  },
];

const STYLES: Record<Industry, string[]> = {
  Flooring: ["Chêne Mat", "Noyer Satiné", "Teck Brillant", "Chêne Clair", "Noyer Sombre"],
  Kitchen: ["Minimaliste Moderne", "Classique Shaker", "Loft Industriel", "Noir Épuré", "Blanc Pur"],
  Bathroom: ["Marbre de Luxe", "Ardoise Contemporaine", "Spa Chaleureux", "Blanc Minimaliste"],
  Painting: ["Beige Chaleureux", "Gris Frais", "Vert Forêt", "Bleu Nuit", "Blanc Mat"],
  Cleaning: ["Nettoyage Profond", "Élimination des Taches", "Mode Organisation"],
};

export function Demo() {
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
  const [loadingText, setLoadingText] = React.useState("Analyse de l'espace...");
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
    Cleaning: "https://i.postimg.cc/HLf7Rf2K/Bond-Cleaning-New-Farm.avif",
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
        setLoadingText("Diagnostic IA...");
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
      setLoadingText("Analyse de l'Architecture...");
      
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
      setLoadingText("Calcul de l'impact marché...");
      setLocalTrends(analysisResult.market_intel.join(" • "));
      await new Promise(r => setTimeout(r, 2000));

      setLoadingText("Génération du résultat final...");
      
      const tradePrompts: Record<string, string> = {
        "Flooring": `Edit ONLY the floor surface. Replace with ${style} wood flooring. Keep ALL walls, furniture, objects, ceiling, lighting, shadows, perspective IDENTICAL. Photorealistic renovation result. Same room, same angle, same everything except the floor.`,
        "Kitchen": `Full premium kitchen remodel in ${style} style. Redesign all cabinetry, countertops, and hardware. CRITICAL: Keep structural elements (windows, doors, entryways, ceiling layout) 100% IDENTICAL to the source. Photorealistic hospitality-grade interior.`,
        "Bathroom": `Full luxury bathroom remodel in ${style} style. Replace all tiles, vanity, and plumbing fixtures. CRITICAL: Maintain exact structural anchors—windows, doors, and floorplan positions must remain identical to the original photo. Photorealistic spa-grade render.`,
        "Painting": `Edit ONLY the wall color and surface finish. Apply ${style} paint finish. Keep all furniture, floor, ceiling, lighting, objects IDENTICAL. Photorealistic interior painting result. Same room, new walls only.`,
        "Cleaning": `Show this exact space professionally cleaned and restored. Remove all dirt, stains, clutter. Keep all structural elements IDENTICAL. Before/after professional cleaning result.`
      };

      const prompt = tradePrompts[industry] || `High-end renovation of the space using ${style} finish. Photorealistic interior.`;

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
              <Badge variant="outline" className="text-accent border-accent/20">Étape 1/3 — Quel est votre métier ?</Badge>
              <h3 className="text-2xl font-display font-bold">Votre client va voir son résultat en direct.</h3>
            </div>
            
            <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                <MapPin size={10} className="text-accent" /> Votre ville
              </Label>
              <input 
                type="text"
                value={region}
                className="w-full bg-muted/20 border-muted rounded-lg px-4 py-2 text-xs focus:ring-1 focus:ring-accent outline-none"
                placeholder="e.g. Nice, France"
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
                      <span className="text-white font-black text-xl uppercase tracking-tighter block">{ind.label}</span>
                      <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest italic flex items-center gap-1">
                        <Sparkles size={8} className="text-accent" /> Intelligence Active
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
              <Badge variant="outline" className="text-accent border-accent/20">Étape 2 / 3</Badge>
              <h3 className="text-2xl font-display font-bold">Nourrir le Moteur</h3>
              <p className="text-muted-foreground text-sm">Uploadez une photo du projet actuel.</p>
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
                <p className="font-black text-xl">Uploadez la Source</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">L'intégrité architecturale est maintenue par défaut.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-2 text-muted-foreground font-bold italic">Ou testez le mécanisme</span></div>
            </div>

            <Button
              variant="secondary"
              className="w-full h-12 rounded-xl"
              onClick={() => {
                setImage(sampleImages[industry]);
                setStep(3);
              }}
            >
              Utiliser un Échantillon Pro
            </Button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center space-y-1">
              <Badge variant="outline" className="text-accent border-accent/20">Étape 3 / 3</Badge>
              <h3 className="text-2xl font-display font-bold">Commandes Finales</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex-1 bg-muted/30 rounded-xl p-3 border border-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <Sparkles size={10} /> System Tags
                  </p>
                  {isGenerating && <Loader2 size={10} className="animate-spin text-accent" />}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground line-clamp-2 md:line-clamp-none">
                  <Markdown>{diagnostics ? (typeof diagnostics === 'object' ? (diagnostics as any).system_tags.join(' • ') : diagnostics) : "Analyse en cours..."}</Markdown>
                </div>
              </div>
              <div className="flex-1 bg-accent/5 rounded-xl p-3 border border-accent/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2 underline">Market Intel</p>
                <div className="text-[10px] font-mono italic text-muted-foreground line-clamp-2 md:line-clamp-none">
                  <Markdown>{localTrends ? (typeof localTrends === 'object' ? (localTrends as any).market_intel.join(' • ') : localTrends) : "Scan en cours..."}</Markdown>
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
                  <MessageSquare size={12} className="text-accent" /> Votre vision / Consignes
                </Label>
                <textarea 
                  className="w-full h-20 bg-muted/20 border-muted rounded-xl p-3 text-xs focus:ring-1 focus:ring-accent outline-none resize-none"
                  placeholder="Ex: Gardez les murs, mais mettez un bois plus gris..."
                  value={userInstructions}
                  onChange={(e) => setUserInstructions(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <Paintbrush size={12} className="text-accent" /> Choisissez la finition
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLES[industry].map((s) => (
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
              TRANSFORMER LA RÉALITÉ
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
              <h4 className="text-xl font-black font-display uppercase tracking-tight">{loadingText}</h4>
              <p className="text-xs text-muted-foreground animate-pulse font-mono">Intelligence Gemini 3.1 Pro Activée...</p>
              
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
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 animate-pulse">Transformation Prête</Badge>
              <h3 className="text-xl font-display font-bold">Votre projet est terminé</h3>
              <p className="text-muted-foreground text-[10px] uppercase font-black">Débloquez le résultat complet ci-dessous</p>
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
                  <p className="text-white font-black text-lg uppercase italic tracking-tight">Votre transformation est prête.</p>
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-2">Débloquez le résultat haute-fidélité</p>
                </div>
              )}
              
              {leadCaptured && (
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Imaginer offrir ceci à vos clients</div>
                </div>
              )}
            </div>

            {!leadCaptured ? (
              <Card className="p-6 space-y-6 border-accent bg-accent/5 relative overflow-hidden">
                <div className="space-y-2 text-center relative z-10">
                  <h4 className="text-xl font-display font-black uppercase">Voir la transformation complète</h4>
                  <p className="text-xs text-muted-foreground">Entrez vos coordonnées pour débloquer votre résultat</p>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Nom complet</Label>
                      <input 
                        type="text" 
                        placeholder="Jean-Marc" 
                        className="w-full bg-background border-muted rounded-lg px-3 py-2 text-xs" 
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Téléphone</Label>
                      <input 
                        type="tel" 
                        placeholder="06 12 34 56 78" 
                        className="w-full bg-background border-muted rounded-lg px-3 py-2 text-xs" 
                        value={leadData.phone}
                        onChange={e => setLeadData({...leadData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Email Professionnel</Label>
                    <input 
                      type="email" 
                      placeholder="jm@renovation.fr" 
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
                  DÉBLOQUER MON RÉSULTAT
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center justify-center gap-6 pt-2 border-t border-muted/20 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-accent">1,200+</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Professionnels</span>
                  </div>
                  <div className="w-[1px] h-4 bg-muted/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-accent">INSTANTANÉ</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Conversion boostée</span>
                  </div>
                </div>

                <p className="text-[8px] text-center text-muted-foreground relative z-10">Zéro spam. Uniquement votre résultat.</p>
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
                        Génération...
                      </>
                    ) : (
                      <>
                        <Video size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                        Vidéo 3D
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 border-muted hover:bg-muted/50 font-bold text-xs uppercase tracking-widest text-muted-foreground"
                    onClick={() => { setStep(1); setResult(null); setImage(null); setVideoUrl(null); setLeadCaptured(false); }}
                  >
                    Nouveau Projet
                  </Button>
                </div>

                <div className="py-4 text-center space-y-4">
                   <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl">
                      <p className="text-accent font-black text-lg uppercase italic tracking-tight">Votre client vient de voir son résultat.</p>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Signez maintenant.</p>
                   </div>
                   <Button className="w-full bg-accent hover:bg-accent/90 py-8 text-sm md:text-lg font-black shadow-2xl shadow-accent/25 uppercase tracking-tight italic whitespace-normal h-auto leading-tight" onClick={() => window.location.href = '#pricing'}>
                    DÉPLOYER CECI DANS MON ENTREPRISE
                  </Button>
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
