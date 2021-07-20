<?php
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
session_start();

if (!$_SESSION["UserID"] or $_SESSION["UserID"] != 'Admin') {
    Header("Location: form_login.php");
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <title>Green Peafowl</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap.min.css" />
    <link rel="apple-touch-icon" sizes="57x57" href="./components/kit/core/img/icons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="./components/kit/core/img/icons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="./components/kit/core/img/icons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="./components/kit/core/img/icons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./components/kit/core/img/icons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="./components/kit/core/img/icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="./components/kit/core/img/icons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./components/kit/core/img/icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./components/kit/core/img/icons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="./components/kit/core/img/icons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./components/kit/core/img/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="./components/kit/core/img/icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./components/kit/core/img/icons/favicon-16x16.png">
    <!-- <link href="https://fonts.googleapis.com/css?family=Prompt:400,700,800&display=swap" rel="stylesheet"> -->
    <!-- google icon and font -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
        integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit:100i,300,400,500">
</head>

<body class="fix-header card-no-border">
    <div id="main-wrapper">
        <div class="page-wrapper">
            <div style="padding: 10px">
                <div class="row page-titles">

                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>ระบบสมาชิก</h4><br />
                                        <div class="text-right">
                                            <button id="addUser" class="btn btn-success">เพิ่มผู้ใช้งาน</button>
                                            <a href="./index_admin.php" type="button" class="btn btn-default">หน้าหลัก</a>
                                            <a href="./logout.php" type="button" class="btn btn-default">ออกจากระบบ</a>
                                        </div>
                                        
                                        <hr>
                                        <h4>รายชื่อ user ผู้เข้าใช้งาน</h4>
                                        <!-- <div id="container" style="width: 100%; height: 400px; margin: 0 auto"></div> -->
                                        <table id="user" class="table table-striped table-bordered display"
                                            cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <h6>username</h6>
                                                    </th>
                                                    <th>
                                                        <h6>password</h6>
                                                    </th>
                                                    <th>
                                                        <h6>First name</h6>
                                                    </th>
                                                    <th>
                                                        <h6>Last name</h6>
                                                    </th>
                                                    <th>
                                                        <h6>email</h6>
                                                    </th>
                                                    <th>
                                                        <h6>Role</h6>
                                                    </th>
                                                    <th>
                                                        <h6>Delete</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- .right-sidebar -->
            </div>
            <!-- <footer class="footer"> © 2018 สำนักงานป้องกันควบคุมโรคที่ 2 จังหวัดพิษณุโลก </footer> -->
        </div>

        <!-- add Modal -->
        <div class="modal fade" id="addModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-body" style="padding:40px 50px;">
                        <form role="form">
                            <div class="form-group">
                                <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                                <input type="text" class="form-control" id="add_id_user">
                            </div>
                            <div class="form-group">
                                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                                <input type="text" class="form-control" id="add_id_pass">
                            </div>
                            <div class="form-group">
                                <label for="usrname"><span class="glyphicon glyphicon-user"></span> ชื่อ</label>
                                <input type="text" class="form-control" id="add_firstname">
                            </div>
                            <div class="form-group">
                                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> นามสกุล</label>
                                <input type="text" class="form-control" id="add_lastname">
                            </div>
                            <div class="form-group">
                                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> email</label>
                                <input type="text" class="form-control" id="add_email">
                            </div>
                            <div class="form-group">
                                <label for="inputState">สิทธิ์การใช้งาน</label>
                                <select id="add_role" class="form-control">
                                    <option value="Admin">Admin</option>
                                    <option value="CEO">CEO</option>
                                    <option value="Researchers">Researchers</option>
                                    <option value="NP">NP Staff</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <hr>
                            <div >
                                <button type="submit" id="btnAddUsr" class="btn btn-success " data-dismiss="modal"><span class="glyphicon glyphicon-off"></span> ตกลง</button>
                                &nbsp
                                <button type="submit" class="btn btn-danger  " data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- remove modal -->
        <div class="modal fade" id="removeModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-body" style="padding:40px 50px;">
                        <form role="form">
                            <h5>คุณต้องการลบ:</h5>
                            id: <span id="rm_id"></span><br>
                            id_user: <span id="rm_id_user"></span><br>
                            firstname: <span id="rm_firstname"></span><br>
                            lastname: <span id="rm_lastname"></span><br>
                            <p></p>
                            <div class="row">
                                <div class="col-6">
                                    <button type="submit" id="btnYesDel" class="btn btn-success btn-block"
                                        data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span> ตกลง</button>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-danger btn-block" data-dismiss="modal"><span
                                            class="glyphicon glyphicon-remove"></span> ยกเลิก</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- <script src="../assets/plugins/jquery/jquery.min.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap.min.js"></script>
    <script src="./form_admin.js"></script>
</body>

</html>