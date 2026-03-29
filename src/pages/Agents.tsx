import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, Network, 
  Settings, RefreshCw, 
  Terminal, X
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Agents() {
  const agents = useStore(state => state.agents);
  const agentConfigs = useStore(state => state.agentConfigs);
  const updateAgentConfig = useStore(state => state.updateAgentConfig);

  const [configModalOpen, setConfigModalOpen] = useState<string | null>(null);
  const [tempConfig, setTempConfig] = useState({ model: '', temperature: 0, maxTokens: 0 });

  const openConfig = (id: string) => {
    setTempConfig(agentConfigs[id]);
    setConfigModalOpen(id);
  };

  const saveConfig = () => {
    if (configModalOpen) {
      updateAgentConfig(configModalOpen, tempConfig);
      setConfigModalOpen(null);
      toast.success('Agent configuration saved');
    }
  };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Agent Fleet</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor and configure your AI agents</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Sync
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {Object.values(agents).map((agent, i) => (
          <motion.div 
            key={agent.id}
            variants={item}
            className="card-premium overflow-hidden flex flex-col h-[380px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-accent/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  agent.status === 'active' ? 'bg-primary/10 text-primary' :
                  agent.status === 'error' ? 'bg-agent-error/10 text-agent-error' :
                  agent.status === 'completed' ? 'bg-agent-completed/10 text-agent-completed' :
                  'bg-muted text-muted-foreground'
                )}>
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      agent.status === 'active' ? 'bg-primary animate-pulse' :
                      agent.status === 'error' ? 'bg-agent-error' :
                      agent.status === 'completed' ? 'bg-agent-completed' :
                      'bg-agent-idle'
                    )} />
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => openConfig(agent.id)}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Current Task</span>
                <span className="text-foreground truncate max-w-[200px]">{agent.currentTask}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-accent/40 p-2.5 rounded-xl border border-border/50">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mb-0.5">
                    <Database className="w-3 h-3" /> Model
                  </span>
                  <span className="text-xs font-medium text-foreground truncate block">{agentConfigs[agent.id]?.model}</span>
                </div>
                <div className="bg-accent/40 p-2.5 rounded-xl border border-border/50">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mb-0.5">
                    <Network className="w-3 h-3" /> Temp
                  </span>
                  <span className="text-xs font-medium text-foreground">{agentConfigs[agent.id]?.temperature}</span>
                </div>
              </div>

              {/* Logs Terminal */}
              <div className="flex-1 bg-foreground rounded-xl p-3 overflow-hidden flex flex-col relative">
                <div className="flex items-center gap-1.5 mb-2 shrink-0">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-agent-error/60" />
                    <span className="w-2 h-2 rounded-full bg-status-warning/60" />
                    <span className="w-2 h-2 rounded-full bg-agent-completed/60" />
                  </div>
                  <span className="text-[9px] font-mono text-background/30 uppercase tracking-wider ml-1">trace logs</span>
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1">
                  {agent.logs.length > 0 ? agent.logs.slice(-8).map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-background/25 shrink-0">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      <span className={
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'success' ? 'text-green-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-background/50'
                      }>
                        {log.message}
                      </span>
                    </div>
                  )) : (
                    <div className="text-background/15 italic flex items-center gap-1.5">
                      <Terminal className="w-3 h-3" /> Awaiting activity...
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-foreground to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Config Modal */}
      <AnimatePresence>
        {configModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl shadow-premium-lg w-full max-w-sm border border-border overflow-hidden"
            >
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-sm font-semibold text-foreground">Configure {agents[configModalOpen]?.name}</h3>
                <button onClick={() => setConfigModalOpen(null)} className="text-muted-foreground hover:text-foreground p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Model</label>
                  <select 
                    value={tempConfig.model}
                    onChange={(e) => setTempConfig({...tempConfig, model: e.target.value})}
                    className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                    <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                    <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                    <option value="gpt-5-mini">gpt-5-mini</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Temperature: {tempConfig.temperature}
                  </label>
                  <input 
                    type="range" min="0" max="1" step="0.1"
                    value={tempConfig.temperature}
                    onChange={(e) => setTempConfig({...tempConfig, temperature: parseFloat(e.target.value)})}
                    className="w-full accent-primary h-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Max Tokens</label>
                  <input 
                    type="number"
                    value={tempConfig.maxTokens}
                    onChange={(e) => setTempConfig({...tempConfig, maxTokens: parseInt(e.target.value)})}
                    className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-border bg-accent/30 flex justify-end gap-2">
                <button 
                  onClick={() => setConfigModalOpen(null)}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveConfig}
                  className="px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
