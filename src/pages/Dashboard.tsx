import { motion } from 'framer-motion';
import { 
  FileText, Clock, ShieldCheck, BarChart3, 
  ArrowUpRight, Activity, CheckCircle2, AlertCircle,
  TrendingUp, Zap, ArrowRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Content Generated', value: '1,248', change: '+12%', icon: FileText, gradient: 'from-primary/15 to-primary/5', iconColor: 'text-primary' },
  { label: 'Time Saved (hrs)', value: '3,450', change: '+24%', icon: Clock, gradient: 'from-agent-completed/15 to-agent-completed/5', iconColor: 'text-agent-completed' },
  { label: 'Compliance Score', value: '99.8%', change: '+0.2%', icon: ShieldCheck, gradient: 'from-status-info/15 to-status-info/5', iconColor: 'text-status-info' },
  { label: 'Engagement Lift', value: '+28%', change: '+5%', icon: TrendingUp, gradient: 'from-status-warning/15 to-status-warning/5', iconColor: 'text-status-warning' },
];

const recentContent = [
  { title: 'Q3 Product Launch Blog', type: 'Blog Post', status: 'compliance', progress: 50, time: '12 min ago' },
  { title: 'EMEA Sales Email Sequence', type: 'Email', status: 'localization', progress: 75, time: '28 min ago' },
  { title: 'Weekly Newsletter v42', type: 'Newsletter', status: 'distribution', progress: 90, time: '1 hr ago' },
  { title: 'Product Update Thread', type: 'Social', status: 'completed', progress: 100, time: '2 hrs ago' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }
};

export function Dashboard() {
  const agents = useStore(state => state.agents);

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your content operations at a glance
          </p>
        </div>
        <Link to="/studio" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-glow hover:shadow-lg">
          <Zap className="w-4 h-4" /> New Content
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            variants={item}
            className="card-premium p-4 lg:p-5 group cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="flex items-center text-[11px] font-semibold text-agent-completed bg-agent-completed/10 px-2 py-0.5 rounded-full">
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
            <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground mt-0.5 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Active Workflows */}
        <motion.div variants={item} className="lg:col-span-2 card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Active Workflows</h2>
            <Link to="/pipeline" className="text-xs text-primary font-medium hover:text-primary/80 flex items-center gap-1">
              View Pipeline <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-2.5">
            {recentContent.map((workflow, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-accent/30 hover:bg-accent/60 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">{workflow.title}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">{workflow.type}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground">{workflow.time}</span>
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize",
                      workflow.status === 'completed' ? 'bg-agent-completed/10 text-agent-completed' : 'bg-primary/10 text-primary'
                    )}>
                      {workflow.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-border/60 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-700",
                      workflow.progress === 100 ? "bg-agent-completed" : "bg-primary"
                    )}
                    style={{ width: `${workflow.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Agent Status */}
        <motion.div variants={item} className="card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              Agent Fleet
            </h2>
            <Link to="/agents" className="text-xs text-primary font-medium hover:text-primary/80">Manage</Link>
          </div>
          
          <div className="space-y-1">
            {Object.values(agents).map((agent) => (
              <div key={agent.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-colors cursor-pointer group">
                <div className="shrink-0">
                  {agent.status === 'active' ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agent-completed opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-agent-completed"></span>
                    </span>
                  ) : agent.status === 'error' ? (
                    <AlertCircle className="w-3.5 h-3.5 text-agent-error" />
                  ) : agent.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-agent-completed" />
                  ) : (
                    <span className="flex h-2.5 w-2.5 rounded-full bg-agent-idle"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground leading-tight">{agent.name.replace(' Agent', '')}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{agent.currentTask}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
