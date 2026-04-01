let IncomeChart

let VERTICAL,SEMINAR,SEMINARVERTICAL,MONTH,LOCATION,FISCAL_YEAR

function RunFilters(r){
const OUTPUT=SeekLocation(LOCATION,r)&&SeekVertical(VERTICAL,r)&&SeekSeminar(SEMINAR,r)&&SeekMonth(MONTH,r)&&SeekFY(FISCAL_YEAR,r)
return OUTPUT
}

function UpdateChart(){
	NEWDATA=rawDataIncome.filter(r=>RunFilters(r));
	let Type;
	switch(CHOICE){
	case 1:
		Type='Vertical';
		break;
	case 2:
		Type='Seminar';
		break;
	case 3:
		FilterMonthAndReload(NEWDATA);
		return;
	case 4:
		Type='Location';
		break;
	}
	FilterAndReload(NEWDATA,Type);
}
function ReplaceData(newData){
	let REFINED_DATA={};
	Object.keys(newData).forEach(k=>{
		{REFINED_DATA[k]=newData[k]}
	});
	IncomeChart.data.datasets[0].data=Object.values(REFINED_DATA);
	IncomeChart.data.labels=Object.keys(REFINED_DATA);max=0;
	Object.values(REFINED_DATA).forEach(r=>r.value>max?max=r.value:max+=0);
	IncomeChart.options.scales.y.max=1.2*max;
	UPDATE();
}
function NewTitle(A){IncomeChart.options.plugins.title.text=A}
function UPDATE(){IncomeChart.resize();IncomeChart.update()}

function ShowDD(){Show('VC',1);Show('MC',1);Show('SC',1);Show('LC',1);Show('YC',1);}
function HideDD(){Show('VC',0);Show('MC',0);Show('SC',0);Show('LC',0);Show('YC',0);}
function ResetDD(){document.getElementById('VDD').value=-1; document.getElementById('SDD').value=-1; document.getElementById('MDD').value=0; document.getElementById('LDD').value=0; document.getElementById('YDD').value=0;}
function DealignDD(){document.getElementById('CC').style.top="80px";document.getElementById('SCC').style.top="100px";document.getElementById('VC').style.top="120px";document.getElementById('SC').style.top="140px";document.getElementById('MC').style.top="160px";document.getElementById('LC').style.top="180px";document.getElementById('YC').style.top="200px";}
DealignDD()
function RealignDD(){document.getElementById('VC').style.top="60px";document.getElementById('SC').style.top="60px";document.getElementById('LC').style.top="40px";}

function SVToS(b){return b.slice(b.indexOf(":")+1)}
function SVToV(b){return String(b).slice(0,String(b).indexOf(":"))}

function SeekLocation(L,R){if(L=="All"){return true}else if(R[COLS.Location]==L){return true}else{return false}}
function SeekVertical(V,R){if(V=="All"){return true}else if(R[COLS.Vertical]==V){return true}else{return false}}
function SeekSeminar(S,R){if(S=="All"){return true}else if(R[COLS.Seminar]==S){return true}else{return false}}
function SeekMonth(M,R){if(M=="All"){return true}else if(ymdToM(R[COLS.Date])==M){return true}else{return false}}
function SeekFY(Y,R){if(Y=="All"){return true}else if(R[COLS.FY]==Y){return true}else{return false}}

function SetVariables(){
	VERTICAL=(Number(Or(document.getElementById('VDD').value,-1))===-1?"All":VerticalArray[Or(document.getElementById('VDD').value,0)]);
	MONTH=(Number(Or(document.getElementById('MDD').value,0))===0?"All":mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12)));
	SEMINAR=(Number(Or(document.getElementById('SDD').value,-1))===-1?"All":SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]));
	SEMINARVERTICAL=(Number(Or(document.getElementById('SDD').value,-1))===-1?"All":SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]));
	LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1]);
	FISCAL_YEAR=(Number(Or(document.getElementById('YDD').value,0))===0?"All":FYArray[Number(document.getElementById('YDD').value)-1]);
}
function FilterAndReload(newdata,Variable){
	let NEWDATAOBJECT={};
	newdata.forEach(r=>{
		if(!(r[COLS[Variable]] in NEWDATAOBJECT)){
			NEWDATAOBJECT[r[COLS[Variable]]]=0
		};
		NEWDATAOBJECT[r[COLS[Variable]]]+=r[COLS.Amount]
	})
	ReplaceData(NEWDATAOBJECT);
}
function FilterMonthAndReload(newdata){
	let NEWDATAOBJECT={};
	newdata.forEach(r=>{
		if(!(ymdToM(r[COLS['Date']]) in NEWDATAOBJECT)){
			NEWDATAOBJECT[ymdToM(r[COLS['Date']])]=0
		};
		NEWDATAOBJECT[ymdToM(r[COLS['Date']])]+=r[COLS.Amount]
	})
	ReplaceData(NEWDATAOBJECT);
}



let CHOICE=1,Memory

//								ONCLICK

function OnChartClick(INDEX,LABEL,VALUE){
	Show('chartIncomeBack',1);
	DealignDD()
	SetVariables()
	ShowDD();
	const Choice=CHOICE
	switch(Choice){
	case 1:
		CHOICE=2;
		document.getElementById('VDD').value=VerticalArray.indexOf(LABEL);
		document.getElementById('SDD').value=-1;
		break;
	case 2:
		CHOICE=3;
		document.getElementById('SDD').value=OnlySeminarArray.indexOf(LABEL);
		break;
	case 3:
		CHOICE=5;
		document.getElementById('MDD').value=INDEX+1;
		Memory=0;
		break;
	case 4:
		CHOICE=5;
		document.getElementById('LDD').value=LocationArray.indexOf(LABEL)+1;
		Memory=1;
		break;
	}
	console.log(Choice,"->",CHOICE)
	SetVariables()
	UpdateChart();
	UPDATE();
	switch(CHOICE){
	case 2:
		Show('SC',0);
		break;
	case 3:
		Show('MC',0);
		break;
	case 4:
		Show('LC',0);
		break;
	case 5:
		Show('IncomeChartDiv',0)
		Show('DetailTable',1);
		ReloadDetail();
		break;
	}
}












//								MENU






function OnMenuClick(Choice){
	ResetDD()
	document.getElementById('chartIncomeBack').style.top='80px'
	Show('chartIncomeBack',0)
	Show('DetailTable',0);
	Show('ExpenseChartDiv',0)
	Show('IncomeChartDiv',1); 
	CHOICE=Choice;
	SetVariables()
	ShowDD();
	HideDDE();
	DealignDD()
	switch(CHOICE){
	case 1: 
		Show('VC',0); 
		Show('SC',0); 
		NewTitle(`Vertical-Wise Income`); 
		document.getElementById('VDD').value=-1;
		document.getElementById('SDD').value=-1;
		break;
	case 2: 
		document.getElementById('VDD').value==-1?document.getElementById('VDD').value=0:{}
		document.getElementById('SDD').value=-1;
		Show('SC',0); 
		NewTitle(`Seminar-Wise Income`); 
		break;
	case 3: 
		Show('MC',0); 
		NewTitle(`Month-Wise Income`);
		document.getElementById('MDD').value=0;
		break;
	case 4: 
		Show('LC',0); 
		NewTitle(`Location-Wise Income`);
		document.getElementById('LDD').value=0; 
		break;
	}
	SetVariables(); UpdateChart(); UPDATE();
}

//								VERTICAL
//								MONTH
//								LOCATION
function OnSwitch(){
	SetVariables()
	UpdateChart();
	ReloadDetail();
	UPDATE();
}

//								SEMINAR

function OnSSwitch(){
	document.getElementById('VDD').value=VerticalArray.indexOf(SVToV(document.getElementById('SDD').value))
	OnSwitch()
}


//								BACK

function OnBack(){
	Show('chartIncomeBack',0);
	const Choice=CHOICE
	switch(Choice){
	case 2:
		CHOICE=1;
		break;
	case 3:
		CHOICE=2;
		break;
	case 5:
		CHOICE=3+Memory;
		break;
	case -1:
		CHOICE=-5;
		break;
	case -3:
		CHOICE=-2+Memory;
		break;
	case -4:
		CHOICE=-3;
		break;
	case -6:
		CHOICE=-4;
		break;
	}
	CHOICE>0?OnMenuClick(CHOICE):OnMenuEClick(CHOICE)
	if([2,3,-3,-4].includes(CHOICE)){
		Show('chartIncomeBack',1)
	}
}



//								CHART




function LoadIncome(){
	IncomeChart=  new Chart(
		document.getElementById('IncomeChartHTML'),
		{
			type: 'bar',
			options: {
				animation: true,
				scales:{
					y: {
						max: 1.2*(max)
					}
				},
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
			plugins:[topLabelsPluginK,chartTotalPlugin],
			data: {
				labels:Object.keys(AVSIncome).map(r => r),
				datasets: [
					{
						data: Object.values(AVSIncome).map(row => row.value),
						backgroundColor:colourRainArray
					}
				]
			},

		},
	);

}