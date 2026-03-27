
const colourRainArray=["#03045E","#0077B6","#00B4D8","#90E0EF","#CAF0F8"]
let max=0



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
LDD.addEventListener("change",OnLSwitch)

console.log("chart end")
}
