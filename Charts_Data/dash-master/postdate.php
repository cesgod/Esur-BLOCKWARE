<?php

	session_start();

  ?>
			<?php  
				$command = escapeshellcmd('/var/www/html/Charts_Data/dash-master/getfatepc.py');
				$output = shell_exec($command);
				$commands = escapeshellcmd('/var/www/html/Charts_Data/dash-master/getfate.py');
				$outputs = shell_exec($commands);
				#echo "<pre>"; print_r($output); echo "</pre>";
				#echo "done!";
				$stringv = file_get_contents("/var/www/html/Charts_Data/dash-master/dummypy.json");
				$stringvs = file_get_contents("/var/www/html/Charts_Data/dash-master/dummycomp.json");

				    if ($stringv === false) {
				      echo "No content<br>";
				    }

				$output = json_decode($stringv, true);
				    if ($output === null) {
				        // deal with error...
				      echo "Parse error<br>";
				    }
				       if ($stringvs === false) {
				      echo "No content<br>";
				    }

				$outputs = json_decode($stringvs, true);
				    if ($outputs === null) {
				        // deal with error...
				      echo "Parse error<br>";
				    }
				$max01=0;
				$max02=0;
				$maxts1=0;
				$maxts2=0;
				$cont=0;
				$conts=0;
				$a=0;
				$myArray[$a] = $output;
				$myArrays[$a] = $outputs;
				$limit = count($myArray[0]);
				$limits = count($myArrays[0]);
				#echo "Limit: ".$limit;
				$arrayn=array();
				for ($i=0; $i < $limit; $i++) { 
					#echo $myArray[0][$i]." - ";
					if ($cont<1) {
						$newdate= strtotime($myArray[0][$i]);
						$newdate= gmdate("d-m-Y H:i",$newdate);
						$arrayn['date'][] = $newdate;
						$cont=$cont+1;
					}else {
						$arrayn['data'][] = $myArray[0][$i];
						if ($myArray[0][$i]>$max01) {
							$max01 = $myArray[0][$i];
							$i=$i-1;
							$maxts1 = $myArray[0][$i];
							$i=$i+1;
						}
						$cont=0;
					}
				}
				for ($i=0; $i < $limits; $i++) { 
					#echo $myArray[0][$i]." - ";
					if ($conts<1) {
						#$newdates= strtotime($myArrays[0][$i]);
						#$newdates= gmdate("d-m-Y H:i:s",$newdates);
						#$arrayn['dates'][] = $newdates;
						$conts=$conts+1;
					}else {
						$arrayn['datas'][] = $myArrays[0][$i];
						if ($myArrays[0][$i]>$max02) {
							$max02 = $myArrays[0][$i];
							$i=$i-1;
							$maxts2 = $myArrays[0][$i];
							$i=$i+1;
						}
						$conts=0;
					}
				}
				$_SESSION['max01'] = $max01;
				$_SESSION['maxts1'] = $maxts1;
				$_SESSION['max02'] = $max02;
				$_SESSION['maxts2'] = $maxts2;
				$valores   = array_values($arrayn);
				echo json_encode($valores);
				#echo "<pre>"; print_r($arrayn); echo "</pre>";
				#die();
			?>
		