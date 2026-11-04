#!/usr/bin/env bash
# One-time setup of the chatbot service on the EC2 host. Safe to re-run.
# Run as root from the repo checkout:  sudo bash deploy/chatbot/setup.sh
#
# Creates the Python environment, the (empty) secrets file, and the systemd
# service. It does not start the service or touch nginx; see deploy/nginx/README.md.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO=/home/ubuntu/mlrit-final
VENV=/home/ubuntu/chatbot-venv
DATA=/home/ubuntu/chatbot-data
ENVF=/home/ubuntu/mlrit-chatbot.env
as_ubuntu() { sudo -u ubuntu -H "$@"; }

as_ubuntu python3 -m venv "$VENV" 2>/dev/null || { apt-get install -y python3-venv >/dev/null; as_ubuntu python3 -m venv "$VENV"; }
as_ubuntu "$VENV/bin/pip" install --quiet --upgrade pip

# CPU-only PyTorch (~200 MB). The default Linux wheel bundles CUDA libraries
# (several GB) that this GPU-less instance can never use.
as_ubuntu nice -n 15 "$VENV/bin/pip" install --quiet torch --index-url https://download.pytorch.org/whl/cpu
as_ubuntu nice -n 15 "$VENV/bin/pip" install --quiet -r "$REPO/chatbot/requirements.txt"
sha256sum "$REPO/chatbot/requirements.txt" | cut -d' ' -f1 | as_ubuntu tee /home/ubuntu/chatbot-data.req-hash >/dev/null

as_ubuntu mkdir -p "$DATA"
if [ ! -f "$ENVF" ]; then
  install -m 600 -o ubuntu -g ubuntu /dev/null "$ENVF"
  echo "created $ENVF (empty). Add one line:  GROQ_API_KEY=<your key>"
fi

install -m 644 "$HERE/mlrit-chatbot.service" /etc/systemd/system/mlrit-chatbot.service
systemctl daemon-reload
systemctl enable mlrit-chatbot >/dev/null
echo "chatbot service installed (not started). Start it with: sudo systemctl start mlrit-chatbot"
