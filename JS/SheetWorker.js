let verticalsObjectIncome={}, verticalsObjectIncomeMonthwise={}, CategoryObjectExpense={}, CumIncome={}, MonthIncomeFull={}, CumIncentive={}
let rawDataCumIncome, rawDataCumExpense
let totalIncome, TotalExpense
async function handleFileAsync() {
let CumulativeIncome


rawDataCumIncome=await ImportData("Master","Income")

//DataToObject(rawDataCumIncome,verticalsObjectIncome,"VERTICAL")


//Data for chartIncome
DataToVerticals(rawDataCumIncome,verticalsObjectIncome)
DataToSeminars(rawDataCumIncome,verticalsObjectIncome)

//Data for chartIncomeMonthwise
DataToMonths(rawDataCumIncome,verticalsObjectIncomeMonthwise)

// Expenses
rawDataCumExpense=await ImportData('Master',"Expense")
DataToCategories(rawDataCumExpense,CategoryObjectExpense)

totalExpense=0
Object.values(CategoryObjectExpense).forEach(r=>totalExpense+=r.value)




//Monthwise to cumulative
MonthIncomeFull=structuredClone(verticalsObjectIncomeMonthwise)
Object.keys(verticalsObjectIncomeMonthwise).forEach(r=>MonthIncomeFull[r].MonthIndex=ModFunction(MTom(r)-4,12)+1)

CumIncome=structuredClone(MonthIncomeFull)
Object.keys(CumIncome).forEach(r=>CumIncome[r].value=0)

Object.keys(CumIncome).forEach(r=>{Object.keys(MonthIncomeFull).forEach(n=>{if(CumIncome[r].MonthIndex>=MonthIncomeFull[n].MonthIndex){CumIncome[r].value+=MonthIncomeFull[n].value}})})
console.log(CumIncome)

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



function setCToColour(chartName,colour){
chartName.data.datasets[0].backgroundColor=colour
chartName.update()
log(chartName.data.datasets[0].backgroundColor)
}
