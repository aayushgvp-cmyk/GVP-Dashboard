
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

let dataExpense

async function handleChartAsync() {

console.log("chart start")

dataIncome=AVSIncome
dataExpense=CategoryObjectExpense

Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)

LoadIncome()

Show('Loading',0)

VDD.addEventListener("change",OnVSwitch)
MDD.addEventListener("change",OnMSwitch)
SDD.addEventListener("change",OnSSwitch)

console.log("chart end")
}
