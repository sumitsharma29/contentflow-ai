import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, 
  MousePointerClick, ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const timeSeriesData = [
  { name: 'Jan', engagement: 4000, reach: 2400, conversions: 800 },
  { name: 'Feb', engagement: 3000, reach: 1398, conversions: 600 },
  { name: 'Mar', engagement: 5200, reach: 9800, conversions: 1200 },
  { name: 'Apr', engagement: 2780, reach: 3908, conversions: 900 },
  { name: 'May', engagement: 4890, reach: 4800, conversions: 1100 },
  { name: 'Jun', engagement: 3390, reach: 3800, conversions: 950 },
  { name: 'Jul', engagement: 5490, reach: 6300, conversions: 1400 },
];

const channelData = [
  { name: 'LinkedIn', value: 420 },
  { name: 'Twitter/X', value: 340 },
  { name: 'Blog', value: 310 },
  { name: 'Email', value: 280 },
  { name: 'YouTube', value: 190 },
];

const analyticsStats = [
  { label: 'Total Reach', value: '2.4M', change: '+18%', icon: Users, gradient: 'from-primary/15 to-primary/5', iconColor: 'text-primary' },
  { label: 'Engagement Rate', value: '4.8%', change: '+12%', icon: TrendingUp, gradient: 'from-agent-completed/15 to-agent-completed/5', iconColor: 'text-agent-completed' },
  { label: 'Click-Through', value: '2.1%', change: '+8%', icon: MousePointerClick, gradient: 'from-status-info/15 to-status-info/5', iconColor: 'text-status-info' },
  { label: 'Content ROI', value: '142%', change: '+24%', icon: BarChart3, gradient: 'from-status-warning/15 to-status-warning/5', iconColor: 'text-status-warning' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Analytics() {
  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Analytics & Insights</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-driven performance metrics</p>
        </div>
        <select className="bg-card border border-border text-muted-foreground px-3 py-1.5 rounded-xl text-xs font-medium outline-none shadow-sm">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {analyticsStats.map((stat, i) => (
          <div key={i} className="card-premium p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <span className="flex items-center text-[10px] font-semibold text-agent-completed bg-agent-completed/10 px-1.5 py-0.5 rounded-full">
                {stat.change} <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
              </span>
            </div>
            <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-0.5 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        <motion.div variants={item} className="lg:col-span-2 card-premium p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Engagement Overview</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 11 }} dx={-5} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 91%)" strokeOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(220, 13%, 91%)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px', padding: '8px 12px' }} />
                <Area type="monotone" dataKey="reach" stroke="hsl(152, 69%, 40%)" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="hsl(221, 83%, 53%)" strokeWidth={2} fillOpacity={1} fill="url(#colorEng)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="card-premium p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Channel Mix</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 12, fontWeight: 500 }} width={70} />
                <Tooltip cursor={{ fill: 'hsl(220, 14%, 92%, 0.4)' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px' }} />
                <Bar dataKey="value" fill="hsl(221, 83%, 53%)" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
