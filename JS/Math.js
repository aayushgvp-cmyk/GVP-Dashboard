function TakeMod(v){
 return (v**2)**0.5;
}
//Sets negative outputs to 0
function NegZero(v){
 return (v + TakeMod(v))/2
}
//Takes a in (mod b)
function ModFunction(a,b) {
 let i=a-(b*Math.floor(a/b));
 return i;
}
