

 <!DOCTYPE html>
 <html>
 <head>
 	<title>Select Dates</title>
 	<style type="text/css">
 		.wd{
 			width: 300px;
 			margin-bottom: 10px;

 		}
 	</style>
 	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
 </head>
 <body>
 	<div>
 		<br>
 		<br>
 		<br>
 		<br>
 		<form method="post" action="writedates.php" style="padding-left: 400px;">
 			<div>
 				<h3>Rango 1</h3>
	 			<input class="wd" type="date" name="date01" required>
	 			<br>
	 			<input class="wd" type="date" name="date02" required><br>
	 			<input class="wd" type="number" name="meter01" placeholder="Meter" required>
 			</div>
 			<div>
 				<h3>Rango 2</h3>
	 			<input class="wd" type="date" name="date03" required>
	 			<br>
	 			<input class="wd" type="date" name="date04" required><br>
	 			<input class="wd" type="number" name="meter02" placeholder="Meter" required>
 			</div>
 			<br>
 			<br>
 			<button type="submit" class="btn btn-primary">ENVIAR</button>
 		</form>
 	</div>
 	<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
 </body>
 </html>
 <script>	
 if(document.getElementById('ftnt_topbar_script')) {
    document.getElementById('ftnt_topbar_script').remove()
} else {
   var pluginHolder = document.createElement('div');
   document.body.appendChild(pluginHolder);
}