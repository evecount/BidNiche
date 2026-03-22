'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import { generateVisualOutcome, type VisualOutcomeOutput } from '@/ai/flows/visual-outcome-flow';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function VisualOutcomeTrigger({ projectTitle, projectDescription }: { projectTitle: string, projectDescription: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<VisualOutcomeOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const output = await generateVisualOutcome({
        projectTitle,
        projectDescription,
        style: 'strategic-dashboard'
      });
      setResult(output);
      toast({ title: "Visual Blueprint Ready", description: "The strategic vision has been rendered." });
    } catch (error) {
      console.error(error);
      toast({ title: "Generation Failed", description: "The visual engine is currently over capacity.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {!result ? (
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="h-16 px-12 bg-primary text-white hover:bg-primary/90 font-bold rounded-full shadow-2xl flex items-center gap-3 group transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" /> 
              Rendering Strategic Vision...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Generate Outcome Visualization
            </>
          )}
        </Button>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl bg-card">
            <CardContent className="p-0 relative group">
              <img 
                src={result.imageUrl} 
                alt="Project Outcome Blueprint" 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center space-y-4">
                <p className="text-white text-lg font-bold">Outcome Blueprint: Success Visualization</p>
                <p className="text-white/80 text-sm max-w-lg">{result.rationale}</p>
                <Button variant="secondary" className="rounded-full" asChild>
                  <a href={result.imageUrl} download={`outcome-${projectTitle}.png`}>
                    <Download className="w-4 h-4 mr-2" /> Download Blueprint
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={() => setResult(null)} className="rounded-full">
              Regenerate Vision
            </Button>
            <Button variant="ghost" className="rounded-full text-muted-foreground">
              <ImageIcon className="w-4 h-4 mr-2" /> Attachment Verified
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
