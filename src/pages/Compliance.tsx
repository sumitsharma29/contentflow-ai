import { 
  ShieldCheck, AlertTriangle, CheckCircle, 
  FileText, ArrowRight
} from 'lucide-react';

const violations = [
  { id: 1, type: 'Tone', severity: 'medium', message: 'Language too informal for enterprise audience.', location: 'Paragraph 2', status: 'auto-fixed' },
  { id: 2, type: 'Legal', severity: 'high', message: 'Missing GDPR disclaimer for data collection.', location: 'Footer', status: 'flagged' },
  { id: 3, type: 'Brand', severity: 'low', message: 'Incorrect capitalization of product name "SmartSync".', location: 'Header', status: 'auto-fixed' },
  { id: 4, type: 'Regulatory', severity: 'high', message: 'Health claims require FDA disclaimer.', location: 'Body', status: 'flagged' },
  { id: 5, type: 'Tone', severity: 'low', message: 'Exclamation mark overuse detected.', location: 'Conclusion', status: 'auto-fixed' },
];

export function Compliance() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Compliance & Governance</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor brand consistency and regulatory adherence.</p>
        </div>
        <button className="bg-card border border-border hover:bg-accent text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Run Full Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Overall Health</h3>
            <ShieldCheck className="w-5 h-5 text-agent-completed" />
          </div>
          <p className="text-3xl font-semibold text-foreground">98.5%</p>
          <p className="text-xs text-agent-completed mt-1 flex items-center gap-1">
            <ArrowRight className="w-3 h-3 -rotate-45" /> +1.2% from last week
          </p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Auto-Fixed Issues</h3>
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-semibold text-foreground">142</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Flagged for Review</h3>
            <AlertTriangle className="w-5 h-5 text-status-warning" />
          </div>
          <p className="text-3xl font-semibold text-foreground">3</p>
          <p className="text-xs text-status-warning mt-1 flex items-center gap-1">
            Requires human attention
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Violations Log</h2>
          <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-accent text-muted-foreground outline-none">
            <option>All Types</option>
            <option>Brand</option>
            <option>Legal</option>
            <option>Tone</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-accent/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {violations.map((v) => (
                <tr key={v.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{v.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      v.severity === 'high' ? 'bg-agent-error/10 text-agent-error' :
                      v.severity === 'medium' ? 'bg-status-warning/10 text-status-warning' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {v.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-md truncate">{v.message}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" /> {v.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${
                      v.status === 'auto-fixed' ? 'text-agent-completed' : 'text-status-warning'
                    }`}>
                      {v.status === 'auto-fixed' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 font-medium text-sm">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
