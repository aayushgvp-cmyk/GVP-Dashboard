let max=0
function replaceChartData(chartName,datasetIndex,newData){
chartName.data.datasets[datasetIndex].data=Object.values(newData).map(row => row.value)
chartName.data.labels=Object.keys(newData).map(r => r)
max=0
Object.values(newData).forEach(r=>r.value>max?max=r.value:max+=0)
chartName.options.scales.y={max: 2**Math.ceil(Math.log2(max))}
chartName.update()
}

let nestLevel=0
function zoomIntoChart(vertical,chartName){
console.log(vertical)
nestLevel+=1
nestLevel===3?Show('chartIncomeDiv',0):{}
nestLevel===1?(dataIncome=verticalsObjectIncome[vertical]):{}
delete dataIncome.value
replaceChartData(chartName,0,dataIncome)
}

const topLabelsPlugin = {
    id: 'topLabels',
    afterDatasetsDraw(chart) {
        const { ctx, data } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#000'; // Change color as needed

        chart.getDatasetMeta(0).data.forEach((bar, index) => {
            const value = data.datasets[0].data[index];
            // bar.x and bar.y are the coordinates of the bar's top-center
            ctx.fillText(value, bar.x, bar.y - 5); 
        });
        ctx.restore();
    }
};

let dataIncome
async function handleChartAsync() {

console.log("chart start")

dataIncome=verticalsObjectIncome



Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)


let chartIncome=  new Chart(
    document.getElementById('chartIncomeHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 2**Math.ceil(Math.log2(max))}},
        plugins: {
		title:{display:true,text:"Monthly Income"},
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
	responsive: true,
                onClick: (e) => {
                    const activePoints = chartIncome.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = chartIncome.data.labels[index];
                        const value = chartIncome.data.datasets[0].data[index];
console.log(label)
			zoomIntoChart(label,chartIncome)
                       
                    }
                }

      },
	plugins:[topLabelsPlugin],
      data: {
        labels:Object.keys(dataIncome).map(r => r),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: Object.values(dataIncome).map(row => row.value),
		backgroundColor:'#FF0000'
          }
        ]
      },

    }
  );

											//Place correct data.Currently using income data
let chartExpense=  new Chart(
    document.getElementById('chartExpenseHTML'),
    {
      type: 'pie',
      options: {
        animation: true,
	//scales:{y: {max: 2**Math.ceil(Math.log2(max))}},
        plugins: {
		title:{display:true,text:"Monthly Income"},
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
	/*responsive: true,
                onClick: (e) => {
                    const activePoints =  chartExpense.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label =  chartExpense.data.labels[index];
                        const value =  chartExpense.data.datasets[0].data[index];
			setCToColour( chartExpense,"#0000FF")
			zoomIntoChart()
                       
                    }
                }*/

      },
	plugins:[topLabelsPlugin],
      data: {
        labels:Object.keys(dataIncome).map(r => r),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: Object.values(dataIncome).map(row => row.value),
          }
        ]
      },

    }
  );

console.log("chart end")
}
