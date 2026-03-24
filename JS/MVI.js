function SwitchMVIMonth(n){
let month=mToM(ModFunction(Number(n)+3,12))
chartIncomeMV.options.plugins.title.text=`Vertical-Based Income for ${month}`
replaceChartData(chartIncomeMV,0,MVIncome[month])
chartIncomeMV.update()
}


function LoadMVI(){
 chartIncomeMV=  new Chart(
    document.getElementById('chartIncomeMVIHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 1.2*(max)}},
        plugins: {
		title:{display:true,text:"Vertical-wise Income for "},
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
        labels:Object.keys(MVIncome.Apr).map(r => r),
        datasets: [
          {
            data: Object.values(MVIncome.Apr).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}