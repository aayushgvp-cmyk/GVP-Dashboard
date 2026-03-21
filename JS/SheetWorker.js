let verticalsObjectIncome={};
async function handleFileAsync() {
const url="https://opensheet.elk.sh/1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw/Income"
  const response = await fetch(url);    
  if (!response.ok) throw new Error('Network response was not ok');
 const arrayOfObjects = await response.json();
const headers = Object.keys(arrayOfObjects[0]);
 let rawData = arrayOfObjects.map(obj => headers.map(key => obj[key]));
rawData=rawData.filter(r=>(r[3]));
rawData.forEach(r=>{if(1){r[3]=r[3].replaceAll(",","")}});
rawData.forEach(r=>r[3]=parseInt(r[3]));
const verticalCol=1;
const seminarCol=2;
const amountCol=3;
//Start of first nesting

	rawData.forEach((row,rowNumber)=>
	{if(`${row[verticalCol]}` in verticalsObjectIncome){}
	else if(rowNumber+1){verticalsObjectIncome[row[verticalCol]]={value:0}}
	if(rowNumber+1){
	verticalsObjectIncome[row[verticalCol]]['value']+=row[amountCol];
	}
	})
//End of first nesting
//Start of second nesting
	rawData.forEach((row,rowNumber)=>
	{
	if(`${row[seminarCol]}` in verticalsObjectIncome[row[verticalCol]]){}
	else {verticalsObjectIncome[row[verticalCol]][row[seminarCol]]={value:0};}



	verticalsObjectIncome[row[verticalCol]][row[seminarCol]].value+=row[amountCol]

	})
console.log(verticalsObjectIncome)
//End of second nesting	
handleChartAsync()

}

handleFileAsync()

let nestLevel=0
function zoomIntoChart(vertical,chartName){

nestLevel+=1
nestLevel===3?Show('chartIncomeDiv',0):{}
console.log(dataIncome)
nestLevel===1?dataIncome=verticalsObjectIncome[vertical]:{}

delete dataIncome.value
console.log(dataIncome)
chartName.update()
}

function setCToColour(chartName,colour){
chartName.data.datasets[0].backgroundColor=colour
chartName.update()
log(chartName.data.datasets[0].backgroundColor)
}
