$(function () {
    "use strict";


    // datatable
    const url = 'http://localhost:3100/peafowl-api';

    // New record
    $('a.editor_create').on('click', function (e) {
        e.preventDefault();

        editor.create({
            title: 'Create new record',
            buttons: 'Add'
        });
    });

    // Edit record
    $('#user').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();

        editor.edit($(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        });
    });

    var tb = $('#user').DataTable({
        "ajax": '/getMember',
        "columns": [{
            "data": "id_user"
        }, {
            "data": "id_pass"
        }, {
            "data": "firstname"
        }, {
            "data": "lastname"
        }, {
            "data": "email"
        }, {
            "data": "usr_level"
        }, {
            data: null,
            className: "center",
            defaultContent: '<button id="remove" class="btn btn-danger btn-block">ลบผู้ใช้งาน</button>'
        }]
    });

    // delete user
    var selUser;
    $('#user tbody').on('click', '#remove', function (e) {
        selUser = tb.row($(this).parents('tr')).data();
        $('#removeModal').modal();
        $('#rm_id').html(selUser.id);
        $('#rm_id_user').html(selUser.id_user);
        $('#rm_firstname').html(selUser.firstname);
        $('#rm_lastname').html(selUser.lastname);
        // alert(data[0] + "'s salary is: " + data[5]);
    });

    $('#btnYesDel').on('click', () => {
        // console.log(selUser);
        $.post('/removeuser', {
            id: selUser.id,
            id_user: selUser.id_user
        }, (data, status) => {
            tb.ajax.reload(null, false);
        })
    })

    // add user
    $('#addUser').click((r) => {
        $('#addModal').modal();
    });

    $('#btnAddUsr').on('click', () => {
        var id_user = $('#add_id_user').val();
        var id_pass = $('#add_id_pass').val();
        var firstname = $('#add_firstname').val();
        var lastname = $('#add_lastname').val();
        var email = $('#add_email').val();
        var role = $('#add_role option:selected').text()
        // console.log(role);
        $.post('/insertuser', {
            id_user: id_user,
            id_pass: id_pass,
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role
        }, (data, status) => {
            tb.ajax.reload(null, false);
        })
    })
});