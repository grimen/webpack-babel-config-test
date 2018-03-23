
all: build

install:
	yarn install

clean:
	yarn run clean

build:
	yarn run build

start:
	yarn run start

test:
	yarn run test

.PHONY: clean build start test

