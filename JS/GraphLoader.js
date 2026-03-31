
const colourRainArray=["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"].reverse()

let max=0



function FindVertical(Seminar){let R;Object.keys(AVSIncome).forEach(r=>{if(Seminar in AVSIncome[r]){R=r};});return R;}

async function handleChartAsync() {

console.log("chart start")

dataIncome=AVSIncome


Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)

LoadIncome()

LoadExpense()

Show('Loading',0)

VDD.addEventListener("change",OnSwitch)
MDD.addEventListener("change",OnSwitch)
SDD.addEventListener("change",OnSSwitch)
LDD.addEventListener("change",OnSwitch)
YDD.addEventListener("change",OnSwitch)
DS.addEventListener("click",DownloadExcelS)
DD.addEventListener("click",DownloadExcelD)
console.log("chart end")
}
