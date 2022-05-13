<?php
	$command = escapeshellcmd('/var/www/html/Charts_Data/dash-master/pingcheck.py');
	$output = shell_exec($command);
	#die();
	header("Location: pingcheck.php");


?>