
let latlng = {
    lat: 17.624278,
    lng: 100.096524
};
let map = L.map("map", {
    center: latlng,
    zoom: 13
});

let marker;
let riskpoint;
let layerControl;

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

function zoomMap(lat, lon, acc_place, vehicle, tam, amp, acc_date) {
    var popup = L.popup({ offset: [1, -7] })
        .setLatLng([lat, lon])
        .setContent(`<div class="row">
                        <div class="col-8 f-popup">
                            <b>ที่เกิดเหตุ:</b> ${acc_place}
                            <br><b>ยานพาหนะ:</b> ${vehicle}
                            <br><b>ตำบล:</b> ${tam}
                            <br><b>อำเภอ:</b> ${amp}
                            <br><b>วันที่:</b> ${acc_date}
                        </div>
                    </div>`);
    popup.openOn(map)
    map.panTo([lat, lon])
}

let loadMap = (x) => {
    const redMarker = L.icon({
        iconUrl: './marker/marker-red.svg',
        iconSize: [30, 30],
        // iconAnchor: [15, 20],
        popupAnchor: [0, -7]
    });

    if (x.geojson) {
        let json = JSON.parse(x.geojson).coordinates;
        // console.log(json);
        let marker = L.marker([json[1], json[0]], {
            draggable: false,
            name: 'p',
            icon: redMarker
        })

        marker.bindPopup(`<div class="row">
                    <div class="col-8 f-popup">
                        <b>ที่เกิดเหตุ:</b> ${x.acc_place}
                        <br><b>ยานพาหนะ:</b> ${x.vehicle}
                        <br><b>ตำบล:</b> ${x.tam}
                        <br><b>อำเภอ:</b> ${x.amp}
                        <br><b>วันที่:</b> ${x.acc_date}
                    </div>
                </div>`,
            { maxWidth: 400 }).openPopup().addTo(map);
    }
}

let removeLayer = () => {
    map.eachLayer(i => {
        i.options.name == "p" ? map.removeLayer(i) : null;
    })
}

let showMap = async (arr) => {
    removeLayer();
    arr.map(x => loadMap(x));
}

var editModal = new bootstrap.Modal(document.getElementById('editmodal'), {
    keyboard: false
})

let editData = (gid) => {

    axios.post('/acc-api/get-acc-by-select-one', { pkid }).then(v => {
        console.log(v);
        // $('#pkid' + v.gid).val(v.pkid);
        // $('#title_name' + v.gid).val(v.title_name);
        // $('#first_name' + v.gid).val(v.first_name);
        // $('#last_name' + v.gid).val(v.last_name);
        // $('#type' + v.gid).val(v.type);
        // $('#id_card' + v.gid).val(v.id_card);
        // $('#age' + v.gid).val(v.age);
        // $('#sex' + v.gid).val(v.sex);
        // $('#p_place' + v.gid).val(v.p_place);
        // $('#injury_type' + v.gid).val(v.injury_type);
        // $('#alcohol' + v.gid).val(v.alcohol);
        // $('#behaviour' + v.gid).val(v.behaviour);
        // $('#death_info' + v.gid).val(v.death_info);
        // $('#death_date' + v.gid).val(v.death_date);
        // $('#death_time' + v.gid).val(v.death_time);

        // $('#acc_place').val(data.acc_place);
        // $('#acc_date').val(today);
        // $('#acc_time').val(formatted);
        // $('#pro').val(data.pro);
        // $('#amp').val(data.amp);
        // $('#tam').val(data.tam);
        // $('#x').val(data.x);
        // $('#y').val(data.y);
        // $('#vehicle').val(data.vehicle);
        // $('#disputant').val(data.disputant);
        // $('#to_hospital').val(data.to_hospital);
        // $('#transfer_type').val(data.transfer_type);
        // $('#pkid').val(data.pkid);
    })

    editModal.show();



    // console.log(gid);
    // location.href = "./../edit/index.html?gid=" + gid;
}

let showData = async () => {
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "กำลังดำเนินการ...",
            "sLengthMenu": "แสดง_MENU_ แถว",
            "sZeroRecords": "ไม่พบข้อมูล",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(ทั้งหมด _MAX_ แถว)",
            "sInfoPostFix": "",
            "sSearch": "ค้นหา:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "เริ่มต้น",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "สุดท้าย"
            }
        }
    });

    let table = $('#acctable').DataTable({
        ajax: {
            url: '/acc-api/get-acc-by-amp',
            type: 'POST',
            data: {
                amp: 'ทั้งหมด',
            },
            dataSrc: 'data',
            cache: true,
        },
        columns: [
            { data: 'gid' },
            { data: 'acc_place' },
            { data: 'vehicle' },
            { data: 'tam' },
            { data: 'amp' },
            { data: 'acc_date' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    const lat = JSON.parse(data.geojson).coordinates[1];
                    const lon = JSON.parse(data.geojson).coordinates[0];
                    return `
                        <a onclick="zoomMap(${lat}, ${lon}, '${data.acc_place}', '${data.vehicle}', '${data.tam}', '${data.amp}', '${data.acc_date}')" href="#report" class="btn btn-margin btn-success" ><i class="bi bi-map"></i> ซูม</a>
                      
                    `
                    // <button onclick="editData(${data.gid})" class="btn btn-margin btn-warning" ><i class="bi bi-clipboard-data"></i> แก้ไข</button>
                    // <button onclick="deleteData(${data.gid})" class="btn btn-margin btn-danger" ><i class="bi bi-clipboard-x"></i> ลบ</button>
                },
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        responsive: true,
        scrollX: true
    });

    table.on('search.dt', () => {
        let data = table.rows({ search: 'applied' }).data();
        // console.log(data);
        showMap(data)
        // groupTam(data)
    });

    let findData = function () {
        console.log(this.value);
        table.search(this.value).draw();
    }
    // document.getElementById("tam").addEventListener("change", findData);
}

showData()