Show('chartIncomeBack',0)
const COLS={date:0,vertical:1, seminar:2, amount:3, category:4}
const dateCol=0, verticalCol=1, seminarCol=2, amountCol=3, categoryCol=4

function DataToSeminars(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[seminarCol]}` in objectToEdit[row[verticalCol]]){}else {objectToEdit[row[verticalCol]][row[seminarCol]]={value:0};};objectToEdit[row[verticalCol]][row[seminarCol]].value+=row[amountCol]})}

function DataToMonths(baseData,objectToEdit){baseData.forEach(r=>{(`${ymdToM(r[dateCol])}` in objectToEdit)?{}:(objectToEdit[ymdToM(r[dateCol])]={value:0});objectToEdit[ymdToM(r[dateCol])]['value']+=r[amountCol];})}

function DataToCategories(baseData,objectToEdit){baseData.forEach((row)=>{if(`${row[categoryCol]}` in objectToEdit){}else {objectToEdit[row[categoryCol]]={value:0}};{objectToEdit[row[categoryCol]]['value']+=row[amountCol];}})}


function DataToObject(baseData,objectToEdit,parameter){const PARAMETER=parameter.toLowerCase(),COLCHOICE=COLS[`${PARAMETER}`];baseData.forEach(r=>{if(`${r[COLCHOICE]}` in objectToEdit){}else{objectToEdit[r[COLCHOICE]]={value:0}};objectToEdit[r[COLCHOICE]]['value']+=r[amountCol]});}



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
RD=arrayOfObjects.map(obj => Object.keys(arrayOfObjects[0]).map(key => obj[key]));
RD=RD.filter(r=>(r[3]));
RD.forEach(r=>{r[3]=r[3].replaceAll(",","")});
RD.forEach(r=>r[3]=parseFloat(r[3]));
return RD
}