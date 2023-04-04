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
        <div id="filepath" class="filepath"><?php print $_COOKIE["openedFolder"]; ?></div>
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
            <div id="timer" class="timer">&nbsp;</div>
                <div id="icons" class="icons">
                    <div id="new" class="icon">
                        <img src="img/new.png" width="20px" height="20px">
                        <span id="newtooltip" class="tooltip newtooltip">Create a new file</span>
                    </div>
                    <div id="save" class="icon">
                        <img src="img/save.png" width="20px" height="20px">
                        <span id="savetooltip" class="tooltip savetooltip">Save the file</span>
                        </div>
                    <div id="delete" class="icon">
                        <img src="img/delete.png" width="20px" height="20px">
                        <span id="deletetooltip" class="tooltip deletetooltip">Delete the file</span>
                    </div>
                </div>
            <div id="currentfile" class="currentfile"><?php if(isset($_COOKIE["openedFile"])==1) { print $_COOKIE["openedFile"];}else{ print "#$#";} ?></div>     
        </div>
        <div id="file" class="file">
            <div id="counter" class="counter"></div>
            <div id="filecontent" class="filecontent" contenteditable="true" role="textbox" spellcheck="false">No open file</div>
        </div>
    </div> 
</div>
     
<div id="footer" class="footer">3DShell.hu 2023 Adam Seller</div>
<div id="newfilecontainer" class="newfilecontainer">
    <div id="newfile" class="newfile" contenteditable="true" role="textbox" spellcheck="false">Please enter the name of the new file.</div>
    <div id="confirm" class="icon"><img src="img/confirm.png" width="15px" height="15px"></div>
    <div id="cancel" class="icon"><img src="img/cancel.png" width="15px" height="15px"></div>

</div>

<script type="text/javascript" src="as.js" ></script>
<script type="text/javascript" src="edit.js" ></script>
</body>
</html>