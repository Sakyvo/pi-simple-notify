/**
 * pi-simple-notify — package entry point.
 *
 * Files:
 *   index.ts           ← pi extension discovery entry (this file)
 *   desktop-notify.ts  ← main logic (forked from pi-win-notify@1.0.15 by ryanchan720, MIT)
 *   host.ps1           ← WPF dark popup host
 *
 * Derived from ryanchan720/pi-desktop-notify (pi-win-notify), MIT licensed.
 */

export { soundApproval } from "./desktop-notify";
export { default } from "./desktop-notify";
