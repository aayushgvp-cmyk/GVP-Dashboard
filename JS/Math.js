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