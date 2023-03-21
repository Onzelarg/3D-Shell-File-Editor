<?php
require('path.php');

if(!isset($_COOKIE["openedFolder"])) {
	setcookie("openedFolder", "/", time() + (86400 * 10), "/"); // 86400 = 1 day
}

if ($_SERVER["REQUEST_METHOD"] == "POST") { 
	if($_POST['to_run']!=""){
		if($_POST['to_run']=="getFolderContents") getFolderContents($_POST['argument']);
		if($_POST['to_run']=="read") read();
	}
}

function getFolderContents($path){
	setcookie("openedFolder", $path, time() + (86400 * 10), "/");
	$path=$GLOBALS['root'].$path;
	$files=scandir($path);
	for ($i=0; $i < count($files); $i++) { 
		if($files[$i]!="." && $files[$i]!=".." && $files[$i]!=".DS_Store"){
			print htmlspecialchars($files[$i])."\n";
		}
	}
}

function read(){ 
	if(!$_POST["argument"]){throw new Exception("Filename not received!");} 
	$fileName=$GLOBALS["root"].$_COOKIE["openedFolder"].$_POST["argument"];
	$file = fopen($fileName, "r+") or die("Unable to open file!"); 
	$txt="";
	while(! feof($file)) {
		$txt.=fgets($file);
	}
	fclose($file); 
	print $txt;
}



?>