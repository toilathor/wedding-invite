---
name: mobile-preview
description: Start the Angular wedding invitation locally and expose a temporary HTTPS preview URL for mobile testing. Use after completing frontend changes in this project or whenever the user asks to test the site from a phone.
---

# Mobile Preview

## Workflow

1. Run `npm run build` and fix any build error before sharing a preview.
2. Start an ngrok tunnel first when no server is running, read its hostname from `http://127.0.0.1:4040/api/tunnels`, then run Angular with that exact hostname allowed:

   ```sh
   npx ng serve --host 0.0.0.0 --allowed-hosts <ngrok-hostname>
   ```

3. Expose port 4200 with the installed `ngrok` binary:

   ```sh
   ngrok http 4200 --log=stdout
   ```

4. Read the public `https://*.ngrok-free.app` URL from the ngrok output or its local API at `http://127.0.0.1:4040/api/tunnels`.
5. Verify the URL responds and report the URL, local URL, and that the tunnel is temporary.

## Conventions

- Keep Angular bound to `0.0.0.0`. Angular's application builder requires the exact ngrok hostname in `--allowed-hosts`; do not use the unsupported `all` value or disable host checking.
- Never expose Firebase credentials, local files, or unrelated ports.
- Do not claim the preview is available until the tunnel URL has been read from ngrok and verified.
- Mention that the URL stops working when the ngrok process ends; do not promise a permanent URL.
- After a completed frontend task, proactively perform this workflow so the user can test from a phone or another location.

## Cleanup

Stop only the ngrok process started for the current preview when the user asks to close the preview. Do not stop an unrelated Angular server without confirmation.
