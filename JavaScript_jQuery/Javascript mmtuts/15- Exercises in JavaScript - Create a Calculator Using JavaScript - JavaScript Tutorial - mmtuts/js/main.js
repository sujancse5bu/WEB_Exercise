function calc(){
	var a = parseInt(document.querySelector("#value1").value);
	var b = parseInt(document.querySelector("#value2").value);
	var op = document.querySelector("#operator").value;
	var cal;
	
	if (op=="add") {
		cal=a+b;
	} else if (op=="min") {
		cal=a-b;
	} else if (op=="div"){
		cal=a/b;
	} else {
		cal=a*b;
	}
	console.log(cal);
}