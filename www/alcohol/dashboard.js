let marker;
var table;
// const url = "https://rti2dss.com:3100";
const url = "http://localhost:3100";

$(document).ready(function () {
    table = $('#myTable').DataTable({
        ajax: {
            url: url + '/acc-api/alcohol-get',
            dataSrc: 'data'
        },
        columns: [
            { data: 'rname' },
            { data: 'sname' },
            { data: 'stype' },
            { data: 'tel' },
            { data: 'date_notify' },
            { data: 'status' },
            {
                data: null, render: function (data, type, row, meta) {
                    // console.log(row);
                    return `<button type="button" class="btn btn-warning p-1 m-1" 
                        onclick="setValue(${row.gid},'${row.rname}','${row.sname}','${row.stype}','${row.tel}', '${row.status}', ${row.lat}, ${row.lon})">
                        <i class="bi bi-journal-richtext"></i>&nbsp;แก้ไขข้อมูล</button>
                        <button type="button" class="btn btn-danger p-1 m-1" onclick="delData(${row.gid})">
                        <i class="bi bi-x-circle"></i>&nbsp;ลบข้อมูล</button>`
                },
                width: "15%"
            }
        ],
    });
})

let latlng = {
    lat: 16.820378,
    lng: 100.265787
};
let map = L.map("map", {
    center: latlng,
    zoom: 16
});

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
    map.invalidateSize(true);
}
loadMap();

function setValue(gid, rname, sname, stype, tel, status, lat, lon) {
    gid = gid

    map.eachLayer((lyr) => {
        if (lyr.options.name == 'marker') {
            map.removeLayer(lyr);
        }
    });

    marker = L.marker([lat, lon], { name: "marker" }).addTo(map)
    map.panTo([lat, lon])
    $("#gid").val(gid);
    $("#rname").val(rname);
    $("#sname").val(sname);
    $("#stype").val(stype);
    $("#tel").val(tel);
    $("#status").val(tel);

    $.post(url + "/acc-api/alcohol-getimg", { gid: gid }).done(r => {
        // console.log(r);
        $("#img").attr('src', r.data[0].img)
    })

    $("#editModal").modal("show")
    $('#editModal').on('shown.bs.modal', function () {
        map.invalidateSize();
    });
}

function updateData() {
    const obj = {
        gid: $("#gid").val(),
        rname: $("#rname").val(),
        sname: $("#sname").val(),
        stype: $("#stype").val(),
        tel: $("#tel").val(),
        status: $("#status").val(),
        // img: dataurl,
        // geom: JSON.stringify(marker.toGeoJSON().geometry)
    };
    // console.log(obj);
    $.post(url + "/acc-api/alcohol-update", obj).done(res => {
        console.log(obj)
        $("#editModal").modal("hide")
        $('#myTable').DataTable().ajax.reload();
    });
    return false;
}

function delData(gid) {
    $.post(url + "/acc-api/alcohol-delete", { gid: gid }).done(r => {
        $("#deleteModal").modal("show");
    })
}

function reloadTable() {
    $('#myTable').DataTable().ajax.reload();
}



