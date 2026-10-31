.PHONY: setup serve build pdf check fix audit update clean

setup: ## Install dependencies, pinned linters (mise.toml) and git hooks
	mise install
	pnpm install

serve: ## Local preview (Honkit serve)
	pnpm start

build: ## Static build into ./dist
	pnpm build

pdf: ## Build PDFs for all locales
	pnpm pdf:ru
	pnpm pdf:en
	pnpm pdf:es

check: ## Run every check; CI runs the same target
	jactionlint
	betterleaks git --redact .
	typos
	rumdl check .
	agnix --strict .
	pnpm exec oxlint --deny-warnings plugins

fix: ## Apply the safe autofixes
	typos --write-changes
	rumdl fmt .

audit: ## Known vulnerabilities in pnpm-lock.yaml (CI runs it weekly)
	osv-scanner scan source -r .

update: ## Bump all dependencies to latest (npm-check-updates)
	pnpm deps:update

clean: ## Remove build output and installed deps
	rm -rf dist node_modules
