import { motion } from 'framer-motion';
import { 
  GitMerge, CheckCircle2, CircleDashed, 
  Loader2, AlertCircle, ArrowRight, ArrowDown
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Pipeline() {
  const agents = useStore(state => state.agents);

  const stages = [
    { id: 'creation', title: 'Content Creation', description: 'AI drafts content from source material', agent: agents.creation },
    { id: 'compliance', title: 'Brand & Compliance', description: 'Reviews tone, legal, and brand rules', agent: agents.compliance },
    { id: 'localization', title: 'Localization', description: 'Adapts for target markets & languages', agent: agents.localization },
    { id: 'distribution', title: 'Distribution', description: 'Publishes across selected channels', agent: agents.distribution },
  ];

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Workflow Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Visualize the multi-agent content lifecycle</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
          <GitMerge className="w-3.5 h-3.5" /> Edit Pipeline
        </button>
      </motion.div>

      {/* Pipeline Visualization */}
      <motion.div variants={item} className="card-premium p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-0">
          {stages.map((stage, index) => {
            const isCompleted = stage.agent.status === 'completed';
            const isActive = stage.agent.status === 'active';
            const isError = stage.agent.status === 'error';

            return (
              <div key={stage.id} className="flex-1 flex flex-col md:flex-row items-center">
                <motion.div 
                  variants={item}
                  className="flex flex-col items-center text-center w-full"
                >
                  {/* Stage node */}
                  <div className={cn(
                    "w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center mb-3 border-2 transition-all duration-300 bg-card relative",
                    isActive ? 'border-primary text-primary shadow-glow' :
                    isCompleted ? 'border-agent-completed text-agent-completed' :
                    isError ? 'border-agent-error text-agent-error' :
                    'border-border text-muted-foreground'
                  )}>
                    {isActive && <div className="absolute -inset-1 rounded-2xl border border-primary/20 animate-pulse" />}
                    {isActive ? <Loader2 className="w-8 h-8 lg:w-10 lg:h-10 animate-spin" /> :
                     isCompleted ? <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10" /> :
                     isError ? <AlertCircle className="w-8 h-8 lg:w-10 lg:h-10" /> :
                     <CircleDashed className="w-8 h-8 lg:w-10 lg:h-10" />}
                  </div>
                  
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">{stage.title}</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[160px] leading-tight mb-2">
                    {stage.description}
                  </p>
                  
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1.5 uppercase tracking-wider",
                    isActive ? 'bg-primary/10 text-primary' :
                    isCompleted ? 'bg-agent-completed/10 text-agent-completed' :
                    isError ? 'bg-agent-error/10 text-agent-error' :
                    'bg-muted text-muted-foreground'
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isActive ? 'bg-primary animate-pulse' :
                      isCompleted ? 'bg-agent-completed' :
                      isError ? 'bg-agent-error' :
                      'bg-agent-idle'
                    )} />
                    {stage.agent.status}
                  </div>
                </motion.div>

                {/* Connector arrow */}
                {index < stages.length - 1 && (
                  <>
                    <div className="hidden md:flex items-center px-2 lg:px-4 mt-[-48px]">
                      <div className="w-8 lg:w-12 h-px bg-border" />
                      <ArrowRight className="w-4 h-4 text-border -ml-1 shrink-0" />
                    </div>
                    <div className="md:hidden flex justify-center py-2">
                      <ArrowDown className="w-4 h-4 text-border" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Activity Log */}
      <motion.div variants={item} className="card-premium p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Pipeline Activity</h2>
        <div className="space-y-2">
          {Object.values(agents).flatMap(a => a.logs).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5).map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 border border-border/50">
              <div className={cn(
                "mt-1 w-2 h-2 rounded-full shrink-0",
                log.type === 'success' ? 'bg-agent-completed' :
                log.type === 'error' ? 'bg-agent-error' :
                log.type === 'warning' ? 'bg-status-warning' :
                'bg-primary'
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{log.message}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{new Date(log.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          {Object.values(agents).flatMap(a => a.logs).length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              <GitMerge className="w-8 h-8 mx-auto mb-2 opacity-20" />
              No activity yet. Generate content in the Studio to see pipeline activity.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
