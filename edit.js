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
		this.id=id[1];
		this.div=this.getLine(this.id);
		this.element=this.div.element;
		this.innerhtml=this.element.innerHTML;
		this.innertext=this.element.innerText;
	}

	updateInner(){
		this.innerhtml=this.element.innerHTML;
		this.innertext=this.element.innerText;
	}

	getLine(id){
		for (let i = 0; i < lines.length; i++) {
			if(lines[i].id==id) return lines[i].line;
		}
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
var newFileContainerDiv=getElementbyID("newfilecontainer");
var newFileDiv=getElementbyID("newfile");
var newTooltipDiv=getElementbyID("newtooltip");
var saveTooltipDiv=getElementbyID("savetooltip");
var deleteTooltipDiv=getElementbyID("deletetooltip");
var confirmDiv=getElementbyID("confirm");
var cancelDiv=getElementbyID("cancel");
var defaultNewFileText="Please enter the name of the new file."
var cssRoot=querySelect(':root');
var cssComputedStyle=getComputedStyle(cssRoot);

var os="Other";
var timerStart=0;
var timerInterval;
var fileListDiv=[];
var lines=[];
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
	newDiv.addEventListener("mouseover",newTooltip);
	saveDiv.addEventListener("mouseover",saveTooltip);
	deleteDiv.addEventListener("mouseover",deleteTooltip);
	newDiv.addEventListener("mouseleave",newTooltip);
	saveDiv.addEventListener("mouseleave",saveTooltip);
	deleteDiv.addEventListener("mouseleave",deleteTooltip);
	newFileDiv.addEventListener("click",deleteNewfileText);
	newFileDiv.addEventListener("keydown",enteronNewFile);
	newFileDiv.addEventListener("blur",checkNewFileText);
	confirmDiv.addEventListener("click",createFile);
	cancelDiv.addEventListener("click",cancelNewfile);

	filecontentDIV.addEventListener("keydown",keyPress);
	filecontentDIV.addEventListener("keyup",keyUp);
	filecontentDIV.addEventListener("input",input);

	cssRoot.style.setProperty("--tooltipfade","1s");
	cssRoot.style.setProperty("--tooltipdelay","1s");

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
 * @param {string} fileName - [optional] only used in creating a new file
 */
async function fetch_call(operation,argument,fileName) {
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
			if (operation=="newFile") { log(filecontent); openFile(fileName); }
		})
}

/**
 * Writes the files content to the screen
 */
function writeContent(file){
	file=file.split("\n");
	counterDIV.innerHTML="";
	filecontentDIV.innerHTML="";
	lines=[]; lines.push("Empty");
	let empties=0;
	for (let i = 1; i < file.length+1; i++) {
		let line = {
			id:i,
			number:new eDiv("number"+i,counterDIV.id,i,"number"),
			line:new eDiv("line"+i,filecontentDIV.id,"","contentline"),
		};
		lines.push(line);
		let _line=lines[i].line;
		let _number=lines[i].number;
		if (file[i-1].length==0) {
			_line.innerhtml("&nbsp;");
			empties++;
		}else{
			_line.innertext(file[i-1]);
			empties=0;
		}
		_line.add_event("click",editing);
		_number.add_style("height",_line.element.scrollHeight+"px");
	}
	if (empties<10) {
		let emptyLines=addedEmptylines.value+file.length;
		for (let i = file.length+1; i < emptyLines; i++) {
			let line = {
				id:i,
				number:new eDiv("number"+i,counterDIV.id,i,"number"),
				line:new eDiv("line"+i,filecontentDIV.id,"&nbsp;","contentline"),
			};
			lines.push(line)
			lines[lines.length-1].line.add_event("click",editing);
		}
	}
	cssRoot.style.setProperty("--counterheight",filecontentDIV.scrollHeight+"px")
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
	// for (let i = 0; i < fileDiv.length; i++) {
	// 	log("# "+i+" : "+fileDiv[i].element.scrollHeight);
	// 	if (fileDiv[i].element.scrollHeight==0) {
	// 		numberDiv[i].delete_element();
	// 		fileDiv.splice(i,1);
	// 	}
	// }
	for (let i = 0; i < lines.length; i++) {
		let line=lines[i].line.element;
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
			lines[lines.length-empties+i].line.delete_element();
		}
	}
	let saveContent=filecontentDIV.innerText;
	saveContent=saveContent.replaceAll("&nbsp;","%2B");
	fetch_call("writeFile",saveContent);
}

function newFile(){
	let newDivLocation=newDiv.getBoundingClientRect();
	cssRoot.style.setProperty("--newfiletop",newDivLocation.y+"px");
	cssRoot.style.setProperty("--newfileleft",newDivLocation.x-350/2+"px");
	cssRoot.style.setProperty("--newfilevisibility","visible");
	cssRoot.style.setProperty("--newfilewidth","350px");
	newFileContainerDiv.style.opacity="1";
	newFileDiv.innerHTML=defaultNewFileText;
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

function createFile(){
	let fileName=newFileDiv.innerHTML.split(".");
	if(fileName.length==1) throw new Error("No file extension received!");
	let fileExtension=fileName[fileName.length-1];
	let validExtension=false;
	for (let i = 0; i < types.length; i++) {
		if(fileExtension==types[i]) validExtension=true;
	}
	if(validExtension){
		fetch_call("newFile",newFileDiv.innerText,newFileDiv.innerText);
		cancelNewfile();
	}else{
		throw new Error("No valid file extension received!")
	}
}

function cancelNewfile(){
	cssRoot.style.setProperty("--newfilewidth","0px");
	newFileContainerDiv.style.opacity="0";
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
	lines[sL.id].number.remove_style("height");
	lines[sL.id].number.add_style("height",sL.element.scrollHeight+"px");
	if (sL.element.scrollHeight==0) {
		lines[sL.id].number.delete_element();
		for (let i = 0; i < lines.length; i++) {
			if(lines[i].id==sL.id) lines.splice(i,1);
		}
		sL.update("line"+--sL.id);
	}
}

function changeCounterHeightonResize(){
	for (let i = 0; i < lines.length; i++) {
		lines[i].number.remove_style("height");
		lines[i].number.add_style("height",fileDiv[i].element.scrollHeight+"px");
	}
}

function input(){
	changeCounterHeight();
}

function newTooltip(e){
	if(e.type=="mouseover"){
		newTooltipDiv.style.top="-17px";
		newTooltipDiv.style.right="-10px";
		cssRoot.style.setProperty("--tooltipdelay","1s");
		cssRoot.style.setProperty("--newvisibility","visible");
	}else{
		cssRoot.style.setProperty("--newvisibility","hidden");
		cssRoot.style.setProperty("--tooltipdelay","0s");
	}
}

function saveTooltip(e){
	if(e.type=="mouseover"){
		saveTooltipDiv.style.top="-17px";
		saveTooltipDiv.style.right="-5px";
		cssRoot.style.setProperty("--tooltipdelay","1s");
		cssRoot.style.setProperty("--savevisibility","visible");
	}else{
		cssRoot.style.setProperty("--savevisibility","hidden");
		cssRoot.style.setProperty("--tooltipdelay","0s");
	}
}

function deleteTooltip(e){
	if(e.type=="mouseover"){
		deleteTooltipDiv.style.top="-17px";
		deleteTooltipDiv.style.right="-30px";
		cssRoot.style.setProperty("--tooltipdelay","1s");
		cssRoot.style.setProperty("--deletevisibility","visible");
	}else{
		cssRoot.style.setProperty("--deletevisibility","hidden");
		cssRoot.style.setProperty("--tooltipdelay","0s");
	}
}