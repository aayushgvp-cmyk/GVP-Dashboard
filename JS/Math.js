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
//Date converters
function ymdTom(ymdDate){
return (ymdDate-(10000*Math.floor(ymdDate/10000))-ymdDate+(100*Math.floor(ymdDate/100)))/100
}
function mToM(m){switch(m){
case 1:return "Jan";case 2:return "Feb";case 3:return "Mar";case 4:return "Apr";case 5:return "May";case 6:return "June";case 7:return "Jul";case 8:return "Aug";case 9:return "Sep";case 10:return "Oct";case 11:return "Nov";case 12:return "Dec";
}}
function ymdToM(v){return mToM(ymdTom(v))}