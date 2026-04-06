let COLS={}

let COLE={}

let PASSWORD

console.time("Password given in")
if(typeof Pass!= "undefined"){PASSWORD=Pass}
else{PASSWORD=prompt("Password?")}
console.timeEnd("Password given in")

function DataToSeminars(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[COLS.Seminar]}` in objectToEdit[row[COLS.Vertical]]){}else {objectToEdit[row[COLS.Vertical]][row[COLS.Seminar]]={value:0};};objectToEdit[row[COLS.Vertical]][row[COLS.Seminar]].value+=row[COLS.Amount]})}

function DataToMonths(baseData,objectToEdit){baseData.forEach(r=>{(`${ymdToM(r[COLS.Date])}` in objectToEdit)?{}:(objectToEdit[ymdToM(r[COLS.Date])]={value:0});objectToEdit[ymdToM(r[COLS.Date])]['value']+=r[COLS.Amount];})}

function DataToCategories(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[COLS.Category]}` in objectToEdit){}else {objectToEdit[row[COLS.Category]]={value:0}};{objectToEdit[row[COLS.Category]]['value']+=row[COLS.Amount];}})}


function DataToObject(baseData,objectToEdit,parameter)
{const PARAMETER=parameter.charAt(0).toUpperCase() + parameter.slice(1).toLowerCase(),COLCHOICE=COLS[`${PARAMETER}`];
baseData.forEach(r=>{if(`${r[COLCHOICE]}` in objectToEdit){}else{objectToEdit[r[COLCHOICE]]={value:0}};objectToEdit[r[COLCHOICE]]['value']+=r[COLS.Amount]});}

function DownloadExcelS(){SetVariables();let Type; 
switch(CHOICE){
case 1: Type='Vertical'; break;
case 2: Type='Seminar'; break;
case 3: Type='Month'; break;
case 4: Type='Location'; break;
}
let EXPORT_DATA=rawDataIncome.filter(r=>RunFilters(r)),EDITOR=[];EDITOR[0]=[Type,'value'];EXPORT_DATA.forEach((r,i)=>EDITOR[i+1]=[r[COLS[Type]],r[COLS.Amount]]);let EXPORT=Array.from(EDITOR.reduce((acc,[name,value])=>{acc.set(name,(acc.get(name)||0)+value); return acc},new Map()));EXPORT[0]=[Type,'Amount'];const workbook=XLSX.utils.book_new();const worksheet=XLSX.utils.aoa_to_sheet(EXPORT);XLSX.utils.book_append_sheet(workbook,worksheet,"Income");XLSX.writeFile(workbook,'Export.xlsx');
}

function DownloadExcelD(){
SetVariables();
let EXPORT_DATA=rawDataIncome.filter(r=>RunFilters(r)),EDITOR=[];
EDITOR[0]=Object.keys(COLS)
EXPORT_DATA.forEach((r,i)=>EDITOR[i+1]=r)
console.log(EDITOR)
const workbook=XLSX.utils.book_new();
const worksheet=XLSX.utils.aoa_to_sheet(EDITOR)
XLSX.utils.book_append_sheet(workbook,worksheet,"Income");
XLSX.writeFile(workbook,'Export.xlsx');
}

async function ImportData(TYPE,HeaderArray){
console.time(`${TYPE} data imported in`);
let url;
url="1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw";
const RESPONSE=await fetch(`https://opensheet.elk.sh/${url}/${TYPE}`);    
if (!RESPONSE.ok) throw new Error('Network response was not ok');
const arrayOfObjects = await RESPONSE.json();
const headers=Object.keys(arrayOfObjects[0]);
headers.forEach((H,i)=>HeaderArray[H]=i)
HeaderArray.Month=Object.keys(HeaderArray).length;
HeaderArray["PnL Month"]=Object.keys(HeaderArray).length;
RD=arrayOfObjects.map(obj => Object.keys(arrayOfObjects[0]).map(key => obj[key]));
RD=RD.filter(r=>(r[HeaderArray.Amount]));
RD.forEach(r=>{r[HeaderArray.Amount]=r[HeaderArray.Amount].replaceAll(",","")});
RD.forEach(r=>r[HeaderArray.Amount]=parseFloat(r[HeaderArray.Amount]));
console.timeEnd(`${TYPE} data imported in`);
console.time("Data filtered in")
const ADMINRESPONSE=await fetch('https://opensheet.elk.sh/1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw/Access')
if (!ADMINRESPONSE.ok) throw new Error('Admin network response was not ok');
const adminArrayOfObjects = await ADMINRESPONSE.json();
let adminHeaders=Object.keys(adminArrayOfObjects[0]);
let AD=adminArrayOfObjects.map(obj => Object.keys(adminArrayOfObjects[0]).map(key => obj[key]));
let AR;
AD.forEach(r=>{if((`${r[0]}${r[8]}${r[4]}${r[2]}${r[6]}`)==PASSWORD){AR=r}})

RD=RD.filter(r=>AR[adminHeaders.indexOf(String(r[COLS.Vertical]).slice(0,1))]==1)

console.timeEnd("Data filtered in")

RD.forEach(r=>r[HeaderArray.Month]=ymdToM(r[HeaderArray.Date]))
RD.forEach(r=>r[HeaderArray["PnL Month"]]=ymdToM(r[HeaderArray["PnL Date"]]))

return RD
}