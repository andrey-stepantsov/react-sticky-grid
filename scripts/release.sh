#!/bin/bash

# Release script for react-sticky-grid
# Usage: ./scripts/release.sh [major|minor|patch]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version type is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Version type not specified${NC}"
  echo "Usage: ./scripts/release.sh [major|minor|patch]"
  echo "  major: 1.0.0 -> 2.0.0"
  echo "  minor: 1.0.0 -> 1.1.0"
  echo "  patch: 1.0.0 -> 1.0.1"
  exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(major|minor|patch)$ ]]; then
  echo -e "${RED}Error: Invalid version type '$VERSION_TYPE'${NC}"
  echo "Valid types: major, minor, patch"
  exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}Error: You have uncommitted changes${NC}"
  echo "Please commit or stash your changes before releasing"
  git status -s
  exit 1
fi

# Check if on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}Warning: You are on branch '$CURRENT_BRANCH', not 'main'${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}Current version: $CURRENT_VERSION${NC}"

# Bump version
echo -e "${YELLOW}Bumping $VERSION_TYPE version...${NC}"
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}New version: $NEW_VERSION${NC}"

# Build the library
echo -e "${YELLOW}Building library...${NC}"
npm run build

# Commit version bump
echo -e "${YELLOW}Committing version bump...${NC}"
git add package.json
git commit -m "Bump version to $NEW_VERSION"

# Create git tag
echo -e "${YELLOW}Creating git tag v$NEW_VERSION...${NC}"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

# Push commits and tags
echo -e "${YELLOW}Pushing to remote...${NC}"
git push origin $CURRENT_BRANCH
git push origin "v$NEW_VERSION"

echo -e "${GREEN}✓ Successfully released version $NEW_VERSION${NC}"
echo -e "${GREEN}✓ Tag v$NEW_VERSION has been pushed${NC}"
echo ""
echo "Next steps:"
echo "  - Publish to npm: npm publish"
echo "  - Create GitHub release at: https://github.com/andrey-stepantsov/react-sticky-grid/releases/new?tag=v$NEW_VERSION"
