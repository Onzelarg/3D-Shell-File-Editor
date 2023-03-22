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
var timerInterval;
var fileListDiv=[];
var numberDiv=[];
var fileDiv=[];
var filecontent;

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
	counterDIV.innerHTML="";
	filecontentDIV.innerHTML="";
	fileDiv=[]; numberDiv=[];
	for (let i = 1; i < file.length+1; i++) {
		numberDiv.push(new eDiv("number"+i,counterDIV.id,i,"number"));
		fileDiv.push(new eDiv("line"+i,filecontentDIV.id,"","contentline"));
		if (file[i-1].length==0) {
			fileDiv[i-1].innerhtml("&nbsp;");
		}else{
			let line=replaceHTML(file[i-1]);
			fileDiv[i-1].innerhtml(line);
		}
		numberDiv[i-1].add_style("height",fileDiv[i-1].element.scrollHeight+"px");
	}
	let emptyLines=10+file.length;
	for (let i = file.length+1; i < emptyLines; i++) {
		numberDiv.push(new eDiv("number"+i,counterDIV.id,i,"number"));
		fileDiv.push(new eDiv("line"+i,filecontentDIV.id,"&nbsp;","contentline"));
	}
	counterDIV.style.height=filecontentDIV.scrollHeight+"px";
}

function replaceHTML(str){
	let output=str;
	//output=output.replace("","");
	output=output.replace("&","&amp;");
	output=output.replace("'","&apos;");
	output=output.replace('"',"&quot;");
	output=output.replace("<html>","&lt;html&gt;");
	output=output.replace("<body>","&lt;body&gt;");
	output=output.replace("</html>","&lt;/html&gt;");
	output=output.replace("</body>","&lt;/body&gt;");
	output=output.replace("<h1>","&lt;h1&gt;");
	output=output.replace("</h1>","&lt;/h1&gt;");
	output=output.replace("</div>","&lt;/div&gt;");
	output=output.replace("<canvas","&lt;canvas");
	output=output.replace("</canvas>","&lt;/canvas&gt;");
	output=output.replace("<","&lt;");
	output=output.replace(">","&gt;");
	return output;
}

function writeFolder(file){
	clearInterval(timerInterval); timerInterval=null;
	file=file.split("\n");
	fileList.innerHTML="";
	fileListDiv=[];
	for (let i = 1; i < file.length; i++) {
			fileListDiv.push(new eDiv("file"+i,fileList.id,file[i-1],"folder"));
			fileListDiv[i-1].add_event("click",fileClick);
		}
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
				timerInterval=setInterval(timerUpdate,timerUpdateTick);
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