<?php 
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
    <title>ud accident</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="./../dist/bootstrap.min.united.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
        integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit:100i,300,400,500">
    <link rel="stylesheet" href="./form_login.css">

</head>
<style>
    .bg {
        border-radius: 25px;
        background: #dddddd;
        
    }
</style>

<body>
    <div id="cover" class="min-vh-100">
        <div id="cover-caption" >
            <div class="container">
                <div class="row text-white">
                    <div class="col-xl-4 col-lg-4 col-md-8 col-sm-10 mx-auto text-center form p-4 bg">
                        <div class="px-2">
                            
                            <p>"ระบบรายงานการเกิดอุบัติเหตุและจุดเสี่ยง"</p>
                            <form name="frmlogin" class="justify-content-center" method="post" action="login.php">
                                <p> ชื่อผู้ใช้ :
                                    <input type="text" class="form-control" id="Username" required name="Username"
                                        placeholder="Username">
                                </p>
                                <p>รหัสผ่าน :
                                    <input type="password" class="form-control" id="Password" required name="Password"
                                        placeholder="Password">
                                </p>
                                <p>
                                    <button type="submit" class="btn btn-primary">Login</button>
                                    <button type="reset" class="btn btn-warning">Reset</button>
                                    <br>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>

</body>

</html>