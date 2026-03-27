Show('LeftHandMenu',0);Show('VC',0);Show('MC',0);Show('SC',0);Show('chartIncomeBack',0);Show('DetailTable',0);
let AVSIncome={} /*AV,AVS*/, AMIncome={} /*AM*/, CategoryObjectExpense={} /*CE*/, CumIncome={}, MonthIncomeFull={}, CumIncentive={}, VMSIncome={} /*VM,VMS*/,MVIncome={} /*MV*/
let rawDataIncome, rawDataCumExpense
let totalIncome, TotalExpense
let VerticalArray=[]
async function handleFileAsync() {
let CumulativeIncome


rawDataIncome=await ImportData("Master","Income")





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
console.log(LocationArray)


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

//											  AVS
DataToObject(rawDataIncome,AVSIncome,"VERTICAL")
DataToSeminars(rawDataIncome,AVSIncome)

{rawDataIncome.forEach((r)=>{if(`${ymdToM(r[COLS.Date])}` in AVSIncome[r[COLS.Vertical]][r[COLS.Seminar]]){}else {AVSIncome[r[COLS.Vertical]][r[COLS.Seminar]][ymdToM(r[COLS.Date])]={value:0}};AVSIncome[r[COLS.Vertical]][r[COLS.Seminar]][ymdToM(r[COLS.Date])].value+=r[COLS.Amount]})}




//											  AM
DataToMonths(rawDataIncome,AMIncome)

rawDataIncome.forEach((r)=>{if(`${r[COLS.Vertical]}` in AMIncome[ymdToM(r[COLS.Date])]){}else {AMIncome[ymdToM(r[COLS.Date])][r[COLS.Vertical]]={value:0}};AMIncome[ymdToM(r[COLS.Date])][r[COLS.Vertical]].value+=r[COLS.Amount]})

//                                                                                        CE
//rawDataCumExpense=await ImportData('Master',"Expense")
//DataToObject(rawDataCumExpense,CategoryObjectExpense,"CATEGORY")

totalExpense=0
//Object.values(CategoryObjectExpense).forEach(r=>totalExpense+=r.value)



//                                                                                       VMSI
DataToObject(rawDataIncome,VMSIncome,"VERTICAL")
Object.keys(VMSIncome).forEach(r=>delete VMSIncome[r].value)
rawDataIncome.forEach(r=>{
if(`${ymdToM(r[COLS.Date])}` in VMSIncome[r[COLS.Vertical]]){}
else { VMSIncome[r[COLS.Vertical]][ymdToM(r[COLS.Date])]={value:0,monthIndex:ModFunction(ymdTom(r[COLS.Date])-3,12)}}

VMSIncome[r[COLS.Vertical]][ymdToM(r[COLS.Date])].value+=r[COLS.Amount]

})

rawDataIncome.forEach(r=>{
if(`${r[COLS.Seminar]}` in VMSIncome[r[COLS.Vertical]][ymdToM(r[COLS.Date])]){}
else { VMSIncome[r[COLS.Vertical]][ymdToM(r[COLS.Date])][r[COLS.Seminar]]={value:0}}

VMSIncome[r[COLS.Vertical]][ymdToM(r[COLS.Date])][r[COLS.Seminar]].value+=r[COLS.Amount]

})




//                                                                                       MVI

rawDataIncome.forEach(r=>{(`${ymdToM(r[COLS.Date])}` in MVIncome)?{}:(MVIncome[ymdToM(r[COLS.Date])]={})})
rawDataIncome.forEach(r=>{(`${r[COLS.Vertical]}` in MVIncome[ymdToM(r[COLS.Date])])?{}:(MVIncome[ymdToM(r[COLS.Date])][r[COLS.Vertical]]={value:0});

MVIncome[ymdToM(r[COLS.Date])][r[COLS.Vertical]].value+=r[COLS.Amount]


})


//Make detail table header
HEADERS=Object.keys(COLS)
//{const TEMPLATE=document.querySelector('#DTTemplate');
//HEADERS.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
//const TD=CLONE.querySelector('.DTTemplateTD');
//TD.textContent=v;
//document.querySelector('#DTHeaderRow').appendChild(CLONE)
//})}

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
handleChartAsync();Show('LeftHandMenu',1);
console.timeEnd("Charts made in")

MakeDT()
}
handleFileAsync()

