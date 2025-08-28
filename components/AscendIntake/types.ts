export interface FormData {
  name: string;
  email: string;
  phone_raw: string;
  phone_e164?: string;
  note?: string;
  consent_communications: boolean;
}

export interface UTMParams {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
}

export interface MetaData {
  ts: string;
  referrer: string;
  userAgent: string;
  path: string;
}

export interface SubmissionPayload {
  name: string;
  email: string;
  phone: string;
  phone_raw: string;
  note?: string;
  consent_communications: boolean;
  timestamp: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface StepConfig {
  key: keyof FormData;
  prompt: string;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'checkbox';
}

export const WEBHOOK_URL = 'https://n8n-familyconnection.agentglu.agency/webhook/emerai/lead';
export const REDIRECT_URL = 'https://v0-chat-ui-with-vibration-mu-pearl.vercel.app/';
export const SOURCE = 'ascend_modal';