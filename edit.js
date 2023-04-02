// ********************************************************************************************************
//													Constants
const timerUpdateTick={ value:15000, } //15s
const addedEmptylines={ value:10, }
const changeHeightonResize={ value:false, }
// ********************************************************************************************************

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
	"old",
];
// ********************************************************************************************************

class selectedLine{
	update(line){
		let id=line.split("line");
		this.id=id[1]-1;
		this.div=fileDiv[this.id];
		this.element=this.div.element;
		this.innerhtml=this.element.innerHTML;
		this.innertext=this.element.innerText;
	}

	updateInner(){
		this.innerhtml=this.element.innerHTML;
		this.innertext=this.element.innerText;
	}
}

var counterDIV=getElementbyID("counter");
var filecontentDIV=getElementbyID("filecontent");
var filepathDIV=getElementbyID("filepath");
var filePath=filepathDIV.innerHTML;
var fileList=getElementbyID("filelist");
var currentFileDiv=getElementbyID("currentfile");
var timerDiv=getElementbyID("timer");
var rootDiv=getElementbyID("root");
var upDiv=getElementbyID("up");
var newDiv=getElementbyID("new");
var saveDiv=getElementbyID("save");
var deleteDiv=getElementbyID("delete");
var newFileDiv=getElementbyID("newfile");
var defaultNewFileText="Please enter the name of the new file."
var newFileIcons='<img src="img/confirm.png" width="15px" height="15px"><img src="img/cancel.png" width="15px" height="15px">';

var os="Other";
var timerStart=0;
var timerInterval;
var fileListDiv=[];
var numberDiv=[];
var fileDiv=[];
var filecontent;

var sL=new selectedLine();
var multiKey="";

window.onload = () => {
	os=navigator.userAgent.toLowerCase();
	if(os.includes("mac")) os="Mac";
	if(os.includes("Win")) os="Win";
	fetch_call("getFolderContents",filePath);
	rootDiv.addEventListener("click",openRoot);
	upDiv.addEventListener("click",upFolder);
	newDiv.addEventListener("click",newFile);
	saveDiv.addEventListener("click",saveFile);
	deleteDiv.addEventListener("click",deleteFile);
	newFileDiv.addEventListener("click",deleteNewfileText);
	newFileDiv.addEventListener("keydown",enteronNewFile);
	newFileDiv.addEventListener("blur",checkNewFileText);

	filecontentDIV.addEventListener("keydown",keyPress);
	filecontentDIV.addEventListener("keyup",keyUp);
	filecontentDIV.addEventListener("input",input);

	if(changeHeightonResize.value) window.onresize = changeCounterHeightonResize;

	if (currentFileDiv.innerHTML=="#$#") {
		currentFileDiv.innerHTML="No file opened";
	}else{
		filecontentDIV.innerHTML="Opening file ...";
		openFile(currentFileDiv.innerHTML);
	}
};

/**
 * Runs operations on the server through php
 * @param {string} operation - Operation to run on the server
 * @param {string} argument - Argument to pass to the server
 */
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
			if (operation=="writeFile") log(filecontent);
		})
}

/**
 * Writes the files content to the screen
 */
function writeContent(file){
	file=file.split("\n");
	counterDIV.innerHTML="";
	filecontentDIV.innerHTML="";
	fileDiv=[]; numberDiv=[];
	let empties=0;
	for (let i = 1; i < file.length+1; i++) {
		numberDiv.push(new eDiv("number"+i,counterDIV.id,i,"number"));
		fileDiv.push(new eDiv("line"+i,filecontentDIV.id,"","contentline"));
		if (file[i-1].length==0) {
			fileDiv[i-1].innerhtml("&nbsp;");
			empties++;
		}else{
			fileDiv[i-1].innertext(file[i-1]);
			empties=0;
		}
		fileDiv[i-1].add_event("click",editing);
		numberDiv[i-1].add_style("height",fileDiv[i-1].element.scrollHeight+"px");
	}
	if (empties<10) {
		let emptyLines=addedEmptylines.value+file.length;
		for (let i = file.length+1; i < emptyLines; i++) {
			numberDiv.push(new eDiv("number"+i,counterDIV.id,i,"number"));
			fileDiv.push(new eDiv("line"+i,filecontentDIV.id,"&nbsp;","contentline"));
			fileDiv[fileDiv.length-1].add_event("click",editing);
		}
	}
	counterDIV.style.height=filecontentDIV.scrollHeight+"px";
}

/**
 * Writes the folders contents into the screen
 */
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

/**
 * Checks if the click element is a file or not based on predefined filetypes.
 * If it a file it runs openFile to open the file.
 * If it is not then runs a folder scan on the server
 */
function fileClick(){
	let fileName=this.innerHTML;
	let fileText=fileName.split(".");
	let noFileOpened=true;
	if (fileText.length>1) {
		for (let i = 0; i < types.length; i++) {
			if(types[i]==fileText[fileText.length-1]){ 
				noFileOpened=false;
				openFile(fileName);
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

/**
 * Opens a file based on the given filename
 * @param {string} fileName - the filename to be opened
 */
function openFile(fileName){
	fetch_call("read",fileName);
	currentFileDiv.innerHTML=fileName;
}

/**
 * Clears the opened file and sets the screen empty
 */
function clearOpenedFile(){
	currentFileDiv.innerHTML="No file opened";
	filecontentDIV.innerHTML="";
	counterDIV.innerHTML="";
}

/**
 * Shows an update on how long ago the file was saved
 */
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
 
/**
 * Opens the root folder of the server
 */
function openRoot(){
	clearOpenedFile();
	filePath="/";
	filepathDIV.innerHTML=filePath;
	fetch_call("getFolderContents",filePath);
}

/**
 * Goes up a folder in the hiearchy
 */
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

/**
 * Saves the file and clears the timer
 */
function saveFile(){
	clearInterval(timerInterval); timerInterval=null;
	let empties;
	for (let i = 0; i < fileDiv.length; i++) {
		let line=fileDiv[i].element;
		if (line.innerHTML=="&nbsp;") {
			empties++;
		}else{
			empties=0;
		}
		line.innerHTML=line.innerHTML.replaceAll("&nbsp;","<br>");
	}
	if (empties>5) {
		empties-=5;
		for (let i = 0; i < empties; i++) {
			fileDiv[fileDiv.length-empties+i].delete_element();
		}
	}
	let saveContent=filecontentDIV.innerText;
	saveContent=saveContent.replaceAll("&nbsp;","%2B");
	fetch_call("writeFile",saveContent);
}

function newFile(){
	newFileDiv.innerHTML=defaultNewFileText+newFileIcons;
	let newDivLocation=newDiv.getBoundingClientRect();
	newFileDiv.style.top=newDivLocation.y+"px";
	newFileDiv.style.display="block";
	let newFileDivWidth=newFileDiv.getBoundingClientRect().width/2;
	newFileDiv.style.left=(newDivLocation.x-newFileDivWidth)+"px";
}

function deleteNewfileText(){
	newFileDiv.innerHTML="";
}

function enteronNewFile(e){
	if(e.key=="Enter"){
		e.preventDefault();
	}
}

function checkNewFileText(){
	if(newFileDiv.innerHTML=="") newFileDiv.innerHTML=defaultNewFileText;
}

function deleteFile(){

}

function editing(){
	if (timerInterval==null) {
		timerStart=Date.now();
		timerInterval=setInterval(timerUpdate,timerUpdateTick.value);
	}
	sL.update(this.id);
}

function keyPress(e){
	log(e.key);
	if (e.key=="Control" || e.key=="Meta") {
		multiKey=e.key;
	}
	if(multiKey=="Meta" && e.key=="z"){
	}

	if(e.key=="Enter"){
		e.preventDefault();
		sL.div.innerhtml("<br>&nbsp;");
		changeCounterHeight();
	}

	if(e.key=="Tab"){
		e.preventDefault();
		let range=document.createRange();
		let selection=window.getSelection();
		let start=selection.anchorOffset;
		let end=selection.focusOffset;
		let innerHTML=sL.innertext.substring(0,start)+"\t"+sL.innertext.substring(end);
		sL.div.innertext(innerHTML,false);
		sL.updateInner();
		log(sL.element.childNodes[0].length);
		range.setStart(sL.element.childNodes[0],end+1);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
		sL.element.focus();
		changeCounterHeight();
	}
	
	if(e.key=="Backspace"){
		changeCounterHeight();
	}
	
}

function keyUp(e){
	if (e.key=="Control" || e.key=="Meta") {
		multiKey="";
	}
}

function changeCounterHeight(){
	numberDiv[sL.id].remove_style("height");
	numberDiv[sL.id].add_style("height",sL.element.scrollHeight+"px");
	if (sL.element.scrollHeight==0) {
		numberDiv[sL.id].delete_element();
		sL.update("line"+sL.id--);
	}
}

function changeCounterHeightonResize(){
	for (let i = 0; i < numberDiv.length; i++) {
		numberDiv[i].remove_style("height");
		numberDiv[i].add_style("height",fileDiv[i].element.scrollHeight+"px");
	}
}

function input(){
	changeCounterHeight();
}