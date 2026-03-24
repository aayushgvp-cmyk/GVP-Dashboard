function SwitchAVSIVertical(n){
chartIncome.options.plugins.title.text=`Seminar-Based Income for ${VerticalArray[n]}`
ZoomIntoChart(`${VerticalArray[n]}`,chartIncome)
chartIncome.update()
}


function LoadAVI(){
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
            enabled: true
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
            data: Object.values(dataIncome).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}