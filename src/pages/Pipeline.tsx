import { motion } from 'framer-motion';
import { 
  GitMerge, CheckCircle2, CircleDashed, 
  Loader2, AlertCircle, ArrowRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Pipeline() {
  const agents = useStore(state => state.agents);

  const stages = [
    { id: 'creation', title: 'Content Creation', agent: agents.creation },
    { id: 'compliance', title: 'Brand & Compliance', agent: agents.compliance },
    { id: 'localization', title: 'Localization', agent: agents.localization },
    { id: 'distribution', title: 'Distribution', agent: agents.distribution },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Workflow Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Visualize and manage the multi-agent content lifecycle.</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <GitMerge className="w-4 h-4" /> Edit Pipeline
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-border -z-10 rounded-full" />
          
          {stages.map((stage, index) => {
            const isCompleted = stage.agent.status === 'completed';
            const isActive = stage.agent.status === 'active';
            const isError = stage.agent.status === 'error';

            return (
              <motion.div 
                key={stage.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex-1 flex flex-col items-center text-center relative w-full"
              >
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-4 transition-all duration-300 bg-card shadow-sm ${
                  isActive ? 'border-primary text-primary ring-4 ring-primary/20' :
                  isCompleted ? 'border-agent-completed text-agent-completed' :
                  isError ? 'border-agent-error text-agent-error' :
                  'border-border text-muted-foreground'
                }`}>
                  {isActive ? <Loader2 className="w-10 h-10 animate-spin" /> :
                   isCompleted ? <CheckCircle2 className="w-10 h-10" /> :
                   isError ? <AlertCircle className="w-10 h-10" /> :
                   <CircleDashed className="w-10 h-10" />}
                </div>
                
                <h3 className="text-base font-semibold text-foreground mb-1">{stage.title}</h3>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {stage.agent.name}
                </p>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${
                  isActive ? 'bg-primary/10 text-primary border border-primary/20' :
                  isCompleted ? 'bg-agent-completed/10 text-agent-completed border border-agent-completed/20' :
                  isError ? 'bg-agent-error/10 text-agent-error border border-agent-error/20' :
                  'bg-accent text-muted-foreground border border-border'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-primary animate-pulse' :
                    isCompleted ? 'bg-agent-completed' :
                    isError ? 'bg-agent-error' :
                    'bg-agent-idle'
                  }`} />
                  {stage.agent.status}
                </div>
                
                <p className="text-sm text-muted-foreground mt-4 max-w-[200px] truncate">
                  {stage.agent.currentTask}
                </p>

                {index < stages.length - 1 && (
                  <div className="md:hidden flex justify-center w-full my-4">
                    <ArrowRight className="w-6 h-6 text-border rotate-90" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Pipeline Activity</h2>
        <div className="space-y-4">
          {Object.values(agents).flatMap(a => a.logs).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5).map((log, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-accent/50 border border-border">
              <div className={`mt-0.5 w-2 h-2 rounded-full ${
                log.type === 'success' ? 'bg-agent-completed' :
                log.type === 'error' ? 'bg-agent-error' :
                log.type === 'warning' ? 'bg-status-warning' :
                'bg-primary'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">{log.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          {Object.values(agents).flatMap(a => a.logs).length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No activity recorded yet. Generate content in the Studio to see pipeline activity.</div>
          )}
        </div>
      </div>
    </div>
  );
}
