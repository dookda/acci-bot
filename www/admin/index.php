<?php
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    session_start();   
    
    if (!$_SESSION["UserID"]) {
        Header("Location: form_login.php");
    // }elseif($_SESSION["UserID"] != 'Admin'){
    //     Header("Location: form_login.php");
    }else{
        echo "<script>var usr = '" . $_SESSION['UserID'] . "'</script>";
    }

    // if (isset($_SESSION["UserID"])) {
    // }else{
    //     Header("Location: form_login.php");
    // }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>UD-Access</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="./../dist/bootstrap.min.united.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>
    <!-- <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css" rel="stylesheet" /> -->
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="./index.css">
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">UD-Accident</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">รายงานการเกิดอุบัติเหตุ</a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="report.php">เพิ่ม/แก้ไขข้อมูล</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="riskpoint.php">รายงานจุดเสี่ยง</a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li> -->
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" >ผู้ใช้งาน: <span id="usr"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="logout.php">ออกจากระบบ</a>
                </li>
            </ul>
        </div>
        
    </nav>

    <div class="container-fluid mt-2 mb-1">

        <div class="jumbotron">

            <label for="dateStart">กำหนดวันที่ค้นหาการเกิดอุบัติเหตุ</label>
            <div class="row">
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label for="dateStart">ตั้งแต่วันที่</label>
                        <input type="date" class="form-control" id="dateStart">
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label for="dateEnd">ถึงวันที่</label>
                        <input type="date" class="form-control" id="dateEnd">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">

                        <button class="btn btn-info" onclick="getDate()">ค้นหา</button>
                        <p></p>
                        <span class="badge badge-primary f16">พบจุดการเกิดอุบัติเหตุที่ถูกรายงานจำนวน <span
                                id="riskall"></span>
                            แห่ง</span>
                    </div>
                </div>
            </div>
            <!-- <hr> -->


        </div>
        <div class="row">
            <div class="col-lg-4 col-sm-12">
                <div id="map"></div>
            </div>
            <div class="col-lg-4 col-sm-12">
                <div class="list-group list-group-flush fx" id="riskList"></div>
            </div>
            <div class="col-lg-4 col-sm-12">
                <div id="chart"></div>
            </div>

        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="./index.js"></script>
    <script>
       $('#usr').text(usr);
    </script>

</body>

</html>