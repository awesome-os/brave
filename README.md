# `@awesome-os/brave`

Debloated rolling-latest **Brave Browser (Shields-only, zero crypto/Rewards/updater bloat)** hydrated on demand from [`awesome-os/b8g-ghost`](https://github.com/awesome-os/b8g-ghost) (`cas-v1`) with a `~120 KB` native C11 **Lumi Hydration Splash** launcher.

## Quick Install & Usage

### Windows (PowerShell 1-liner)

```powershell
irm https://github.com/awesome-os/brave/releases/latest/download/install.ps1 | iex
```

### Linux (x64 / ARM64) & macOS (Apple Silicon)

```sh
curl -fsSL https://github.com/awesome-os/brave/releases/latest/download/install.sh | sh
```

### CLI Usage

```powershell
# Inspect installed launcher version & help
brave --version
brave --help

# Launch Brave (Shields-only) or open a URL directly
brave
brave https://awesome-os.com

# Optional: store hydrated CAS layers on a custom drive/path
$env:B8G_GHOST_CACHE_DIR = "D:\b8g-cas"   # POSIX: export B8G_GHOST_CACHE_DIR=/data/b8g-cas
brave https://awesome-os.com
```

### Releases & Verification

- **Latest Release:** [`awesome-os/brave` Releases](https://github.com/awesome-os/brave/releases/latest) — includes `SHA256SUMS.txt` and the 5-OS matrix (`win64`, `linux-x64`, `linux-arm64`, `macos-arm64`, `wasm32-wasi`) built via [`awesome-os/maintenance-workflows`](https://github.com/awesome-os/maintenance-workflows).

## Highlights

- **Zero Installer & Zero Updater Bloat:** Launches detached with `--no-first-run --disable-brave-update` from `~/.b8g/cas/brave/<sha256>/`.
- **SHA-256 Verified Ghost CAS (`cas-v1`):** Downloads `brave-win64.tar.zst` / `brave-linux-x64.tar.zst`, verifies SHA-256 before extraction, and supports Keep-Last-5 rollback via `BRAVE_GHOST_SHA256=<sha256>`.
- **Instant `< 15 ms` Lumi Hydration Splash:** Native Win32 GDI / POSIX C11 launcher (`src/brave_launcher.c`) displays the embedded Lumi White Dragon icon and streams live `GHOST_PROGRESS <pct> <msg>` updates during cold CAS hydration.
- **Erasable TypeScript Direct Execution:** Zero build/transpile step (`erasableSyntaxOnly: true`, `noEmit: true`), runs directly on Node 22.18+ / Node 24.

## Usage

### Native Launcher (`brave.exe` / `brave`)

```powershell
# Launch Brave (Shields-only) with Lumi Hydration Splash
.\dist\brave.exe https://awesome-os.com

# Inspect version & CAS asset key
.\dist\brave.exe --version
```

### Node CLI (`src/cli.mts`)

```powershell
# Print version and platform CAS key
node src/cli.mts --version

# Resolve CAS index and print launch plan JSON without spawning
node src/cli.mts --dry-run https://awesome-os.com

# Stream GHOST_PROGRESS lines during hydration
$env:BRAVE_PROGRESS="1"; node src/cli.mts
```

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `BRAVE_GHOST_SHA256` | Pin to a Keep-Last-5 historical SHA-256 from `b8g-ghost @ cas-v1`. |
| `BRAVE_PROGRESS=1` | Emit `GHOST_PROGRESS <pct> <msg>` lines on stdout during hydration. |
| `BRAVE_CLI_PATH` | Override path to `src/cli.mts` for the native C11 launcher. |
| `B8G_GHOST_CACHE_DIR` | Override default `~/.b8g/cas` cache directory. |

## Build & Test

```powershell
# Run CAS & CLI test suite
node --test test/brave-cas.test.mts

# Compile Windows native launcher (~120 KB with embedded Lumi icon)
zig cc -target x86_64-windows-gnu -std=c11 -Os -s -Wl,--subsystem,windows -Wall -Wextra src/brave_launcher.c lumi.res -lgdi32 -luser32 -o dist/brave.exe

# Compile Linux native launcher
gcc -std=c11 -Os -s -Wall -Wextra src/brave_launcher.c -o dist/brave
```

## License

Dual-licensed under **MPL-2.0 OR MIT**.
