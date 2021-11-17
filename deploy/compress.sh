#!/usr/bin/env bash

# Tally each of the compression sizes
fileTally=0
gzTally=0
brTally=0

# Find all files which have compressible mime types as indicated in https://letstalkaboutwebperf.com/en/gzip-brotli-server-config/
fileList=$(find ./build -type f -exec sh -c 'file -b --mime-type "{}" | grep -f - -qF ./deploy/compressible-mime-types.txt' \; -and -print)

for file in $fileList; do

    # Create compressed filenames
    gzFile=$file.gz
    brFile=$file.br

    # Compress with best settings as we only need to do this once (ie it's not dynamic server compression)
    gzip --best < $file > $gzFile
    brotli --best < $file > $brFile

    # Get size of files in bytes
    fileSize="$(wc -c < $file)"
    gzSize="$(wc -c < $gzFile)"
    brSize="$(wc -c < $brFile)"

    # Update tallies
    fileTally=$(( $fileTally + $fileSize ))
    gzTally=$(( $gzTally + $gzSize ))
    brTally=$(( $brTally + $brSize ))

    # Only keep the gzip file if it is smaller than the uncompressed file
    if (( $gzSize >= $fileSize)); then
	echo "  --  removing $gzFile"
	rm $gzFile
    fi

    # Only keep the brotli file if it is smaller than both the gzip and uncompressed file
    if (( $brSize >= $gzSize )) || (( $brSize >= $fileSize )); then
	echo "  --  removing $brFile"
	rm $brFile
    fi

    echo $file, $fileSize, $gzSize, $brSize

done

# Report tally results in megabytes (need python for calculations)
echo "
print(f'\nTotal uncompressed: {$fileTally / 1024**2:0.2f}M')
print(f'Total gzip compressed: {$gzTally / 1024**2:0.2f}M')
print(f'Total brotli compressed: {$brTally / 1024**2:0.2f}M')
" | python3
