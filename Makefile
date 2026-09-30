# Everyday commands for martincalo.com. Run `make` to list them.
.DEFAULT_GOAL := help
.PHONY: help install dev build start lint check clean

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

lint: node_modules ## Lint the code
	npm run lint

check: lint build ## Lint and build: run before pushing

clean: ## Remove build output and caches
	rm -rf .next
