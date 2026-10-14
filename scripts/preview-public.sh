#!/usr/bin/env bash

set -Eeuo pipefail

readonly APP_PORT="${APP_PORT:-4200}"
readonly PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cloudflared_pid=""
angular_pid=""

cleanup() {
  local exit_code=$?

  if [[ -n "$angular_pid" ]] && kill -0 "$angular_pid" 2>/dev/null; then
    kill "$angular_pid" 2>/dev/null || true
  fi

  if [[ -n "$cloudflared_pid" ]] && kill -0 "$cloudflared_pid" 2>/dev/null; then
    kill "$cloudflared_pid" 2>/dev/null || true
  fi

  exit "$exit_code"
}

trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

command -v npm >/dev/null || { echo "Không tìm thấy npm." >&2; exit 1; }
command -v cloudflared >/dev/null || {
  echo "Không tìm thấy cloudflared. Cài bằng: brew install cloudflared" >&2
  exit 1
}

if [[ -n "$(lsof -tiTCP:"$APP_PORT" -sTCP:LISTEN 2>/dev/null || true)" ]]; then
  echo "Cổng $APP_PORT đang được sử dụng. Hãy dừng server cũ hoặc dùng APP_PORT khác." >&2
  exit 1
fi

echo "[1/4] Build production để kiểm tra lỗi..."
npm run build

echo "[2/4] Khởi động Cloudflare Tunnel..."
cloudflared_log="/tmp/wedding-invitation-cloudflared.log"
cloudflared tunnel --url "http://127.0.0.1:$APP_PORT" >"$cloudflared_log" 2>&1 &
cloudflared_pid=$!

public_url=""
for _ in {1..30}; do
  public_url="$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$cloudflared_log" | head -n 1 || true)"

  [[ -n "$public_url" ]] && break
  sleep 1
done

if [[ -z "$public_url" ]]; then
  echo "Không đọc được public URL từ Cloudflare Tunnel. Log: $cloudflared_log" >&2
  exit 1
fi

tunnel_host="${public_url#https://}"

echo "[3/4] Khởi động Angular trên cổng $APP_PORT..."
npx ng serve \
  --host 0.0.0.0 \
  --port "$APP_PORT" \
  --allowed-hosts "$tunnel_host" \
  >/tmp/wedding-invitation-angular.log 2>&1 &
angular_pid=$!

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$APP_PORT/" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -fsS "http://127.0.0.1:$APP_PORT/" >/dev/null 2>&1; then
  echo "Angular không khởi động được. Log: /tmp/wedding-invitation-angular.log" >&2
  exit 1
fi

if ! curl -fsS "$public_url/" >/dev/null 2>&1; then
  echo "Public URL chưa phản hồi. Log Cloudflare: $cloudflared_log" >&2
  exit 1
fi

echo "[4/4] Preview public đã sẵn sàng"
echo "Local : http://127.0.0.1:$APP_PORT"
echo "Public: $public_url"
echo "Nhấn Ctrl+C để dừng"

wait "$angular_pid"
