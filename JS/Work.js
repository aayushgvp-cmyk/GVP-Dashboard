//section hider
//console.log("work loaded successfully")
function hidesections() {
// console.log("hidesections loaded successfully")
 const sections=document.querySelectorAll('section');
 sections.forEach(sec=>sec.classList.add('hidden'));
}
//Switches sections
function LoadSect(v) {
 SectChoice=v;
}
//Hides or shows a segment
function Show(a,b){
 if (b){
 document.getElementById(a).classList.remove('hidden');
 }
 else {
 document.getElementById(a).classList.add('hidden');
 }
 
}
//Shorthand for editing text values
function replaceText(a,b){
 document.getElementById(a).innerText=b
}
//Shorthand for getting values from an input
function Fetch(a) {
return parseInt(document.getElementById(a).value);
}
//Shorthand for console.log
function log(a){
 console.log(a)
}