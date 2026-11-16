// Lead events for Google Tag Manager (container GTM-WMLFG797).
// The site only pushes to window.dataLayer; GTM turns these into GA4 events:
//   contact_form_submit – "Send Message" pressed with valid fields (an attempt)
//   generate_lead  – contact form delivered (GA4 recommended event name)
//   phone_click    – any tel: link clicked
//   email_click    – any mailto: link clicked
// Each event carries page_path and link_location (header, hero, footer, …) so
// GA4 can show which page and which button produced the lead.

type LeadEvent = 'contact_form_submit' | 'generate_lead' | 'phone_click' | 'email_click';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushLeadEvent(event: LeadEvent, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

/** Where on the page a link sits: data-track, else the nearest landmark or section id. */
function linkLocation(link: Element): string {
  const tagged = link.closest('[data-track]')?.getAttribute('data-track');
  if (tagged) return tagged;
  const area = link.closest('header, nav, footer, section[id], main');
  if (!area) return 'other';
  return area.id || area.tagName.toLowerCase();
}

/** One delegated listener covers every tel:/mailto: link, including prerendered ones. */
export function trackContactLinkClicks(): void {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) pushLeadEvent('phone_click', { link_location: linkLocation(link) });
      else if (href.startsWith('mailto:')) pushLeadEvent('email_click', { link_location: linkLocation(link) });
    },
    true,
  );
}
