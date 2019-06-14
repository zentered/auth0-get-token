#!make
MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

test:
		NODE_ENV=test \
		npm test

.PHONY: test
