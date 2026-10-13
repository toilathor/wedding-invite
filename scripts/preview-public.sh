#!/usr/bin/env bash

set -Eeuo pipefail

readonly APP_PORT="${APP_PORT:-4200}"
readonly NGROK_API="${NGROK_API:-http://127.0.0.1:4040/api/tunnels}"
readonly PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

ngrok_pid=""
angular_pid=""

cleanup() {
  local exit_code=$?

  if [[ -n "$angular_pid" ]] && kill -0 "$angular_pid" 2>/dev/null; then
    kill "$angular_pid" 2>/dev/null || true
  fi

  if [[ -n "$ngrok_pid" ]] && kill -0 "$ngrok_pid" 2>/dev/null; then
    kill "$ngrok_pid" 2>/dev/null || true
  fi

  exit "$exit_code"
}

trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

command -v npm >/dev/null || { echo "Không tìm thấy npm." >&2; exit 1; }
command -v ngrok >/dev/null || {
  echo "Không tìm thấy ngrok. Hãy cài ngrok và đăng nhập trước." >&2
  exit 1
}

if [[ -n "$(lsof -tiTCP:"$APP_PORT" -sTCP:LISTEN 2>/dev/null || true)" ]]; then
  echo "Cổng $APP_PORT đang được sử dụng. Hãy dừng server cũ hoặc dùng APP_PORT khác." >&2
  exit 1
fi

if [[ -n "$(lsof -tiTCP:4040 -sTCP:LISTEN 2>/dev/null || true)" ]]; then
  echo "Cổng 4040 đang được sử dụng. Hãy dừng ngrok cũ trước khi chạy script." >&2
  exit 1
fi

echo "[1/4] Build production để kiểm tra lỗi..."
npm run build

echo "[2/4] Khởi động ngrok..."
ngrok http "$APP_PORT" --log=stdout >/tmp/wedding-invite-ngrok.log 2>&1 &
ngrok_pid=$!

public_url=""
for _ in {1..30}; do
  public_url="$(curl -fsS "$NGROK_API" 2>/dev/null | node -e '
    let input = "";
    process.stdin.on("data", chunk => input += chunk);
    process.stdin.on("end", () => {
      try {
        const tunnel = JSON.parse(input).tunnels?.find(item => item.public_url?.startsWith("https://"));
        process.stdout.write(tunnel?.public_url || "");
      } catch (_) {}
    });
  ' || true)"

  [[ -n "$public_url" ]] && break
  sleep 1
done

if [[ -z "$public_url" ]]; then
  echo "Không đọc được public URL từ ngrok. Log: /tmp/wedding-invite-ngrok.log" >&2
  exit 1
fi

ngrok_host="${public_url#https://}"

echo "[3/4] Khởi động Angular trên cổng $APP_PORT..."
npx ng serve \
  --host 0.0.0.0 \
  --port "$APP_PORT" \
  --allowed-hosts "$ngrok_host" \
  >/tmp/wedding-invite-angular.log 2>&1 &
angular_pid=$!

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$APP_PORT/" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -fsS "http://127.0.0.1:$APP_PORT/" >/dev/null 2>&1; then
  echo "Angular không khởi động được. Log: /tmp/wedding-invite-angular.log" >&2
  exit 1
fi

if ! curl -fsS "$public_url/" >/dev/null 2>&1; then
  echo "Public URL chưa phản hồi. Log ngrok: /tmp/wedding-invite-ngrok.log" >&2
  exit 1
fi

echo "[4/4] Preview public đã sẵn sàng"
echo "Local : http://127.0.0.1:$APP_PORT"
echo "Mobile: $public_url"
echo "Nhấn Ctrl+C để dừng preview do script này tạo."

wait "$angular_pid"
