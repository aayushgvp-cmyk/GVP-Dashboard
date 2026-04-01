
const colourRainArray=["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"].reverse()

let max=0



function FindVertical(Seminar){let R;Object.keys(AVSIncome).forEach(r=>{if(Seminar in AVSIncome[r]){R=r};});return R;}

async function handleChartAsync() {

console.log("chart start")

dataIncome=AVSIncome


Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)

LoadIncome()
HideDDE();
ShowDD();
DealignDD();

LoadExpense()
Show('VEC',0);
Show('SEC',0);
Show('Loading',0)

VDD.addEventListener("change",OnSwitch)
MDD.addEventListener("change",OnSwitch)
SDD.addEventListener("change",OnSSwitch)
LDD.addEventListener("change",OnSwitch)
YDD.addEventListener("change",OnSwitch)
DS.addEventListener("click",DownloadExcelS)
DD.addEventListener("click",DownloadExcelD)

VEDD.addEventListener("change",OnSwitchE)
MEDD.addEventListener("change",OnSwitchE)
SEDD.addEventListener("change",OnSESwitchE)
LEDD.addEventListener("change",OnSwitchE)
YEDD.addEventListener("change",OnSwitchE)
CDD.addEventListener("change",OnSwitchE)
SCDD.addEventListener("change",OnSCSwitchE)
console.log("chart end")
}
