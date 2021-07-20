'use strict'

const url = 'https://rti2dss.com:3100';
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNrYTEyOGtvNDA3bmEzaHA2ZDU5bDFiYnIifQ.zO12kPiWg7C_50kWrfRNKg';
let dataurl;
let insertForm = `<p><div class="card bg-light mb-3 p-3">
<div class="row">
    <div class="col-sm-2">
        <div class="form-group"><label class="login-field-icon fui-user"
                for="sex">คำนำหน้า</label>
            <select class="form-control" name="title_name[]" id="title_name">
                <option value="" disabled>คำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="น.ส.">น.ส.</option>
                <option value="ด.ช.">ด.ช.</option>
                <option value="ด.ญ.">ด.ญ.</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
            </select>
        </div>
    </div>
    <div class="col-sm-5">
        <div class="form-group">

            <label class="login-field-icon fui-new" for="first_name">ชื่อ</label>
            <input type="text" class="form-control" name="first_name[]"
                id="first_name" />
        </div>
    </div>
    <div class="col-sm-5">
        <div class="form-group">
            <label class="login-field-icon fui-user" for="last_name">นามสกุล</label>
            <input type="text" class="form-control" name="last_name[]" id="last_name" />
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-3">
        <label class="login-field-icon fui-user" for="type">บาดเจ็บ/เสียชีวิต</label>
        <select class="form-control" name="type[]" id="type">
            <option value="" disabled>บาดเจ็บ/เสียชีวิต</option>
            <option value="บาดเจ็บ">บาดเจ็บ</option>
            <option value="เสียชีวิต">เสียชีวิต</option>
        </select>
    </div>
    <div class="col-sm-3">
        <label class="login-field-icon fui-user"
            for="id_card">เลขบัตรประจำตัวประชาชน</label>
        <input type="number" class="form-control" name="id_card[]" id="id_card" />
    </div>

    <div class="col-sm-3">
        <div class="form-group">
            <label class="login-field-icon fui-user" for="age">อายุ</label>
            <input type="number" class="form-control" name="age[]" id="age" />
        </div>
    </div>
    <div class="col-sm-3">
        <div class="form-group"><label class="login-field-icon fui-user"
                for="sex">เพศ</label>
            <select class="form-control" name="sex[]" id="sex">
                <option value="" disabled>เพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
            </select>
        </div>
    </div>
</div>

<div class="form-group">
    <label class="login-field-icon fui-user"
        for="p_place">ที่อยู่ผู้บาดเจ็บ-เสียชีวิต</label>
    <input type="text" class="form-control" name="p_place[]" id="p_place" />
</div>

<div class="row">
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user"
                for="injury_type">ประเภทผู้บาดเจ็บ</label>
            <select class="form-control" name="injury_type[]" id="injury_type">
                <option value="" disabled>ประเภทผู้บาดเจ็บ</option>
                <option value="ขับขี่">ขับขี่</option>
                <option value="โดยสาร">โดยสาร</option>
                <option value="เดินเท้า">เดินเท้า</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>
        </div>
    </div>
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user" for="alcohol">แอลกอฮอล์</label>
            <select class="form-control" name="alcohol[]" id="alcohol">
                <option value="" disabled>แอลกอฮอล์</option>
                <option value="ดื่มแอลกอฮอล์">ดื่มแอลกอฮอล์</option>
                <option value="ไม่ดื่มแอลกอฮอล์">ไม่ดื่มแอลกอฮอล์</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </select>
        </div>
    </div>
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user"
                for="behaviour">พฤติกรรมเสี่ยง</label>
            <select class="form-control" name="behaviour[]" id="behaviour">
                <option value="" disabled>พฤติกรรมเสี่ยง</option>
                <option value="ไม่สวมหมวกนิรภัย">ไม่สวมหมวกนิรภัย</option>
                <option value="ไม่คาดเข็มขัดนิรภัย">ไม่คาดเข็มขัดนิรภัย</option>
                <option value="ขับรถเร็ว">ขับรถเร็ว</option>
                <option value="รถดัดแปลง">รถดัดแปลง</option>
                <option value="กลับรถ">กลับรถ</option>
                <option value="ไฟท้ายไม่ชัดเจน">ไฟท้ายไม่ชัดเจน</option>
                <option value="บรรทุกหนัก">บรรทุกหนัก</option>
                <option value="ขับย้อนศร">ขับย้อนศร</option>
                <option value="มีงานก่อสร้างทาง">มีงานก่อสร้างทาง</option>
                <option value="ขับรถตัดหน้า">ขับรถตัดหน้า</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </select>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user" for="death_info">ข้อมูลเสียชีวิต
                (ภายใน30
                วันจากเกิดเหตุ)</label>
            <select class="form-control" name="death_info[]" id="death_info">
                <option value="" disabled>ข้อมูลเสียชีวิต</option>
                <option value="ที่เกิดเหตุ">ที่เกิดเหตุ</option>
                <option value="ER">ER</option>
                <option value="ผู้ป่วยใน">ผู้ป่วยใน</option>
                <option value="ระหว่างส่งต่อ ณ จุดเกิดเหตุ-รพ.">ระหว่างส่งต่อ ณ
                    จุดเกิดเหตุ-รพ.</option>
                <option value="ระหว่างส่งต่อ รพช.-รพศ.">ระหว่างส่งต่อ รพช.-รพศ.</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>
        </div>
    </div>
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user"
                for="death_date">วันที่เสียชีวิต</label>
            <input type="date" class="form-control" name="death_date[]"
                id="death_date" />
        </div>
    </div>
    <div class="col-sm-4">
        <div class="form-group">
            <label class="login-field-icon fui-user"
                for="death_time">เวลาเสียชีวิต</label>
            <input type="time" class="form-control" name="death_time[]"
                id="death_time" />
        </div>
    </div>
 </div>
</div>`;

$(document).ready(async function () {
    console.log(usr)


    if (usr == 'guest') {
        $('#data').DataTable({
            ajax: url + "/acc-api/get-acc-info",
            columns: [
                { data: "acc_date" },
                { data: "acc_place" },
                { data: "tam" },
                { data: "amp" },
                { data: "vehicle" },

            ]
        });
    } else {
        $('#data').DataTable({
            ajax: url + "/acc-api/get-acc-info",
            columns: [
                { data: "acc_date" },
                { data: "acc_place" },
                { data: "tam" },
                { data: "amp" },
                { data: "vehicle" },
                {
                    mRender: (data, type, full) => {
                        // console.log(full)
                        let edit = '<a class="btn btn-info btn-sm mt-1" id="edit" onclick=editModal(' +
                            JSON.stringify(full.pkid) +
                            ')><i class="bx bx-message-square-edit"></i>&nbsp;' + 'แก้ใข' + '</a>';
                        let remove = '<a class="btn btn-warning btn-sm mt-1" id="remove" onclick=removeModal(' +
                            JSON.stringify(full.pkid) +
                            ')><i class="bx bx-message-square-x" ></i>&nbsp;' + 'ลบ' + '</a>';
                        return edit + '&nbsp;' + remove
                    }
                },
            ]
        });
    }

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#acc_date').val(today)

    var hr = ('0' + now.getHours()).substr(-2)
    var mn = ('0' + now.getMinutes()).substr(-2)
    var formatted = hr + ":" + mn;
    $('#acc_time').val(formatted)

    $('#pro').val('จังหวัดอุตรดิตถ์')
    $('#amp').val('อำเภอเมือง')

    var i = 1;
    $("#addMore").click(function (e) {
        i += 1;
        // console.log(e)
        e.preventDefault();
        $("#divInsert").append(insertForm);
    });

    $('#insertData').click(e => {
        let title_name = [];
        $('select[name^=title_name]').each(function () {
            title_name.push($(this).val());
        });

        let first_name = [];
        $('input[name^=first_name]').each(function () {
            first_name.push($(this).val());
        });

        let last_name = [];
        $('input[name^=last_name]').each(function () {
            last_name.push($(this).val());
        });

        let type = [];
        $('select[name^=type]').each(function () {
            type.push($(this).val());
        });

        let id_card = [];
        $('input[name^=id_card]').each(function () {
            id_card.push($(this).val());
        });

        let age = [];
        $('input[name^=age]').each(function () {
            age.push($(this).val());
        });

        let sex = [];
        $('select[name^=sex]').each(function () {
            sex.push($(this).val());
        });

        let p_place = [];
        $('input[name^=p_place]').each(function () {
            p_place.push($(this).val());
        });

        let injury_type = [];
        $('select[name^=injury_type]').each(function () {
            injury_type.push($(this).val());
        });

        let alcohol = [];
        $('select[name^=alcohol]').each(function () {
            alcohol.push($(this).val());
        });

        let behaviour = [];
        $('select[name^=behaviour]').each(function () {
            behaviour.push($(this).val());
        });

        let death_info = [];
        $('select[name^=death_info]').each(function () {
            death_info.push($(this).val());
        });

        let death_date = [];
        $('input[name^=death_date]').each(function () {
            death_date.push($(this).val());
        });

        let death_time = [];
        $('input[name^=death_time]').each(function () {
            death_time.push($(this).val());
        });

        var arrObj = []
        first_name.forEach((val, i) => {
            let ob = {
                title_name: title_name[i],
                first_name: first_name[i],
                last_name: last_name[i],
                type: type[i],
                id_card: Number(id_card[i]) >= 0 ? Number(id_card[i]) : 0,
                age: Number(age[i]) >= 0 ? Number(age[i]) : 0,
                sex: sex[i],
                p_place: p_place[i],
                injury_type: injury_type[i],
                alcohol: alcohol[i],
                behaviour: behaviour[i],
                death_info: death_info[i],
                death_date: death_date[i],
                death_time: death_time[i],
            }
            arrObj.push(ob)
        })

        if (!dataurl) {
            dataurl = '-';
        }

        let obj = {
            acc_place: $('#acc_place').val(),
            acc_date: $('#acc_date').val(),
            acc_time: $('#acc_time').val(),
            pro: $('#pro').val(),
            amp: $('#amp').val(),
            tam: $('#tam').val(),
            x: Number($('#x').val()),
            y: Number($('#y').val()),
            vehicle: $('#vehicle').val(),
            disputant: $('#disputant').val(),
            to_hospital: $('#to_hospital').val(),
            transfer_type: $('#transfer_type').val(),
            img: dataurl,
            arrObj: arrObj
        }
        // console.log(obj)
        $.post(url + '/acc-api/forminsert', obj).done(res => {
            $('#dataModal').modal('hide');
            $('#data').DataTable().ajax.reload();
        })
    })

    $('#updateData').click(e => {
        let gid = [];
        $('input[name^=gid]').each(function () {
            gid.push($(this).val());
        });

        let title_name = [];
        $('select[name^=title_name]').each(function () {
            title_name.push($(this).val());
        });

        let first_name = [];
        $('input[name^=first_name]').each(function () {
            first_name.push($(this).val());
        });

        let last_name = [];
        $('input[name^=last_name]').each(function () {
            last_name.push($(this).val());
        });

        let type = [];
        $('select[name^=type]').each(function () {
            type.push($(this).val());
        });

        let id_card = [];
        $('input[name^=id_card]').each(function () {
            id_card.push($(this).val());
        });

        let age = [];
        $('input[name^=age]').each(function () {
            age.push($(this).val());
        });

        let sex = [];
        $('select[name^=sex]').each(function () {
            sex.push($(this).val());
        });

        let p_place = [];
        $('input[name^=p_place]').each(function () {
            p_place.push($(this).val());
        });

        let injury_type = [];
        $('select[name^=injury_type]').each(function () {
            injury_type.push($(this).val());
        });

        let alcohol = [];
        $('select[name^=alcohol]').each(function () {
            alcohol.push($(this).val());
        });

        let behaviour = [];
        $('select[name^=behaviour]').each(function () {
            behaviour.push($(this).val());
        });

        let death_info = [];
        $('select[name^=death_info]').each(function () {
            death_info.push($(this).val());
        });

        let death_date = [];
        $('input[name^=death_date]').each(function () {
            death_date.push($(this).val());
        });

        let death_time = [];
        $('input[name^=death_time]').each(function () {
            death_time.push($(this).val());
        });

        var arrObj = []
        first_name.forEach((val, i) => {
            let ob = {
                gid: gid[i],
                title_name: title_name[i],
                first_name: first_name[i],
                last_name: last_name[i],
                type: type[i],
                id_card: Number(id_card[i]) >= 0 ? Number(id_card[i]) : 0,
                age: Number(age[i]) >= 0 ? Number(age[i]) : 0,
                sex: sex[i],
                p_place: p_place[i],
                injury_type: injury_type[i],
                alcohol: alcohol[i],
                behaviour: behaviour[i],
                death_info: death_info[i],
                death_date: death_date[i],
                death_time: death_time[i],
            }
            arrObj.push(ob)
        })

        let obj = {
            acc_place: $('#acc_place').val(),
            acc_date: $('#acc_date').val(),
            acc_time: $('#acc_time').val(),
            pro: $('#pro').val(),
            amp: $('#amp').val(),
            tam: $('#tam').val(),
            x: Number($('#x').val()),
            y: Number($('#y').val()),
            vehicle: $('#vehicle').val(),
            disputant: $('#disputant').val(),
            to_hospital: $('#to_hospital').val(),
            transfer_type: $('#transfer_type').val(),
            pkid: $('#pkid').val(),
            arrObj: arrObj
        }

        $.post(url + '/acc-api/formupdate', obj).done(res => {
            $('#dataModal').modal('hide');
            $('#data').DataTable().ajax.reload();
        })
    })

    $('#deleteData').click(e => {
        let obj = {
            pkid: $('#pkid2').val()
        }

        $.post(url + '/acc-api/formremove', obj).done(res => {
            $('#removeModal').modal('hide');
            $('#data').DataTable().ajax.reload();
        })
    })
});

let lngLat = { lng: 100.265787, lat: 16.820378 }
document.getElementById("x").value = lngLat.lat;
document.getElementById("y").value = lngLat.lng;

// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: lngLat,
//     zoom: 12

// });

var map = new mapboxgl.Map({
    container: 'map',
    zoom: 9,
    // center: [137.915, 36.259],
    center: lngLat,
    style: 'mapbox://styles/mapbox/satellite-v9'
});

var marker;
marker = new mapboxgl.Marker()
    .setLngLat(lngLat)
    .setDraggable(true)
    .addTo(map);

marker.on('dragend', onDragEnd);

function onDragEnd() {
    lngLat = marker.getLngLat();
    document.getElementById("x").value = lngLat.lat;
    document.getElementById("y").value = lngLat.lng;
    // console.log(JSON.stringify(marker.toGeoJSON().geometry));
}

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

function insertModal() {

    $('#divEdit').empty()
    $('#divInsert').empty()
    $('#pkid').hide()
    $('#divEdit').hide()
    $('#imgfile').show()
    $('#divInsert').append(insertForm)
    $('#addMore').show()
    $('#insertData').show()
    $('#updateData').hide()
    $('#dataModal').modal()
}

function editModal(ob) {
    // console.log(ob);
    $('#divInsert').empty()
    $('#divEdit').empty()
    $('#pkid').show()
    $('#divEdit').show()
    $('#addMore').hide()
    $('#insertData').hide()
    $('#updateData').show()
    $('#dataModal').modal()

    $('#imgfile').hide()

    $.get(url + '/acc-api/get-acc-info/' + ob).done(res => {
        // console.log(res)
        let data = res.data[0];
        marker.setLngLat({ lng: data.y, lat: data.x });
        map.setCenter({ lng: data.y, lat: data.x });

        var now = new Date(data.acc_date);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        var hr = ('0' + now.getHours()).substr(-2)
        var mn = ('0' + now.getMinutes()).substr(-2)
        var formatted = hr + ":" + mn;

        $('#acc_place').val(data.acc_place);
        $('#acc_date').val(today);
        $('#acc_time').val(formatted);
        $('#pro').val(data.pro);
        $('#amp').val(data.amp);
        $('#tam').val(data.tam);
        $('#x').val(data.x);
        $('#y').val(data.y);
        $('#vehicle').val(data.vehicle);
        $('#disputant').val(data.disputant);
        $('#to_hospital').val(data.to_hospital);
        $('#transfer_type').val(data.transfer_type);
        $('#pkid').val(data.pkid);
    })

    $.get(url + '/acc-api/get-acc-name/' + ob).done(res => {
        // console.log(res)
        res.data.forEach(async (v, i) => {
            // console.log(v.gid)
            await $('#divEdit').append(`<p><div class="card bg-light mb-3 p-3">
                <div class="row">
                    <div class="col-sm-1">
                         <div class="form-group">
                         <label class="login-field-icon fui-user" for="gid">id</label>
                         <input type="number" class="form-control" name="gid[]" id="gid${v.gid}" readonly="true"/>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group"><label class="login-field-icon fui-user"
                                for="sex">คำนำหน้า</label>
                            <select class="form-control" name="title_name[]" id="title_name${v.gid}">
                                <option value="" disabled>คำนำหน้า</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="น.ส.">น.ส.</option>
                                <option value="ด.ช.">ด.ช.</option>
                                <option value="ด.ญ.">ด.ญ.</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-new" for="first_name">ชื่อ</label>
                            <input type="text" class="form-control" name="first_name[]"
                                id="first_name${v.gid}" />
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="form-group">
                            <label class="login-field-icon fui-user" for="last_name">นามสกุล</label>
                            <input type="text" class="form-control" name="last_name[]" id="last_name${v.gid}" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3">
                        <label class="login-field-icon fui-user" for="type">บาดเจ็บ/เสียชีวิต</label>
                        <select class="form-control" name="type[]" id="type${v.gid}">
                            <option value="" disabled>บาดเจ็บ/เสียชีวิต</option>
                            <option value="บาดเจ็บ">บาดเจ็บ</option>
                            <option value="เสียชีวิต">เสียชีวิต</option>
                        </select>
                    </div>
                    <div class="col-sm-3">
                        <label class="login-field-icon fui-user"
                            for="id_card">เลขบัตรประจำตัวประชาชน</label>
                        <input type="number" class="form-control" name="id_card[]" id="id_card${v.gid}" />
                    </div>

                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="login-field-icon fui-user" for="age">อายุ</label>
                            <input type="number" class="form-control" name="age[]" id="age${v.gid}" />
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group"><label class="login-field-icon fui-user"
                                for="sex">เพศ</label>
                            <select class="form-control" name="sex[]" id="sex${v.gid}">
                                <option value="" disabled>เพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="login-field-icon fui-user"
                        for="p_place">ที่อยู่ผู้บาดเจ็บ-เสียชีวิต</label>
                    <input type="text" class="form-control" name="p_place[]" id="p_place${v.gid}" />
                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user"
                                for="injury_type">ประเภทผู้บาดเจ็บ</label>
                            <select class="form-control" name="injury_type[]" id="injury_type${v.gid}">
                                <option value="" disabled>ประเภทผู้บาดเจ็บ</option>
                                <option value="ขับขี่">ขับขี่</option>
                                <option value="โดยสาร">โดยสาร</option>
                                <option value="เดินเท้า">เดินเท้า</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user" for="alcohol">แอลกอฮอล์</label>
                            <select class="form-control" name="alcohol[]" id="alcohol${v.gid}">
                                <option value="" disabled>แอลกอฮอล์</option>
                                <option value="ดื่มแอลกอฮอล์">ดื่มแอลกอฮอล์</option>
                                <option value="ไม่ดื่มแอลกอฮอล์">ไม่ดื่มแอลกอฮอล์</option>
                                <option value="ไม่ทราบ">ไม่ทราบ</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user"
                                for="behaviour">พฤติกรรมเสี่ยง</label>
                            <select class="form-control" name="behaviour[]" id="behaviour${v.gid}">
                                <option value="" disabled>พฤติกรรมเสี่ยง</option>
                                <option value="ไม่สวมหมวกนิรภัย">ไม่สวมหมวกนิรภัย</option>
                                <option value="ไม่คาดเข็มขัดนิรภัย">ไม่คาดเข็มขัดนิรภัย</option>
                                <option value="ขับรถเร็ว">ขับรถเร็ว</option>
                                <option value="รถดัดแปลง">รถดัดแปลง</option>
                                <option value="กลับรถ">กลับรถ</option>
                                <option value="ไฟท้ายไม่ชัดเจน">ไฟท้ายไม่ชัดเจน</option>
                                <option value="บรรทุกหนัก">บรรทุกหนัก</option>
                                <option value="ขับย้อนศร">ขับย้อนศร</option>
                                <option value="มีงานก่อสร้างทาง">มีงานก่อสร้างทาง</option>
                                <option value="ขับรถตัดหน้า">ขับรถตัดหน้า</option>
                                <option value="ไม่ทราบ">ไม่ทราบ</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user" for="death_info">ข้อมูลเสียชีวิต
                                (ภายใน30
                                วันจากเกิดเหตุ)</label>
                            <select class="form-control" name="death_info[]" id="death_info${v.gid}">
                                <option value="" disabled>ข้อมูลเสียชีวิต</option>
                                <option value="ที่เกิดเหตุ">ที่เกิดเหตุ</option>
                                <option value="ER">ER</option>
                                <option value="ผู้ป่วยใน">ผู้ป่วยใน</option>
                                <option value="ระหว่างส่งต่อ ณ จุดเกิดเหตุ-รพ.">ระหว่างส่งต่อ ณ
                                    จุดเกิดเหตุ-รพ.</option>
                                <option value="ระหว่างส่งต่อ รพช.-รพศ.">ระหว่างส่งต่อ รพช.-รพศ.</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user"
                                for="death_date">วันที่เสียชีวิต</label>
                            <input type="date" class="form-control" name="death_date[]"
                                id="death_date${v.gid}" />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="login-field-icon fui-user"
                                for="death_time">เวลาเสียชีวิต</label>
                            <input type="time" class="form-control" name="death_time[]"
                                id="death_time${v.gid}" />
                        </div>
                    </div>
                </div>
            </div>`)
            $('#gid' + v.gid).val(v.gid)
            $('#title_name' + v.gid).val(v.title_name)
            $('#first_name' + v.gid).val(v.first_name)
            $('#last_name' + v.gid).val(v.last_name)
            $('#type' + v.gid).val(v.type)
            $('#id_card' + v.gid).val(v.id_card)
            $('#age' + v.gid).val(v.age)
            $('#sex' + v.gid).val(v.sex)
            $('#p_place' + v.gid).val(v.p_place)
            $('#injury_type' + v.gid).val(v.injury_type)
            $('#alcohol' + v.gid).val(v.alcohol)
            $('#behaviour' + v.gid).val(v.behaviour)
            $('#death_info' + v.gid).val(v.death_info)
            $('#death_date' + v.gid).val(v.death_date)
            $('#death_time' + v.gid).val(v.death_time)
        })
    })

    $.get(url + '/acc-api/get-acc-img/' + ob.pkid).done(res => {
        // console.log(res)
        res.data.map(r => $("#preview").attr('src', r.img))
    })
}
function removeModal(ob) {
    $('#pkid2').val(ob)
    $('#removeModal').modal()
}

function closeModal() {
    console.log('da')
}