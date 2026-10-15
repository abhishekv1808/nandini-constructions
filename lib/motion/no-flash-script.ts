import { REDUCED_MOTION_QUERY } from './breakpoints';

/**
 * Inlined in <head>. Adds `html.motion-ok` before first paint when JS runs and motion is allowed;
 * every hidden initial state is scoped under it, so no-JS visitors see everything. If the app
 * bundle hasn't booted within 4s (blocked/failed JS), the class is removed so content can't stay
 * hidden.
 */
export const NO_FLASH_SCRIPT = `(function(){try{var d=document.documentElement;if(!matchMedia('${REDUCED_MOTION_QUERY}').matches){d.classList.add('motion-ok');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion-ok')},4000)}}catch(e){}})();`;
