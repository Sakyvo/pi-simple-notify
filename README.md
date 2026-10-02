# pi-simple-notify

Desktop notifications for [pi](https://github.com/earendil-works/pi) **without any OS notification infrastructure**.

Born on **Windows 10 LTSC**, which has the system toast/notification facility stripped out. Packages that rely on SnoreToast/protocol-handler toast activation simply do nothing there. This project deliberately avoids OS toasts altogether: a self-hosted WPF popup is spawned by a tiny PowerShell daemon, so the only requirements are **Windows + PowerShell + the .NET framework that already ships with Windows**. No Action Center, no toast service, no registry hacks.

On other platforms it falls back to native mechanisms (macOS `osascript`, Linux `notify-send`), but the WPF popup on Windows is the primary, tested path.

## Features

- **Dark, topmost, non-stealing popup** — bottom-right corner, auto-fades on a configurable timeout
- **Continue button jumps back to the exact terminal pane** (integrates with [Pebrel](https://github.com/Sakyvo/pebrel) when available; falls back to focusing the cached terminal window)
- **Sounds**: completion plays `Asterisk`, blocking prompts play `Asterisk+Exclamation`, hard errors play `Hand`
- **Hard-error notifications are visually distinct**: red border, `⚠ ERROR ·` prefix, and the body shows the actual `errorMessage` text
- **Notification title = terminal/tab name** (Pebrel tab title, or your working-directory name outside Pebrel), so you can tell which pi task finished when you juggle many windows
- **Blocks-aware**: alerts when an interactive questionnaire opens and waits for your answer (rpiv-ask-user-question and pi-plan-mode's `plan_mode_question`)
- **Mute timers** (3/30/60 min) that cross-instance sync, global hotkeys (`Alt+[` dismiss, `Alt+]` continue), `/notify` command suite

## Install

```bash
pi install npm:pi-simple-notify
```

Pi resolves the `pi.extensions` manifest; no extra wiring. `koffi` (used for Win32 foreground-window detection) is installed as a regular npm dependency.

To try without persisting:

```bash
pi -e npm:pi-simple-notify
```

## Configuration

In pi, run `/notify` to toggle, or `/notify status` to inspect. Persistent settings live in `~/.pi/agent/notify.json`:

```json
{
  "enabled": true,
  "timeout": 15,
  "opacity": 1.0,
  "messageMode": "response",
  "lang": "en",
  "muteUntil": 0
}
```

| Setting | Values | Meaning |
| --- | --- | --- |
| `timeout` | 5–60 (s) | Auto-dismiss time for the popup |
| `opacity` | 0.3–1.0 | Popup opacity |
| `messageMode` | `response` \| `fixed` | Body = last assistant reply excerpt vs. fixed text |
| `lang` | `zh` `en` `ja` `ko` | Popup labels |

Command completions: `/notify on|off|timeout <n>|opacity <n>|message <mode>|lang <code>|status`.

## Behavior details

- Popup suppressed when the terminal is already in the foreground, or during active compaction.
- `stopReason=error` from the agent turn is always treated as final (pi's internal retry budget is already exhausted at that point) and alerted immediately as a hard error.
- Pebrel integration and pi-plan-mode awareness are **optional enhancements**: non-Pebrel setups fall back to `SetForegroundWindow`; without pi-plan-mode the listener simply never fires.
- Debug log: `%TEMP%/pi-notify-debug.log`.

## Attribution

Derived from [`pi-win-notify`](https://npmjs.com/package/pi-win-notify) by **ryanchan720** (originally `pi-desktop-notify`), MIT licensed. See [LICENSE](./LICENSE).

## License

MIT © Sakyvo
