sudo apt install rrdtool imagemagick

rrdtool create ntp1.rrd \
  --start now-2h --step 1s \
  DS:req:GAUGE:5m:0:120000 \
  RRA:AVERAGE:0.5:1s:10d \
  RRA:AVERAGE:0.5:1m:90d \
  RRA:AVERAGE:0.5:1h:18M \
  RRA:AVERAGE:0.5:1d:10y

## install

sudo crontab -e -u www-data
*/5  *  *   *   *     /srv/leontp/ntp_png

./install
