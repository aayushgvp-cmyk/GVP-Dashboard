const dateCol=0, verticalCol=1, seminarCol=2, amountCol=3, categoryCol=4

function DataToVerticals(baseData,objectToEdit){baseData.forEach((row,rowNumber)=>{if(`${row[verticalCol]}` in objectToEdit){}else if(rowNumber+1){objectToEdit[row[verticalCol]]={value:0}};if(rowNumber+1){objectToEdit[row[verticalCol]]['value']+=row[amountCol];}})}

function DataToSeminars(baseData,objectToEdit){baseData.forEach((row,rowNumber)=>{if(`${row[seminarCol]}` in objectToEdit[row[verticalCol]]){}else {objectToEdit[row[verticalCol]][row[seminarCol]]={value:0};};objectToEdit[row[verticalCol]][row[seminarCol]].value+=row[amountCol]})}

function DataToMonths(baseData,objectToEdit){baseData.forEach(r=>{(`${ymdToM(r[dateCol])}` in objectToEdit)?{}:(objectToEdit[ymdToM(r[dateCol])]={value:0});objectToEdit[ymdToM(r[dateCol])]['value']+=r[amountCol];})}

function DataToCategories(baseData,objectToEdit){baseData.forEach((row,rowNumber)=>{if(`${row[categoryCol]}` in objectToEdit){}else if(rowNumber+1){objectToEdit[row[categoryCol]]={value:0}};if(rowNumber+1){objectToEdit[row[categoryCol]]['value']+=row[amountCol];}})}