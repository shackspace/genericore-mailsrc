# genericore-mailsrc

This package contains a Genericore source module to parse and forward email.

*Please note that this is early development software
 that lacks proper documentation, tests, and a lot of useful or even necessary features.*

## System requirements

- [node](http://nodejs.org/) v0.2.5 or compatible
- [node-genericore](https://github.com/shackspace/node-genericore) v0.0.1
  or compatible

## Quickstart guide

1. ``cp config/example.js YOURCONFIG``
2. ``$EDITOR YOURCONFIG``
3. ``bin/mailsrc YOURCONFIG``

### Send a mailman archive
``bin/replay-mailman-archive MAILMAN_ARCHIVE_URI YOURCONFIG_listen_port``
