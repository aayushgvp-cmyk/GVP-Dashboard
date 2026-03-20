let rawData
let verticalsObject={};

async function handleFileAsync(e) {
  const workbook = XLSX.read(await e.target.files[0].arrayBuffer());
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  rawData = XLSX.utils.sheet_to_json(worksheet, {header:1});

rawData?log("Loaded"):log("Error")


//Start of first nesting

	rawData.forEach((row,column)=>
	
	{if(`${row[4]}` in verticalsObject){}
	else if(column){verticalsObject[row[4]]={value:0}}
	
	if(column){
	verticalsObject[row[4]]['value']+=row[3]
	}
	})
console.log(verticalsObject)
//End of first nesting


await new Promise(r=>setTimeout(r,1000))

//Start of second nesting
	rawData.forEach((row,column)=>
	
	{if(column){
	if(`${row[5]}` in verticalsObject[row[4]]){}
	else if(column){verticalsObject[row[4]][row[5]]={value:0}}
	

	verticalsObject[row[4]][row[5]].value+=row[3]


	}})
console.log(verticalsObject)
//End of second nesting



	


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