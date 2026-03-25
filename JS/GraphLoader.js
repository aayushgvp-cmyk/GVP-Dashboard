
let nestLevel=0

let choice=1
Show('chartIncomeMonthwiseDiv',0);
Show('chartExpenseDiv',0);
Show('chartVMIncomeDiv',0);
Show('VChoiceDiv',0);
Show('MChoiceDiv',0);
Show('SChoiceDiv',0);
Show('chartIncomeMVIDiv',0);

function SwitchSection(n){
Show('chartIncomeDiv',0);
Show('chartIncomeBack',0)
Show('chartIncomeMonthwiseDiv',0);
Show('chartExpenseDiv',0);
Show('chartVMIncomeDiv',0);
Show('VChoiceDiv',0);
Show('MChoiceDiv',0);
Show('SChoiceDiv',0);
Show('chartIncomeMVIDiv',0);
switch(n){
case 1: Show('chartIncomeDiv',1);ZoomOutOfChartIncome(chartIncome);log(1);chartIncome.options.plugins.title.text=`Vertical-Wise Cumulative Income`;chartIncome.update();break;
case 2: Show('chartIncomeMonthwiseDiv',1); break;
case 3:choice=3; Show('chartIncomeDiv',1);ZoomIntoChart(VerticalArray[document.getElementById("VMIVerticalDD").value],chartIncome);Show('VChoiceDiv',1);chartIncome.options.plugins.title.text=`Seminar-Based Income for ${VerticalArray[document.getElementById("VMIVerticalDD").value]}`;chartIncome.update();break;
case 4:choice=4; Show('MChoiceDiv',1);Show('chartIncomeMVIDiv',1);chartIncomeMV.options.plugins.title.text=`Vertical-Based Income for ${mToM(ModFunction(Number(document.getElementById("MVVerticalDD").value)+3,12))}`;break;


case 5:choice=5; Show('chartVMIncomeDiv',1);Show('VChoiceDiv',1);chartVerticalwiseMonthwiseIncome.options.plugins.title.text=`Month wise income for ${VerticalArray[Number(document.getElementById('VMIVerticalDD').value)]}`;

replaceChartData(chartVerticalwiseMonthwiseIncome,0,VMSIncome[VerticalArray[document.getElementById('VMIVerticalDD').value]],['value','monthindex']);chartVerticalwiseMonthwiseIncome.update(); break;

case 6:choice=6; Show('chartVMIncomeDiv',1); OpenVMSI(VerticalArray[document.getElementById('VMIVerticalDD').value],mToM(ModFunction(document.getElementById('MVVerticalDD').value+3,12)));Show('MChoiceDiv',1);Show('VChoiceDiv',1);(document.getElementById("VChoiceDiv").style.top="40px");console.log(document.getElementById("VChoiceDiv").style.top);break;



case 7: Show('chartIncomeDiv',1);nestLevel=1;ZoomIntoChart(SeminarArray[document.getElementById("SeminarDD").value],chartIncome);Show('SChoiceDiv',1);chartIncome.options.plugins.title.text=`Month-Based Income for${SeminarArray[document.getElementById("SeminarDD").value].slice(SeminarArray[document.getElementById("SeminarDD").value].lastIndexOf(" ")+1)}`;chartIncome.update();break;

case -1:Show('chartExpenseDiv',1);break;
default: break;
}}

const colourRainArray=["#03045E","#0077B6","#00B4D8","#90E0EF","#CAF0F8"]
let max=0

function replaceChartData(chartName,datasetIndex,newData,BAN_ARRAY){
let REFINED_DATA={}
Object.keys(newData).forEach(k=>{if(!(BAN_ARRAY.includes(k))){REFINED_DATA[k]=newData[k]}})
chartName.data.datasets[datasetIndex].data=Object.values(REFINED_DATA).map(row => row.value)
chartName.data.labels=Object.keys(REFINED_DATA)
max=0
Object.values(REFINED_DATA).forEach(r=>r.value>max?max=r.value:max+=0)
chartName.options.scales.y.max=1.2*max
chartName.resize()
chartName.update()
}

function FindVertical(Seminar){let R;Object.keys(AVSIncome).forEach(r=>{if(Seminar in AVSIncome[r]){R=r};});return R;}


function ZoomIntoChart(LABEL,chartName){
nestLevel+=1
console.log(nestLevel)
LABEL=LABEL.slice(LABEL.lastIndexOf(" ")+1)
nestLevel===0?Show('chartIncomeBack',0):Show('chartIncomeBack',1)
nestLevel===1?(dataIncome=structuredClone(AVSIncome[LABEL])):{}
nestLevel===2?(dataIncome=structuredClone(AVSIncome[FindVertical(LABEL)][LABEL])):{}
delete dataIncome.value
chartName.options.plugins.title.text=`${nestLevel===1?'Seminar':'Month'}-Wise Income for ${LABEL}`
replaceChartData(chartName,0,dataIncome,['value','monthIndex'])
}


function ZoomOutOfChartIncome(chartName){
nestLevel=0;
dataIncome=AVSIncome
chartIncome.options.plugins.title.text=`Vertical-Wise Cumulative Income`;
replaceChartData(chartName,0,dataIncome,['value','monthIndex'])
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

Show('Loading',0)

LoadAVI()

SeminarDD.addEventListener("change",(e)=>{const SELECTED_VERTICAL_SEMINAR=SeminarArray[document.getElementById('SeminarDD').value]; SELECTED_SEMINAR=SELECTED_VERTICAL_SEMINAR.slice(1+SELECTED_VERTICAL_SEMINAR.lastIndexOf(" ")); SELECTED_VERTICAL=SELECTED_VERTICAL_SEMINAR.slice(0,SELECTED_VERTICAL_SEMINAR.indexOf(" "));replaceChartData(chartIncome,0,AVSIncome[SELECTED_VERTICAL][SELECTED_SEMINAR],['value','monthIndex']);chartIncome.options.plugins.title.text=`Month-based income for ${SELECTED_SEMINAR}`;chartIncome.update();})

LoadAMI()

LoadVMI()

VMIVerticalDD.addEventListener("change",(e)=>{if(choice!=3){SwitchVMIVertical(document.getElementById("VMIVerticalDD").value)}
else{replaceChartData(chartIncome,0,AVSIncome[VerticalArray[document.getElementById("VMIVerticalDD").value]],['value']);chartIncome.options.plugins.title.text=`Seminar-Based Income for ${VerticalArray[document.getElementById("VMIVerticalDD").value]}`;chartIncome.update()}})

LoadCE()

LoadMVI()

MVVerticalDD.addEventListener("change",(e)=>{SwitchMVIMonth(document.getElementById("MVVerticalDD").value)})

MVVerticalDD.addEventListener("change",(e)=>{choice===6?OpenVMSI(VerticalArray[document.getElementById('VMIVerticalDD').value],mToM(ModFunction(Number(document.getElementById('MVVerticalDD').value)+3,12))):{}})

VMIVerticalDD.addEventListener("change",(e)=>{choice===6?OpenVMSI(VerticalArray[document.getElementById('VMIVerticalDD').value],mToM(ModFunction(Number(document.getElementById('MVVerticalDD').value)+3,12))):{}})



console.log("chart end")
}
