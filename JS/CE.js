function LoadCE(){
chartExpense=  new Chart(
    document.getElementById('chartExpenseHTML'),
    {
      type: 'pie',
      options: {
	radius: '60%',
        animation: true,
	plugins: {
	  title:{display:true,text:"Category-wise Cumulative Expense"},
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
        labels:Object.keys(dataExpense).map(r => r),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: Object.values(dataExpense).map(row => row.value),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );
}