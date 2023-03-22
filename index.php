<?php require('edit.php'); ?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>3D Shell Editor</title>
<link rel="stylesheet" id="normal" href="edit.css" type="text/css" media="all" /> 

</head>

<body>

<div id="titlebar" class="titlebar">3D Shell editor</div>
    
<div id="content" class="content">
    <div id="left" class="left">
        <div id="filepath" class="filepath"><?php if($folder!=""){print $_COOKIE["openedFolder"];}else{print "/";} ?></div>
        <div id="fileselect" class="fileselect">
            <div id="navigator" class="navigator">
                <div id="root" class="uproot">.</div>
                <div id="up" class="uproot">..</div>
            </div>
            <div id="filelist" class="filelist">
                
            </div>
        </div>
    </div>    
    
    <div id="right" class="right" tabindex="-1">
        <div id="filebar" class="filebar">
            <div id="currentfile" class="currentfile">No file opened</div>
            <div id="fileoperations" class="fileoperations">
                <div id="timer" class="timer">The file was last saved: X time ago</div>
                <div id="icons" class="icons">New Save Delete</div>
            </div>
        </div>
        <div id="file" class="file">
            <div id="counter" class="counter"></div>
            <div id="filecontent" class="filecontent" contenteditable="true" role="textbox" spellcheck="false">No open file</div>
        </div>
    </div> 
</div>
     
<div id="footer" class="footer">3DShell.hu 2023 Adam Seller</div>

<script type="text/javascript" src="as.js" ></script>
<script type="text/javascript" src="edit.js" ></script>
</body>
</html>