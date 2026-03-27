let IncomeChart

function ReplaceData(newData){let REFINED_DATA={};Object.keys(newData).forEach(k=>{if(!(['value','monthIndex','Location'].includes(k))){REFINED_DATA[k]=newData[k]}});IncomeChart.data.datasets[0].data=Object.values(REFINED_DATA).map(row => row.value);IncomeChart.data.labels=Object.keys(REFINED_DATA);max=0;Object.values(REFINED_DATA).forEach(r=>r.value>max?max=r.value:max+=0);IncomeChart.options.scales.y.max=1.2*max;UPDATE();
}

//function FindSum(Data){let Value=0;Data.forEach(r=>Value+=r[COLS.Amount]);return Value;}
function NewTitle(A){IncomeChart.options.plugins.title.text=A}
function UPDATE(){IncomeChart.resize();IncomeChart.update()}
function HideDD(){Show('VC',0);Show('MC',0);Show('SC',0);}
function RealignDD(){document.getElementById('VC').style.top="60px";document.getElementById('SC').style.top="60px";document.getElementById('LC').style.top="40px";}
function SVToS(b){return b.slice(b.lastIndexOf(" ")+1)}
function SVToV(b){return String(b).slice(0,String(b).indexOf(" "))}
function SeekLocation(L,R){if(L=="All"){return true}else if(R[COLS.Location]==L){return true}else{return false}}
function FilterAndReload(newdata,Variable){let NEWDATAOBJECT={};newdata.forEach(r=>{if(!(r[COLS[Variable]] in NEWDATAOBJECT)){NEWDATAOBJECT[r[COLS[Variable]]]={value:0}};NEWDATAOBJECT[r[COLS[Variable]]].value+=r[COLS.Amount]})
ReplaceData(NEWDATAOBJECT);}
function FilterMonthAndReload(newdata){let NEWDATAOBJECT={};newdata.forEach(r=>{if(!(ymdToM(r[COLS['Date']]) in NEWDATAOBJECT)){NEWDATAOBJECT[ymdToM(r[COLS['Date']])]={value:0}};NEWDATAOBJECT[ymdToM(r[COLS['Date']])].value+=r[COLS.Amount]})
ReplaceData(NEWDATAOBJECT);}

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



let CHOICE=1, Memory

//								ONCLICK

function OnChartClick(INDEX,LABEL,VALUE){
RealignDD()
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])

HideDD();
const Choice=CHOICE
switch(Choice){
case 1: CHOICE=3; Show('chartIncomeBack',1); break;
case 2: CHOICE=4; Show('chartIncomeBack',1); break;
case 3: CHOICE=7; Show('chartIncomeBack',1); break;
case 4: CHOICE=6; Show('chartIncomeBack',1); Memory=0; break;
case 5: CHOICE=6; Show('chartIncomeBack',1); Memory=1; break;
case 6: CHOICE=8; Show('chartIncomeBack',1); Memory=0; break;
case 7: CHOICE=8; Show('chartIncomeBack',1); Memory=1; break;}
console.log(Choice,"->",CHOICE," (Remembers ",Memory,")")
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
document.getElementById('LC').style.top="20px";
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

case 8:
Show('VC',1);
document.getElementById('LC').style.top="20px";
document.getElementById('VC').style.top="40px";
Show('MC',1);
Show('SC',1);
document.getElementById('SC').style.top="80px";
Show('DetailTable',1); 
Show('IncomeChartDiv',0); 
ReloadDetail()
break;

}

}












//								MENU






function OnMenuClick(Choice){
Show('DetailTable',0);
Show('IncomeChartDiv',1); 
CHOICE=Choice;
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])

HideDD();
RealignDD()
switch(CHOICE){
case 1: NewTitle(`Vertical-Wise Cumulative Income`); ReplaceData(AVSIncome); document.getElementById('LC').style.top="60px";
 break;
case 2: NewTitle(`Month-Wise Income`); ReplaceData(AMIncome); document.getElementById('LC').style.top="60px"; break;
case 3: Show('VC',1); NewTitle(`Seminar-Wise Cumulative Income for ${VERTICAL}`); ReplaceData(AVSIncome[VERTICAL]); break;
case 4: Show('MC',1); NewTitle(`Vertical-Wise Income for ${MONTH}`); ReplaceData(MVIncome[MONTH]); break;
case 5: Show('VC',1); NewTitle(`Month-Wise Income for ${VERTICAL}`); ReplaceData(VMSIncome[VERTICAL]); break;
case 6: Show('VC',1); NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); ReplaceData(VMSIncome[VERTICAL][MONTH]); Show('MC',1); document.getElementById('VC').style.top="40px"; document.getElementById('LC').style.top="20px"; break;
case 7: Show('SC',1); NewTitle(`Month-Wise Income for ${SEMINAR}`); ReplaceData(AVSIncome[SEMINARVERTICAL][SEMINAR]); break;
};
UPDATE();}

//								VERTICAL

function OnVSwitch(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])
switch(CHOICE){
case 3: 
NewTitle(`Seminar-Wise Income for ${VERTICAL}`)
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)));
FilterAndReload(NEWDATA,"Seminar")}
break;
case 5: 
NewTitle(`Month-Wise Income for ${VERTICAL}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)));
FilterMonthAndReload(NEWDATA)} 
break;
case 6: 
NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)&&ymdToM(r[COLS.Date])==MONTH));
FilterAndReload(NEWDATA,"Seminar")} 
break;
case 8: ReloadDetail(); break;
}
UPDATE();}

//								MONTH

function OnMSwitch(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])

switch(CHOICE){
case 4: 
NewTitle(`Vertical-Wise Income for ${MONTH}`); 
{const NEWDATA=rawDataIncome.filter(r=>(ymdToM(r[COLS.Date])==Month&&SeekLocation(LOCATION,r)));
FilterAndReload(NEWDATA,"Vertical")}
break;
case 6: 
NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)&&ymdToM(r[COLS.Date])==MONTH));
FilterAndReload(NEWDATA,"Seminar")} 
break;
case 8: ReloadDetail(); break;
}
UPDATE();}

//								SEMINAR

function OnSSwitch(){
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
document.getElementById('VDD').value=VerticalArray.indexOf(SEMINARVERTICAL);
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])


switch(CHOICE){
case 7: 
NewTitle(`Month-Wise Income for ${SEMINAR}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Seminar]==SEMINAR&&SeekLocation(LOCATION,r)));
FilterMonthAndReload(NEWDATA)}; 
break;
case 8: 
ReloadDetail(); 
break;
}
UPDATE();
}

//								LOCATION

function OnLSwitch(){
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1])
switch(CHOICE){
case 1: 
NewTitle(`Vertical-Wise Cumulative Income`); 
FilterAndReload(Vertical) 
break;
case 2: 
NewTitle(`Month-Wise Income`);
FilterMonthAndReload(RawDataIncome)
break;
case 3: 
NewTitle(`Seminar-Wise Income for ${VERTICAL}`)
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)));
FilterAndReload(NEWDATA,"Seminar")}
break;
case 4: 
NewTitle(`Vertical-Wise Income for ${MONTH}`); 
{const NEWDATA=rawDataIncome.filter(r=>(ymdToM(r[COLS.Date])==Month&&SeekLocation(LOCATION,r)));
FilterAndReload(NEWDATA,"Vertical")}
break;
case 5: 
NewTitle(`Month-Wise Income for ${VERTICAL}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)));
FilterMonthAndReload(NEWDATA)} 
break;
case 6: 
NewTitle(`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Vertical]==VERTICAL&&SeekLocation(LOCATION,r)&&ymdToM(r[COLS.Date])==MONTH));
FilterAndReload(NEWDATA,"Seminar")} 
break;
case 7: 
NewTitle(`Month-Wise Income for ${SEMINAR}`); 
{const NEWDATA=rawDataIncome.filter(r=>(r[COLS.Seminar]==SEMINAR&&SeekLocation(LOCATION,r)));
FilterMonthAndReload(NEWDATA)}; 
break;
case 8:
ReloadDetail();
break;
};
UPDATE();
}


//								BACK

function OnBack(){
Show('chartIncomeBack',0);
const Choice=CHOICE
switch(Choice){
case 3: CHOICE=1; break;
case 4: CHOICE=2; break;
case 6: CHOICE=4+Memory; break;
case 7: CHOICE=3; break;
case 8: CHOICE=6+Memory; break;
}
OnMenuClick(CHOICE)
if(Choice===6||Choice===7||Choice===8){Show('chartIncomeBack',1)}
}



//								CHART




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