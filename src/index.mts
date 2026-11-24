/**
 * @file src/index.mts
 * @description Public API for @awesome-os/brave: CAS hydration and launch helpers.
 */

export {
  applyKeepLast5Pin,
  ensureBraveBinary,
  fetchGhostIndex,
  GHOST_CAS_BASE_URL,
  GHOST_INDEX_URL,
  getBraveAssetKey,
  getBraveExecutableRelPath,
  getGhostCacheDir,
  resolveBraveEntry,
  tryResolveBraveEntry,
  type GhostCasEntry,
  type GhostCasHistoryItem,
  type GhostIndex,
  type HydratedBraveResult,
} from './hydrate.mts';

export {
  buildLaunchPlan,
  DEFAULT_BRAVE_FLAGS,
  getPackageVersion,
  parseCliArgs,
  runCli,
  type LaunchPlan,
  type ParsedCliArgs,
} from './cli.mts';
