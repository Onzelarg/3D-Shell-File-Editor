<html>
<head>
<meta charset="UTF-8">
<title>Directory Lister</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet">
    <style>
         
    .folder {
        position: relative;
        display: block;
        border: solid 1px;
        border-radius: 5px;
        padding: 5px;
        font-family: 'Quicksand', sans-serif;
        font-size: 20pt;
        text-align: left;
        width: 600px;
        background: #F9F9F9;
        box-shadow: 5px 5px 10px 0px #D9D9D9;
        margin-bottom: 7px;
        margin-top: 7px;
    }
    .files{
        padding-left: 20px;
        font-size: 14pt;
        display: none;
    }
    span{
        display: block;
        border: hidden 1px;
        border-radius: 5px;
    }
    span:hover{
    background: #CFCECE;
    }
    a{
        font-family: 'Quicksand', sans-serif;
        color: #616161; 
    }
    </style>
</head>

<body>
    
  <?php
$dir = "/web/htdocs6/d3dshellhu/home//www/";
$root=array("");
$index=0;
scan_dir($dir);

function scan_dir($dir){
    $files = scandir($dir);
    for($i=0; $i<count($files); $i++){
        if($files[$i]!="." && $files[$i]!=".." && $files[$i]!=".DS_Store"){
            if(is_dir($dir."/".$files[$i])){
                print '<div class="folder"><b><span onclick="dropdown('.$GLOBALS["index"].')">'.$files[$i].'</span></b><div class="files" id="'.$GLOBALS["index"]++.'">';
                $files[$i]=scan_dir($dir."/".$files[$i]);
            }elseif($dir!="/web/htdocs6/d3dshellhu/home//www/"){
                $file_location=explode("www/",$dir);
                print '<a href="'.$file_location[1]."/".$files[$i].'">'.$files[$i]."</a><br>";
            }else{
                array_push($GLOBALS["root"],$files[$i]);
            }
        }
    }   
    print "</div></div>";
}
    
print '<div class="folder"><b><span onclick="dropdown('.$GLOBALS["index"].')">Root</span></b><div class="files" id="'.$GLOBALS["index"]++.'">';
for($i=1; $i<count($root); $i++){
    print '<a href="/'.$root[$i].'">'.$root[$i]."</a><br>";
}
print "</div></div>";
?>  
    
    
<script type="text/javascript">

function dropdown(id){
    let div=document.getElementById(id);
    if(div.style.display!="block"){
        div.style.display="block";
    }else{
        div.style.display="none";
    }
    
}

    
</script>
    
</body>
</html>