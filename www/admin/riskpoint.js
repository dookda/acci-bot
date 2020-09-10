"use strict"


const url = 'https://rti2dss.com:3100';
// const url = 'http://localhost:3100';
$(document).ready(async function () {
    loadMap();

    $('#saveEdit').click(e => {
        // e.preventDefault();
        let obj = {
            validation: $('#validation').val(),
            status_fix: $('#status_fix').val(),
            date_fix: $('#date_fix').val(),
            gid: $('#gid').val()
        }
        $.post(url + '/acc-api/pin-risk-solve', obj).done(res => {
            // console.log(res)
            // getData()
        })
    })

    $('#remove').click(e => {
        let obj = {
            validation: $('#validation').val(),
            status_fix: $('#status_fix').val(),
            date_fix: $('#date_fix').val(),
            gid: $('#gid').val()
        }
        // remove()
        if (riskpoint) {
            map.removeLayer(riskpoint)
        }

        $.post(url + '/acc-api/pin-risk-remove', obj).done(res => {
            // console.log(res);
            getData()
        })
    })

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
let layerControl

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

    const pro = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53'

    });
    const amp = L.tileLayer.wms('http://rti2dss.com:8080/geoserver/th/wms?', {
        layers: 'th:amphoe_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 5,
        CQL_FILTER: 'pro_code=53'
    });
    const tam = L.tileLayer.wms('http://rti2dss.com:8080/geoserver/th/wms?', {
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

    // getData()
    // layerControl.addOverlay(riskpoint.addTo(map), 'จุดเสี่ยง');
}
let dateStart;
let dateEnd;
function getDate() {
    dateStart = $("#dateStart").val()
    dateEnd = $("#dateEnd").val()
    // console.log(dateStart, dateEnd)
    getData(dateStart, dateEnd)
    getSummary(dateStart, dateEnd)
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
    $("#riskList").empty()
    $('#saveEdit').prop('disabled', true)
    $('#validation').prop('disabled', true)
    $('#status_fix').prop('disabled', true)
    $('#remove').prop('disabled', true)

    let mkArr = []
    $.post(url + '/acc-api/pin-getdata', { start: dateStart, end: dateEnd }).done(res => {
        // console.log(res)
        const redMarker = L.icon({
            iconUrl: './marker/marker-red.svg',
            iconSize: [30, 30],
            // iconAnchor: [15, 20],
            popupAnchor: [0, -7]
        });
        const greenMarker = L.icon({
            iconUrl: './marker/marker-green.svg',
            iconSize: [30, 30],
            // iconAnchor: [15, 20],
            // iconAnchor: [22, 94],
            popupAnchor: [0, -7]
        });
        let fix = 0
        let notfix = 0
        let valid = 0
        let invalid = 0
        let fixStat;
        let validStat;

        res.features.map(x => {
            // console.log(x)
            let latlng = [x.geometry.coordinates[1], x.geometry.coordinates[0]]
            let icon = x.properties.status_fix == "แก้ไขแล้ว" ? greenMarker : redMarker
            let a = L.marker(latlng, {
                icon: icon,
                lyr: 'acc'
            }).bindPopup('สถานที่: ' + x.properties.acc_place + '<br>วันที่: ' + x.properties.acc_date);
            mkArr.push(a)
            // cnt += 1

            x.properties.status_fix == "แก้ไขแล้ว" ? fix += 1 : notfix += 1
            x.properties.status_fix == "แก้ไขแล้ว" ? fixStat = '<span class="badge badge-success">แก้ใขแล้ว</span>' : fixStat = ''
            x.properties.validation == "ตรวจสอบแล้ว" ? valid += 1 : invalid += 1
            x.properties.validation == "ตรวจสอบแล้ว" ? validStat = '<span class="badge badge-warning">ตรวจสอบแล้ว</span>' : validStat = ''

            $("#riskList").append(`<a class="list-group-item list-group-item-action"
                    onclick="zoomCenter(${x.properties.lat},${x.properties.lon},'${x.properties.sname}','${x.properties.stype}');
                    showDetail(${x.properties.gid})">
                    จุดเสี่ยง: ${x.properties.sname} ${validStat} ${fixStat}<br>
                    ประเภท: ${x.properties.stype} </a>`);
            a.bindPopup('จุดเสี่ยง: ' + x.properties.sname + '<br>ประเภท: ' + x.properties.stype);
        })

        L.featureGroup(mkArr).addTo(map)

        $('#fix').text('' + fix)
        $('#notfix').text('' + notfix)
        $('#riskall').text('' + Number(notfix + fix))
        $('#valid').text('' + valid)
        $('#invalid').text('' + invalid)
    })
}

function getSummary(dateStart, dateEnd) {
    let obj = { start: dateStart, end: dateEnd }

    let pieData = [];
    let barCat = [];
    let barDat = [];

    $.post(url + "/acc-api/pin-getdata-sum-amp", obj).done(res => {
        // console.log(res)
        res.data.map(x => {
            pieData.push({ name: x.place, y: Number(x.cnt) });
        })
        pieChart(pieData)
    })

    $.post(url + "/acc-api/pin-getdata-sum-tam", obj).done(res => {
        // console.log(res)
        res.data.map(x => {
            barCat.push(x.place);
            barDat.push(Number(x.cnt));
        })
        barChart(barCat, barDat)
    })

    // console.log(pieData, barCat, barDat)

    // pieChart(pieData)
    // barChart(barCat, barDat)
}

function remove() {
    // console.log(layerControl)
    if (riskpoint) {
        map.removeLayer(riskpoint)
    }
    $("#riskList").empty()
    getDate()
}

function zoomCenter(lat, lon, sname, stype) {
    var popup = L.popup({ offset: [0, -7] })
        .setLatLng([lat, lon])
        .setContent('สถานที่: ' + sname + '<br>ประเภท: ' + stype);
    popup.openOn(map)
    map.panTo([lat, lon])
}

function showDetail(gid) {
    $("#editModal").modal();
    // console.log(gid);
    $('#saveEdit').prop('disabled', false)
    $('#validation').prop('disabled', false)
    $('#status_fix').prop('disabled', false)
    $('#remove').prop('disabled', false)
    let icon = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4Ij48Zz48Zz48cGF0aCBkPSJtMTA4LjE2OSAwYy0xOS4wMDIgMC0zNC40MDYgMTUuNDA0LTM0LjQwNiAzNC40MDZ2NDQzLjE4OGMwIDE5LjAwMiAxNS40MDQgMzQuNDA2IDM0LjQwNiAzNC40MDZoMjk1LjY2MmMxOS4wMDIgMCAzNC40MDYtMTUuNDA0IDM0LjQwNi0zNC40MDZ2LTM3MS41YzAtNi45MTMtMi43NDYtMTMuNTQyLTcuNjM0LTE4LjQzMWwtODAuMDMtODAuMDNjLTQuODg4LTQuODg3LTExLjUxOC03LjYzMy0xOC40MzEtNy42MzN6IiBmaWxsPSIjZjVmNWY1Ii8+PC9nPjxwYXRoIGQ9Im00MzAuNjAzIDg3LjY2NC01My4wNDgtNTMuMDQ4LS4xODkgODguOTg1Yy0uMDEyIDUuNTg2IDQuNTEzIDEwLjEyMSAxMC4wOTkgMTAuMTIxIDUuNTc4IDAgMTAuMDk5IDQuNTIyIDEwLjA5OSAxMC4wOTl2MzMzLjc3NGMwIDE5LjAwMi0xNS40MDQgMzQuNDA2LTM0LjQwNiAzNC40MDZoNDAuNjcyYzE5LjAwMiAwIDM0LjQwNi0xNS40MDQgMzQuNDA2LTM0LjQwNnYtMzM2LjYxNC0zNC44ODdjLjAwMS02LjkxMy0yLjc0NS0xMy41NDItNy42MzMtMTguNDN6IiBmaWxsPSIjZWFlYWVhIi8+PHBhdGggZD0ibTQzMC42MDMgODcuNjY0LTgwLjAzLTgwLjAzYy0yLjIyOC0yLjIyOC00LjgyMS00LjAwNS03LjYzNC01LjI4NnY1OC41NDRjMCAxOS4wMDIgMTUuNDA0IDM0LjQwNiAzNC40MDYgMzQuNDA2aDU4LjU0NGMtMS4yODEtMi44MTQtMy4wNTgtNS40MDYtNS4yODYtNy42MzR6IiBmaWxsPSIjYThkMGQ1Ii8+PGc+PHBhdGggZD0ibTM4NS4zMjYgMzkwLjE3NWgtMjU4LjY1MmMtNi43NTkgMC0xMi4yMzgtNS40NzktMTIuMjM4LTEyLjIzOHYtMTg4LjE2OWMwLTYuNzU5IDUuNDc5LTEyLjIzOCAxMi4yMzgtMTIuMjM4aDI1OC42NTJjNi43NTkgMCAxMi4yMzggNS40NzkgMTIuMjM4IDEyLjIzOHYxODguMTY5YzAgNi43NTktNS40NzkgMTIuMjM4LTEyLjIzOCAxMi4yMzh6IiBmaWxsPSIjOWFlN2ZkIi8+PHBhdGggZD0ibTM4NS4zMjYgMTc3LjUyOWgtNDEuMDMxYzYuNzU5IDAgMTIuMjM4IDUuNDc5IDEyLjIzOCAxMi4yMzh2MTg4LjE2OWMwIDYuNzU5LTUuNDc5IDEyLjIzOC0xMi4yMzggMTIuMjM4aDQxLjAzMWM2Ljc1OSAwIDEyLjIzOC01LjQ3OSAxMi4yMzgtMTIuMjM4di0xODguMTY4YzAtNi43NTktNS40NzktMTIuMjM5LTEyLjIzOC0xMi4yMzl6IiBmaWxsPSIjNjRkY2ZjIi8+PHBhdGggZD0ibTMyNy40MzIgMjY5LjI4N2MtMy45MDMtNC42NjItMTEuMDcyLTQuNjYyLTE0Ljk3NCAwbC05NC4xNzIgMTEyLjUwMWMtMi4xMjggMi41NDItMi42NzggNS42MTQtMi4wNDcgOC4zODdoMTY5LjA4N2M2Ljc1OSAwIDEyLjIzOC01LjQ3OSAxMi4yMzgtMTIuMjM4di0yNC44Njh6IiBmaWxsPSIjODljNjI3Ii8+PHBhdGggZD0ibTM4NS4zMjYgMzkwLjE3NWM2Ljc1OSAwIDEyLjIzOC01LjQ3OSAxMi4yMzgtMTIuMjM4di0yNC44NjhsLTQxLjAzMS00OS4wMTh2ODYuMTI0eiIgZmlsbD0iIzdkYjcyMyIvPjxwYXRoIGQ9Im0yMDQuOTQ2IDIzOS41NTVjLTMuOTAzLTQuNjYyLTExLjA3Mi00LjY2Mi0xNC45NzQgMGwtNzUuNTM2IDkwLjIzN3Y0OC4xNDVjMCA2Ljc1OSA1LjQ3OSAxMi4yMzggMTIuMjM4IDEyLjIzOGgxOTkuNjM5Yy41NDQtMi43MDctLjAzMy01LjY3MS0yLjA5OC04LjEzOHoiIGZpbGw9IiM5NWQ1MjgiLz48L2c+PC9nPjwvc3ZnPgo='
    $.get(url + '/acc-api/pin-getdata/' + gid).done(res => {
        let data = res.data[0]
        // console.log(data)
        let img = data.img !== '-' ? data.img : icon;
        let d_notify_format = formatDate(data.date_notify)
        let d_fix_format
        data.date_fix == null ? d_fix_format = data.date_fix : d_fix_format = formatDate(data.date_fix)
        // console.log(data)
        $('#gid').val(data.gid)
        $('#risk_image').attr('src', img)
        $('#date_notify').val(d_notify_format)
        $('#validation').val(data.validation)
        $('#status_fix').val(data.status_fix)
        $('#date_fix').val(d_fix_format)
    })
}

function formatDate(d) {
    var now = new Date(d);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-" + (day);
}

// $('input[type="checkbox"]').click(function () {
//     if ($(this).prop("checked") == true) {

//         map.eachLayer((lyr) => {
//             console.log(lyr)
//             // if (lyr.options.iconName == 'risk') {
//             //     map.removeLayer(lyr);
//             // }
//         });

//         console.log("Checkbox is checked.");
//     }
//     else if ($(this).prop("checked") == false) {
//         console.log("Checkbox is unchecked.");
//     }
// });


function pieChart(pieData) {
    Highcharts.chart('chartAmp', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'จำนวนจุดเสี่ยงแต่ละอำเภอ'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: pieData
        }]
    });
}

function barChart(barCat, barDat) {
    Highcharts.chart('chartTam', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'จำนวนจุดเสี่ยงรายตำบล'
        },
        xAxis: {
            categories: barCat
        },
        yAxis: {
            min: 0,
            title: {
                text: 'จำนวนจุดเสี่ยง'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'จุดเสี่ยง',
            data: barDat
        }]
    });
}





