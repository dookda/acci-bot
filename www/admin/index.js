"use strict"


const url = 'https://rti2dss.com/p3100';
// const url = 'http://localhost:3100'

let dateStart;
let dateEnd;
$(document).ready(function () {
    loadMap();

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var start = (now.getFullYear() - 3) + "-" + (month) + "-" + (day);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    // $('#datePicker').val(today);
    $("#dateStart").val(start)
    $("#dateEnd").val(today)
    getDate()
})

let latlng = {
    lat: 17.624278,
    lng: 100.096524
};
let map = L.map("map", {
    center: latlng,
    zoom: 13
});

var marker;
let riskpoint;
let layerControl;
function loadMap() {
    const Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

    const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53'

    });
    const amp = L.tileLayer.wms('https://rti2dss.com:8443/geoserver/th/wms?', {
        layers: 'th:amphoe_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53'
    });
    const tam = L.tileLayer.wms('https://rti2dss.com:8443/geoserver/th/wms?', {
        layers: 'th:tambon_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53'
    });

    var baseMap = {
        "OSM": Mapnik.addTo(map),
        "แผนที่ถนน": grod,
        "แผนที่ภาพถ่าย": ghyb
    }

    let overlay = {
        'ขอบเขตตำบล': tam.addTo(map),
        'ขอบเขตอำเภอ': amp.addTo(map),
        'ขอบเขตจังหวัด': pro.addTo(map),
    }

    layerControl = L.control.layers(baseMap, overlay).addTo(map);
}

function getDate() {
    dateStart = $("#dateStart").val()
    dateEnd = $("#dateEnd").val()
    // console.log(dateStart, dateEnd)
    getData(dateStart, dateEnd)
}

function rmLyr() {
    map.eachLayer((lyr) => {
        if (lyr.options.lyr == 'acc') {
            map.removeLayer(lyr);
            // console.log(lyr);
        }
    });
}

function getData(dateStart, dateEnd) {
    rmLyr()
    let mkArr = []
    $.get('/acc-api/get-acc-info-geojson/' + dateStart + '/' + dateEnd).done((res) => {
        $("#riskList").empty();
        const redMarker = L.icon({
            iconUrl: './marker/marker-red.svg',
            iconSize: [30, 30],
            // iconAnchor: [15, 20],
            popupAnchor: [0, -7]
        });

        let cnt = 0;

        let y2017 = 0; let y2018 = 0; let y2019 = 0; let y2020 = 0; let y2021 = 0;
        let yyyy = ["2017", "2018", "2019", "2020", "2021"]
        res.features.map(x => {
            if (x.properties.yyyy == "2017") {
                y2017 += 1
            } else if (x.properties.yyyy == "2018") {
                y2018 += 1
            } else if (x.properties.yyyy == "2019") {
                y2019 += 1
            } else if (x.properties.yyyy == "2020") {
                y2020 += 1
            } else if (x.properties.yyyy == "2021") {
                y2021 += 1
            }

            let ll = [x.geometry.coordinates[1], x.geometry.coordinates[0]]
            let a = L.marker(ll, {
                icon: redMarker,
                lyr: 'acc'
            }).bindPopup('สถานที่: ' + x.properties.acc_place + '<br>วันที่: ' + x.properties.acc_date);
            mkArr.push(a)
            cnt += 1
            $("#riskList").append(`<a class="list-group-item list-group-item-action"
                onclick="zoomCenter(${x.properties.lat},${x.properties.lon},'${x.properties.acc_place}','${x.properties.acc_date}')">
                สถานที่: ${x.properties.acc_place}<br>
                วันที่: ${x.properties.acc_date} </a>`);
            a.bindPopup('สถานที่: ' + x.properties.acc_place + '<br>วันที่: ' + x.properties.acc_date);
        })

        chart(yyyy, [y2017, y2018, y2019, y2020, y2021])
        $('#riskall').text('' + cnt)

        L.featureGroup(mkArr).addTo(map)
    })
}

function zoomCenter(lat, lon, aplace, adate) {
    var popup = L.popup({ offset: [0, -7] })
        .setLatLng([lat, lon])
        .setContent('สถานที่: ' + aplace + '<br>วันที่: ' + adate);
    popup.openOn(map)
    map.panTo([lat, lon])
}

function formatDate(d) {
    var now = new Date(d);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-" + (day);
}

function chart(cat, val) {
    Highcharts.chart('chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'จำนวนการเกิดอุบัติเหตุ'
        },
        xAxis: {
            categories: cat,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'จำนวนการเกิดอุบัติเหตุ (ครั้ง)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} ครั้ง</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'จำนวนการเกิดอุบัติเหตุ',
            data: val
        }]
    });
}








