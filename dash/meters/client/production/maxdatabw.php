<?php
    session_start();
?>
<?php
$stringvs = file_get_contents("/var/www/html/dash/meters/client/production/maxdata.json");

            
  if ($stringvs === false) {
    echo "No content<br>";
  }

  $outputs = json_decode($stringvs, true);
  if ($outputs === null) {
      // deal with error...
    echo "Parse error<br>";
  }

  $maxdt = array();
  $maxdt = $outputs;
        
  
  $maxdm01=floatval($_SESSION['max01']);
  #$maxdm01 = str_replace(',', '.', $maxdm01);
  $maxdm01 = number_format($maxdm01 ,3, ",",".");
  $maxts1=$_SESSION['maxts1'];

	 

	#echo "<h4><b>DEMANDA MÁXIMA: </b>".$maxdm01."<b>kW</b>  | <b>TimeStamp:</b>  ".$maxts1."</h4>";
    echo ' <h5 class="mb-0">'.$maxdm01.' kWh</h5><small class="mb-0">Última Lectura: '.$maxts1.'<span> <i class="fa fa-arrow-up"></i> </span></small>';

?>