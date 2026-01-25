#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT_DIR"

PKG_MANAGER="npm"
PM_FIELD=$(node -e "const pm=require('./package.json').packageManager||''; console.log(pm)" 2>/dev/null || true)
if [[ "$PM_FIELD" == pnpm@* ]]; then
  PKG_MANAGER="pnpm"
elif [[ "$PM_FIELD" == yarn@* ]]; then
  PKG_MANAGER="yarn"
elif [[ "$PM_FIELD" == bun@* ]]; then
  PKG_MANAGER="bun"
elif [[ -f pnpm-lock.yaml ]]; then
  PKG_MANAGER="pnpm"
elif [[ -f yarn.lock ]]; then
  PKG_MANAGER="yarn"
elif [[ -f bun.lockb ]]; then
  PKG_MANAGER="bun"
elif [[ -f package-lock.json ]]; then
  PKG_MANAGER="npm"
fi

run_pkg() {
  case "$PKG_MANAGER" in
    pnpm) pnpm "$@" ;;
    yarn) yarn "$@" ;;
    bun) bun "$@" ;;
    npm) npm "$@" ;;
  esac
}

run_script() {
  local script="$1"
  shift || true
  run_pkg run "$script" -- "$@"
}

run_exec() {
  case "$PKG_MANAGER" in
    pnpm) pnpm exec "$@" ;;
    yarn) yarn run "$@" ;;
    bun) bun x "$@" ;;
    npm) npx --no-install "$@" ;;
  esac
}

has_script() {
  node -e "const s=require('./package.json').scripts||{}; process.exit(s[process.argv[1]]?0:1)" "$1"
}

step() {
  echo
  echo "==> $1"
}

step "Lint"
run_script lint

step "Typecheck"
if has_script typecheck; then
  run_script typecheck
else
  run_exec tsc -p tsconfig.json --noEmit
fi

if [[ -f prisma/schema.prisma ]]; then
  step "Prisma validate"
  run_exec prisma validate
fi

step "Tests"
run_script test

echo
printf "All checks passed with %s.\n" "$PKG_MANAGER"
