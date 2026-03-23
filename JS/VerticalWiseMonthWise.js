function SwitchVMIVertical(n){
chartVerticalwiseMonthwiseIncome.options.plugins.title.text=`Monthly Income for ${VerticalArray[n]}`
replaceChartData(chartVerticalwiseMonthwiseIncome,0,MonthwiseForVerticalObject[VerticalArray[n]])
chartVerticalwiseMonthwiseIncome.update()
}

function LoadVMI(){
 chartVerticalwiseMonthwiseIncome=  new Chart(
    document.getElementById('chartVMIncomeHTML'),
    {
      type: 'bar',
      options: {
        animation: true,
	scales:{y: {max: 1.2*(max)}},
        plugins: {
		title:{display:true,text:"Monthly Income for BVP"},
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
        labels:Object.keys(MonthwiseForVerticalObject.BVP).map(r => r),
        datasets: [
          {
            data: Object.values(MonthwiseForVerticalObject.BVP).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}