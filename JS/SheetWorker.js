let AVSIncome={} /*AV,AVS*/, AMIncome={} /*AM*/, CategoryObjectExpense={} /*CE*/, CumIncome={}, MonthIncomeFull={}, CumIncentive={}, VMSIncome={} /*VM,VMS*/,MVIncome={} /*MV*/
let rawDataCumIncome, rawDataCumExpense
let totalIncome, TotalExpense
let VerticalArray=[]
async function handleFileAsync() {
let CumulativeIncome

rawDataIncome=await ImportData("Master","Income")

VerticalArray=[...new Set(rawDataIncome.map(r=>r[COLS.vertical]))].sort()
const SELECT_TAG=document.querySelector('#VMIVerticalDD');
const TEMPLATE=document.querySelector('#VMItemplate');
VerticalArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.verticalOptionClass');
OPTION.textContent=v;
OPTION.value=i;
SELECT_TAG.appendChild(CLONE)
})

//Data for chartIncome
DataToObject(rawDataIncome,AVSIncome,"VERTICAL")
DataToSeminars(rawDataIncome,AVSIncome)

{rawDataIncome.forEach((r)=>{if(`${ymdToM(r[COLS.date])}` in AVSIncome[r[verticalCol]][r[seminarCol]]){}else {AVSIncome[r[verticalCol]][r[seminarCol]][ymdToM(r[COLS.date])]={value:0}};AVSIncome[r[verticalCol]][r[seminarCol]][ymdToM(r[COLS.date])].value+=r[amountCol]})}






console.log(AVSIncome)





//Data for chartIncomeMonthwise
DataToMonths(rawDataIncome,AMIncome)



// Expenses
rawDataCumExpense=await ImportData('Master',"Expense")
DataToObject(rawDataCumExpense,CategoryObjectExpense,"CATEGORY")

totalExpense=0
Object.values(CategoryObjectExpense).forEach(r=>totalExpense+=r.value)



//Monthwise for individual verticals
DataToObject(rawDataIncome,VMSIncome,"VERTICAL")
Object.keys(VMSIncome).forEach(r=>delete VMSIncome[r].value)
rawDataIncome.forEach(r=>{
if(`${ymdToM(r[COLS.date])}` in VMSIncome[r[COLS.vertical]]){}
else { VMSIncome[r[COLS.vertical]][ymdToM(r[COLS.date])]={value:0,monthIndex:ModFunction(ymdTom(r[COLS.date])-3,12)}}

VMSIncome[r[COLS.vertical]][ymdToM(r[COLS.date])].value+=r[COLS.amount]

})

//Vertical-Wise for month

rawDataIncome.forEach(r=>{(`${ymdToM(r[dateCol])}` in MVIncome)?{}:(MVIncome[ymdToM(r[dateCol])]={})})
rawDataIncome.forEach(r=>{(`${r[COLS.vertical]}` in MVIncome[ymdToM(r[dateCol])])?{}:(MVIncome[ymdToM(r[dateCol])][r[COLS.vertical]]={value:0});

MVIncome[ymdToM(r[dateCol])][r[COLS.vertical]].value+=r[COLS.amount]

})




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

handleChartAsync()}
handleFileAsync()

