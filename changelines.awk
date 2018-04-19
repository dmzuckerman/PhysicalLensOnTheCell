for FILE in *.html; do
  awk '{ gsub(/ChangeFromIframeTwo/,"changeTo"); print }' ${FILE} > tmpdir/${FILE}
done
