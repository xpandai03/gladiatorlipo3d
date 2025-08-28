import { UTMParams, MetaData } from '../types';

export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content')
  };
}

export function captureMetadata(): MetaData {
  if (typeof window === 'undefined') {
    return {
      ts: new Date().toISOString(),
      referrer: '',
      userAgent: '',
      path: '/'
    };
  }
  
  // Get timezone offset in format like "-07:00" or "+05:30"
  const offset = new Date().getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;
  const sign = offset <= 0 ? '+' : '-';
  const tzOffset = `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
  // Create ISO string with timezone
  const now = new Date();
  const localISOTime = now.toISOString().slice(0, -1) + tzOffset;
  
  return {
    ts: localISOTime,
    referrer: document.referrer || '',
    userAgent: navigator.userAgent || '',
    path: window.location.pathname || '/'
  };
}