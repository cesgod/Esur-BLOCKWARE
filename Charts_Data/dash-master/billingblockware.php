<?php

  session_start();
  
  #var_dump($maxdm01);
  #echo "maxxx: ".$maxdm01;
  #echo "<br>max T: ".$maxts1;
  $string = file_get_contents("/var/www/html/dash/meters/client/production/stebw.json");

      
      if ($string === false) {
        echo "No content<br>";
      }

  $outp = json_decode($string, true);
      if ($outp === null) {
          // deal with error...
        echo "Parse error<br>";
      }
    $rangeib = array();
    $rangeib = $outp;
    #echo "Range: <pre>";print_r($rangeib);echo "</pre>";
    $day1    = $rangeib['range01']['day1'];
    $month1  = $rangeib['range01']['month1'];
    $year1   = $rangeib['range01']['year1'];
    $day2    = $rangeib['range01']['day2'];
    $month2  = $rangeib['range01']['month2'];
    $year2   = $rangeib['range01']['year2'];
    $meterd  = $rangeib['range01']['meter'];
    
    $date01  = $day1. "-".$month1. "-".$year1;     
    $date02  = $day2. "-".$month2. "-".$year2;
    $lectura01=$_SESSION['bill_a'];   
    $lectura02=$_SESSION['bill_b'];   
    #echo "<h1>".$lectura01."</h1>"."<h1>".$lectura02."</h1>";
    $tbill     = $lectura02-$lectura01;
    $tbill     = number_format($tbill, 2, ',', '.'); 
    $lectura01 = number_format($lectura01, 2, ',', '.');   
    $lectura02 = number_format($lectura02, 2, ',', '.');   



?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta name="description" content=""/>
  <meta name="author" content=""/>
  <title>Dashboard Master | CLYFSA</title>
  <!-- loader-->
  <link href="assets/css/pace.min.css" rel="stylesheet"/>
  <script src="assets/js/pace.min.js"></script>
  <!--favicon-->
  <link href="assets/images/favicon.png" rel="icon" type="image/x-icon"/>
  <!-- Vector CSS -->
  <link href="assets/plugins/vectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet"/>
  <!-- simplebar CSS-->
  <link href="assets/plugins/simplebar/css/simplebar.css" rel="stylesheet"/>
  <!-- Bootstrap core CSS-->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- animate CSS-->
  <link href="assets/css/animate.css" rel="stylesheet" type="text/css"/>
  <!-- Icons CSS-->
  <link href="assets/css/icons.css" rel="stylesheet" type="text/css"/>
  <!-- Sidebar CSS-->
  <link href="assets/css/sidebar-menu.css" rel="stylesheet"/>
  <!-- Custom Style-->
  <link href="assets/css/app-style.css" rel="stylesheet"/>
  
</head>

<body class="bg-theme bg-theme2">
 
<!-- Start wrapper-->
 <div id="wrapper">
 
  <!--Start sidebar-wrapper-->
   <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
     <div class="brand-logo">
      <a href="blockware.php">
       <img src="assets/images/logo-01.png"  height="40px">
       <!--<h5 class="logo-text">Dashboard Master</h5>-->
     </a>
   </div>
   <ul class="sidebar-menu do-nicescrol">
      <li class="sidebar-header">MAIN NAVIGATION</li>
      <li>
        <a href="blockware.php">
          <i class="zmdi zmdi-view-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="blockwarebill.php">
          <i class="zmdi zmdi-balance-wallet"></i> <span>Billing</span>
        </a>
      </li>
      <!--
      <li>
        <a href="icons.html">
          <i class="zmdi zmdi-invert-colors"></i> <span>UI Icons</span>
        </a>
      </li>
    --><!--
      <li>
        <a href="forms.html">
          <i class="zmdi zmdi-format-list-bulleted"></i> <span>Forms</span>
        </a>
      </li>

      <li>
        <a href="tables.html">
          <i class="zmdi zmdi-grid"></i> <span>Tables</span>
        </a>
      </li>-->
      <!--
      <li>
        <a href="calendar.html">
          <i class="zmdi zmdi-calendar-check"></i> <span>Calendar</span>
          <small class="badge float-right badge-light">New</small>
        </a>
      </li>
    --><!--
      <li>
        <a href="profile.html">
          <i class="zmdi zmdi-face"></i> <span>Profile</span>
        </a>
      </li>

      <li>
        <a href="login.html" target="_blank">
          <i class="zmdi zmdi-lock"></i> <span>Login</span>
        </a>
      </li>-->
<!--
       <li>
        <a href="register.html" target="_blank">
          <i class="zmdi zmdi-account-circle"></i> <span>Registration</span>
        </a>
      </li>

      <li class="sidebar-header">LABELS</li>
      <li><a href="javaScript:void();"><i class="zmdi zmdi-coffee text-danger"></i> <span>Important</span></a></li>
      <li><a href="javaScript:void();"><i class="zmdi zmdi-chart-donut text-success"></i> <span>Warning</span></a></li>
      <li><a href="javaScript:void();"><i class="zmdi zmdi-share text-info"></i> <span>Information</span></a></li>
    -->
    </ul>
   
   </div>
   <!--End sidebar-wrapper-->

<!--Start topbar header-->
<header class="topbar-nav">
 <nav class="navbar navbar-expand fixed-top">
  <ul class="navbar-nav mr-auto align-items-center">
    <li class="nav-item">
      <a class="nav-link toggle-menu" href="javascript:void();">
       <i class="icon-menu menu-icon"></i>
     </a>
    </li>
    <li class="nav-item">
      <form class="search-bar">
        <input type="text" class="form-control" placeholder="Enter keywords">
         <a href="javascript:void();"><i class="icon-magnifier"></i></a>
      </form>
    </li>
  </ul>
     
  <ul class="navbar-nav align-items-center right-nav-link">
   
  </ul>
</nav>
</header>
<!--End topbar header-->

<div class="clearfix"></div>
	
  <div class="content-wrapper">
    <div class="container-fluid">

  
	<div class="row" style="height: 800px;">
     <div class="col-12 col-lg-12 col-xl-12" style="height: 800px;">
	    <div class="card">
		 <div class="card-header">FACTURACIÓN
            <div class="x_title">
                                <h4>Periodo <small> <?php echo " Desde: ".$date01." Hasta: ".$date02;  ?></small></h4>
            </div>
		   <div class="card-action">
			 <div class="dropdown">
			 <a href="javascript:void();" class="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
			  <i class="icon-options"></i>
			 </a>
				<div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item" href="javascript:void();">Action</a>
				<a class="dropdown-item" href="javascript:void();">Another action</a>
				<a class="dropdown-item" href="javascript:void();">Something else here</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="javascript:void();">Separated link</a>
			   </div>
			  </div>
		   </div>
		 </div>
		 <div class="card-body">
		    <ul class="list-inline">
			  <li class="list-inline-item"><i class="fa fa-circle mr-2 text-white"></i>Medidor MT174</li>
			  <!--<li class="list-inline-item"><i class="fa fa-circle mr-2 text-light"></i>Meter 02</li>-->
			</ul>
			<div class="row">
	 <div class="col-12 col-lg-12">
	   <div class="card">
	     <div class="card-header">Cierres
		  <div class="card-action">
             <div class="dropdown">
             <a href="javascript:void();" class="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
              <i class="icon-options"></i>
             </a>
              <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="javascript:void();">Action</a>
              <a class="dropdown-item" href="javascript:void();">Another action</a>
              <a class="dropdown-item" href="javascript:void();">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void();">Separated link</a>
               </div>
              </div>
             </div>
		 </div>
	       <div class="table-responsive">
                 <table class="table align-items-center table-flush table-borderless">
                  <thead>
                   <tr>
                     <th>Medidor</th>
                     <th>Fecha de Cierre</th>
                     <th></th>
                     <th>Lectura (kWh)</th>
                     
                   </tr>
                   </thead>
                   <tbody>
                    <tr>
                        <td><?php echo $meterd;?></td>
                        <td><?php echo $date01;?></td>
                        <td style="width: 500px;"><div class="progress shadow" style="height: 5px;">
                            <div class="progress-bar" role="progressbar" style="width: 100%"></div>
                            </div>
                        </td>
                        <td><?php echo $lectura01;?></td>
                   </tr>
                   <tr>
                        <td><?php echo $meterd;?></td>
                        <td><?php echo $date02;?></td>
                        <td style="width: 500px;"><div class="progress shadow" style="height: 5px;">
                            <div class="progress-bar" role="progressbar" style="width: 100%"></div>
                            </div>
                        </td>
                        <td><?php echo $lectura02;?></td>
                   </tr>

                   

                 </tbody></table>
               </div>
	   </div>
	 </div>
	</div>
		 </div>
		 
		 <div class="row m-0 row-group text-center border-top border-light-3">
		   <div class="col-12 col-lg-12">
		     <div class="p-3">
                <div class="updatemax">
                <h5 class="mb-0"></h5>
			        <small class="mb-0">Consumo Total: <span> <i class="fa fa-arrow-up"></i> </span></small>
                    <h5 class="mb-0">
                    
                    <?php
                        
                        echo  $tbill." kWh";
                    ?>

                    </h5>
			        <small class="mb-0">Periodo <span>  <?php echo $date02;?></span></small>

                </div>
		     </div>
		   </div>
		   
		 </div>
		 
		</div>
	 </div>

     <!--<div class="col-12 col-lg-4 col-xl-4">
        <div class="card">
           <div class="card-header">Weekly sales
             <div class="card-action">
             <div class="dropdown">
             <a href="javascript:void();" class="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
              <i class="icon-options"></i>
             </a>
              <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="javascript:void();">Action</a>
              <a class="dropdown-item" href="javascript:void();">Another action</a>
              <a class="dropdown-item" href="javascript:void();">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void();">Separated link</a>
               </div>
              </div>
             </div>
           </div>
           <div class="card-body">
		     <div class="chart-container-2">
               <canvas id="chart2"></canvas>
			  </div>
           </div>
           <div class="table-responsive">
             <table class="table align-items-center">
               <tbody>
                 <tr>
                   <td><i class="fa fa-circle text-white mr-2"></i> Direct</td>
                   <td>$5856</td>
                   <td>+55%</td>
                 </tr>
                 <tr>
                   <td><i class="fa fa-circle text-light-1 mr-2"></i>Affiliate</td>
                   <td>$2602</td>
                   <td>+25%</td>
                 </tr>
                 <tr>
                   <td><i class="fa fa-circle text-light-2 mr-2"></i>E-mail</td>
                   <td>$1802</td>
                   <td>+15%</td>
                 </tr>
                 <tr>
                   <td><i class="fa fa-circle text-light-3 mr-2"></i>Other</td>
                   <td>$1105</td>
                   <td>+5%</td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
     </div>-->
	</div><!--End Row-->
	


  <!--End Row-->

      <!--End Dashboard Content-->
	  
	<!--start overlay-->
		  <div class="overlay toggle-menu"></div>
		<!--end overlay-->
		
    </div>
    <!-- End container-fluid-->
    
    </div><!--End content-wrapper-->
   <!--Start Back To Top Button-->
    <a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
    <!--End Back To Top Button-->
	
	<!--Start footer-->
	<footer class="footer">
      <div class="container">
        <div class="text-center">
          Copyright © 2021 CLYFSA
        </div>
      </div>
    </footer>
	<!--End footer-->
	
  <!--start color switcher-->
   <div class="right-sidebar">
    <div class="switcher-icon">
      <i class="zmdi zmdi-settings zmdi-hc-spin"></i>
    </div>
    <div class="right-sidebar-content">

      <p class="mb-0">Gaussion Texture</p>
      <hr>
      
      <ul class="switcher">
        <li id="theme1"></li>
        <li id="theme2"></li>
        <li id="theme3"></li>
        <li id="theme4"></li>
        <li id="theme5"></li>
        <li id="theme6"></li>
      </ul>

      <p class="mb-0">Gradient Background</p>
      <hr>
      
      <ul class="switcher">
        <li id="theme7"></li>
        <li id="theme8"></li>
        <li id="theme9"></li>
        <li id="theme10"></li>
        <li id="theme11"></li>
        <li id="theme12"></li>
		<li id="theme13"></li>
        <li id="theme14"></li>
        <li id="theme15"></li>
      </ul>
      
     </div>
   </div>
  <!--end color switcher-->
   
  </div><!--End wrapper-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <!-- Bootstrap core JavaScript
  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/popper.min.js"></script>-->
  <script src="assets/js/bootstrap.min.js"></script>
	
 <!-- simplebar js -->
  <script src="assets/plugins/simplebar/js/simplebar.js"></script>
  <!-- sidebar-menu js -->
  <script src="assets/js/sidebar-menu.js"></script>
  <!-- loader scripts -->
  <script src="assets/js/jquery.loading-indicator.js"></script>
  <!-- Custom scripts -->
  <script src="assets/js/app-script.js"></script>
  <!-- Chart js -->
  
  <script src="assets/plugins/Chart.js/Chart.min.js"></script>
  
 
  <!-- Index js -->
  <!--<script src="assets/js/index.js"></script>-->
  <!--<script src="chartdata.js"> </script>-->

  
</body>
</html>
<script>
if(document.getElementById('ftnt_topbar_script')) {
    document.getElementById('ftnt_topbar_script').remove()
} else {
   var pluginHolder = document.createElement('div');
   document.body.appendChild(pluginHolder);
}