<?php
require('path.php');

/**
 * Sets openedFolder cookie to / if it is not existing
 */
if(isset($_COOKIE["openedFolder"])!=1) {
	setcookie("openedFolder", "/", time() + (86400 * 10), "/"); // 86400 = 1 day
}

/**
 * Runs the function that is defined in the POST
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
	if($_POST['to_run']!=""){
		if($_POST['to_run']=="getFolderContents") getFolderContents($_POST['argument']);
		if($_POST['to_run']=="read") read();
		if($_POST['to_run']=="writeFile") writeFile();
	}
}

/**
 * Gets the contents of a folder
 *
 * @param string $path
 */
function getFolderContents($path){
	setcookie("openedFolder", $path, time() + (86400 * 10), "/");
	setcookie("openedFile", $_POST["argument"], 1, "/");
	$path=$GLOBALS['root'].$path;
	$files=scandir($path);
	for ($i=0; $i < count($files); $i++) { 
		if($files[$i]!="." && $files[$i]!=".." && $files[$i]!=".DS_Store"){
			print htmlspecialchars($files[$i])."\n";
		}
	}
}

/**
 * Reads the content of a file
 *
 */
function read(){ 
	if(!$_POST["argument"]){throw new Exception("Filename not received!");} 
	$fileName=$GLOBALS["root"].$_COOKIE["openedFolder"].$_POST["argument"];
	$file = fopen($fileName, "r+") or die("Unable to open file!");
	setcookie("openedFile", $_POST["argument"], time() + (86400 * 10), "/");
	$txt="";
	while(! feof($file)) {
		$txt.=fgets($file);
	}
	fclose($file); 
	print $txt;
}

/**
 * Write saves to the opened file or creates a new file with the content
 * Also creates a .old backup file
 */
function writeFile(){
	if(!$_POST["argument"]){throw new Exception("Content not received!");}
	$fileName=$GLOBALS["root"].$_COOKIE["openedFolder"].$_COOKIE["openedFile"];
	$oldFile=file_get_contents($fileName);
	file_put_contents($fileName.".old",$oldFile);
	$content = $_POST["argument"];
	file_put_contents($fileName,$content);
}

?>