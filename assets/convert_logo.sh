#!/usr/bin/bash

inkscape --export-filename=logo_fullsize.png logo.svg -w 1024
convert -density 1000 -resize 512x512 logo_fullsize.png logo_512x512.png
convert -density 1000 -resize 256x256 logo_fullsize.png logo_256x256.png
convert -density 1000 -resize 192x192 logo_fullsize.png logo_192x192.png
convert -density 1000 -resize 96x96 logo_fullsize.png logo_96x96.png
convert -density 1000 -resize 48x48 logo_fullsize.png logo_48x48.png
convert -density 1000 -resize 32x32 logo_fullsize.png logo_32x32.png
convert -density 1000 -resize 16x16 logo_fullsize.png logo_16x16.png

icotool -c -o generated_favicon.ico logo_96x96.png logo_48x48.png logo_32x32.png logo_16x16.png
cp generated_favicon.ico ../favicon.ico


