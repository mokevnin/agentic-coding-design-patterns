.PHONY: setup serve build pdf clean

setup: ## Install dependencies and git hooks
	npm install

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
