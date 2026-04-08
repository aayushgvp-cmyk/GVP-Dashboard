
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
Show('VC',0);
Show('SC',0);
DealignDD();

LoadExpense()
Show('VEC',0);
Show('SEC',0);
Show('Loading',0)

LoadPL()

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
TDD.addEventListener("change",OnSwitchE)


VPDD.addEventListener("change",OnSwitchP)
MPDD.addEventListener("change",OnSwitchP)
SPDD.addEventListener("change",OnSSwitchP)
LPDD.addEventListener("change",OnSwitchP)
YPDD.addEventListener("change",OnSwitchP)

VPDD2.addEventListener("change",OnIncentiveChange)
MPDD.addEventListener("change",OnIncentiveChange)
YPDD.addEventListener("change",OnIncentiveChange)

DateDD.addEventListener("change",SwapType)
DateDD.addEventListener("change",OnSwitch)
DateDD.addEventListener("change",OnSwitchE)
DateDD.addEventListener("change",OnSwitchP)
DateDD.addEventListener("change",OnIncentiveChange)
console.log("chart end")
}
