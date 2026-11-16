// Lead events sent straight to GA4 (G-HGZT1XL04Y) with gtag('event', …).
// The GA4 Google tag that GTM-WMLFG797 loads reads gtag commands from the shared
// dataLayer, so no GTM trigger or tag is needed (checked on mcprogc.com,
// 2026-11-16). Do not also add GTM tags for these names: GA4 would count twice.
//   contact_form_submit – "Send Message" pressed with valid fields (an attempt)
//   generate_lead  – contact form delivered (GA4 recommended event name)
//   phone_click    – any tel: link clicked
//   email_click    – any mailto: link clicked
// Clicks carry link_location (header, hero, cta, footer, …); GA4 records the page itself.
// Key events (conversions) are marked in GA4 Admin; site code cannot set them.

type LeadEvent = 'contact_form_submit' | 'generate_lead' | 'phone_click' | 'email_click';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushLeadEvent(event: LeadEvent, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // index.html defines gtag(); keep the same shim if it is missing. gtag.js only
  // accepts a real `arguments` object, not an array.
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  window.gtag('event', event, params);
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
