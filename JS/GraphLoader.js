Show('chartIncomeMonthwiseDiv',0);
Show('chartExpenseDiv',0);
Show('chartVMIncomeDiv',0);
Show('VChoiceDiv',0);
Show('MChoiceDiv',0);
Show('chartIncomeMVIDiv',0);

function SwitchSection(n){
Show('chartIncomeDiv',0);
Show('chartIncomeBack',0)
Show('chartIncomeMonthwiseDiv',0);
Show('chartExpenseDiv',0);
Show('chartVMIncomeDiv',0);
Show('VChoiceDiv',0);
Show('MChoiceDiv',0);
Show('chartIncomeMVIDiv',0);
switch(n){
case 1: Show('chartIncomeDiv',1);ZoomOutOfChartIncome(chartIncome);log(1);chartIncome.options.plugins.title.text=`Vertical-Wise Cumulative Income`;chartIncome.update();break;
case 2: Show('chartIncomeMonthwiseDiv',1); break;
case 3: Show('chartIncomeDiv',1);ZoomIntoChart(VerticalArray[document.getElementById("VMIVerticalDD").value],chartIncome);Show('VChoiceDiv',1);chartIncome.options.plugins.title.text=`Seminar-Based Income for ${VerticalArray[document.getElementById("VMIVerticalDD").value]}`;chartIncome.update();break;
case 4: Show('MChoiceDiv',1);Show('chartIncomeMVIDiv',1);chartIncomeMV.options.plugins.title.text=`Vertical-Based Income for ${mToM(ModFunction(Number(document.getElementById("MVVerticalDD").value)+3,12))}`;break;
case 5: Show('chartVMIncomeDiv',1);Show('VChoiceDiv',1); break;
case -1:Show('chartExpenseDiv',1);break;
default: break;
}}

const colourRainArray=["#03045E","#0077B6","#00B4D8","#90E0EF","#CAF0F8"]
let max=0
function replaceChartData(chartName,datasetIndex,newData){
chartName.data.datasets[datasetIndex].data=Object.values(newData).map(row => row.value)
chartName.data.labels=Object.keys(newData).map(r => r)
max=0
Object.values(newData).forEach(r=>r.value>max?max=r.value:max+=0)
chartName.options.scales.y={max: 1.2*max}
chartName.update()
}

let nestLevel=0
function ZoomIntoChart(vertical,chartName){
nestLevel=1
nestLevel===0?Show('chartIncomeBack',0):Show('chartIncomeBack',1)
nestLevel===1?(dataIncome=structuredClone(AVSIncome[vertical])):{}
delete dataIncome.value
replaceChartData(chartName,0,dataIncome)
}
function ZoomOutOfChartIncome(chartName){
nestLevel-=1;
nestLevel===0?(dataIncome=AVSIncome):{}
chartIncome.options.plugins.title.text=`Vertical-Wise Cumulative Income`;
replaceChartData(chartName,0,dataIncome)
Show('chartIncomeBack',0)
Show('VChoiceDiv',0);
}

let chartIncome={},chartIncomeMonthwise={},chartExpense={},chartVerticalwiseMonthwiseIncome={},chartIncomeMV={}



let dataIncome, dataExpense
async function handleChartAsync() {

console.log("chart start")

dataIncome=AVSIncome
dataExpense=CategoryObjectExpense



Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)


LoadAVI()

LoadAMI()

LoadVMI()

VMIVerticalDD.addEventListener("change",(e)=>{SwitchVMIVertical(document.getElementById("VMIVerticalDD").value);SwitchAVSIVertical(document.getElementById("VMIVerticalDD").value)})

LoadCE()

LoadMVI()											//Place correct data.Currently using income data

MVVerticalDD.addEventListener("change",(e)=>{SwitchMVIMonth(document.getElementById("MVVerticalDD").value)})


console.log("chart end")
}
