#!/usr/bin/env bash
# Run by deploy/deploy.sh after every deploy, as ubuntu. Does nothing unless the
# chatbot service has been set up (deploy/chatbot/setup.sh).
#
# The chatbot answers from the site's own source files, so it is restarted to
# pick up whatever just deployed. Python packages are reinstalled only when
# chatbot/requirements.txt actually changed.
set -euo pipefail

REPO=/home/ubuntu/mlrit-final
VENV=/home/ubuntu/chatbot-venv
STAMP=/home/ubuntu/chatbot-data.req-hash

systemctl cat mlrit-chatbot >/dev/null 2>&1 || exit 0

new="$(sha256sum "$REPO/chatbot/requirements.txt" | cut -d' ' -f1)"
if [ "$new" != "$(cat "$STAMP" 2>/dev/null || true)" ]; then
  echo "chatbot: requirements changed, reinstalling"
  nice -n 15 "$VENV/bin/pip" install --quiet -r "$REPO/chatbot/requirements.txt"
  echo "$new" > "$STAMP"
fi

sudo systemctl restart mlrit-chatbot
echo "chatbot: restarted"
