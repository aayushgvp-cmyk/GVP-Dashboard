let rawData






let verticalsObject={};

async function handleFileAsync(e) {




const url="https://opensheet.elk.sh/1LkcqbW144O2qQ6OZ11qLpcW1RsLH2G1Q7h2AipZXHFc/Expense"
  const response = await fetch(url);    
  if (!response.ok) throw new Error('Network response was not ok');

 // const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' });

 const arrayOfObjects = await response.json();

const headers = Object.keys(arrayOfObjects[0]);

 const rawData = arrayOfObjects.map(obj =>
            headers.map(key => obj[key]))

rawData.forEach(r=>r[3]=parseInt(r[3]))


//const workbook = XLSX.read(await e.target.files[0].arrayBuffer());
  //const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //rawData = XLSX.utils.sheet_to_json(worksheet, {header:1});
// rawData has to be an array of arrays
rawData?log("Loaded"):log("Error")
console.log(rawData)
const verticalCol=1
const seminarCol=2
const amountCol=3













//Start of first nesting

	rawData.forEach((row,rowNumber)=>
	
	{if(`${row[verticalCol]}` in verticalsObject){}
	else if(rowNumber+1){verticalsObject[row[verticalCol]]={value:0}}
	
	if(rowNumber+1){
	verticalsObject[row[verticalCol]]['value']+=row[amountCol]
	}
	})
console.log(verticalsObject)
//End of first nesting




//Start of second nesting
	rawData.forEach((row,rowNumber)=>
	
	{if(rowNumber+1){
	if(`${row[5]}` in verticalsObject[row[verticalCol]]){}
	else {verticalsObject[row[verticalCol]][row[seminarCol]]={value:0}}
	

	verticalsObject[row[verticalCol]][row[seminarCol]].value+=row[amountCol]


	}})
console.log(verticalsObject)
//End of second nesting



	
handleChartAsync()
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
