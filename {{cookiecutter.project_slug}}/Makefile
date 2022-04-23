# HELP
# This will output the help for each task
.PHONY: help

help: ## This help.
    @awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

THIS_FILE := $(lastword $(MAKEFILE_LIST))

%:
	@echo ""
all:
	@echo ""
build-dist:
	mkdir -p $$(pwd)/.build-cache
	env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_' > $$(pwd)/.build-env
	@if [ "$$(docker images -q electronuserland/builder:wine-user 2>/dev/null)" = "" ]; then \
 		cd $$(pwd)/docker/electronuserland \
			&& docker build -t electronuserland/builder:wine-user .; \
	fi
	docker run --rm -ti \
		--env-file $$(pwd)/.build-env \
		-e ELECTRON_CACHE=/home/user/project/.build-cache/electron \
		-e ELECTRON_BUILDER_CACHE=/home/user/project/.build-cache/electron-builder \
		-e ELECTRON_IS_DEV=0 \
 		-v $$(pwd):/home/user/project \
	electronuserland/builder:wine-user "yarn --cwd=/home/user/project build"
