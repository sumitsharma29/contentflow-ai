import { motion } from 'framer-motion';
import { 
  FileText, Clock, ShieldCheck, BarChart3, 
  ArrowUpRight, Activity, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const stats = [
  { label: 'Content Generated', value: '1,248', change: '+12%', icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Time Saved (hrs)', value: '3,450', change: '+24%', icon: Clock, color: 'text-agent-completed', bg: 'bg-agent-completed/10' },
  { label: 'Compliance Score', value: '99.8%', change: '+0.2%', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Engagement Lift', value: '+28%', change: '+5%', icon: BarChart3, color: 'text-status-warning', bg: 'bg-status-warning/10' },
];

export function Dashboard() {
  const agents = useStore(state => state.agents);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back. Here's what your agents are doing today.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          New Workflow
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-medium text-agent-completed bg-agent-completed/10 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-semibold text-foreground mt-1 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Active Workflows</h2>
            <button className="text-sm text-primary font-medium hover:text-primary/80">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'Q3 Product Launch Blog', status: 'compliance', progress: 50 },
              { id: 'EMEA Sales Email Sequence', status: 'localization', progress: 75 },
              { id: 'Weekly Newsletter', status: 'distribution', progress: 90 },
            ].map((workflow, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{workflow.id}</h4>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                    {workflow.status}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${workflow.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-muted-foreground" />
              Agent Fleet
            </h2>
          </div>
          
          <div className="space-y-4">
            {Object.values(agents).map((agent) => (
              <div key={agent.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent transition-colors">
                <div className="mt-1">
                  {agent.status === 'active' ? (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agent-completed opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-agent-completed"></span>
                    </span>
                  ) : agent.status === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-agent-error" />
                  ) : agent.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <span className="relative flex h-3 w-3 rounded-full bg-agent-idle"></span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">{agent.currentTask}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
