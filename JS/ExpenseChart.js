//												Variable Declarations
let ExpenseChart

let VERTICALE,SEMINARE,SEMINARVERTICALE,MONTHE,LOCATIONE,FISCAL_YEARE,CATEGORY,SUBCATEGORY

//												Helper Functions
function SeekLocationE(L,R){if(L=="All"){return true}else if(R[COLE.Location]==L){return true}else{return false}}
function SeekVerticalE(V,R){if(V=="All"){return true}else if(R[COLE.Vertical]==V){return true}else{return false}}
function SeekSeminarE(S,R){if(S=="All"){return true}else if(R[COLE.Seminar]==S){return true}else{return false}}
function SeekMonthE(M,R){if(M=="All"){return true}else if(R[COLE.Month]==M){return true}else{return false}}
function SeekFYE(Y,R){if(Y=="All"){return true}else if(R[COLE.FY]==Y){return true}else{return false}}
function SeekCategory(C,R){if(C=="All"){return true}else if(R[COLE.Category]==C){return true}else{return false}}
function SeekSubcategory(SC,R){if(SC=="All"){return true}else if(R[COLE.SeekSubcategory]==SC){return true}else{return false}}


function ShowDDE(){Show('VEC',1);Show('MEC',1);Show('SEC',1);Show('LEC',1);Show('YEC',1);Show('CC',1);Show('SCC',1);}
function HideDDE(){Show('VEC',0);Show('MEC',0);Show('SEC',0);Show('LEC',0);Show('YEC',0);Show('CC',0);Show('SCC',0);}
function ResetDDE(){document.getElementById('VEDD').value=-1; document.getElementById('SEDD').value=-1; document.getElementById('MEDD').value=0; document.getElementById('LEDD').value=0; document.getElementById('YEDD').value=0; document.getElementById('CDD').value=0; document.getElementById('SCDD').value=0;}
function DealignDDE(){document.getElementById('CC').style.top="80px";document.getElementById('SCC').style.top="100px";document.getElementById('VEC').style.top="120px";document.getElementById('SEC').style.top="140px";document.getElementById('MEC').style.top="160px";document.getElementById('LEC').style.top="180px";document.getElementById('YEC').style.top="200px";}
DealignDDE()

function UpdateChartE(){
NEWDATA=rawDataExpense.filter(r=>RunFilters(r));let Type; switch(CHOICE){case -1: Type='Vertical'; break;case -2: Type='Seminar'; break;case -3: 'Category' ;case -4: Type='Subcategory'; break;}FilterAndReloadE(NEWDATA,Type);}

function SetVariablesE(){
VERTICALE=(Number(Or(document.getElementById('VEDD').value,0))===0?"All":VerticalArrayE[Or(document.getElementById('VEDD').value,0)-1]);
MONTHE=(Number(Or(document.getElementById('MEDD').value,0))===0?"All":mToM(ModFunction(3+Number(Or(document.getElementById('MEDD').value,1)),12)));
SEMINARE=(Number(Or(document.getElementById('SEDD').value,0))===0?"All":SVToS(SeminarArrayE[Or(document.getElementById('SEDD').value,0)-1]));
SEMINARVERTICALE=(Number(Or(document.getElementById('SEDD').value,0))===0?"All":SVToV(SeminarArrayE[Or(document.getElementById('SEDD').value,0)-1]));
LOCATIONE=(Number(Or(document.getElementById('LEDD').value,0))===0?"All":LocationArrayE[Number(document.getElementById('LEDD').value)-1]);
FISCAL_YEARE=(Number(Or(document.getElementById('YEDD').value,0))===0?"All":FYArrayE[Number(document.getElementById('YEDD').value)-1]);
CATEGORY=(Number(Or(document.getElementById('CDD').value,0))===0?"All":CategoryArray[Number(document.getElementById('CDD').value)-1]);
SUBCATEGORY=(Number(Or(document.getElementById('SCDD').value,0))===0?"All":SCArray[Number(document.getElementById('SCDD').value)-1]);
}
function FilterAndReloadE(newdata,Variable){let NEWDATAOBJECT={};newdata.forEach(r=>{if(!(r[COLE[Variable]] in NEWDATAOBJECT)){NEWDATAOBJECT[r[COLE[Variable]]]={value:0}};NEWDATAOBJECT[r[COLE[Variable]]].value+=r[COLE.Amount]})
ReplaceDataE(NEWDATAOBJECT);}

function RunFiltersE(r){
const OUTPUT=SeekLocationE(LOCATIONE,r)&&SeekVerticalE(VERTICALE,r)&&SeekSeminarE(SEMINARE,r)&&SeekMonthE(MONTHE,r)&&SeekFYE(FISCAL_YEARE,r)&&SeekCategory(CATEGORY,r)&&SeekSubcategory(SUBCATEGORY,r)
return OUTPUT
}

function ReplaceDataE(newData){ExpenseChart.data.datasets[0].data=Object.values(newData).map(row => row.value);ExpenseChart.data.labels=Object.keys(newData);max=0;Object.values(newData).forEach(r=>r.value>max?max=r.value:max+=0);ExpenseChart.options.scales.y.max=1.2*max;UPDATE();}
function NewTitleE(A){ExpenseChart.options.plugins.title.text=A}
function UpdateE(){ExpenseChart.resize();ExpenseChart.update()}



//												Menu
function OnMenuEClick(Choice){
	CHOICE=Choice
	Show('IncomeChartDiv',0)
	Show('ExpenseChartDiv',1)
}















//												Chart


function LoadExpense(){
	ExpenseChart=new Chart(
		document.getElementById('ExpenseChartHTML'),
		{
			type:'pie',
			options:{radius:"50%"},
			plugins:[pieLabelsPlugin,chartTotalPlugin],
			data:{
				labels: Object.keys(ObjectExpense),
				datasets:[{
						data:Object.values(ObjectExpense).map(r=>r.value),
						backgroundColor:colourRainArray
					}]
			}
		}
	)
}