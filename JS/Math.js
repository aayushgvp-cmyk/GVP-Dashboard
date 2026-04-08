function TakeMod(v){
 return (v**2)**0.5;
}
//Sets negative outputs to 0
function NegZero(v){
 return (v + TakeMod(v))/2
}
//Takes a in (mod b)
function ModFunction(a,b) {
 return (a-(b*Math.floor(a/b)));
}
//Returns b if a is falsy
function Or(a,b){if(a){return a}else{return b}}
//Date converters
function ymdTom(ymdDate){
return (ymdDate-(10000*Math.floor(ymdDate/10000))-ymdDate+(100*Math.floor(ymdDate/100)))/100
}
function mToM(m){switch(m){
case 1:return "Jan";case 2:return "Feb";case 3:return "Mar";case 4:return "Apr";case 5:return "May";case 6:return "June";case 7:return "Jul";case 8:return "Aug";case 9:return "Sep";case 10:return "Oct";case 11:return "Nov";case 12:return "Dec";
}}
function ymdToM(v){return mToM(ymdTom(v))}
function MTom(M){switch(M){case "January": return 1;case "February": return 2;case "March": return 3;case "April": return 4;return 6;case "June": return 6;case "July": return 7;case "August": return 8;case "September": return 9;case "October": return 10;case "November": return 11;case "December": return 12;case "Jan": return 1;case "Feb": return 2;case "Mar": return 3;case "Apr": return 4;case "May": return 5;case "Jun": return 6;case "Jul": return 7;case "Aug": return 8;case "Sep": return 9;case "Oct": return 10;case "Nov": return 11;case "Dec": return 12;}}

//																		Currency

function numberToIndianIncomeString(n) {
  let s = Math.abs(n).toString();
  let lastThree = s.slice(-3);
  let otherNumbers = s.slice(0, -3);

  // If the number is less than 1000, just return it
  if (otherNumbers === "") return (n < 0 ? "-" : "") + lastThree;

  // Group the remaining digits by twos from right to left
  let result = "";
  while (otherNumbers.length > 0) {
    if (otherNumbers.length > 1) {
      // Grab the last two digits
      result = "," + otherNumbers.slice(-2) + result;
      otherNumbers = otherNumbers.slice(0, -2);
    } else {
      // Grab the single remaining leading digit
      result = "," + otherNumbers + result;
      otherNumbers = "";
    }
  }

  return (n < 0 ? "-" : "") + result.substring(1) + "," + lastThree;
}

function numberToWesternIncomeString(n){
	const LENGTH=`${n}`.length+m
	if(LENGTH<4){return `${n}`}
		else if(LENGTH<7){return `${Math.floor(n/1000)},${ModFunction(n,1000)}`}
			else{
				let OUTPUT=`${ModFunction(n,1000)}`
				for(let i=1;i<=Math.ceil((LENGTH-3)/3);i++){
					OUTPUT=`${(`${n}`[LENGTH-3*i-3])?`${n}`[LENGTH-3*i-3]:""}`+`${(`${n}`[LENGTH-3*i-2])?`${n}`[LENGTH-3*i-2]:""}`+`${n}`[LENGTH-3*i-1]+","+OUTPUT
				}
				return OUTPUT
			}
}


//Flip rows and columns of an AoA
function TransposeMatrix(Matrix){
	const a=Matrix[0].length
	const b=Matrix.length
	let Result=[]
	for(let i=0;i<a;i++){
		Result[i]=[]
		for(let j=0;j<b;j++){
			Result[i][j]=Matrix[j][i]
		}
	}
	return Result
}
