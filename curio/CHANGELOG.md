# Changelog

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
