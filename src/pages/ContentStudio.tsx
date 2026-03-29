import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, Save, FileText, Upload, 
  MessageSquare, History, Play, Loader2, CheckCircle2,
  Sparkles, Copy, RotateCcw
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { streamAgentAction } from '@/lib/ai-stream';

export function ContentStudio() {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Blog Post');
  const [draft, setDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  const updateAgent = useStore(state => state.updateAgent);
  const addLog = useStore(state => state.addLog);

  // Auto-resize textarea
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
    }
  }, [draft]);

  const generateContent = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setDraft('');
    updateAgent('creation', { status: 'active', currentTask: `Generating ${type}` });
    addLog('creation', `Started generating ${type} based on user input.`, 'info');

    let accumulated = '';
    
    await streamAgentAction({
      action: 'create',
      input,
      type,
      onDelta: (text) => {
        accumulated += text;
        setDraft(accumulated);
      },
      onDone: () => {
        updateAgent('creation', { status: 'completed', currentTask: 'Draft ready' });
        addLog('creation', `Successfully generated ${type} draft.`, 'success');
        toast.success('Content generated!');
        setIsGenerating(false);
      },
      onError: (error) => {
        updateAgent('creation', { status: 'error', currentTask: 'Generation failed' });
        addLog('creation', `Error: ${error}`, 'error');
        toast.error(error);
        setIsGenerating(false);
      },
    });
  };

  const copyDraft = () => {
    navigator.clipboard.writeText(draft);
    toast.success('Copied to clipboard');
  };

  const wordCount = draft.split(/\s+/).filter(Boolean).length;

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Content Studio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Create AI-powered content with real-time streaming</p>
        </div>
        <div className="flex gap-2">
          {draft && (
            <button onClick={copyDraft} className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          )}
          <button disabled={!draft} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-medium transition-colors shadow-sm disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Input Panel */}
        <div className="lg:col-span-4 flex flex-col card-premium overflow-hidden">
          <div className="p-3.5 border-b border-border bg-accent/30 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-semibold text-sm text-foreground">Source Material</h2>
          </div>
          
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Content Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 bg-accent/60 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
              >
                <option>Blog Post</option>
                <option>Product Announcement</option>
                <option>Sales Email</option>
                <option>Social Media Thread</option>
                <option>Press Release</option>
                <option>Internal Memo</option>
              </select>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Input / Prompt</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the content you want to create, or paste source material like product specs, meeting notes, research..."
                className="w-full flex-1 min-h-[200px] p-3 bg-accent/40 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground leading-relaxed"
              />
            </div>

            <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-xl text-xs font-medium text-muted-foreground hover:bg-accent hover:border-muted-foreground/30 transition-colors">
              <Upload className="w-3.5 h-3.5" /> Upload PDF or Doc
            </button>
          </div>

          <div className="p-3.5 border-t border-border bg-accent/30">
            <button 
              onClick={generateContent}
              disabled={!input.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground hover:bg-foreground/90 text-background rounded-xl text-sm font-semibold transition-all disabled:opacity-40 shadow-premium-md hover:shadow-premium-lg"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="lg:col-span-8 flex flex-col card-premium overflow-hidden">
          <div className="p-3.5 border-b border-border bg-accent/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-agent-completed/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-agent-completed" />
              </div>
              <h2 className="font-semibold text-sm text-foreground">Editor</h2>
            </div>
            <div className="flex items-center gap-2">
              {draft && (
                <>
                  <span className="text-[10px] font-medium text-muted-foreground">{wordCount} words</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-agent-completed/10 text-agent-completed rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {isGenerating ? 'Streaming...' : 'Ready'}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto relative">
            {isGenerating && !draft ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="absolute -inset-2 rounded-3xl bg-primary/5 animate-pulse-ring" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-4">Creation Agent is writing...</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Streaming response in real-time</p>
              </div>
            ) : draft ? (
              <div className="p-6 lg:p-8">
                <textarea 
                  ref={editorRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-full min-h-[400px] text-foreground bg-transparent text-[15px] leading-[1.8] focus:outline-none resize-none"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 p-8">
                <Wand2 className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium text-center">Provide source material and click<br />"Generate with AI" to start creating</p>
              </div>
            )}
          </div>
          
          {draft && !isGenerating && (
            <div className="p-3.5 border-t border-border bg-accent/30 flex items-center justify-between">
              <button onClick={() => { setDraft(''); }} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-sm">
                Send to Compliance <Play className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
