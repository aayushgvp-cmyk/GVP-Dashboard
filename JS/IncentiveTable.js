let ITData=[]
let ITGrid;
const FixedIncentivePercentage=0.05,IncentivePercentage=0.25
let INCENTIVE_VERTICAL,INCENTIVE_MONTH,INCENTIVE_FISCAL_YEAR

function MakeIT(){
ITGrid=new gridjs.Grid({
columns:["Fixed - Faculty","Fixed - PL","Faculty","PL"],
search: false,
fixedHeader: false,
resizable:true,
// height:"85vh",
// pagination: {limit:20,buttonsCount:7,resetPageOnUpdate:true,summary: true},
/*plugins:[{
    id: 'limitInput',
    component: LimitInput,
    position: gridjs.PluginPosition.Footer,
    order: 1 
},{
      id: 'summary',
      component: SummaryPlugin,
      position: gridjs.PluginPosition.Footer // Places it below the grid
    }],*/
sort: true,
style:{td: {border: '2px solid #000'}},
data:DTData
}).render(document.getElementById('IncentiveTable'));
}

function ShowIncentiveDD(){Show('VPC',1);Show('MPC',1);Show('YPC',1);}


function SetIncentiveVariables(){
    INCENTIVE_VERTICAL=(Number(Or(document.getElementById('VPDD').value,0))===0?"All":VerticalSet[Or(document.getElementById('VPDD').value,0)-1]);
    INCENTIVE_MONTH=(Number(Or(document.getElementById('MPDD').value,0))===0?"All":mToM(ModFunction(3+Number(Or(document.getElementById('MPDD').value,1)),12)));
    INCENTIVE_FISCAL_YEAR=(Number(Or(document.getElementById('YPDD').value,0))===0?"All":FYSet[Number(document.getElementById('YPDD').value)-1]);

}

function SeekIncentiveVertical(R){if(INCENTIVE_VERTICAL=="All"){return true}else if(R[COLS.Vertical]==INCENTIVE_VERTICAL){return true}else{return false}}
function SeekIncentiveMonth(R){if(INCENTIVE_MONTH=="All"){return true}else if(R[COLS[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==INCENTIVE_MONTH){return true}else{return false}}
function SeekIncentiveFY(R){if(INCENTIVE_FISCAL_YEAR=="All"){return true}else if(R[COLS.FY]==INCENTIVE_FISCAL_YEAR){return true}else{return false}}


function SeekIncentiveVertical2(R){if(INCENTIVE_VERTICAL=="All"){return true}else if(R[COLE.Vertical]==INCENTIVE_VERTICAL){return true}else{return false}}
function SeekIncentiveMonth2(R){if(INCENTIVE_MONTH=="All"){return true}else if(R[COLE[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==INCENTIVE_MONTH){return true}else{return false}}
function SeekIncentiveFY2(R){if(INCENTIVE_FISCAL_YEAR=="All"){return true}else if(R[COLE.FY]==INCENTIVE_FISCAL_YEAR){return true}else{return false}}


function RunIncentiveFilters1(R){return SeekIncentiveVertical(R)&&SeekIncentiveMonth(R)&&SeekIncentiveFY(R)}
function RunIncentiveFilters2(R){return SeekIncentiveVertical2(R)&&SeekIncentiveMonth2(R)&&SeekIncentiveFY2(R)&&R[COLE.Type]=="Actual"}

function OnIncentiveChange(){
        ReloadIncentive()
}

function OpenIncentive(){
    Show('chartIncomeBack',0)
    Show('DetailTable',0);
    Show('IncentiveTable',1);
    Show('ExpenseChartDiv',0)
    Show('IncomeChartDiv',0);
    Show('PLChartDiv',0)
    HideDDP();
    HideDDE();
    HideDD();
    HideDownload()
    ShowIncentiveDD()
    ResetDDP();

    ReloadIncentive()
}

function ReloadIncentive(){
    SetIncentiveVariables()
    let sumIncome=0,sumExpense=0
    rawDataIncome.forEach(r=>{
        if(RunIncentiveFilters1(r)){sumIncome+=r[COLS.Amount]}
    })
    rawDataExpense.forEach(r=>{
        if(RunIncentiveFilters2(r)){sumExpense+=r[COLE.Amount]}
    })
    let sumProfit=sumIncome-sumExpense
    if(sumProfit<0){sumProfit=0}
    sumIncome*=FixedIncentivePercentage
    sumProfit*=IncentivePercentage
    sumIncome=numberToIndianIncomeString(parseInt(sumIncome))
    sumProfit=numberToIndianIncomeString(parseInt(sumProfit))
    ITData=[[`₹${sumIncome}`,`₹${sumIncome}`,`₹${sumProfit}`,`₹${sumProfit}`]]
    ITGrid.updateConfig({data:ITData,language: {'noRecordsFound': 'No records found'}}).forceRender()
}

/*
function ReloadDetailE(){
    SetVariablesE()
    DTData=[]
    let i=0
    rawDataExpense.forEach(r=>{
        if(RunFiltersE(r)){DTData[i]=r;i++}
    })
    DTGrid.updateConfig({data:DTData,language: {'noRecordsFound': 'No records found'}}).forceRender()
}

function ReloadDetailP(){
    SetVariablesP()
    let DTDataI=[]
    let i=0
    rawDataIncome.forEach(r=>{
        if(RunFiltersP(r)){DTDataI[i]=r;i++}
    })
    let DTDataE=[]
    let i2=0
    rawDataExpense.forEach(r=>{
        if(RunFiltersP2(r)){DTDataE[i2]=r;DTDataE[i2][COLE.Amount]*=-1;i2++}
    })
    DTData=[...DTDataI,...DTDataE]
    DTGrid.updateConfig({data:DTData,language: {'noRecordsFound': 'No records found'}}).forceRender()
}
*/


/*
function LimitInput() {
    const config = gridjs.useConfig();
    
    // Local state keeps the number in the box while typing
    const [val, setVal] = gridjs.useState(config.pagination.limit);

    const onInput = (e) => setVal(e.target.value);

    const onChange = (e) => {
        const newLimit = parseInt(e.target.value);
        if (newLimit > 0 && newLimit !== config.pagination.limit) {
            // Use your specific variable name: DTGrid
            DTGrid.updateConfig({
                pagination: {
                    ...config.pagination,
                    limit: newLimit
                }
            }).forceRender();
        }
    };

    return gridjs.h('div', { 
        style: { display: 'inline-block', marginLeft: '20px' } 
    }, [
        gridjs.h('span', null, 'Rows: '),
        gridjs.h('input', {
            type: 'number',
            value: val,
            onInput: onInput,   // Updates the text box as you type
            onChange: onChange, // Re-renders the DTGrid only when finished
            style: { width: '50px', marginLeft: '5px', padding: '2px' }
        })
    ]);
}
*/





/*
function SummaryPlugin() {
    const config = gridjs.useConfig();
    const data = gridjs.useSelector(state => state.data);

    // FIX: If data hasn't loaded yet, return an empty placeholder
    if (!data || !data.rows) {
        return gridjs.h('div', { style: { padding: '12px' } }, 'Loading total...');
    }

    const columnIndex = 1; 
    const total = data.rows.reduce((prev, row) => {
        // row.cells[index].data contains the raw value
        const val = parseFloat(row.cells[COLS.Amount].data) || 0;
        return prev + val;
    }, 0);

    return gridjs.h('div', {
        style: {
            fontWeight: 'bold',
            padding: '12px',
            textAlign: 'right',
            backgroundColor: '#f9fafb',
            borderTop: '1px solid #e5e7eb'
        }
    }, `Total: ${total.toLocaleString()}`);
}
*/