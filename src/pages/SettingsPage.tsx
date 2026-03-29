import { 
  Settings as SettingsIcon, Users, Globe, 
  Shield, Bell, Database, Key, Check
} from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Settings & Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your workspace, agents, and API connections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          {[
            { id: 'general', label: 'General', icon: SettingsIcon },
            { id: 'team', label: 'Team & Access', icon: Users },
            { id: 'brand', label: 'Brand Guidelines', icon: Shield, active: true },
            { id: 'localization', label: 'Localization', icon: Globe },
            { id: 'integrations', label: 'Integrations', icon: Database },
            { id: 'api', label: 'API Keys', icon: Key },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => (
            <button 
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Brand Guidelines</h2>
              <p className="text-sm text-muted-foreground mt-1">Configure the rules that the Compliance Agent uses to review content.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Brand Tone & Voice</label>
                <textarea 
                  className="w-full h-32 p-4 bg-accent/50 border border-border rounded-xl text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  defaultValue="Professional, authoritative, yet approachable. Avoid overly technical jargon when speaking to end-users. Always use active voice. Do not use exclamation marks excessively."
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Restricted Terms</label>
                <div className="flex flex-wrap gap-2">
                  {['cheap', 'guarantee', '100% foolproof', 'magic'].map(term => (
                    <span key={term} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-agent-error/10 text-agent-error text-sm font-medium border border-agent-error/20">
                      {term} <button className="hover:text-agent-error/70">&times;</button>
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-muted-foreground text-sm font-medium border border-border hover:bg-accent/80 transition-colors">
                    + Add Term
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Compliance Strictness</h2>
              <p className="text-sm text-muted-foreground mt-1">Set how aggressively the agent should auto-correct vs. flag for review.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-accent/50">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Auto-Correction</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Automatically fix minor tone and grammar issues.</p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full shadow-sm" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-accent/50">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Strict Legal Review</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Flag any content that mentions pricing, guarantees, or user data.</p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
