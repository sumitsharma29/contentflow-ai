import { motion } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, CheckCircle, 
  FileText, ArrowUpRight
} from 'lucide-react';

const violations = [
  { id: 1, type: 'Tone', severity: 'medium', message: 'Language too informal for enterprise audience.', location: 'Paragraph 2', status: 'auto-fixed' },
  { id: 2, type: 'Legal', severity: 'high', message: 'Missing GDPR disclaimer for data collection.', location: 'Footer', status: 'flagged' },
  { id: 3, type: 'Brand', severity: 'low', message: 'Incorrect capitalization of product name "SmartSync".', location: 'Header', status: 'auto-fixed' },
  { id: 4, type: 'Regulatory', severity: 'high', message: 'Health claims require FDA disclaimer.', location: 'Body', status: 'flagged' },
  { id: 5, type: 'Tone', severity: 'low', message: 'Exclamation mark overuse detected.', location: 'Conclusion', status: 'auto-fixed' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function Compliance() {
  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Compliance & Governance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor brand consistency and regulatory adherence</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Run Scan
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Health Score</span>
            <ShieldCheck className="w-4 h-4 text-agent-completed" />
          </div>
          <p className="text-3xl font-bold text-foreground">98.5%</p>
          <p className="text-[11px] text-agent-completed mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3 h-3" /> +1.2% from last week
          </p>
        </div>
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auto-Fixed</span>
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">142</p>
          <p className="text-[11px] text-muted-foreground mt-1 font-medium">This month</p>
        </div>
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Flagged</span>
            <AlertTriangle className="w-4 h-4 text-status-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">3</p>
          <p className="text-[11px] text-status-warning mt-1 font-medium">Requires review</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="card-premium overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Violations Log</h2>
          <select className="text-xs border border-border rounded-lg px-2.5 py-1 bg-accent text-muted-foreground outline-none">
            <option>All Types</option>
            <option>Brand</option>
            <option>Legal</option>
            <option>Tone</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {violations.map((v) => (
                <tr key={v.id} className="hover:bg-accent/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground text-sm">{v.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      v.severity === 'high' ? 'bg-agent-error/10 text-agent-error' :
                      v.severity === 'medium' ? 'bg-status-warning/10 text-status-warning' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {v.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">{v.message}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> {v.location}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-[11px] font-semibold ${
                      v.status === 'auto-fixed' ? 'text-agent-completed' : 'text-status-warning'
                    }`}>
                      {v.status === 'auto-fixed' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-primary hover:text-primary/80 font-medium text-xs">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
