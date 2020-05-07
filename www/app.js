$(document).ready(async () => {
    // await liff.init({ liffId: "1654018081-pemA61EA" }).then(e => {
    //     console.log(e)
    // });
    // getUserid();

    await liff.init({ liffId: "1654018081-pemA61EA" })
    liff.ready.then(async () => {
        // if (!liff.isLoggedIn()) {
        //     liff.login()
        // }
        await getUserid()
    })
    loadMap();
});

var userId;
async function getUserid() {
    const profile = await liff.getProfile();
    console.log(profile)
    userId = await profile.userId;

    $('#profile').attr('src', await profile.pictureUrl);
    // $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
}

var map = L.map('map', {
    center: [16.820378, 100.265787],
    zoom: 13
});
var marker, gps, dataurl, tam, amp, pro, x, y;
// var url = 'https://rti2dss.com:3100';
var url = 'http://localhost:3100';

function loadMap() {
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var prov = L.tileLayer.wms("https://cors-anywhere.herokuapp.com/http://rti2dss.com:8080/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true
    });
    var baseMap = {
        "OSM": osm,
        "แผนที่ถนน": grod,
        "แผนที่ภาพถ่าย": ghyb.addTo(map)
    }
    var overlayMap = {
        "ขอบจังหวัด": prov.addTo(map)
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}

function onLocationFound(e) {
    x = e.latlng.lat;
    y = e.latlng.lng;
    gps = L.marker(e.latlng, { draggable: true });
    // gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    // gps.on('dragend', (e) => {
    //     console.log(e)
    // })
    $.get(url + `/acc-api/getaddress/${x}/${y}`).done((res) => {
        tam = res.data[0].tam_name;
        amp = res.data[0].amp_name;
        pro = res.data[0].pro_name;
        const txt = `ต.${tam} อ.${amp} จ.${pro}`;
        $('#address').val(txt)
    })
}

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

// var canvas = document.getElementById("canvas");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var maxW = 640;
var maxH = 640;

var input = document.getElementById('imgfile');
var output = document.getElementById('preview');
input.addEventListener('change', handleFiles);

function handleFiles(e) {
    var img = new Image;
    img.onload = async function () {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        dataurl = await canvas.toDataURL("image/jpeg", 0.5);
        // console.log(dataurl)
        $("#preview").attr("src", dataurl);
    }
    img.src = URL.createObjectURL(e.target.files[0]);
    // console.log(img)
}

map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);
// map.locate({ setView: true, maxZoom: 18 });

var i = 1;
$("#addMore").click(function (e) {
    i += 1;
    console.log(e)
    e.preventDefault();
    $("#fieldList").append(`<br><label for="patient">ชื่อ ผู้บาดเจ็บรายที่ ${i}:</label>
    <input type="text" name="name[]" class="form-control" />
    <label for="patient">นามสกุล :</label>
    <input type="text" name='sname[]' class="form-control" id="sname">`);
});

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: "Show me where I am, yo!"
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

function saveData() {
    $("#status").empty().text("File is uploading...");
    var name = [];
    $('input[name^=name]').each(function () {
        name.push($(this).val());
    });

    if (!dataurl) {
        dataurl = '-';
    }

    // alert(dataurl)
    const obj = {
        name: name,
        acc_place: $('#location').val(),
        tam: tam,
        amp: amp,
        pro: pro,
        x: x,
        y: y,
        vehicle: $('#vehicle').val(),
        img: dataurl,
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    }

    $.post(url + '/acc-api/lineinsert', obj).done((res) => {
        if (res.status == 'success') {
            closed();
        }
        $('form :input').val('');
        $('#preview').attr('src', '');
    })
};

function closed() {
    // liff.closeWindow();
}
