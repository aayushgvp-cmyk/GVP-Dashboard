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


async function handleChartAsync() {
await new Promise(r=>setTimeout(r,5000))
console.log("chart start")
/*
  const data = [
    { year: "HI", count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
*/
//await handleFileAsync(document.getElementById('excelInput').value)
const data=verticalsObject


let max=0
Object.values(data).forEach(r=>r.value>max?max=r.value:max+=0)


let shownChart=  new Chart(
    document.getElementById('chartHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 2**Math.ceil(Math.log2(max))}},
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
	responsive: true,
                onClick: (e) => {
                    const activePoints = shownChart.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = shownChart.data.labels[index];
                        const value = shownChart.data.datasets[0].data[index];
			setCToColour(shownChart,"#0000FF")
			zoomIntoChart()
                       
                    }
                }

      },
	plugins:[topLabelsPlugin],
      data: {
        labels:Object.keys(data).map(r => r),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: Object.values(data).map(row => row.value),
		backgroundColor:'#FF0000'
          }
        ]
      },

    }
  );

console.log("chart end")
}
