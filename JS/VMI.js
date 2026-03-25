function SwitchVMIVertical(n){
chartVerticalwiseMonthwiseIncome.options.plugins.title.text=`Monthly Income for ${VerticalArray[n]}`
replaceChartData(chartVerticalwiseMonthwiseIncome,0,VMSIncome[VerticalArray[n]],['value','monthIndex'])
chartVerticalwiseMonthwiseIncome.update()
}
function OpenVMSI(VERTICAL,MONTH){
console.log(VMSIncome[VERTICAL])
chartVerticalwiseMonthwiseIncome.options.plugins.title.text=`Seminar-Wise Income for ${VERTICAL} in ${MONTH}`;
replaceChartData(chartVerticalwiseMonthwiseIncome,0,VMSIncome[VERTICAL][MONTH],['value','monthIndex']);
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
                    const activePoints = chartVerticalwiseMonthwiseIncome.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = chartVerticalwiseMonthwiseIncome.data.labels[index];
                        const value = chartVerticalwiseMonthwiseIncome.data.datasets[0].data[index];
			SwitchSection(6)
			OpenVMSI(VerticalArray[document.getElementById('VMIVerticalDD').value],label)
                    }
                }

      },
	plugins:[topLabelsPlugin],
      data: {
        labels:Object.keys(VMSIncome.BVP).map(r => r),
        datasets: [
          {
            data: Object.values(VMSIncome.BVP).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );
}