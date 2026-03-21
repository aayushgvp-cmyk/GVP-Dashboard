Show('chartIncomeBack',0)
let max=0
function replaceChartData(chartName,datasetIndex,newData){
chartName.data.datasets[datasetIndex].data=Object.values(newData).map(row => row.value)
chartName.data.labels=Object.keys(newData).map(r => r)
max=0
Object.values(newData).forEach(r=>r.value>max?max=r.value:max+=0)
chartName.options.scales.y={max: 1.2*max}
chartName.update()
}

let nestLevel=0
function ZoomIntoChart(vertical,chartName){
nestLevel=1
nestLevel===0?Show('chartIncomeBack',0):Show('chartIncomeBack',1)
nestLevel===1?(dataIncome=structuredClone(verticalsObjectIncome[vertical])):{}
delete dataIncome.value
replaceChartData(chartName,0,dataIncome)
}
function ZoomOutOfChartIncome(chartName){
nestLevel-=1;
nestLevel===0?(dataIncome=verticalsObjectIncome):{}
replaceChartData(chartName,0,dataIncome)
console.log(verticalsObjectIncome)
}

let chartIncome={}

const pieLabelsPlugin = {id: 'pieLabels',afterDatasetsDraw(chart){const {ctx,data}=chart;ctx.save();ctx.textAlign = 'center';ctx.textBaseline = 'middle';ctx.font = 'bold 12px sans-serif';ctx.fillStyle = '#fff';chart.getDatasetMeta(0).data.forEach((datapoint, index) => {const { x, y, startAngle, endAngle, outerRadius, innerRadius } = datapoint;
// 1. Find the angle in the middle of the slice
const midAngle = startAngle + (endAngle - startAngle) / 2;
// 2. Find the distance from the center (halfway between inner and outer edge)
const midRadius = innerRadius + (outerRadius - innerRadius) / 2;
// 3. Convert polar coordinates (angle/radius) to Cartesian (x/y) and fill the text
ctx.fillText(`${data.labels[index]} : ${data.datasets[0].data[index]}`, x + Math.cos(midAngle) * midRadius, y + Math.sin(midAngle) * midRadius);});ctx.restore();}};

const topLabelsPlugin = {id: 'topLabels',afterDatasetsDraw(chart) {const { ctx, data } = chart;ctx.save();ctx.textAlign = 'center';ctx.textBaseline = 'bottom';ctx.font = 'bold 12px sans-serif';ctx.fillStyle = '#000';chart.getDatasetMeta(0).data.forEach((bar, index) => {ctx.fillText(data.datasets[0].data[index], bar.x, bar.y - 5); });ctx.restore();}};

const topLabelsPluginK = {
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
            ctx.fillText(Math.floor(value/1000)+"K", bar.x, bar.y - 5); 
        });
        ctx.restore();
    }
};



let dataIncome
async function handleChartAsync() {

console.log("chart start")

dataIncome=verticalsObjectIncome



Object.values(dataIncome).forEach(r=>r.value>max?max=r.value:max+=0)


 chartIncome=  new Chart(
    document.getElementById('chartIncomeHTML'),
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
			ZoomIntoChart(label,chartIncome)
                       
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




let chartIncomeMonthwise=  new Chart(
    document.getElementById('chartIncomeMonthwiseHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 1.2*max}},
        plugins: {
		title:{display:true,text:"Month-wise Income"},
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
	responsive: true,
                onClick: (e) => {
                    const activePoints = chartIncomeMonthwise.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = chartIncomeMonthwise.data.labels[index];
                        const value = chartIncomeMonthwise.data.datasets[0].data[index];
			
                       
                    }
                }

      },
	plugins:[topLabelsPluginK],
      data: {
        labels:Object.keys(verticalsObjectIncomeMonthwise).map(r => r),
        datasets: [
          {
            label: 'Income per month',
            data: Object.values(verticalsObjectIncomeMonthwise).map(row => row.value),
		backgroundColor:'#FF0000'
          }
        ]
      },

    }
  );
console.log(verticalsObjectIncomeMonthwise)
replaceChartData(chartIncomeMonthwise,0,verticalsObjectIncomeMonthwise)

											//Place correct data.Currently using income data
let chartExpense=  new Chart(
    document.getElementById('chartExpenseHTML'),
    {
      type: 'pie',
      options: {
        animation: true,
	plugins: {
	  title:{display:true,text:"Vertical-wise Cumulative Expense"},
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
	plugins:[pieLabelsPlugin],
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
