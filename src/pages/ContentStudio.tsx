import { useState } from 'react';
import { 
  Wand2, Save, FileText, Upload, 
  MessageSquare, History, Play, Loader2, CheckCircle2
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function ContentStudio() {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Blog Post');
  const [draft, setDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const updateAgent = useStore(state => state.updateAgent);
  const addLog = useStore(state => state.addLog);

  const generateContent = async () => {
    if (!input) return;
    setIsGenerating(true);
    updateAgent('creation', { status: 'active', currentTask: `Generating ${type}` });
    addLog('creation', `Started generating ${type} based on user input.`, 'info');
    
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockContent = `# ${type}: ${input.slice(0, 50)}...\n\nThis is an AI-generated ${type.toLowerCase()} based on your input. The content has been crafted to match your brand guidelines and target audience.\n\n## Key Points\n\n- Point 1: ${input.slice(0, 30)}\n- Point 2: Strategic insights derived from your input\n- Point 3: Actionable recommendations\n\n## Conclusion\n\nThis draft is ready for compliance review and localization. Click "Send to Compliance" to proceed through the pipeline.`;
    
    setDraft(mockContent);
    updateAgent('creation', { status: 'completed', currentTask: 'Draft ready' });
    addLog('creation', `Successfully generated ${type} draft.`, 'success');
    toast.success('Content generated successfully!');
    setIsGenerating(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Content Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">Collaborate with the Creation Agent to draft content.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent transition-colors shadow-sm">
            <History className="w-4 h-4" /> Version History
          </button>
          <button 
            disabled={!draft}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Input Panel */}
        <div className="lg:col-span-4 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-accent/50 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Source Material</h2>
          </div>
          
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Content Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 bg-accent border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
              >
                <option>Blog Post</option>
                <option>Product Announcement</option>
                <option>Sales Email</option>
                <option>Social Media Thread</option>
              </select>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col min-h-[300px]">
              <label className="text-sm font-medium text-foreground">Raw Input / Prompt</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste product specs, meeting notes, or describe what you want to write..."
                className="w-full flex-1 p-3 bg-accent border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="pt-2">
              <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:border-muted-foreground/30 transition-colors">
                <Upload className="w-4 h-4" /> Upload PDF or Doc
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-accent/50">
            <button 
              onClick={generateContent}
              disabled={!input || isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground hover:bg-foreground/90 text-background rounded-xl text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="lg:col-span-8 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-accent/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-agent-completed" />
              <h2 className="font-semibold text-foreground">Editor</h2>
            </div>
            {draft && (
              <span className="text-xs font-medium px-2.5 py-1 bg-agent-completed/10 text-agent-completed rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Draft ready
              </span>
            )}
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto relative">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Creation Agent is drafting...</p>
              </div>
            ) : draft ? (
              <textarea 
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full h-full min-h-[500px] text-foreground bg-transparent text-base leading-relaxed focus:outline-none resize-none"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40">
                <Wand2 className="w-12 h-12 mb-4" />
                <p className="text-sm font-medium">Provide input and click generate to start writing.</p>
              </div>
            )}
          </div>
          
          {draft && (
            <div className="p-4 border-t border-border bg-accent/50 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors shadow-sm">
                Send to Compliance <Play className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
