let COLS={Date:0,Vertical:1, Seminar:2, Amount:3, Category:4}

function DataToSeminars(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[COLS.Seminar]}` in objectToEdit[row[COLS.Vertical]]){}else {objectToEdit[row[COLS.Vertical]][row[COLS.Seminar]]={value:0};};objectToEdit[row[COLS.Vertical]][row[COLS.Seminar]].value+=row[COLS.Amount]})}

function DataToMonths(baseData,objectToEdit){baseData.forEach(r=>{(`${ymdToM(r[COLS.Date])}` in objectToEdit)?{}:(objectToEdit[ymdToM(r[COLS.Date])]={value:0});objectToEdit[ymdToM(r[COLS.Date])]['value']+=r[COLS.Amount];})}

function DataToCategories(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[COLS.Category]}` in objectToEdit){}else {objectToEdit[row[COLS.Category]]={value:0}};{objectToEdit[row[COLS.Category]]['value']+=row[COLS.Amount];}})}


function DataToObject(baseData,objectToEdit,parameter)
{const PARAMETER=parameter.charAt(0).toUpperCase() + parameter.slice(1).toLowerCase(),COLCHOICE=COLS[`${PARAMETER}`];
baseData.forEach(r=>{if(`${r[COLCHOICE]}` in objectToEdit){}else{objectToEdit[r[COLCHOICE]]={value:0}};objectToEdit[r[COLCHOICE]]['value']+=r[COLS.Amount]});}



async function ImportData(SHEET,TYPE){
let url;
switch(SHEET){case 'BVP':url=0;break;
case 'TTT':url=0;break;
case 'LVP':url=0;break;
case 'PM':url=0;break;
case 'SS':url=0;break;
default:url="1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw";break;}
const RESPONSE=await fetch(`https://opensheet.elk.sh/${url}/${TYPE}`);    
if (!RESPONSE.ok) throw new Error('Network response was not ok');
const arrayOfObjects = await RESPONSE.json();
const headers=Object.keys(arrayOfObjects[0]);
headers.forEach((H,i)=>COLS[H]=i)
RD=arrayOfObjects.map(obj => Object.keys(arrayOfObjects[0]).map(key => obj[key]));
RD=RD.filter(r=>(r[3]));
RD.forEach(r=>{r[3]=r[3].replaceAll(",","")});
RD.forEach(r=>r[3]=parseFloat(r[3]));
return RD
}