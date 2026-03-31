
let AVSIncome={} /*AV,AVS*/, AMIncome={} /*AM*/, ObjectExpense={} /*CE*/, CumIncome={}, MonthIncomeFull={}, CumIncentive={}, VMSIncome={} /*VM,VMS*/,MVIncome={} /*MV*/
let rawDataIncome, rawDataExpense
let totalIncome, TotalExpense
let VerticalArray=[]
async function handleFileAsync() {
let CumulativeIncome


rawDataIncome=await ImportData("Income",COLS)




console.time("Data imported and processed in")

LocationArray=[...new Set(rawDataIncome.map(r=>r[COLS.Location]))].sort()
{const SELECT_TAG=document.querySelector('#LDD');
const TEMPLATE=document.querySelector('#LTemplate');
LocationArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.LocationOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

FYArray=[...new Set(rawDataIncome.map(r=>r[COLS.FY]))].sort()
{const SELECT_TAG=document.querySelector('#YDD');
const TEMPLATE=document.querySelector('#YTemplate');
FYArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.FYOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

VerticalArray=[...new Set(rawDataIncome.map(r=>r[COLS.Vertical]))].sort()
{const SELECT_TAG=document.querySelector('#VDD');
const TEMPLATE=document.querySelector('#VTemplate');
VerticalArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.verticalOptionClass');
OPTION.textContent=v;
OPTION.value=i;
SELECT_TAG.appendChild(CLONE)
})}

SeminarArray=[...new Set(rawDataIncome.map(r=>`${r[COLS.Vertical]} : ${r[COLS.Seminar]}`))].sort()
{
const SELECT_TAG0=document.querySelector('#SDD');
const TEMPLATE0=document.querySelector('#STemplate');
SeminarArray.forEach((v,i)=>{const CLONE0=TEMPLATE0.content.cloneNode(true);
const OPTION0=CLONE0.querySelector('.seminarOptionClass');
OPTION0.textContent=v;
OPTION0.value=i;
SELECT_TAG0.appendChild(CLONE0)
})}

OnlySeminarArray=[]
SeminarArray.forEach((S,i)=>OnlySeminarArray[i]=SVToS(S))

//											  Income
DataToObject(rawDataIncome,AVSIncome,"VERTICAL")

//                                                                                        Expense
rawDataExpense=await ImportData("Expense",COLE)
{const PARAMETER='Vertical',COLCHOICE=COLE[`Vertical`];
rawDataExpense.forEach(r=>{if(`${r[COLCHOICE]}` in ObjectExpense){}else{ObjectExpense[r[COLCHOICE]]={value:0}};ObjectExpense[r[COLCHOICE]]['value']+=r[COLE.Amount]});}

console.log(ObjectExpense)

totalExpense=0
Object.values(ObjectExpense).forEach(r=>totalExpense+=r.value)

LocationArrayE=[...new Set(rawDataExpense.map(r=>r[COLE.Location]))].sort()
{const SELECT_TAG=document.querySelector('#LEDD');
const TEMPLATE=document.querySelector('#LETemplate');
LocationArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.LocationEOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

FYArrayE=[...new Set(rawDataExpense.map(r=>r[COLE.FY]))].sort()
{const SELECT_TAG=document.querySelector('#YEDD');
const TEMPLATE=document.querySelector('#YETemplate');
FYArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.FYEOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

VerticalArrayE=[...new Set(rawDataExpense.map(r=>r[COLE.Vertical]))].sort()
{const SELECT_TAG=document.querySelector('#VEDD');
const TEMPLATE=document.querySelector('#VETemplate');
VerticalArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.verticalEOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

SeminarArrayE=[...new Set(rawDataExpense.map(r=>`${r[COLE.Vertical]} : ${r[COLS.Seminar]}`))].sort()
{
const SELECT_TAG0=document.querySelector('#SEDD');
const TEMPLATE0=document.querySelector('#SETemplate');
SeminarArray.forEach((v,i)=>{const CLONE0=TEMPLATE0.content.cloneNode(true);
const OPTION0=CLONE0.querySelector('.seminarEOptionClass');
OPTION0.textContent=v;
OPTION0.value=i+1;
SELECT_TAG0.appendChild(CLONE0)
})}

OnlySeminarArrayE=[]
SeminarArrayE.forEach((S,i)=>OnlySeminarArrayE[i]=SVToS(S))

CategoryArray=[...new Set(rawDataExpense.map(r=>r[COLE.Category]))].sort()
{const SELECT_TAG=document.querySelector('#CDD');
const TEMPLATE=document.querySelector('#CTemplate');
FYArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.COptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

SCArray=[...new Set(rawDataExpense.map(r=>r[COLE.Subcategory]))].sort()
{const SELECT_TAG=document.querySelector('#SCDD');
const TEMPLATE=document.querySelector('#SCTemplate');
FYArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.SCOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}


//Headers
HEADERS=Object.keys(COLS)
HEADERE=Object.keys(COLE)

//Monthwise to cumulative
MonthIncomeFull=structuredClone(AMIncome)
Object.keys(AMIncome).forEach(r=>MonthIncomeFull[r].MonthIndex=ModFunction(MTom(r)-4,12)+1)

CumIncome=structuredClone(MonthIncomeFull)
Object.keys(CumIncome).forEach(r=>CumIncome[r].value=0)

Object.keys(CumIncome).forEach(r=>{Object.keys(MonthIncomeFull).forEach(n=>{if(CumIncome[r].MonthIndex>=MonthIncomeFull[n].MonthIndex){CumIncome[r].value+=MonthIncomeFull[n].value}})})



//Cumulative Income to Incentives
function IncomeToIncentive(Income,MONTH){/*             PLACE FORMULA HERE           */}

function IncentiveCumulativeCalc(CumIncomeObjOfObjs,CURRENTMONTH){
for(i=1;i<=12;i++){
if(IncomeToIncentive(CumIncome[mToM(CURRENTMONTH)].value,CURRENTMONTH)>=IncomeToIncentive(CumIncome[mToM(CURRENTMONTH-i)].value,CURRENTMONTH-i)){
return (IncomeToIncentive(CumIncome[mToM(CURRENTMONTH)].value,CURRENTMONTH)-IncomeToIncentive(CumIncome[mToM(CURRENTMONTH-i)].value,CURRENTMONTH-i))
}}}
/* My logic behind the above function: Incentive will only be payed if total incentive formula for the current month was greater than that of the last month. If the current month has higher incentive to be payed compared to the last month, the difference is payed out. The incentive is always the difference between the current month's incentive and the last payed cumulative incentive. We can hence skip all years that cumulative incentive decreased or stayed below the payed incentive.The code runs through all previous months till it reaches a month in which incentive was payed and checks the cumulative incentive payed till that month. It subtracts it from the current cumulative incentive to find the incentive to be payed*/

console.timeEnd("Data imported and processed in")

console.time("Charts made in")
handleChartAsync();Show('LeftHandMenu',1);Show('VC',0);Show('MC',1);Show('SC',0);Show('LC',1);Show('YC',1);Show('DS',1);Show('DD',1);
console.timeEnd("Charts made in")

MakeDT()
}
handleFileAsync()

