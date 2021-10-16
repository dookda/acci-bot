$(document).ready(function () {

    var map = L.map('data-map', {
        center: [17.76, 100.26],
        zoom: 10,
        zoomControl: false
    });

    let url = "https://rti2dss.com:8443"

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        lyr: 'basemap'
    });
    var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        lyr: 'basemap'
    });

    var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        lyr: 'basemap'
    });

    const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        lyr: 'basemap'
    });
    const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        lyr: 'basemap'
    });

    // overelay
    const pro = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53',
        lyr: 'basemap'
    });

    const amp = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'th:amphoe_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53',
        lyr: 'basemap'
    });

    const tam = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'th:tambon_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53',
        lyr: 'basemap'
    });

    var acc_2016_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2016_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2016_4326'
    });

    var acc_2017_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2017_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2017_4326'
    });

    var acc_2018_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2018_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2018_4326'
    });

    var acc_2019_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2019_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2019_4326'
    });

    var acc_2020_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2020_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2020_4326'
    });

    var acc_2021_4326 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acc_2021_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acc_2021_4326'
    });

    // new year
    var acci_29dec58_4jan59 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_29dec58_4jan59',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_29dec58_4jan59'
    });

    var acci_29dec59_4jan60 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_29dec59_4jan60',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_29dec59_4jan60'
    });

    var acci_29dec60_4jan61 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_29dec60_4jan61',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_29dec60_4jan61'
    });

    var acci_29dec61_4jan62 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_29dec61_4jan62',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_29dec61_4jan62'
    });

    var acci_29dec62_4jan63 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_29dec62_4jan63',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_29dec62_4jan63'
    });

    // songkarn
    var acci_11_17apr59 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_11_17apr59',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_11_17apr59'
    });

    var acci_11_17apr60 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_11_17apr60',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_11_17apr60'
    });

    var acci_11_17apr61 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_11_17apr61',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_11_17apr61'
    });

    var acci_11_17apr62 = L.tileLayer.wms(url + "/geoserver/wms?", {
        layers: 'acci:acci_11_17apr62',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        lyr: 'acci_11_17apr62'
    });

    var baseMap = {
        "แผนที่ OSM": osm,
        "แผนที่ CartoDB": CartoDB_Positron.addTo(map),
        "แผนที่ถนน": grod,
        "แผนที่ภาพถ่าย": ghyb
    }

    var overlayMap = {
        "ขอบเขตตำบล": tam.addTo(map),
        "ขอบเขตอำเภอ": amp.addTo(map),
        "ขอบเขตจังหวัด": pro.addTo(map)
    }

    var dat = [
        acc_2016_4326,
        acc_2017_4326,
        acc_2018_4326,
        acc_2019_4326,
        acc_2020_4326,
        acc_2021_4326,
        acci_29dec58_4jan59,
        acci_29dec59_4jan60,
        acci_29dec60_4jan61,
        acci_29dec61_4jan62,
        acci_29dec62_4jan63,
        acci_11_17apr59,
        acci_11_17apr60,
        acci_11_17apr61,
        acci_11_17apr62
    ]

    L.control.layers(baseMap, overlayMap).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    function countChecked() {
        map.eachLayer((lyr) => {
            if (lyr.options.lyr !== 'basemap') {
                map.removeLayer(lyr);
            }
        });
        dat.forEach((lyr) => {
            // console.log(lyr)
            $("input[type=checkbox]:checked").each(function () {
                lyr.options.lyr == $(this).val() ? lyr.addTo(map) : null
            })
        })
    };

    countChecked();
    $("input[type=checkbox]").on("click", countChecked);
});