#!/usr/bin/env bash
# runner.sh -- run node script and head
# Copyright (C) 2015  SheetJS
set -o pipefail
SCPT=$1
if [ ! -e $SCPT ]; then SCPT="test_files/$1"; fi
shift
node $SCPT "$@" | head
