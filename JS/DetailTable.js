let DTData=[]
let DTGrid;

function MakeDT(){
DTGrid=new gridjs.Grid({
columns:HEADERS,
search: true,
fixedHeader: true,
pagination: {limit:20,buttonsCount:7,resetPageOnUpdate:true,summary: true},
plugins:[{
    id: 'limitInput',
    component: LimitInput,
    position: gridjs.PluginPosition.Footer,
    order: 1 
}],
sort: true,
style:{td: {border: '2px solid #000'}},
data:DTData
}).render(document.getElementById('DetailTable'));
}

function ReloadDetail(){
const VERTICAL=VerticalArray[Or(document.getElementById('VDD').value,0)];
const MONTH=mToM(ModFunction(3+Number(Or(document.getElementById('MDD').value,1)),12));
const SEMINAR=SVToS(SeminarArray[Or(document.getElementById('SDD').value,0)]);
const SEMINARVERTICAL=SVToV(SeminarArray[Or(document.getElementById('SDD').value,0)]);
DTData=[]
let i=0
rawDataIncome.forEach(r=>{

if((r[COLS.Vertical]==VERTICAL)&&(ymdToM(r[COLS.Date])==MONTH)&&(r[COLS.Seminar]==SEMINAR)){DTData[i]=r;i++;console.log(r)}

})

DTGrid.updateConfig({data:DTData,language: {'noRecordsFound': 'No records found'}}).forceRender()


}






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