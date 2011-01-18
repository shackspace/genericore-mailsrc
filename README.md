# Genericore mailsrc

This package contains a Genericore source module to parse and forward email.

*Please note that this is early development software
 that lacks proper documentation, tests, and a lot of useful or even necessary features.*

## System requirements

- [node](http://nodejs.org/) v0.2.5 or compatible
- [node-genericore](https://github.com/shackspace/node-genericore) v0.0.1
  or compatible

## Quickstart guide

### Preparations
1. ``cp config/example.js YOURCONFIG``
2. ``$EDITOR YOURCONFIG``

### Send a single mail
1. ``bin/tcp-proxy YOURCONFIG``
2. ``cat YOURMAIL >/dev/tcp/localhost/YOURCONFIG_listen_port # or similar``

### Send a mailman archive
1. ``bin/mailman-archive-replay YOURCONFIG YOURARCHIVE``

## Package contents
- ``bin/*`` are application startup scripts (if not further specified).
- ``bin/*.sh`` are libraries for statup scripts.
- ``config/*.json`` are example configurations.
- ``src/*.js`` are application sources.
- ``src/lib/*.js`` are library sources.
