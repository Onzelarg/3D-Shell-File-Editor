<?php
require('path.php');

$dir="";

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