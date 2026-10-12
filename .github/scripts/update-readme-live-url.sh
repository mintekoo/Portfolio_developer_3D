#!/usr/bin/env bash
set -euo pipefail

README_FILE="${1:-README.md}"
REPO="${GITHUB_REPOSITORY:-mintekoo/Portfolio_developer_3D}"
OWNER="${REPO%%/*}"
REPO_NAME="${REPO#*/}"

if [[ "${REPO_NAME}" == *.github.io ]]; then
  LIVE_URL="https://${OWNER}.github.io/"
else
  LIVE_URL="https://${OWNER}.github.io/${REPO_NAME}/"
fi

python3 - "${README_FILE}" "${LIVE_URL}" <<'PY'
import re
import sys

readme_path, live_url = sys.argv[1:3]

with open(readme_path, encoding="utf-8") as file:
    content = file.read()

pattern = r"<!-- LIVE_SITE_START -->.*?<!-- LIVE_SITE_END -->"
replacement = (
    "<!-- LIVE_SITE_START -->\n\n"
    f"🌐 [View Live Portfolio]({live_url})\n\n"
    "<!-- LIVE_SITE_END -->"
)

new_content, count = re.subn(pattern, replacement, content, count=1, flags=re.DOTALL)

if count != 1:
    print("ERROR: Live site markers not found in README.md", file=sys.stderr)
    sys.exit(1)

if new_content == content:
    print("unchanged")
else:
    with open(readme_path, "w", encoding="utf-8") as file:
        file.write(new_content)
    print("updated")
    print(f"url={live_url}")
PY
