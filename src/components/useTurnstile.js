/**
 * useTurnstile.js
 *
 * Cloudflare Turnstile for the site's forms: the newsletter and the contact
 * form. The script loads on the first focus inside the form, not with the
 * page, so reading a page does not contact Cloudflare. The widget renders
 * invisibly and shows itself only when the check needs a click. The check
 * takes about a second, which filling in the form covers. A quicker submit
 * waits for the token in getToken.
 *
 * Usage: put <div ref={widgetHost} /> in the form, call arm() on its focus,
 * await getToken() on submit, and call reset() after a post, as a token
 * works once. A form that took its widget host off the page and puts it back
 * calls remount(), as the widget does not follow to the new host.
 *
 * @param {string} siteKey - The public Turnstile key.
 * @param {object} options - `action`: a label the server checks, so a token
 *   made for one form is refused by another. `onError`: called when the
 *   script cannot load.
 * @return {object} widgetHost, arm, getToken, reset, remount and checkShown
 *   (true once the widget asked for a click).
 */
import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const TOKEN_WAIT_MS = 10000; // how long a submit waits for the invisible check

/** Loads the Turnstile script once per page and resolves when it is ready. */
function loadTurnstile() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!window.__turnstileLoading) {
    window.__turnstileLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return window.__turnstileLoading;
}

export default function useTurnstile(siteKey, { action, onError } = {}) {
  const widgetHost = useRef(null);
  const widgetId = useRef(null);
  const waiters = useRef([]); // submits waiting for the check to finish
  const errorHandler = useRef(onError);
  errorHandler.current = onError;
  const [armed, setArmed] = useState(false);
  const [checkShown, setCheckShown] = useState(false);
  const [mounts, setMounts] = useState(0); // a new value renders the widget again

  const currentToken = () => (window.turnstile && widgetId.current !== null ? window.turnstile.getResponse(widgetId.current) : '');
  const releaseWaiters = () => waiters.current.splice(0).forEach((release) => release());

  useEffect(() => {
    if (!armed) return undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetHost.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(widgetHost.current, {
          sitekey: siteKey,
          size: 'flexible',
          appearance: 'interaction-only',
          ...(action ? { action } : {}),
          callback: releaseWaiters,
          'before-interactive-callback': () => {
            setCheckShown(true);
            releaseWaiters(); // a waiting submit stops and shows the challenge message
          },
        });
      })
      .catch(() => {
        errorHandler.current?.();
        releaseWaiters();
      });
    return () => {
      cancelled = true;
    };
  }, [siteKey, action, armed, mounts]);

  /** The check's token, waiting up to TOKEN_WAIT_MS if it has not arrived yet. */
  function getToken() {
    const token = currentToken();
    if (token || checkShown) return Promise.resolve(token);
    setArmed(true);
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(currentToken()), TOKEN_WAIT_MS);
      waiters.current.push(() => {
        clearTimeout(timer);
        resolve(currentToken());
      });
    });
  }

  function reset() {
    if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
  }

  function remount() {
    if (window.turnstile && widgetId.current !== null) window.turnstile.remove(widgetId.current);
    widgetId.current = null;
    setCheckShown(false);
    setMounts((count) => count + 1);
  }

  return { widgetHost, arm: () => setArmed(true), getToken, reset, remount, checkShown };
}
