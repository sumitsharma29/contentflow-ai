import { 
  BarChart3, TrendingUp, Users, 
  MousePointerClick, ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const data = [
  { name: 'Jan', engagement: 4000, reach: 2400 },
  { name: 'Feb', engagement: 3000, reach: 1398 },
  { name: 'Mar', engagement: 2000, reach: 9800 },
  { name: 'Apr', engagement: 2780, reach: 3908 },
  { name: 'May', engagement: 1890, reach: 4800 },
  { name: 'Jun', engagement: 2390, reach: 3800 },
  { name: 'Jul', engagement: 3490, reach: 4300 },
];

const channelData = [
  { name: 'LinkedIn', value: 400 },
  { name: 'Twitter', value: 300 },
  { name: 'Blog', value: 300 },
  { name: 'Email', value: 200 },
];

const analyticsStats = [
  { label: 'Total Reach', value: '2.4M', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Avg. Engagement Rate', value: '4.8%', icon: TrendingUp, color: 'text-agent-completed', bg: 'bg-agent-completed/10' },
  { label: 'Click-Through Rate', value: '2.1%', icon: MousePointerClick, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Content ROI', value: '142%', icon: BarChart3, color: 'text-status-warning', bg: 'bg-status-warning/10' },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Analytics & Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-driven performance metrics across all distributed content.</p>
        </div>
        <select className="bg-card border border-border text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium outline-none shadow-sm">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsStats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-medium text-agent-completed bg-agent-completed/10 px-2 py-1 rounded-full">
                +12% <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-semibold text-foreground mt-1 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Engagement Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 14%, 45%)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 14%, 45%)', fontSize: 12 }} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214, 20%, 90%)" strokeOpacity={0.5} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214, 20%, 90%)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="reach" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="hsl(217, 91%, 60%)" strokeWidth={2} fillOpacity={1} fill="url(#colorEngagement)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Channel Performance</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 14%, 45%)', fontSize: 13, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: 'hsl(214, 20%, 90%, 0.3)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
