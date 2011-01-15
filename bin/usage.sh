#! /bin/sh

print_usage() {
  sed -rn 's/^# (usage:.*)/\1/p' "$0"
}

check_args() {
  n=`print_usage | tr -d '\n' | sed 's/\n$//;s/[^<]*<[^>]*>/./g' | wc -c`
  test $n = $#
}

check_args_or_print_usage_and_die() {
  if ! check_args "$@"; then
    #echo "bad arguments: $*" >&2
    print_usage
    exit 23
  fi
}

