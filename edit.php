<?php
require('path.php');

$dir="";

if ($_SERVER["REQUEST_METHOD"] == "POST") { 
	if($_POST['to_run']!=""){
		call_user_func($_POST['to_run']);
	}
}

function getFolderContents($path){
	$dir=$GLOBALS["root"].$path;
	$GLOBALS["dir"]=$dir."/";
	$files=scandir($dir);
	for ($i=0; $i < count($files); $i++) { 
		if($files[$i]!="." && $files[$i]!=".." && $files[$i]!=".DS_Store"){
			print $files[$i]."<br>";
		}
	}
}
 
function openFile($filename){
	// $myfile = fopen($GLOBALS["dir"].$filename, "r+") or die("Unable to open file!");
	$myfile = fopen($filename, "r+") or die("Unable to open file!");
	$output="";
	$linestart='<div class="contentline" id="line';
	$lineend='</div>';
	$linenumber=1;
	while(! feof($myfile)) {
		$line= $linestart.$linenumber++.'">'.fgets($myfile).$lineend."<br>";
		$output .= $line;
	}
	print $output;
}

function read(){ 
	if(!$_POST["filename"]){throw new Exception("Filename not received!");} 
	//print $GLOBALS["dir"].$_POST["filename"];
	$file = fopen($_POST["filename"], "r+") or die("Unable to open file!"); 
	$txt="";
	while(! feof($file)) {
		$txt.=fgets($file);
	}
	fclose($file); 
	print $txt;
}

function openFileTest($filename){
	$myfile = fopen($GLOBALS["dir"].$filename, "r+") or die("Unable to open file!");
	$output="";
	$linestart='<div class="contentline" id="line';
	$lineend='</div>';
	$linenumber=1;
	while(! feof($myfile)) {
		$line= $linestart.$linenumber++.'">'.fgets($myfile).$lineend."<br>";
		$output .= $line;
	}
	print $output;
}



?>