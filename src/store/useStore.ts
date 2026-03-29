import { create } from 'zustand';

export type AgentStatus = 'idle' | 'active' | 'error' | 'completed';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  currentTask: string;
  logs: { timestamp: string; message: string; type: 'info' | 'success' | 'warning' | 'error' }[];
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

interface AppState {
  agents: Record<string, Agent>;
  agentConfigs: Record<string, AgentConfig>;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  updateAgentConfig: (id: string, config: Partial<AgentConfig>) => void;
  addLog: (id: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  resetAgents: () => void;
}

const initialAgents: Record<string, Agent> = {
  creation: { id: 'creation', name: 'Content Creation Agent', status: 'idle', currentTask: 'Waiting for input', logs: [] },
  compliance: { id: 'compliance', name: 'Compliance Agent', status: 'idle', currentTask: 'Waiting for draft', logs: [] },
  localization: { id: 'localization', name: 'Localization Agent', status: 'idle', currentTask: 'Waiting for approval', logs: [] },
  distribution: { id: 'distribution', name: 'Distribution Agent', status: 'idle', currentTask: 'Waiting for localized content', logs: [] },
};

const initialConfigs: Record<string, AgentConfig> = {
  creation: { model: 'gemini-3.1-pro-preview', temperature: 0.7, maxTokens: 2048 },
  compliance: { model: 'gemini-3.1-pro-preview', temperature: 0.2, maxTokens: 2048 },
  localization: { model: 'gemini-3.1-pro-preview', temperature: 0.3, maxTokens: 2048 },
  distribution: { model: 'gemini-3.1-pro-preview', temperature: 0.5, maxTokens: 2048 },
};

export const useStore = create<AppState>((set, get) => ({
  agents: initialAgents,
  agentConfigs: initialConfigs,
  updateAgent: (id, updates) => set((state) => ({
    agents: {
      ...state.agents,
      [id]: { ...state.agents[id], ...updates }
    }
  })),
  updateAgentConfig: (id, config) => set((state) => ({
    agentConfigs: {
      ...state.agentConfigs,
      [id]: { ...state.agentConfigs[id], ...config }
    }
  })),
  addLog: (id, message, type = 'info') => set((state) => ({
    agents: {
      ...state.agents,
      [id]: {
        ...state.agents[id],
        logs: [...state.agents[id].logs, { timestamp: new Date().toISOString(), message, type }]
      }
    }
  })),
  resetAgents: () => set({ agents: initialAgents }),
}));
