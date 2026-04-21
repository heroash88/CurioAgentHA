# Changelog

## v1.3.17 -- 2026-04-21

- Automated release bump.

## v1.3.16 -- 2026-04-21

- Automated release bump.

## v1.3.15 -- 2026-04-21

- Automated release bump.

# Changelog

## v1.3.14 -- 2026-04-21

- Automated release bump.

## v1.3.13 -- 2026-04-20

- Automated release bump.

## v1.3.12 -- 2026-04-20

- Automated release bump.

## v1.3.11 -- 2026-04-20

- Automated release bump.

## v1.3.10 -- 2026-04-20

- Automated release bump.

## v1.3.9 -- 2026-04-20

- Automated release bump.

## v1.3.8 -- 2026-04-20

- Automated release bump.

## v1.3.7 -- 2026-04-20

- Automated release bump.

## v1.3.6 -- 2026-04-20

- Automated release bump.

## v1.3.5 -- 2026-04-20

- Automated release bump.

## v1.3.4 -- 2026-04-20

- Automated release bump.

## v1.3.3 -- 2026-04-20

- Automated release bump.

## v1.3.2 -- 2026-04-20

- Automated release bump.

## 1.3.1

- Fix: addon crash loop on startup ("s6-envdir: unable to envdir /run/s6/container_environment"). The 1.3.0 Dockerfile set an `ENTRYPOINT` that bypassed s6-overlay. Reverted to letting s6 run as PID 1 so `with-contenv bashio` works again.

## 1.3.0

- Bundled Nova Sonic WebSocket proxy -- Nova now works out of the box. No more running a separate `npm run nova:proxy` process. The addon image includes Node and runs the proxy on 127.0.0.1:8081; nginx exposes it at `/nova-proxy`.
- Frontend auto-detects the bundled proxy when running in the addon (or RPi kiosk / Electron), so users only need their Nova API key.

## 1.2.1

- Fix: Google, Microsoft, and Slack OAuth sign-in failing with "crypto.randomUUID is not a function" when the addon is accessed over plain HTTP (non-secure context)
- Fix: stale bundle after updates -- switched service worker to network-first for index.html and added auto skipWaiting, so browsers pick up new builds automatically
- Docs: added Google Sign-In setup walkthrough (OAuth client creation + redirect URI allowlist) to the addon README

## 1.2.0

- Dashboard: new widgets (HA camera, HA light, HA sensor, robot face)
- Cards: Gmail, Outlook Mail, Slack, Flight, Chore, Energy, Security, Sports, and more
- Face identity and speaker recognition with profile management
- New Kiro face personality variant
- Routines, notifications, and proactive engine
- HA entity filters, background ticker, wake lock
- Many UI/service improvements and performance tuning

## 1.1.0

- Auto-login: When running as an HA addon, Curio automatically connects to Home Assistant using the Supervisor token -- no manual token entry or OAuth needed
- Added nginx reverse proxy for HA Core API (addon proxies requests server-side)
- Enabled `homeassistant_api` and `auth_api` in addon config for Supervisor API access
- Runtime config injection via run.sh for ingress detection
- Ingress-aware URL handling for correct API routing through HA's ingress proxy

## 1.0.0

- Initial release
- Full Curio web app served as a Home Assistant add-on
- Ingress support for seamless sidebar integration
- Multi-architecture support (amd64, aarch64, armhf, armv7, i386)
