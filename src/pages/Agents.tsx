import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, Network, 
  Settings, RefreshCw, 
  Terminal, X, Beaker
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

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
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Agent Fleet</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor and configure your AI workforce.</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Sync State
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Object.values(agents).map((agent, i) => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-[400px]"
          >
            <div className="p-5 border-b border-border bg-accent/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  agent.status === 'active' ? 'bg-primary/10 text-primary' :
                  agent.status === 'error' ? 'bg-agent-error/10 text-agent-error' :
                  agent.status === 'completed' ? 'bg-agent-completed/10 text-agent-completed' :
                  'bg-accent text-muted-foreground'
                }`}>
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-primary animate-pulse' :
                      agent.status === 'error' ? 'bg-agent-error' :
                      agent.status === 'completed' ? 'bg-agent-completed' :
                      'bg-agent-idle'
                    }`} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openConfig(agent.id)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  title="Configure Agent"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Current Task</span>
                <span className="text-sm text-muted-foreground truncate max-w-[250px]">{agent.currentTask}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/50 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Database className="w-3.5 h-3.5" /> Model
                  </span>
                  <span className="text-sm font-medium text-foreground truncate block">{agentConfigs[agent.id]?.model}</span>
                </div>
                <div className="bg-accent/50 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Network className="w-3.5 h-3.5" /> Latency
                  </span>
                  <span className="text-sm font-medium text-foreground">~1.2s</span>
                </div>
              </div>

              {/* Logs Terminal */}
              <div className="flex-1 bg-foreground rounded-xl p-4 overflow-hidden flex flex-col relative">
                <div className="flex items-center gap-2 mb-3 shrink-0">
                  <Terminal className="w-4 h-4 text-background/40" />
                  <span className="text-xs font-mono text-background/40 uppercase tracking-wider">Agent Trace Logs</span>
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2">
                  {agent.logs.length > 0 ? agent.logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-background/30 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                      <span className={
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'success' ? 'text-green-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-background/60'
                      }>
                        {log.message}
                      </span>
                    </div>
                  )) : (
                    <div className="text-background/20 italic">Waiting for activity...</div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-foreground to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Config Modal */}
      <AnimatePresence>
        {configModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl shadow-xl w-full max-w-md border border-border overflow-hidden"
            >
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">Configure {agents[configModalOpen]?.name}</h3>
                <button onClick={() => setConfigModalOpen(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Model</label>
                  <select 
                    value={tempConfig.model}
                    onChange={(e) => setTempConfig({...tempConfig, model: e.target.value})}
                    className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                    <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                    <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Temperature: {tempConfig.temperature}
                  </label>
                  <input 
                    type="range" min="0" max="1" step="0.1"
                    value={tempConfig.temperature}
                    onChange={(e) => setTempConfig({...tempConfig, temperature: parseFloat(e.target.value)})}
                    className="w-full accent-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Max Tokens</label>
                  <input 
                    type="number"
                    value={tempConfig.maxTokens}
                    onChange={(e) => setTempConfig({...tempConfig, maxTokens: parseInt(e.target.value)})}
                    className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="p-5 border-t border-border bg-accent/50 flex justify-end gap-3">
                <button 
                  onClick={() => setConfigModalOpen(null)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveConfig}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
