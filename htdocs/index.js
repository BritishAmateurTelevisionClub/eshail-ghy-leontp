var ntp_status_spans = {};
function update_ntp_fields(status)
{
  for (var status_field in status)
  {
    ntp_status_spans[status_field].text(status[status_field]);
  }
}

function update_ntp_status()
{
  var request = new XMLHttpRequest();
  request.open('GET', 'ntp_status.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      try
      {
        update_ntp_fields(JSON.parse(request.responseText));
      }
      catch(e)
      {
        console.log("Error updating NTP status: ", e);
      }
      setTimeout(update_ntp_status, 1*1000);
    }
  };
  request.send();
}
$(function() {
  ntp_status_spans = {
    'ntp-response-datetime': $('#ntp-response-datetime'),
    'ntp-response-timestamp': $('#ntp-response-timestamp'),
    'ntp-requests-total': $('#ntp-requests-total'),
    'ntp-requests-rate': $('#ntp-requests-rate'),
    'ntp-requests-device': $('#ntp-requests-device'),
    'ntp-gps-uptime-seconds': $('#ntp-gps-uptime-seconds'),
    'ntp-gps-uptime-days': $('#ntp-gps-uptime-days'),
    'ntp-gps-flags': $('#ntp-gps-flags'),
    'ntp-gps-svs': $('#ntp-gps-svs'),
    'ntp-device-uptime-seconds': $('#ntp-device-uptime-seconds'),
    'ntp-device-uptime-days': $('#ntp-device-uptime-days'),
    'ntp-device-serial': $('#ntp-device-serial'),
    'ntp-device-firmware': $('#ntp-device-firmware'),
  };
  update_ntp_status();
});

var ntp_20m_img = document.getElementById("img-20m");
var ntp_2h_img = document.getElementById("img-2h");
var ntp_12h_img = document.getElementById("img-12h");
var ntp_2d_img = document.getElementById("img-2d");
var ntp_10d_img = document.getElementById("img-10d");
var ntp_30d_img = document.getElementById("img-1mo");
var ntp_pool_img = document.getElementById("img-ntppool");
function update_rrd_images()
{
  var cacheBuster = new Date().getTime();

  ntp_20m_img.src = "20m.png#" + cacheBuster;
  ntp_2h_img.src = "2h.png#" + cacheBuster;
  ntp_12h_img.src = "12h.png#" + cacheBuster;
  ntp_2d_img.src = "48h.png#" + cacheBuster;
  ntp_10d_img.src = "10d.png#" + cacheBuster;
  ntp_30d_img.src = "30d.png#" + cacheBuster;
  ntp_pool_img.src = "https://www.ntppool.org/graph/185.83.169.27/offset.png#" + cacheBuster;

  setTimeout(update_rrd_images, 30*1000);
}
setTimeout(update_rrd_images, 30*1000);
