<?php require('edit.php'); ?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Edit</title>
<link rel="stylesheet" id="normal" href="edit.css" type="text/css" media="all" /> 

</head>

<body>

<div id="titlebar" class="titlebar">3D Shell editor</div>
    
<div id="content" class="content">
    <div id="left" class="left">
        <div id="filepath" class="filepath">\game\snek</div>
        <div id="fileselect" class="fileselect">
            <div id="navigator" class="navigator">
                .
                ..
            </div>
            <div id="filelist" class="filelist">
                <?php getFolderContents("game/snek"); ?>
            </div>
        </div>
    </div>    
    
    <div id="right" class="right" tabindex="-1">
        <div id="filebar" class="filebar">
            <div id="currentfile" class="currentfile"><b>snek.css</b></div>
            <div id="timer" class="timer">The file was last saved: X time ago</div>
            <div id="icons" class="icons">New Save Delete</div>
        </div>
        <div id="file" class="file">
            <div id="counter" class="counter">
                <div class="number" id="number1">1</div>
                <div class="number" id="number2">2</div>
                <div class="number" id="number3">3</div>
                <div class="number" id="number4">4</div>
                <div class="number" id="number5">5</div>
                <div class="number" id="number6">6</div>
                <div class="number" id="number7">7</div>
                 8
                 9
                 10
                 11
                 12
                 13
                 14
                 15
                 16
                 17
                 18
                 19
                 20
                 21
                 22
                 23
                 24
                 25
                 26
                 27
                 28
                 29
                 30
                 31
                 32
                 33
                111
                1111
                11111
                111111
            </div>
            <div id="filecontent" class="filecontent" contenteditable="true" role="textbox">
<?php openFile("snek.css"); ?>
<!-- <div class="contentline" id="line1">.foregroundCanvas {</div>
<div class="contentline" id="line2">    position: absolute;</div>
<div class="contentline" id="line3">    border: black 1px solid;</div>
<div class="contentline" id="line4">    box-shadow: 5px 5px 10px #cdcdcd;</div>
<div class="contentline" id="line5">    padding: 5px;</div>
<div class="contentline" id="line6">    z-index: 1;</div>
<div class="contentline" id="line7">}</div>

            .backgroundCanvas{
                position: absolute;
                z-index: 0;
                padding: 5px;
            }

            .title{
                border: black 1px solid;
                width: 1280px;
                text-align: center;
                background-color: aliceblue;
                color:rgb(35, 39, 44);
                padding: 5px;
            }

            .buttons{
                position: absolute;
                top:10px;
                float: left;
            }

            .timer{
                position: absolute;
                float: left;
            } --> 
            </div>
        </div>
    
    
    </div>
    

    
    
    
</div>
    
<div id="footer" class="footer">3DShell.hu 2023 Adam Seller</div>

<script type="text/javascript" src="edit.js" ></script>
</body>
</html>
