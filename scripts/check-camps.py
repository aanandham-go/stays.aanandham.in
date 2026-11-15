import re

with open('src/lib/campsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Match camps inside INITIAL_ALL_CAMPS
camps_section = text.split('export const INITIAL_EVENTS')[0]
matches = re.findall(r'"id":\s*"([^"]+)",\s*(?:"slug":\s*"[^"]+",\s*)?(?:"pmsPropertyId":\s*"[^"]+",\s*)?(?:"aliases":\s*\[[^\]]*\],\s*)?"title":\s*"([^"]+)"', camps_section)
print(f"Found {len(matches)} properties:")
for cid, title in matches:
    print(f" - [{cid}]: {title}")
