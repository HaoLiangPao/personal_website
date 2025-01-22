---
title: Nodejs
tags:
  - CS
  - Nodejs
draft: "false"
---
**How to download NodeJS**
1. NodeJS binary files are available at https://nodejs.org/dist/ (it contains all history versions and support many os versions)
	```bash
	# Example of NodeJs v23.3.0
	- node-v23.2.0-aix-ppc64.tar.gz
	- node-v23.2.0-arm64.msi
	- node-v23.2.0-darwin-arm64.tar.gz
	- node-v23.2.0-darwin-arm64.tar.xz
	- node-v23.2.0-darwin-x64.tar.gz
	- node-v23.2.0-darwin-x64.tar.xz
	- node-v23.2.0-headers.tar.gz
	- node-v23.2.0-headers.tar.xz
	- node-v23.2.0-linux-arm64.tar.gz
	- node-v23.2.0-linux-arm64.tar.xz
	- node-v23.2.0-linux-armv7l.tar.gz
	- node-v23.2.0-linux-armv7l.tar.xz
	- node-v23.2.0-linux-ppc64le.tar.gz
	- node-v23.2.0-linux-ppc64le.tar.xz
	- node-v23.2.0-linux-s390x.tar.gz
	- node-v23.2.0-linux-s390x.tar.xz
	- node-v23.2.0-linux-x64.tar.gz
	- node-v23.2.0-linux-x64.tar.xz
	- node-v23.2.0-win-arm64.7z
	- node-v23.2.0-win-arm64.zip
	- node-v23.2.0-win-x64.7z
	- node-v23.2.0-win-x64.zip
	- node-v23.2.0-x64.msi
	- node-v23.2.0.pkg
	- node-v23.2.0.tar.gz
	- node-v23.2.0.tar.xz
	```
2. Unzip the file and replace the existing `node` and `npm` locations (e.g. `/usr/bin/node` and `/usr/bin/npm` which can be found with [[Bash#which]])
	1. It can be done by moving the files over or leave a symlink