let IncomeChart

function ReplaceData(A){replaceChartData(IncomeChart,0,A,['value','monthIndex'])}
function NewTitle(A){IncomeChart.options.plugins.title.text=A}
function UPDATE(){IncomeChart.resize();IncomeChart.update()}
function HideDD(){Show('VC',0);Show('MC',0);Show('SC',0);}
function SVToS(b){return b.slice(b.lastIndexOf(" ")+1)}
function SVToV(b){return String(b).slice(0,String(b).indexOf(" "))}
/*
OBJECTS FOR EACH CHART TYPE:
AV:AVSIncome
AM:AMIncome
AVS:AVSIncome[VERTICAL]
MV:MVIncome
VM:VMSIncome[VERTICAL]
VMS:VMSIncome[VERTICAL][MONTH]
SM:AVSIncome[VERTICAL][SEMINAR]
*/



let CHOICE=1

function OnChartClick(INDEX,LABEL,VALUE){
console.log(VerticalArray)
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
HideDD();
const Choice=CHOICE
switch(Choice){case 1: CHOICE=3; break;
case 2: CHOICE=4; break;
case 3: CHOICE=7; break;
case 4: CHOICE=6; break;
case 5: CHOICE=6; break;
case 6: CHOICE=8; break;
case 7: CHOICE=8; break;}
console.log(Choice,"->",CHOICE)
switch(CHOICE){
case 3:
document.getElementById('VDD').value=VerticalArray.indexOf(LABEL)
NewTitle(`Seminar-Wise Cumulative Income for ${LABEL}`);
ReplaceData(AVSIncome[LABEL]);
UPDATE();
Show('VC',1);
break;

case 4: 
document.getElementById('MDD').value=INDEX+1
Show('MC',1); 
NewTitle(`Vertical-Wise Income for ${LABEL}`);  
ReplaceData(MVIncome[LABEL]); 
break;

case 6:
Show('VC',1); 
Show('MC',1); 
document.getElementById('VC').style.top="40px"; 
switch(Choice){case 4: NewTitle(`Seminar-Wise Income for ${LABEL} in ${MONTH}`); ReplaceData(VMSIncome[LABEL][MONTH]); document.getElementById('VDD').value=VerticalArray.indexOf(LABEL); break;
case 5: NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${LABEL}`); ReplaceData(VMSIncome[VERTICAL][LABEL]); document.getElementById('MDD').value=INDEX+1; break;}
break;

case 7:
NewTitle(`Month-Wise Income for ${LABEL}`);
let Vertical;
Object.keys(AVSIncome).forEach(V=>{if(LABEL in AVSIncome[V]){Vertical=V}})
document.getElementById('SDD').value=OnlySeminarArray.indexOf(LABEL);
ReplaceData(AVSIncome[VERTICAL][LABEL]);
UPDATE();
Show('SC',1)
break;

case 8: break;

}

}

function OnMenuClick(Choice){CHOICE=Choice;
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);

console.log(MONTH,VERTICAL,SEMINAR,":",SEMINARVERTICAL);
HideDD();
document.getElementById('VC').style.top="60px";
switch(CHOICE){
case 1: NewTitle(`Vertical-Wise Cumulative Income`); ReplaceData(AVSIncome); break;
case 2: NewTitle(`Month-Wise Income`); ReplaceData(AMIncome); break;
case 3: Show('VC',1); NewTitle(`Seminar-Wise Cumulative Income for ${VERTICAL}`); ReplaceData(AVSIncome[VERTICAL]); break;
case 4: Show('MC',1); NewTitle(`Vertical-Wise Income for ${MONTH}`); ReplaceData(MVIncome[MONTH]); break;
case 5: Show('VC',1); NewTitle(`Month-Wise Income for ${VERTICAL}`); ReplaceData(VMSIncome[VERTICAL]); break;
case 6: Show('VC',1); NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); ReplaceData(VMSIncome[VERTICAL][MONTH]); Show('MC',1); document.getElementById('VC').style.top="40px"; break;
case 7: Show('SC',1); NewTitle(`Month-Wise Income for ${SEMINAR}`); ReplaceData(AVSIncome[SEMINARVERTICAL][SEMINAR]); break;
};
UPDATE();}

function OnVSwitch(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
switch(CHOICE){
case 3: NewTitle(`Seminar-Wise Income for ${VERTICAL}`); ReplaceData(AVSIncome[VERTICAL]); break;
case 5: NewTitle(`Month-Wise Income for ${VERTICAL}`); ReplaceData(VMSIncome[VERTICAL]); break;
case 6: NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); ReplaceData(VMSIncome[VERTICAL][MONTH]); break;
}
UPDATE();}

function OnMSwitch(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
switch(CHOICE){
case 4: NewTitle(`Vertical-Wise Income for ${MONTH}`); ReplaceData(MVIncome[MONTH]); break;
case 6: NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); ReplaceData(VMSIncome[VERTICAL][MONTH]); break;
}
UPDATE();}

function OnSSwitch(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
switch(CHOICE){
case 7: NewTitle(`Month-Wise Income for ${SEMINAR}`); ReplaceData(AVSIncome[SEMINARVERTICAL][SEMINAR]); break;
}
UPDATE();}













function LoadIncome(){
 IncomeChart=  new Chart(
    document.getElementById('IncomeChartHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 1.2*(max)}},
        plugins: {
		title:{display:true,text:"Vertical-wise Cumulative Income"},
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
	responsive: true,
                onClick: (e) => {
                    const activePoints = IncomeChart.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = IncomeChart.data.labels[index];
                        const value = IncomeChart.data.datasets[0].data[index];
			OnChartClick(index,label,value)
                       
                    }
                }

      },
	plugins:[topLabelsPlugin,chartTotalPlugin],
      data: {
        labels:Object.keys(AVSIncome).map(r => r),
        datasets: [
          {
            data: Object.values(AVSIncome).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}