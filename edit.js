

//document.getElementById("filecontent").addEventListener("focus",focustest);
let lines=document.querySelectorAll("div.contentline");
for(let i=0;i<lines.length;i++){
    lines[i].addEventListener("click",click);
    lines[i].addEventListener("blur",blur);
}

function click(e){
    e.target.style.backgroundColor="red";
    console.log(e.target.isContentEditable);
}

function blur(e){
    e.target.style.backgroundColor="";
}

function focustest(e){
    console.log(e);
}