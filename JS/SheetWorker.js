let verticalsObjectIncome={}, verticalsObjectIncomeMonthwise={}, verticalsObjectExpense={}
let rawDataCumIncome
let rawDataCumExpense
async function handleFileAsync() {


const urlCumIncome="https://opensheet.elk.sh/1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw/Income"
  const responseCumIncome = await fetch(urlCumIncome);    
  if (!responseCumIncome.ok) throw new Error('Network response was not ok');
 const arrayOfObjectsCumIncome = await responseCumIncome.json();
 rawDataCumIncome = arrayOfObjectsCumIncome.map(obj => Object.keys(arrayOfObjectsCumIncome[0]).map(key => obj[key]));


rawDataCumIncome=rawDataCumIncome.filter(r=>(r[3]));
rawDataCumIncome.forEach(r=>{r[3]=r[3].replaceAll(",","")});
rawDataCumIncome.forEach(r=>r[3]=parseInt(r[3]));



//Data for chartIncome
DataToVerticals(rawDataCumIncome,verticalsObjectIncome)
DataToSeminars(rawDataCumIncome,verticalsObjectIncome)

//Data for chartIncomeMonthwise
DataToMonths(rawDataCumIncome,verticalsObjectIncomeMonthwise)

// Expenses
const urlCumExpense="https://opensheet.elk.sh/1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw/Expense"
  const responseCumExpense = await fetch(urlCumExpense);    
  if (!responseCumExpense.ok) throw new Error('Network response was not ok');
 const arrayOfObjectsCumExpense = await responseCumExpense.json();
 rawDataCumExpense = arrayOfObjectsCumExpense.map(obj => Object.keys(arrayOfObjectsCumExpense[0]).map(key => obj[key]));


rawDataCumExpense=rawDataCumExpense.filter(r=>(r[3]));
rawDataCumExpense.forEach(r=>{r[3]=r[3].replaceAll(",","")});
rawDataCumExpense.forEach(r=>r[3]=parseInt(r[3]));

DataToCategories(rawDataCumExpense,verticalsObjectExpense)
handleChartAsync()
}

handleFileAsync()



function setCToColour(chartName,colour){
chartName.data.datasets[0].backgroundColor=colour
chartName.update()
log(chartName.data.datasets[0].backgroundColor)
}
