var counterDIV=document.getElementById("counter");
var filecontentDIV=document.getElementById("filecontent");
var filePath=document.getElementById("filepath").innerHTML;
var filecontent;
var lineLength=71;

window.onload = () => {
	fetch_call("read","edit.css");
};

async function fetch_call(operation,file_name) {
    let url='edit.php';	
    if(!file_name) throw new Error("File name not received!");
	let bod="to_run="+operation+"&filename="+file_name;
    
    let request=new Request(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		body: bod
	});
    
    await fetch(request)
         .then((response) => response.text())
         .then((text) => {filecontent=text;writeContent(filecontent);})
}

function writeContent(file){
	file=file.split("\n");
	counterDIV.innerHTML="";
	filecontentDIV.innerHTML="";
	for (let i = 1; i < file.length+1; i++) {
		let innerHTML='<div class="number" id="number'+i+'">'+i;
		if (file[i-1].length>lineLength) {
			innerHTML+="<br>&nbsp;";
		}
		innerHTML+="</div>";
		counterDIV.innerHTML+=innerHTML;
		innerHTML='<div class="contentline" id="line'+i+'">';
		if (file[i-1]=="") {
			innerHTML+="&nbsp;";
		}else{
			innerHTML+=file[i-1];
		}
		innerHTML+='</div>';
		filecontentDIV.innerHTML+=innerHTML;
	}
	counterDIV.style.height=filecontentDIV.scrollHeight+"px";
}