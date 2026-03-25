function LoadAMI(){
chartIncomeMonthwise=  new Chart(
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
                        const label = chartIncomeMonthwise.data.labels[index];console.log(label)
                        const value = chartIncomeMonthwise.data.datasets[0].data[index];
			SwitchSection(4);chartIncomeMV.options.plugins.title.text=`Vertical-Based Income for ${label}`;replaceChartData(chartIncomeMV,0,AMIncome[label],['value']);Show('chartIncomeMVIDiv',1);chartIncomeMV.update();document.getElementById("MVVerticalDD").value=index+1;
                    }
                }

      },
	plugins:[topLabelsPluginK],
      data: {
        labels:Object.keys(AMIncome).map(r => r),
        datasets: [
          {
            label: 'Income per month',
            data: Object.values(AMIncome).map(row => row.value),
		backgroundColor:'#FF0000',
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );
replaceChartData(chartIncomeMonthwise,0,AMIncome,['value','monthIndex'])
}