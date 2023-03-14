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