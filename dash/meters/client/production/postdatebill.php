<?php

	session_start();

  ?>
			<?php  
				
				$commands = escapeshellcmd('/var/www/html/virtualenvs/Cl/soapclient/perfildcblockware/getbill.py');
				$outputs = shell_exec($commands);
				#echo "<pre>"; print_r($outputs); echo "</pre>";
				#phpinfo();
				#die();
				$stringvs = file_get_contents("/var/www/html/dash/meters/client/production/dummycompbill.json");

				    
				    if ($stringvs === false) {
				      echo "No content<br>";
				    }

				$outputs = json_decode($stringvs, true);
				    if ($outputs === null) {
				        // deal with error...
				      echo "Parse error<br>";
				    }
				$max01=0;
				$maxts1=0;
				$cont=0;
				$a=0;
				
				$myArrays[$a] = $outputs;
				$limit = count($myArrays[0]);
				$band=0;
				$maxinit = 0;
				#echo "Limit: ".$limit;
				$arrayn=array();
				for ($i=0; $i < $limit; $i++) { 
					#echo $myArrays[0][$i]." - ";
					if ($cont<1) {
						$arrayn['date'][] = $myArrays[0][$i];
						$cont=$cont+1;
					}else {						
                        $arrayn['data'][] =(floatval($myArrays[0][$i]))*160;
						$cont=0;
					}
				}
				$_SESSION['bill_ad']    = $arrayn['date'][0];
                $_SESSION['bill_a']     = $arrayn['data'][0];
				$_SESSION['bill_bd']    = $arrayn['date'][1];
                $_SESSION['bill_b']     = $arrayn['data'][1];
				$valores   = array_values($arrayn);
				echo json_encode($valores);
				echo "<pre>"; print_r($arrayn); echo "</pre>";
				#die();
                header("Location: ../../../../Charts_Data/dash-master/billingblockware.php");
			?>
		