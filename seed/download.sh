#!/bin/bash
diff --new-line-format="" --unchanged-line-format="" \
    <(sort compound_files.txt -u) <(sort ./asn/finished.txt -u 2>/dev/null) | \
    xargs -P ${1:-$(nproc)} -i ./process_file.sh {}
exit 0
