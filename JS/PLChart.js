let PLChart

let VERTICALP,SEMINARP,SEMINARVERTICALP,MONTHP,LOCATIONP,FISCAL_YEARP

function StateVariablesP(){console.log(VERTICALP,SEMINARP,SEMINARVERTICALP,MONTHP,LOCATIONP,FISCAL_YEARP)}

function RunFiltersP(r){
const OUTPUT=SeekLocationP(LOCATIONP,r)&&SeekVerticalP(VERTICALP,r)&&SeekSeminarP(SEMINARP,r)&&SeekMonthP(MONTHP,r)&&SeekFYP(FISCAL_YEARP,r)
return OUTPUT
}

function RunFiltersP2(r){
const OUTPUT=SeekLocationP2(LOCATIONP,r)&&SeekVerticalP2(VERTICALP,r)&&SeekSeminarP2(SEMINARP,r)&&SeekMonthP2(MONTHP,r)&&SeekFYP2(FISCAL_YEARP,r)&&r[COLE.Type]==="Actual"
return OUTPUT
}

function UpdateChartP(){
		
	const NEWDATA=rawDataIncome.filter(r=>RunFiltersP(r))
	const NEWDATA2=rawDataExpense.filter(r=>RunFiltersP2(r))
	let Type;
	switch(CHOICE){
	case 11:
		Type='Vertical';
		break;
	case 12:
		Type='Seminar';
		break;
	case 13:
		Type=MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE];
		break;
	case 14:
		Type='Location';
		break;
	}
	Object1=FilterAndReloadP(NEWDATA,Type);
	Object2=FilterAndReloadP2(NEWDATA2,Type);
	// console.log(Object1,Object2)
	let NEWDATAOBJECT=structuredClone(Object1);
	Object.keys(Object2).forEach(k=>{
		if(!(k in NEWDATAOBJECT)){
			NEWDATAOBJECT[k]=0
		}
		NEWDATAOBJECT[k]-=Object2[k]
	});	
	ReplaceDataP(NEWDATAOBJECT)
}
function ReplaceDataP(newData){
	PLChart.data.datasets[0].data=Object.values(newData);
	PLChart.data.labels=Object.keys(newData);max=0;
	PLChart.options.scales.y.max=1.2*Math.max(...Object.values(newData));
	PLChart.options.scales.y.min=1.2*Math.min(...Object.values(newData),0);
	UPDATEP();
}
function NewTitleP(A){PLChart.options.plugins.title.text=A}
function UPDATEP(){PLChart.resize();PLChart.update()}

function ShowDDP(){Show('VPC',1);Show('MPC',1);Show('SPC',1);Show('LPC',1);Show('YPC',1);}
function HideDDP(){Show('VPC',0);Show('MPC',0);Show('SPC',0);Show('LPC',0);Show('YPC',0);}
function ResetDDP(){document.getElementById('VPDD').value=0;document.getElementById('VPDD2').value=0; document.getElementById('SPDD').value=0; document.getElementById('MPDD').value=0; document.getElementById('LPDD').value=0; document.getElementById('YPDD').value=0;}
function DealignDDP(){document.getElementById('VPC').style.top="120px";document.getElementById('SPC').style.top="140px";document.getElementById('MPC').style.top="160px";document.getElementById('LPC').style.top="180px";document.getElementById('YPC').style.top="200px";}
DealignDDP()
function RealignDDP(){document.getElementById('VPC').style.top="60px";document.getElementById('SPC').style.top="60px";document.getElementById('LPC').style.top="40px";}

function SeekLocationP(L,R){if(L=="All"){return true}else if(R[COLS.Location]==L){return true}else{return false}}
function SeekVerticalP(V,R){if(V=="All"){return true}else if(R[COLS.Vertical]==V){return true}else{return false}}
function SeekSeminarP(S,R){if(S=="All"){return true}else if(R[COLS.Seminar]==S){return true}else{return false}}
function SeekMonthP(M,R){if(M=="All"){return true}else if(R[COLS[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==M){return true}else{return false}}
function SeekFYP(Y,R){if(Y=="All"){return true}else if(R[COLS.FY]==Y){return true}else{return false}}


function SeekLocationP2(L,R){if(L=="All"){return true}else if(R[COLE.Location]==L){return true}else{return false}}
function SeekVerticalP2(V,R){if(V=="All"){return true}else if(R[COLE.Vertical]==V){return true}else{return false}}
function SeekSeminarP2(S,R){if(S=="All"){return true}else if(R[COLE.Seminar]==S){return true}else{return false}}
function SeekMonthP2(M,R){if(M=="All"){return true}else if(R[COLE[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==M){return true}else{return false}}
function SeekFYP2(Y,R){if(Y=="All"){return true}else if(R[COLE.FY]==Y){return true}else{return false}}

function SetVariablesP(){
	VERTICALP=(Number(Or(document.getElementById('VPDD').value,0))===0?"All":VerticalSet[Or(document.getElementById('VPDD').value,0)-1]);
	MONTHP=(Number(Or(document.getElementById('MPDD').value,0))===0?"All":mToM(ModFunction(3+Number(Or(document.getElementById('MPDD').value,1)),12)));
	SEMINARP=(Number(Or(document.getElementById('SPDD').value,0))===0?"All":SVToS(SeminarSet[Or(document.getElementById('SPDD').value,0)-1]));
	SEMINARVERTICALP=(Number(Or(document.getElementById('SPDD').value,0))===0?"All":SVToV(SeminarSet[Or(document.getElementById('SPDD').value,0)-1]));
	LOCATIONP=(Number(Or(document.getElementById('LPDD').value,0))===0?"All":LocationSet[Number(document.getElementById('LPDD').value)-1]);
	FISCAL_YEARP=(Number(Or(document.getElementById('YPDD').value,0))===0?"All":FYSet[Number(document.getElementById('YPDD').value)-1]);
}
function FilterAndReloadP(newdata,Variable){
	let NEWDATAOBJECT={};
	newdata.forEach(r=>{
		if(!(r[COLS[Variable]] in NEWDATAOBJECT)){
			NEWDATAOBJECT[r[COLS[Variable]]]=0
		};
		NEWDATAOBJECT[r[COLS[Variable]]]+=r[COLS.Amount]
	})
	return NEWDATAOBJECT
}

function FilterAndReloadP2(newdata,Variable){
	let NEWDATAOBJECT={};
	newdata.forEach(r=>{
		if(!(r[COLE[Variable]] in NEWDATAOBJECT)){
			NEWDATAOBJECT[r[COLE[Variable]]]=0
		};
		// console.log(r[COLE[Variable]],":",NEWDATAOBJECT[r[COLE[Variable]]],"+",r[COLE.Amount])
		NEWDATAOBJECT[r[COLE[Variable]]]+=r[COLE.Amount]
	})
	return NEWDATAOBJECT
}






//								ONCLICK

function OnChartClickP(INDEX,LABEL,VALUE){
	Show('chartIncomeBack',1);
	DealignDDP()
	SetVariablesP()
	ShowDDP();
	const Choice=CHOICE
	switch(Choice){
	case 11:
		CHOICE=12;
		document.getElementById('VPDD').value=VerticalSet.indexOf(LABEL)+1;
		document.getElementById('SPDD').value=0;
		break;
	case 12:
		CHOICE=13;
		document.getElementById('SPDD').value=OnlySeminarSet.indexOf(LABEL)+1;
		break;
	case 13:
		CHOICE=15;
		document.getElementById('MPDD').value=INDEX+1;
		Memory=0;
		break;
	case 14:
		CHOICE=15;
		document.getElementById('LPDD').value=LocationSet.indexOf(LABEL)+1;
		Memory=1;
		break;
	}
	console.log(Choice,"->",CHOICE)
	SetVariablesP()
	UpdateChartP();
	UPDATEP();
	switch(CHOICE){
	case 12:
		Show('SPC',0);
		break;
	case 13:
		Show('MPC',0);
		break;
	case 14:
		Show('LPC',0);
		break;
	case 15:
		Show('PLChartDiv',0)
		Show('DetailTable',1);
		ReloadDetailP();
		break;
	}
}












//								MENU






function OnMenuPClick(Choice){
	ResetDDP()
	document.getElementById('chartIncomeBack').style.top='80px'
	Show('chartIncomeBack',0)
	Show('DetailTable',0);
	Show('IncentiveTable',0);
	Show('ExpenseChartDiv',0)
	Show('IncomeChartDiv',0);
	Show('PLChartDiv',1) 
	CHOICE=10+Choice;
	SetVariablesP()
	ShowDDP();
	HideDDE();
	HideDD();
	DealignDDP()
	console.log(CHOICE)
	switch(CHOICE){
	case 11: 
		Show('VPC',0); 
		Show('SPC',0); 
		NewTitleP(`Vertical-Wise Profit/Loss`); 
		document.getElementById('VPDD').value=0;
		document.getElementById('SPDD').value=0;
		break;
	case 12: 

		document.getElementById('VPDD').value==0?document.getElementById('VPDD').value=1:{}
		document.getElementById('SPDD').value=0;
		Show('SPC',0); 
		NewTitleP(`Seminar-Wise Profit/Loss`); 
		break;
	case 13: 
		Show('MPC',0); 
		NewTitleP(`Month-Wise Profit/Loss`);
		document.getElementById('MPDD').value=0;
		break;
	case 14: 
		Show('LPC',0); 
		NewTitleP(`Location-Wise Profit/Loss`);
		document.getElementById('LPDD').value=0; 
		break;
	}
	SetVariablesP();
	UpdateChartP();
	UPDATEP();
}

//								VERTICAL
//								MONTH
//								LOCATION
function OnSwitchP(){
	SetVariablesP()
	// StateVariablesP()
	UpdateChartP();
	ReloadDetailP();
	UPDATEP();
}

//								SEMINAR

function OnSSwitchP(){
	document.getElementById('VPDD').value=VerticalSet.indexOf(SVToV(document.getElementById('SPDD').value))+1;
	OnSwitchP();
}



//								CHART




function LoadPL(){
	PLChart=  new Chart(
		document.getElementById('PLChartHTML'),
		{
			type: 'bar',
			options: {
				animation: true,
				scales:{
					y: {
						max: 1.2*(10)
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
					const activePoints = PLChart.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
					if (activePoints.length > 0) {
						const index = activePoints[0].index;
						const label = PLChart.data.labels[index];
						const value = PLChart.data.datasets[0].data[index];
						OnChartClickP(index,label,value)

					}
				}

			},
			plugins:[topLabelsPluginK,chartTotalPlugin],
			data: {
				labels:[1,2],
				datasets: [
					{
						data:[1,2],
						backgroundColor:colourRainArray
					}
				]
			},

		},
	);

}