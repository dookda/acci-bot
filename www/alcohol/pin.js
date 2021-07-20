let userid;
$(document).ready(async function () {
  // await liff.init({ liffId: "1653987548-eakD174y" });
  loadMap();
});

let latlng = {
  lat: 16.820378,
  lng: 100.265787
};
let map = L.map("map", {
  center: latlng,
  zoom: 16
});
let marker, gps, dataurl;
// const url = 'http://localhost:3100';
const url = "https://rti2dss.com:3100";

function loadMap() {
  var mapbox = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/light-v9",
      tileSize: 512,
      zoomOffset: -1
    }
  );

  const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  });

  var pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:province_4326",
    format: "image/png",
    transparent: true
  });

  var baseMap = {
    Mapbox: mapbox,
    "google Hybrid": ghyb.addTo(map)
  };

  var overlayMap = {
    ขอบจังหวัด: pro
  };
  L.control.layers(baseMap, overlayMap).addTo(map);
}

function onLocationFound(e) {
  gps = L.marker(e.latlng)
}

function onLocationError(e) {
  console.log(e.message);
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

var lc = L.control.locate({
  position: 'topleft',
  strings: {
    title: ""
  },
  locateOptions: {
    enableHighAccuracy: true,
  }
}).addTo(map);

lc.start();

function insertData() {
  $("#statusupload").empty().text("กำลังอัพโหลดไฟล์...");
  dataurl ? dataurl : (dataurl = "-");
  const obj = {
    rname: $("#rname").val(),
    sname: $("#sname").val(),
    stype: $("#stype").val(),
    tel: $("#tel").val(),
    status: $("#status").val(),
    img: dataurl,
    geom: JSON.stringify(gps.toGeoJSON().geometry)
  };

  $.post(url + "/acc-api/alcohol-insert", obj).done(res => {
    console.log(obj)
    // getData();
    dataurl = null;
    $("#rname").val("");
    $("#sname").val("");
    $("#stype").val("");
    $("#tel").val("");
    $("#status").val("");
    $("#preview").attr("src", "");
    $("#statusupload").empty().text("");
    // window.close();
  });
  return false;
}

$("#imgfile").change(function (evt) {
  var files = evt.target.files;
  var file = files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  resize();
});

function resize() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var filesToUploads = document.getElementById("imgfile").files;
    var file = filesToUploads[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 800;
        var width = img.width;
        var height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        dataurl = canvas.toDataURL(file.type);

        // document.getElementById('output').src = dataurl;
      };
      reader.readAsDataURL(file);
    }
  } else {
    alert("The File APIs are not fully supported in this browser.");
  }
}

function closeWindows() {
  window.close();
}