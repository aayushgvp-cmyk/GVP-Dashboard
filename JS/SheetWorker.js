let rawData






let verticalsObject={};

async function handleFileAsync(e) {
const url="docs.google.com/spreadsheets/d/1itzoaXD8WNcb3U7R5anh7jHasr5S9iZcCJ0wmJNeySw/export?format=xlsx"
  const response = await fetch(url);    
  if (!response.ok) throw new Error('Network response was not ok');

  const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  rawData = XLSX.utils.sheet_to_json(worksheet, {header:1});

rawData?log("Loaded"):log("Error")

const verticalCol=4
const seminarCol=5
const amountCol=3













//Start of first nesting

	rawData.forEach((row,rowNumber)=>
	
	{if(`${row[verticalCol]}` in verticalsObject){}
	else if(rowNumber){verticalsObject[row[verticalCol]]={value:0}}
	
	if(rowNumber){
	verticalsObject[row[verticalCol]]['value']+=row[amountCol]
	}
	})
console.log(verticalsObject)
//End of first nesting




//Start of second nesting
	rawData.forEach((row,rowNumber)=>
	
	{if(rowNumber){
	if(`${row[5]}` in verticalsObject[row[verticalCol]]){}
	else {verticalsObject[row[verticalCol]][row[seminarCol]]={value:0}}
	

	verticalsObject[row[verticalCol]][row[seminarCol]].value+=row[amountCol]


	}})
console.log(verticalsObject)
//End of second nesting



	

return new Promise((resolve)=>{setTimeout(()=>{console.log("Sheet function finished");resolve()},2000)})
}
excelInput.addEventListener("change", handleFileAsync, false);



	let dataFalse /*     Change name once done      */=[]














let nestLevel=0
function zoomIntoChart(){
nestLevel++

nestLevel===3?Show('chartDiv',0):log(nestLevel)
}

function setCToColour(chartName,colour){
chartName.data.datasets[0].backgroundColor=colour
chartName.update()
log(chartName.data.datasets[0].backgroundColor)
}
