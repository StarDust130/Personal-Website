#!/usr/bin/env bash
set -euo pipefail

# Commit each changed file separately with randomized messages.
# Run from any directory inside your Git repository.

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not inside a Git repository."
  exit 1
fi

cd "$(git rev-parse --show-toplevel)"

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "❌ Create your initial Git commit before running this script."
  exit 1
fi

# Avoid accidentally including unrelated staged files in every commit.
if ! git diff --cached --quiet; then
  echo "❌ You have staged changes."
  echo "Run 'git restore --staged .' to unstage them without deleting edits,"
  echo "or commit those staged changes manually, then run this script again."
  exit 1
fi

# Collect modified, deleted, and untracked (non-ignored) files.
mapfile -d '' -t all_files < <(
  {
    git diff --name-only -z HEAD --
    git ls-files --others --exclude-standard -z
  } | sort -zu
)

if ((${#all_files[@]} == 0)); then
  echo "✅ Nothing to commit. Working tree is clean."
  exit 0
fi

# Skip common credential and private-key files.
files=()

for file in "${all_files[@]}"; do
  base="${file##*/}"

  case "$base" in
    .env|.env.local|.env.production|.env.development|.env.*.local|\
    id_rsa|id_ed25519|*.pem|*.key|*credentials*.json|*secret*)
      printf '⚠️ Skipping potentially sensitive file: %q\n' "$file"
      continue
      ;;
  esac

  files+=("$file")
done

if ((${#files[@]} == 0)); then
  echo "No safe files found to commit."
  exit 0
fi

echo
echo "📦 Files to commit individually: ${#files[@]}"
printf '  • %s\n' "${files[@]}"
echo
read -r -p "Proceed with one commit per file? [y/N] " answer

[[ "$answer" =~ ^[Yy]$ ]] || {
  echo "Cancelled."
  exit 0
}

# 80+ emoji choices for varied commit messages.
EMOJIS=(
  "✨" "🚀" "🌙" "⚡" "🪄" "🧭" "🛠️" "🎯" "💎" "🌊"
  "🔥" "🌿" "🪐" "🌌" "🦋" "🧩" "🎨" "📚" "📝" "🔮"
  "🦊" "🐉" "🦄" "🐳" "🪼" "🦉" "🐈" "🐾" "🍀" "🌻"
  "🌈" "☄️" "🌠" "🌤️" "🌑" "🪷" "🌺" "🍄" "🪴" "🌵"
  "🧠" "👾" "🤖" "👻" "🎭" "🎮" "🎧" "🎹" "🎬" "📸"
  "🔭" "🧪" "🧬" "🛰️" "🛸" "⚙️" "🔧" "🔨" "🪛" "🧰"
  "📦" "🗂️" "📌" "🧵" "🪡" "✏️" "🖋️" "📐" "📎" "🔗"
  "💡" "🔆" "💫" "⭐" "🌟" "🏔️" "🌍" "🌏" "🌳" "🌱"
  "🫧" "💧" "❄️" "☀️" "🌕" "🌀" "♻️" "🪄" "🎉" "🥷"
)

ADDED_VERBS=(
  "Added" "Introduced" "Created" "Added" "Brought in"
  "Added" "Initialized" "Included"
)

UPDATED_VERBS=(
  "Updated" "Refined" "Improved" "Polished" "Enhanced"
  "Adjusted" "Tweaked" "Upgraded" "Reworked" "Cleaned up"
)

REMOVED_VERBS=(
  "Removed" "Deleted" "Retired" "Cleared out" "Removed"
)

count=0
total=${#files[@]}

for file in "${files[@]}"; do
  # Determine the status relative to the current HEAD.
  if [[ ! -e "$file" && ! -L "$file" ]]; then
    action="Removed"
    verbs=("${REMOVED_VERBS[@]}")
  elif git cat-file -e "HEAD:$file" 2>/dev/null; then
    action="Updated"
    verbs=("${UPDATED_VERBS[@]}")
  else
    action="Added"
    verbs=("${ADDED_VERBS[@]}")
  fi

  emoji="${EMOJIS[RANDOM % ${#EMOJIS[@]}]}"
  verb="${verbs[RANDOM % ${#verbs[@]}]}"

  message="$emoji $verb: $file"

  echo
  printf '[%d/%d] %s\n' "$((count + 1))" "$total" "$message"

  # Stage only this path, then commit it separately.
  git add -A -- "$file"
  git commit -m "$message"

  ((count += 1))
done

echo
echo "✅ Finished! Created $count individual file commits."
echo
git status --short