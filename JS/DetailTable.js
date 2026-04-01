let DTData=[]
let DTGrid;

function MakeDT(){
DTGrid=new gridjs.Grid({
columns:HEADERS,
search: true,
fixedHeader: true,
resizable:true,
height:"85vh",
pagination: {limit:20,buttonsCount:7,resetPageOnUpdate:true,summary: true},
plugins:[{
    id: 'limitInput',
    component: LimitInput,
    position: gridjs.PluginPosition.Footer,
    order: 1 
},{
      id: 'summary',
      component: SummaryPlugin,
      position: gridjs.PluginPosition.Footer // Places it below the grid
    }],
sort: true,
style:{td: {border: '2px solid #000'}},
data:DTData
}).render(document.getElementById('DetailTable'));
}

function ReloadDetail(){
SetVariables()

DTData=[]
let i=0
rawDataIncome.forEach(r=>{

if(RunFilters(r)){DTData[i]=r;i++}

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