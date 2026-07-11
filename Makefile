.PHONY: setup serve build pdf clean

setup: ## Install prek, dependencies, and the commit-msg hook
	@command -v prek >/dev/null 2>&1 || uv tool install prek || brew install prek
	npm install
	prek install --hook-type commit-msg

serve: ## Local preview (Honkit serve)
	npm start

build: ## Static build into ./dist
	npm run build

pdf: ## Build PDFs for all locales
	npm run pdf:ru
	npm run pdf:en
	npm run pdf:es

clean: ## Remove build output and installed deps
	rm -rf dist node_modules
