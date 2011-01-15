# Genericore mailsrc

This package contains a Genericore source module to parse and forward email.

*Please note that this is early development software
 that lacks proper documentation, tests, and a lot of useful or even necessary features.*

## Quickstart Guide

### Preparations:
1. ``cp config/example.js YOURCONFIG``
2. ``$EDITOR YOURCONFIG``

### Send a single mail to Genericore.
1. ``bin/tcp-proxy YOURCONFIG``
2. ``cat YOURMAIL >/dev/tcp/localhost/YOURCONFIG_listen_port # or similar``

### Send a mailman archive to Genericore.
1. ``bin/mailman-archive-replay YOURCONFIG YOURARCHIVE``

## Package Contents
- ``bin/*`` are application startup scripts (if not further specified).
- ``bin/*.sh`` are libraries for statup scripts.
- ``config/*.json`` are example configurations.
- ``src/*.js`` are application sources.
- ``src/lib/*.js`` are library sources.  
