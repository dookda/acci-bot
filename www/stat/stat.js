$(document).ready(function () {
    loadMap();
})

var map = L.map('risk-map').setView([17.774433, 100.579177], 9);
var marker;

function loadMap() {
    const Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        "OSM": Mapnik.addTo(map)
    }

    layerControl = L.control.layers(baseMap).addTo(map);
    layerControl.addOverlay(tam.addTo(map), 'ขอบเขตตำบล');
    layerControl.addOverlay(amp.addTo(map), 'ขอบเขตอำเภอ');
    layerControl.addOverlay(pro.addTo(map), 'ขอบเขตจังหวัด');
    // call getaccident data
    getAccident();
}

function getAccident() {
    var point = L.layerGroup();
    var buff = 5000;
    const icon = './img/marker.svg';
    const iconMarker = L.icon({
        iconUrl: icon,
        iconSize: [30, 30],
        iconAnchor: [12, 37],
        popupAnchor: [5, -36]
    });
    map.eachLayer((lyr) => {
        // console.log(lyr);
        if (lyr.options.iconName == 'risk') {
            map.removeLayer(lyr);
        }
    });
    $.get(`http://localhost:3100/acc-api/getaccident`, (res) => {
        $('#sumpoint').text('พบจุดเสี่ยงใกล้คุณ ' + res.count + ' จุด');
        $('#items').empty();
        console.log(res)
        let marker = L.geoJSON(res.data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: iconMarker,
                    iconName: 'risk',
                    attribute: feature.properties
                });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    layer.bindPopup(feature.properties.name);
                }

                // var newDiv = $(`<div class="card bg-warning text-white mt-3">
                //     <div class="card-body">${feature.properties.name}</span></div>
                // </div>`);
                // console.log(feature.properties)
                // $('#items').append(newDiv);
            }
        });
        marker.addTo(point);
        point.addTo(map);

    })

    // layerControl.addOverlay(point.addTo(map), 'จุดเสี่ยงในรัศมี 2 กม.');
}

function getChart(name, div) {
    var cat = [];
    var dat = [];

    $.get('http://localhost:3100/acc-api/getaccident').done(res => {
        var r = res.data;
        r.forEach(e => {
            var date = formatDate(e.date)
            cat.push(date);
            dat.push(Number(e.count));
        })

        console.log(dat, cat)
        Highcharts.chart(div, {
            chart: {
                type: 'column'
            },
            title: {
                text: name
            },
            subtitle: {
                text: 'Source: www.rti2dss.com'
            },
            xAxis: {
                categories: cat,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'จำนวน (หลังคาเรือน)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}  หลังคาเรือน</b></td></tr>',
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
                name: 'จำนวน (หลังคาเรือน)',
                data: dat

            }]
        });
    })
}









