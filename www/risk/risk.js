
$(document).ready(function () {
    loadMap();
})

let latlng = {
    lat: 16.820378,
    lng: 100.265787
};
let map = L.map("map", {
    center: latlng,
    zoom: 13
});

var marker;

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

    const riskpoint = L.tileLayer.wms('https://rti2dss.com:8443/geoserver/wms?', {
        layers: 'acci:ud_riskpoint_4326_v',
        format: 'image/png',
        transparent: true,
        zIndex: 5
    });

    var baseMap = {
        "OSM": Mapnik.addTo(map),
        "แผนที่ถนน": grod,
        "แผนที่ภาพถ่าย": ghyb
    }

    var overlay = {
        'ขอบเขตตำบล': tam.addTo(map),
        'ขอบเขตอำเภอ': amp.addTo(map),
        'ขอบเขตจังหวัด': pro.addTo(map),
        'จุดเสี่ยง': riskpoint
    }

    layerControl = L.control.layers(baseMap, overlay).addTo(map);
    // layerControl.addOverlay(tam.addTo(map), 'ขอบเขตตำบล');
    // layerControl.addOverlay(amp.addTo(map), 'ขอบเขตอำเภอ');
    // layerControl.addOverlay(pro.addTo(map), 'ขอบเขตจังหวัด');
    // layerControl.addOverlay(riskpoint.addTo(map), 'จุดเสี่ยง');

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    // map.locate({ setView: true, watch: false, maxZoom: 16 });
}

var lc = L.control.locate({
    position: 'topleft',
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

var latlon;

function onLocationFound(e) {
    console.log(e)
    latlon = e.latlng;
    getDisease(e.latitude, e.longitude)
}

function onLocationError(e) {
    console.log(e.message);
}

function getDisease(lat, lon) {
    var point = L.layerGroup();
    var buff = 1000;
    const icon = './../img/caution.svg';
    const iconMarker = L.icon({
        iconUrl: icon,
        iconSize: [30, 30],
        iconAnchor: [15, 20],
        popupAnchor: [5, -36]
    });
    map.eachLayer((lyr) => {
        // console.log(lyr);
        if (lyr.options.iconName == 'risk') {
            map.removeLayer(lyr);
        }
    });
    // lat = 17.629797316684733;
    // lon = 100.12873467982418;
    $.get(`https://rti2dss.com:3100/acc-api/riskpoint/${lat}/${lon}/${buff}`, (res) => {
        $('#sumpoint').text('พบจุดเสี่ยงใกล้คุณ ' + res.count + ' จุด');
        $('#items').empty();
        // console.log(res)
        let marker = L.geoJSON(res.data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: iconMarker,
                    iconName: 'risk',
                    attribute: feature.properties
                });
            },
            onEachFeature: (feature, layer) => {
                console.log(feature);
                if (feature.properties) {
                    layer.bindPopup(feature.properties.sname);
                }
                var newDiv = $(`<h4><span class="badge badge-warning">${feature.properties.stype} ${feature.properties.sname}</span></h4>`);
                // console.log(feature.properties)
                $('#items').append(newDiv);
            }
        });
        marker.addTo(point);
        point.addTo(map);
    })

    // layerControl.addOverlay(point.addTo(map), 'จุดเสี่ยงในรัศมี 2 กม.');
}








