let ITData=[]
let ITGrid;
const FixedIncentivePercentage=0.05,IncentivePercentage=0.25, GVPCutPercentage=0.34
let INCENTIVE_VERTICAL,INCENTIVE_MONTH,INCENTIVE_FISCAL_YEAR

function MakeIT(){
    ITGrid=new gridjs.Grid({
        columns:["Fixed - Faculty","Fixed - PL","Variable - Faculty","Variable - PL"],
        search: false,
        fixedHeader: false,
        // resizable:true,
        style:{
            table:
            {
                'border-collapse': 'collapse'
            },
            th: 
            {
                'background-color': '#ffffff',
                'color': '#000000',
                'border': '1px solid #ccc',
                'font-weight': 'normal'
            }
        },
        data:DTData
    }).render(document.getElementById('IncentiveTable'));
}

function ShowIncentiveDD(){Show('VPC2',1);Show('MPC',1);Show('YPC',1);}


function SetIncentiveVariables(){
    INCENTIVE_VERTICAL=(Number(Or(document.getElementById('VPDD2').value,0))===0?"All":VerticalArray[Or(document.getElementById('VPDD2').value,0)-1]);
    INCENTIVE_MONTH=(Number(Or(document.getElementById('MPDD').value,0))===0?"All":mToM(ModFunction(3+Number(Or(document.getElementById('MPDD').value,1)),12)));
    INCENTIVE_FISCAL_YEAR=(Number(Or(document.getElementById('YPDD').value,0))===0?"All":FYSet[Number(document.getElementById('YPDD').value)-1]);

}

function SeekIncentiveVertical(R){if(INCENTIVE_VERTICAL=="All"){return true}else if(R[COLS.Vertical]==INCENTIVE_VERTICAL){return true}else{return false}}
function SeekIncentiveMonth(R){if(INCENTIVE_MONTH=="All"){return true}else if(R[COLS[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==INCENTIVE_MONTH){return true}else{return false}}
function SeekIncentiveFY(R){if(INCENTIVE_FISCAL_YEAR=="All"){return true}else if(R[COLS.FY]==INCENTIVE_FISCAL_YEAR){return true}else{return false}}


function SeekIncentiveVertical2(R){if(INCENTIVE_VERTICAL=="All"){return true}else if(R[COLE.Vertical]==INCENTIVE_VERTICAL){return true}else{return false}}
function SeekIncentiveMonth2(R){if(INCENTIVE_MONTH=="All"){return true}else if(R[COLE[MONTH_TYPE_ARRAY[DATE_TYPE_CHOICE]]]==INCENTIVE_MONTH){return true}else{return false}}
function SeekIncentiveFY2(R){if(INCENTIVE_FISCAL_YEAR=="All"){return true}else if(R[COLE.FY]==INCENTIVE_FISCAL_YEAR){return true}else{return false}}


function RunIncentiveFilters1(R){return SeekIncentiveVertical(R)&&SeekIncentiveMonth(R)&&SeekIncentiveFY(R)}// Reg income
function RunIncentiveFilters2(R){return SeekIncentiveVertical2(R)&&SeekIncentiveMonth2(R)&&SeekIncentiveFY2(R)&&R[COLE.Type]=="Actual"}// Reg Exp
function RunIncentiveFilters3(R){return R[COLE.Vertical]=='GVP'&&SeekIncentiveMonth2(R)&&SeekIncentiveFY2(R)&&R[COLE.Type]=="Actual"}// GVP Actual
function RunIncentiveFilters4(R){return SeekIncentiveVertical2(R)&&R[COLE.Vertical]!=='GVP'&&SeekIncentiveMonth2(R)&&SeekIncentiveFY2(R)&&R[COLE.Type]=="Actual"}// Reg Exp


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

    let sumIncome=0,sumExpense=0,GVPActualExpense=0,MinIncome=0,PROJECTEXPENSE=0,PROJECTEXPENSE2=0

    rawDataIncome.forEach(r=>{
        if(RunIncentiveFilters1(r)){sumIncome+=r[COLS.Amount];MinIncome+=(r[COLS.Amount]*MinimumIncomeObject[r[COLS.Seminar]]);PROJECTEXPENSE2+=(r[COLS.Amount]*EstimatedExpenseObject[r[COLS.Seminar]])}
    })
    rawDataExpense.forEach(r=>{
        if(RunIncentiveFilters2(r)){sumExpense+=r[COLE.Amount]}
        if(RunIncentiveFilters3(r)){GVPActualExpense+=r[COLE.Amount]}
        if(RunIncentiveFilters4(r)){PROJECTEXPENSE+=r[COLE.Amount]}
    })
    let sumProfit=sumIncome-sumExpense
    if(sumProfit<0){sumProfit=0}
    let FinalIncome=sumIncome*FixedIncentivePercentage
    let GVPIncome=sumIncome*GVPCutPercentage
    sumProfit*=IncentivePercentage

    const Income=`₹${numberToIndianIncomeString(parseInt(sumIncome))}`
    const ProjectExpense=`₹${numberToIndianIncomeString(parseInt(PROJECTEXPENSE))}`
    const ProjectExpense2=`₹${numberToIndianIncomeString(parseInt(PROJECTEXPENSE2))}`
    const ProjectExpense3=`₹${numberToIndianIncomeString(parseInt(PROJECTEXPENSE2-PROJECTEXPENSE))}`
    const FFixed=`₹${numberToIndianIncomeString(parseInt(FinalIncome))}`
    const PLFixed=`₹${numberToIndianIncomeString(parseInt(FinalIncome))}`
    const GVPFixed=`₹${numberToIndianIncomeString(parseInt(GVPIncome))}`
    const GVPActual=`₹${numberToIndianIncomeString(parseInt(GVPActualExpense))}`
    const GVPDiff=`₹${numberToIndianIncomeString(parseInt(sumIncome*GVPCutPercentage-GVPActualExpense))}`
    const minIncome=`₹${numberToIndianIncomeString(parseInt(MinIncome))}`
    const BalanceValue=sumIncome-(PROJECTEXPENSE+2*FinalIncome+GVPIncome+MinIncome)
    const BALANCE=`₹${numberToIndianIncomeString(parseInt(BalanceValue))}`
    const FVar=`₹${numberToIndianIncomeString(parseInt(NegZero(BalanceValue*IncentivePercentage)))}`
    const PLVar=`₹${numberToIndianIncomeString(parseInt(NegZero(BalanceValue*IncentivePercentage)))}`
    const GVPProfit=`₹${numberToIndianIncomeString(parseInt(NegZero(BalanceValue*0.5)))}`
    const TOTALF=`₹${numberToIndianIncomeString(parseInt(FinalIncome+NegZero(BalanceValue*IncentivePercentage)))}`
    const TOTALPL=`₹${numberToIndianIncomeString(parseInt(FinalIncome+NegZero(BalanceValue*IncentivePercentage)))}`
    ITData=[["Net Income","Project Estimated Expense","Project Actual Expense","Project Reserved Expense","Fixed - Faculty","Fixed - PL","GVP (34%)","GVP Actual","GVP Difference","Minimum Profit %","Balance","Variable - Faculty","Variable - PL","GVP (50%)","Total Faculty","Total PL"],
        [Income,ProjectExpense2,ProjectExpense,ProjectExpense3,FFixed,PLFixed,GVPFixed,GVPActual,GVPDiff,minIncome,BALANCE,FVar,PLVar,GVPProfit,TOTALF,TOTALPL]]
    ITData=TransposeMatrix(ITData)
    ITGrid.updateConfig({columns:ITData[0],data:ITData.slice(1),language: {'noRecordsFound': 'No records found'}}).forceRender()
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