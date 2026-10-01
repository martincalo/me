# Everyday commands for martincalo.com. Run `make` to list them.
.DEFAULT_GOAL := help
.PHONY: help install dev build start phone lint check clean

# This Mac's address on the local network (Wi-Fi first, then Ethernet).
LAN_IP := $(shell ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)

help: ## List the available commands
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "  make %-8s %s\n", $$1, $$2}'

node_modules: package.json package-lock.json
	npm install
	@touch node_modules

install: node_modules ## Install dependencies (only when package files changed)

dev: node_modules ## Run the site locally with hot reload (http://localhost:3000)
	npm run dev

build: node_modules ## Production build (must pass before every push)
	npm run build

start: build ## Build, then serve the production version locally
	npm run start

# The dev server blocks its scripts for other devices (no videos, reload loops),
# so phones get the production build instead.
phone: build ## Build and serve for a phone on the same Wi-Fi (videos work)
	@echo ""
	@echo "  On your phone (same Wi-Fi), open:  http://$(LAN_IP):3000"
	@echo ""
	npm run start

lint: node_modules ## Lint the code
	npm run lint

check: lint build ## Lint and build: run before pushing

clean: ## Remove build output and caches
	rm -rf .next
