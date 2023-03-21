// ********************************************************************************************************
//													File Types
const types = [
	"txt",
	"php",
	"html",
	"js",
	"css",
	"cpp",
	"cs",
];
// ********************************************************************************************************


var counterDIV=document.getElementById("counter");
var filecontentDIV=document.getElementById("filecontent");
var filepathDIV=document.getElementById("filepath");
var filePath=filepathDIV.innerHTML;
var fileList=document.getElementById("filelist");
var currentFileDiv=document.getElementById("currentfile");
var timerDiv=document.getElementById("timer");
var rootDiv=document.getElementById("root");
var upDiv=document.getElementById("up");
var timerUpdateTick=15000; //15s
var timerStart=0;
var fileListDiv=[];
var filecontent;
var lineLength=71;

window.onload = () => {
	fetch_call("getFolderContents",filePath);
	rootDiv.addEventListener("click",openRoot);
	upDiv.addEventListener("click",upFolder);
};

async function fetch_call(operation,argument) {
    let url='edit.php';	
    if(!argument) throw new Error("File name not received!");
	let bod="to_run="+operation+"&argument="+argument;
    
    let request=new Request(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		body: bod
	});
    
    await fetch(request)
         .then((response) => response.text())
         .then((text) => {
			filecontent=text;
			if (operation=="read")writeContent(filecontent);
			if (operation=="getFolderContents")writeFolder(filecontent);
		})
}

function writeContent(file){
	file=file.split("\n");
	console.log(file);
	counterDIV.innerHTML="";
	filecontentDIV.innerHTML="";
	for (let i = 1; i < file.length+1; i++) {
		let innerHTML='<div class="number" id="number'+i+'">'+i+"</div>";
		counterDIV.innerHTML+=innerHTML;
		innerHTML='<div class="contentline" id="line'+i+'">';
		innerHTML+='</div>';
		filecontentDIV.innerHTML+=innerHTML;
	}
	setTimeout(changeHeight(file),500);
}
function changeHeight(file){
	let fileDiv=document.querySelectorAll(".contentline");
	let numberDiv=document.querySelectorAll(".number");
	for (let i = 0; i < fileDiv.length; i++) {
		if (file[i].length==0) {
			fileDiv[i].innerHTML="&nbsp;";
		}else{
			fileDiv[i].innerText=file[i];
		}
		numberDiv[i].style.height=fileDiv[i].scrollHeight+"px";
	}
	counterDIV.style.height=filecontentDIV.scrollHeight+"px";
}

function writeFolder(file){
	file=file.split("\n");
	fileList.innerHTML="";
	for (let i = 1; i < file.length+1; i++) {
		let innerHTML='<div class="folder" id="file'+i+'">'+file[i-1];
		innerHTML+="</div>";
		fileList.innerHTML+=innerHTML;
	}
	setTimeout(addClick,500);
}
function addClick(){
	fileListDiv=document.querySelectorAll(".folder");
	for (let i = 0; i < fileListDiv.length; i++) {
		fileListDiv[i].addEventListener("click",fileClick);
	}
	console.log("Added click");
}

function fileClick(){
	let fileName=this.innerHTML;
	let fileText=fileName.split(".");
	let noFileOpened=true;
	if (fileText.length>1) {
		for (let i = 0; i < types.length; i++) {
			if(types[i]==fileText[fileText.length-1]){ 
				noFileOpened=false;
				fetch_call("read",fileName);
				currentFileDiv.innerHTML=fileName;
				timerStart=Date.now();
				setInterval(timerUpdate,timerUpdateTick);
			}
		}
	}
	if (noFileOpened) {
		clearOpenedFile();
		filePath=filePath+fileName+"/";
		filepathDIV.innerHTML=filePath;
		fetch_call("getFolderContents",filePath);
	}
}

function clearOpenedFile(){
	currentFileDiv.innerHTML="No file opened";
	filecontentDIV.innerHTML="";
	counterDIV.innerHTML="";
}

function timerUpdate(){
	let timerNow=Date.now();
	timerNow-=timerStart;
	let hour=1000*60*60; let minute=1000*60;
	let hours=parseInt(timerNow/hour);
	timerNow-=hours*hour;
	let minutes=parseInt(timerNow/minute);
	timerNow-=minutes*minute;
	let seconds=parseInt(timerNow/1000);
	let innerHTML="The file was last saved: ";
	if (hours>0) innerHTML+=hours+" hours ";
	if (minutes>0) innerHTML+=minutes+" minutes ";
	innerHTML+=seconds+" seconds ago";
	timerDiv.innerHTML=innerHTML;
}

function openRoot(){
	clearOpenedFile();
	filePath="/";
	filepathDIV.innerHTML=filePath;
	fetch_call("getFolderContents",filePath);
}

function upFolder(){
	clearOpenedFile();
	let path=filePath.split("/");
	let upFold="";
	for (let i = 0; i < path.length-2; i++) {
		upFold+=path[i]+"/";
	}
	filePath=upFold;
	filepathDIV.innerHTML=filePath;
	fetch_call("getFolderContents",filePath);
}