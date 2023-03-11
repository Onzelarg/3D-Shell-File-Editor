<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$operation=$_POST["op"];
	
	if($_POST["filename"]){$file_name=$_POST["filename"];}else{$file_name="new.txt";}
	
	
	$k=0;
	if($operation=="read"){
		$myfile = fopen($file_name, "r+") or die("Unable to open file!");
		while(! feof($myfile)) {
			echo $k++."<br>";
			$line= fgets($myfile);
			$txt .= $line;
		}
	}
	if($operation=="write"){
		$myfile = fopen($file_name, "w") or die("Unable to open file!");
		$txt = $_POST["text"];
		file_put_contents($file_name,$txt);
	}
	fclose($myfile);
}

?>

<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<div id="deb">
  <form action="index.php" method="post">
	File operations:
		<input type="radio" id="read" name="op" value="read"><label for="read">Read</label>
		<input type="radio" id="write" name="op" value="write"><label for="write">Write</label>
		<input type="text" name="filename"><label for="filename">File Name</label></br>
	<textarea name="text" id="textarea" style="width: 300px;height: 300px;"><?php print $txt;?></textarea>
	</br><input name="sub" type="submit" value="OK" >
</form>
</div>
<script type="text/javascript">
var deb=document.getElementById("deb");
var sw=screen.width;
var sh=screen.height;
var tex=document.getElementById("textarea");
tex.style.width=(sw*0.7)+"px";
tex.style.height=(sh*0.7)+"px";
	
</script>
</body>
</html>