<?php

  session_start();

?>

<?php

	$date01=$_POST['date01'];
	$date02=$_POST['date02'];
	$meter01=$_POST['meter01'];
	#echo "Date01: ".$date01;
	$date01s=date('Y-m-d', strtotime($date01));
	#$date01s=date('Y-m-d', strtotime('-1 day', strtotime($date01)));
	$_SESSION['meter01'] = $meter01;
				
	

	$day01=date('d',strtotime($date01));
	$day01s=date('d',strtotime($date01s));
	$month01=date('m',strtotime($date01));
	$month01s=date('m',strtotime($date01s));
	$year01=date('Y',strtotime($date01));
	#echo "Year: ".$year01;
	$year01s=date('Y',strtotime($date01s));
	$day02=date('d',strtotime($date02));
	$month02=date('m',strtotime($date02));
	$year02=date('Y',strtotime($date02));
	
	$range=array();
	
	$range['range01']['day1'] = $day01;
	$range['range01']['day1s'] = $day01s;
	$range['range01']['month1'] = $month01;
	$range['range01']['month1s'] = $month01s;
	$range['range01']['year1'] = $year01;
	$range['range01']['year1s'] = $year01s;
	$range['range01']['day2'] = $day02;
	$range['range01']['month2'] = $month02;
	$range['range01']['year2'] = $year02;
	$range['range01']['meter'] = $meter01;

	$response=$arrayName = array('asdf' => 0, );
	#$ste   = array_values($range);
	echo "<pre>"; print_r($range); echo "</pre>";
	#echo json_encode($valores);

	$fp = fopen('../../../../dash/meters/client/production/stebw.json', 'w');
	fwrite($fp, json_encode($range));
	fclose($fp);


	#die();

	header("Location: ../../../../Charts_Data/dash-master/perfildcblockware.php");

 ?>