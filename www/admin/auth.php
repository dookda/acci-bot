<?php
    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    session_start();   
    
    if (!$_SESSION["UserID"]) {
        Header("Location: form_login.php");
    }elseif($_SESSION["UserID"] != 'Admin'){
        Header("Location: form_login.php");
    }else{
        echo "<script>var usr = '" . $_SESSION['UserID'] . "'</script>";
    }

    // if (isset($_SESSION["UserID"])) {
    // }else{
    //     Header("Location: form_login.php");
    // }
?>
<!DOCTYPE html>
<html lang="en" data-kit-theme="default">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>
  Green Peafowl
  </title>
    <!-- <link rel="icon" type="image/png" href="./components/kit/core/img/icons/favicon-96x96.png" /> -->
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
    <link href="https://fonts.googleapis.com/css?family=Prompt:400,700,800&display=swap" rel="stylesheet">
  

  <!-- VENDORS -->
  <link rel="stylesheet" type="text/css" href="./vendors/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="./vendors/perfect-scrollbar/css/perfect-scrollbar.css">
  <link rel="stylesheet" type="text/css" href="./vendors/ladda/dist/ladda-themeless.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/bootstrap-select/dist/css/bootstrap-select.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/select2/dist/css/select2.min.css">
  <link rel="stylesheet" type="text/css"
    href="./vendors/tempus-dominus-bs4/build/css/tempusdominus-bootstrap-4.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/fullcalendar/dist/fullcalendar.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/bootstrap-sweetalert/dist/sweetalert.css">
  <link rel="stylesheet" type="text/css" href="./vendors/summernote/dist/summernote.css">
  <link rel="stylesheet" type="text/css" href="./vendors/owl.carousel/dist/assets/owl.carousel.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/ionrangeslider/css/ion.rangeSlider.css">
  <link rel="stylesheet" type="text/css"
    href="https://cdn.datatables.net/v/bs4/dt-1.10.18/fc-3.2.5/r-2.2.2/datatables.min.css" />
  <link rel="stylesheet" type="text/css" href="./vendors/c3/c3.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/chartist/dist/chartist.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/nprogress/nprogress.css">
  <link rel="stylesheet" type="text/css" href="./vendors/jquery-steps/demo/css/jquery.steps.css">
  <link rel="stylesheet" type="text/css" href="./vendors/dropify/dist/css/dropify.min.css">
  <link rel="stylesheet" type="text/css" href="./vendors/font-feathericons/dist/feather.css">
  <link rel="stylesheet" type="text/css" href="./vendors/font-linearicons/style.css">
  <link rel="stylesheet" type="text/css" href="./vendors/font-icomoon/style.css">
  <link rel="stylesheet" type="text/css" href="./vendors/font-awesome/css/font-awesome.min.css">
  <script src="./vendors/jquery/dist/jquery.min.js"></script>
  <script src="./vendors/popper.js/dist/umd/popper.js"></script>
  <script src="./vendors/jquery-ui/jquery-ui.min.js"></script>
  <script src="./vendors/bootstrap/dist/js/bootstrap.js"></script>
  <script src="./vendors/jquery-mousewheel/jquery.mousewheel.min.js"></script>
  <script src="./vendors/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
  <script src="./vendors/spin.js/spin.js"></script>
  <script src="./vendors/ladda/dist/ladda.min.js"></script>
  <script src="./vendors/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
  <script src="./vendors/select2/dist/js/select2.full.min.js"></script>
  <script src="./vendors/html5-form-validation/dist/jquery.validation.min.js"></script>
  <script src="./vendors/jquery-typeahead/dist/jquery.typeahead.min.js"></script>
  <script src="./vendors/jquery-mask-plugin/dist/jquery.mask.min.js"></script>
  <script src="./vendors/autosize/dist/autosize.min.js"></script>
  <script src="./vendors/bootstrap-show-password/dist/bootstrap-show-password.min.js"></script>
  <script src="./vendors/moment/min/moment.min.js"></script>
  <script src="./vendors/tempus-dominus-bs4/build/js/tempusdominus-bootstrap-4.min.js"></script>
  <script src="./vendors/fullcalendar/dist/fullcalendar.min.js"></script>
  <script src="./vendors/bootstrap-sweetalert/dist/sweetalert.min.js"></script>
  <script src="./vendors/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js"></script>
  <script src="./vendors/summernote/dist/summernote.min.js"></script>
  <script src="./vendors/owl.carousel/dist/owl.carousel.min.js"></script>
  <script src="./vendors/ionrangeslider/js/ion.rangeSlider.min.js"></script>
  <script src="./vendors/nestable/jquery.nestable.js"></script>
  <script type="text/javascript"
    src="https://cdn.datatables.net/v/bs4/dt-1.10.18/fc-3.2.5/r-2.2.2/datatables.min.js"></script>
  <script src="./vendors/editable-table/mindmup-editabletable.js"></script>
  <script src="./vendors/d3/d3.min.js"></script>
  <script src="./vendors/c3/c3.min.js"></script>
  <script src="./vendors/chartist/dist/chartist.min.js"></script>
  <script src="./vendors/peity/jquery.peity.min.js"></script>
  <script src="./vendors/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.min.js"></script>
  <script src="./vendors/jquery-countTo/jquery.countTo.js"></script>
  <script src="./vendors/nprogress/nprogress.js"></script>
  <script src="./vendors/jquery-steps/build/jquery.steps.min.js"></script>
  <script src="./vendors/chart.js/dist/Chart.bundle.min.js"></script>
  <script src="./vendors/dropify/dist/js/dropify.min.js"></script>
  <script src="./vendors/d3-dsv/dist/d3-dsv.js"></script>
  <script src="./vendors/d3-time-format/dist/d3-time-format.js"></script>
  <script src="./vendors/techan/dist/techan.min.js"></script>
  <script src="./vendors/jqvmap/dist/jquery.vmap.js"></script>
  <script src="./vendors/jqvmap/dist/maps/jquery.vmap.usa.js" charset="utf-8"></script>

  <!-- CLEAN UI PRO HTML ADMIN TEMPLATE MODULES-->
  <link rel="stylesheet" type="text/css" href="./components/kit/vendors/style.css">
  <link rel="stylesheet" type="text/css" href="./components/kit/core/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/styles/style.css">
  <link rel="stylesheet" type="text/css" href="./components/kit/widgets/style.css">
  <link rel="stylesheet" type="text/css" href="./components/kit/apps/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/ecommerce/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/dashboards/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/system/auth/style.css">

  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/breadcrumbs/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/footer/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/menu-left/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/menu-top/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/sidebar/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/support-chat/style.css">
  <link rel="stylesheet" type="text/css" href="./components/cleanui/layout/topbar/style.css">


  <script src="./components/kit/core/index.js"></script>
  <script src="./components/cleanui/layout/menu-left/index.js"></script>
  <script src="./components/cleanui/layout/menu-top/index.js"></script>
  <script src="./components/cleanui/layout/sidebar/index.js"></script>
  <script src="./components/cleanui/layout/support-chat/index.js"></script>
  <script src="./components/cleanui/layout/topbar/index.js"></script>


  <!-- PRELOADER STYLES-->
  <style>
    .initial__loading {
      position: fixed;
      z-index: 99999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDFweCIgIGhlaWdodD0iNDFweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciPiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuY29sb3J9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIG5nLWF0dHItcj0ie3tjb25maWcucmFkaXVzfX0iIG5nLWF0dHItc3Ryb2tlLWRhc2hhcnJheT0ie3tjb25maWcuZGFzaGFycmF5fX0iIHN0cm9rZT0iIzAxOTBmZSIgc3Ryb2tlLXdpZHRoPSIxMCIgcj0iMzUiIHN0cm9rZS1kYXNoYXJyYXk9IjE2NC45MzM2MTQzMTM0NjQxNSA1Ni45Nzc4NzE0Mzc4MjEzOCIgdHJhbnNmb3JtPSJyb3RhdGUoODQgNTAgNTApIj4gICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPiAgICA8L2NpcmNsZT4gIDwvc3ZnPg==);
      background-color: #fff;
    }

    [data-kit-theme='dark'] .initial__loading {
      background-color: #0c0c1b;
    }
  </style>
  <script>
    $(document).ready(function () {
      $('.initial__loading').delay(200).fadeOut(400)
    })
  </script>
</head>

<body class="cui__layout--cardsShadow">
  <div class="initial__loading"></div>
  <div class="cui__layout cui__layout--hasSider">

    <div class="cui__menuLeft">
      <div class="cui__menuLeft__mobileTrigger"><span></span></div>
      <div class="cui__menuLeft__trigger"></div>
      <div class="cui__menuLeft__outer">
        <div class="cui__menuLeft__logo__container">
          <div class="cui__menuLeft__logo">
            <img src="./components/kit/core/img/logo.png" class="mr-2" alt="Clean UI" height="45px">
            <div class="cui__menuLeft__logo__name">Peafowl</div>
            <div class="cui__menuLeft__logo__descr">:)</div>
          </div>
        </div>
        <div class="cui__menuLeft__scroll kit__customScroll">
          <ul class="cui__menuLeft__navigation">

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./index.php">
                <span class="cui__menuLeft__item__title">ชั้นข้อมูล</span>
                <i class="cui__menuLeft__item__icon fe fe-layers"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./index.php">
                <span class="cui__menuLeft__item__title">แผนที่ฐาน</span>
                <i class="cui__menuLeft__item__icon fe fe-layers"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./dashboards.php">
                <span class="cui__menuLeft__item__title">Dashboard</span>
                <i class="cui__menuLeft__item__icon fe fe-grid"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./mapsearch.php">
                <span class="cui__menuLeft__item__title">ค้นหาด้วยแผนที่</span>
                <i class="cui__menuLeft__item__icon fe fe-search"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./model.php">
                <span class="cui__menuLeft__item__title">วิเคราะห์เชิงพื้นที่</span>
                <i class="cui__menuLeft__item__icon fe fe-cpu"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./edit.php">
                <span class="cui__menuLeft__item__title">แก้ไขข้อมูล</span>
                <i class="cui__menuLeft__item__icon fe fe-sliders"></i>
              </a>
            </li>

            <li class="cui__menuLeft__item">
              <a class="cui__menuLeft__item__link" href="./auth.php">
                <span class="cui__menuLeft__item__title">จัดการสิทธิ์ผู้ใช้</span>
                <i class="cui__menuLeft__item__icon fe fe-settings"></i>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
    <div class="cui__menuLeft__backdrop"></div>

    <div class="cui__layout">
      <div class="cui__layout__header">
        <div class="cui__topbar">
          <div class="mr-4"></div>
          <div class="dropdown mr-4 d-none d-md-block"></div>
          <div class="dropdown mb-0 mr-auto d-xl-block d-none"></div>
          <div class="mr-4 d-none d-sm-block">
            ผู้ใช้งาน <span id="usr">TH</span> &nbsp <a href="./logout.php" class="btn warning">ออกจากระบบ</a>
          </div>
        </div>
      </div>
      <div class="cui__layout__content">

        <div class="cui__utils__content">
          <div class="row">
            <div class="col-lg-12">
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
                  <table id="user" class="table table-striped table-bordered display" cellspacing="0" width="100%">
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
                    <div>
                      <button type="submit" id="btnAddUsr" class="btn btn-success " data-dismiss="modal"><span
                          class="glyphicon glyphicon-off"></span> ตกลง</button>
                      &nbsp
                      <button type="submit" class="btn btn-danger  " data-dismiss="modal"><span
                          class="glyphicon glyphicon-remove"></span> ยกเลิก</button>
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


          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin="" />
          <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>

          <link rel="stylesheet" href="style.css" />
          <script src="./auth.js"></script>

          <script>
            $('#usr').text(usr)
          </script>
        </div>
      </div>

      <div class="cui__layout__footer">
        <div class="cui__footer">
          <div class="cui__footer__inner">
            <a href="https://thaipeafowl.com" target="_blank" rel="noopener noreferrer" class="cui__footer__logo">
              Green Peafowl
              <img src="./components/kit/core/img/logo.png" width="60px">
            </a>
            <br />
            <p class="mb-0">
              Copyright © 2020-2022 |
              <a href="#" target="_blank" rel="noopener noreferrer">Green Peafowl</a>
            </p>
          </div>
        </div>
      </div>


    </div>
  </div>
</body>

</html>