import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, Users, Globe, 
  Shield, Bell, Database, Key, Check
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const navItems = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'team', label: 'Team & Access', icon: Users },
  { id: 'brand', label: 'Brand Guidelines', icon: Shield, active: true },
  { id: 'localization', label: 'Localization', icon: Globe },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function SettingsPage() {
  return (
    <motion.div className="space-y-6 max-w-5xl mx-auto" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Configure your workspace and integrations</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-0.5">
          {navItems.map((navItem) => (
            <button 
              key={navItem.id}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                navItem.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <navItem.icon className={`w-4 h-4 ${navItem.active ? 'text-primary' : 'text-muted-foreground'}`} />
              {navItem.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="card-premium overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Brand Guidelines</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Rules for the Compliance Agent</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand Tone & Voice</label>
                <textarea 
                  className="w-full h-28 p-3 bg-accent/40 border border-border rounded-xl text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none leading-relaxed"
                  defaultValue="Professional, authoritative, yet approachable. Avoid overly technical jargon when speaking to end-users. Always use active voice. Do not use exclamation marks excessively."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Restricted Terms</label>
                <div className="flex flex-wrap gap-1.5">
                  {['cheap', 'guarantee', '100% foolproof', 'magic', 'unlimited'].map(term => (
                    <span key={term} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-agent-error/8 text-agent-error text-xs font-medium border border-agent-error/15">
                      {term} <button className="hover:text-agent-error/70 ml-0.5">&times;</button>
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent text-muted-foreground text-xs font-medium border border-border hover:bg-accent/80 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="card-premium overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Compliance Strictness</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Auto-correct vs. flag for review</p>
            </div>
            
            <div className="p-4 space-y-3">
              {[
                { title: 'Auto-Correction', desc: 'Fix minor tone and grammar issues automatically', on: true },
                { title: 'Strict Legal Review', desc: 'Flag content mentioning pricing, guarantees, or user data', on: true },
                { title: 'Profanity Filter', desc: 'Block or flag inappropriate language', on: false },
              ].map((toggle) => (
                <div key={toggle.title} className="flex items-center justify-between p-3 rounded-xl border border-border bg-accent/30">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{toggle.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{toggle.desc}</p>
                  </div>
                  <div className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors ${toggle.on ? 'bg-primary' : 'bg-border'}`}>
                    <div className={`absolute top-0.5 w-4.5 h-4.5 bg-card rounded-full shadow-sm transition-transform ${toggle.on ? 'right-0.5' : 'left-0.5'}`} 
                      style={{ width: '18px', height: '18px', top: '2px', ...(toggle.on ? { right: '2px' } : { left: '2px' }) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
