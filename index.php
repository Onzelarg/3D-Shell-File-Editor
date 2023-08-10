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
                    <div id="new" class="icon newicon">
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
        <div id="file" class="file" contenteditable="true" role="textbox" spellcheck="false">

            <div id="line1" class="line">
                <div id="counter" class="counter" contenteditable="false" >1</div>
                <div id="content" class="filecontent">.inp { width: 25px; border-radius: 5px;</div>
            </div>
            <div id="line2" class="line">
                <div id="counter" class="counter">2</div>
                <div id="content" class="filecontent">}</div>
            </div>
            <div id="line3" class="line">
                <div id="counter" class="counter">3</div>
                <div id="content" class="filecontent">.maze{ float:left;</div>
            </div>
            <div id="line4" class="line">
                <div id="counter" class="counter">4</div>
                <div id="content" class="filecontent">}</div>
            </div>
            <div id="line5" class="line">
                <div id="counter" class="counter">5</div>
                <div id="content" class="filecontent">.maze_tb{ float: left;</div>
            </div>
            <div id="line6" class="line">
                <div id="counter" class="counter">6</div>
                <div id="content" class="filecontent">}</div>
            </div>
            <div id="line7" class="line">
                <div id="counter" class="counter">7</div>
                <div id="content" class="filecontent">.load{ position: absolute; height: 20px; left: 7px; top: 550px; width: </div>
            </div>
            <div id="line8" class="line">
                <div id="counter" class="counter">8</div>
                <div id="content" class="filecontent">500px; border: black 1px solid; text-align: center;</div>
            </div>
            <div id="line9" class="line">
                <div id="counter" class="counter">9</div>
                <div id="content" class="filecontent">}</div>
            </div>
            <div id="line10" class="line">
                <div id="counter" class="counter">10</div>
                <div id="content" class="filecontent">.loadc{ position: absolute; left: 7px; top: 580px; display: none;</div>
            </div>
            <!--
                <div id="counter" class="counter"></div>
            <div id="filecontent" class="filecontent" contenteditable="true" role="textbox" spellcheck="false"></div>
            -->
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

