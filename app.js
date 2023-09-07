
// let com = [];
let balloon_data = [];
let totalKitKG,totalPaxKG = 0;
let altitudeTO,tempTO,altitudeMax = 0;
let qnh = 1013.25;
let tempMax = 100;
let balloonIndex = 0;
let balloonList = [];
jQuery.get('Balloon_Data.csv', function(data) {
    if (data.search("\r\n")>0) {
        com = data.split("\r\n");
    } else {
        com = data.split("\n");
    }
    for (i in com) {
        balloon = com[i].split(",");
        balloon_data.push(balloon);
    }
    balloon_data.shift();
    balloon_data.pop();
    for (i in balloon_data){
        document.querySelector("select#balloonType").innerHTML+="<option value=\""+i+"\">"+balloon_data[i][0]+"</option>";
    }
});

function saveData(balloonName) {
    let form1 = {};
    let form2 = {};
    weightData = document.querySelector("form#weight");
    locationData = document.querySelector("form#location");
    form1.balloonType = weightData.querySelector("select#balloonType").value
    form1.envelopeKG = weightData.querySelector("#envelopeKG").value;
    form1.basketKG = weightData.querySelector("#basketKG").value;
    form1.burnerKG = weightData.querySelector("#burnerKG").value;
    form1.tank1KG = weightData.querySelector("#tank1KG").value;
    form1.tank2KG = weightData.querySelector("#tank2KG").value;
    form1.tank3KG = weightData.querySelector("#tank3KG").value;
    form1.tank4KG = weightData.querySelector("#tank4KG").value;
    form1.tank5KG = weightData.querySelector("#tank5KG").value;
    form1.tank6KG = weightData.querySelector("#tank6KG").value;
    form1.tank7KG = weightData.querySelector("#tank7KG").value;
    form1.tank8KG = weightData.querySelector("#tank8KG").value;
    form1.pilotKG = weightData.querySelector("#pilotKG").value;
    form1.pax1KG = weightData.querySelector("#pax1KG").value;
    form1.pax2KG = weightData.querySelector("#pax2KG").value;
    form1.pax3KG = weightData.querySelector("#pax3KG").value;
    form1.pax4KG = weightData.querySelector("#pax4KG").value;
    form1.pax5KG = weightData.querySelector("#pax5KG").value;
    form1.pax6KG = weightData.querySelector("#pax6KG").value;
    form1.pax7KG = weightData.querySelector("#pax7KG").value;
    form1.pax8KG = weightData.querySelector("#pax8KG").value;
	let f1 = JSON.stringify(form1);

    form2.altitudeTO = locationData.querySelector("#altitudeTO").value;
    form2.altitudeTOUnit = locationData.querySelector("input[name=altitudeTO]:checked").id;
    form2.tempTO = locationData.querySelector("#tempTO").value;
    form2.qnh = locationData.querySelector("#qnh").value;
    form2.altitudeMax = locationData.querySelector("#altitudeMax").value;
    form2.altitudeMaxUnit = locationData.querySelector("input[name=altitudeMax]:checked").id;
    form2.tempMax = locationData.querySelector("#tempMax").value;
	let f2 = JSON.stringify(form2);

	window.localStorage.setItem(balloonName+'1', f1);
	window.localStorage.setItem(balloonName+'2', f2);
}

function getData(balloonName) {
	let f1 = window.localStorage.getItem(balloonName);
	// let f2 = window.localStorage.getItem(balloonName+'2');
	if(f1){
        return JSON.parse(f1);
    }
}

function deleteData(balloonName){ 
    window.localStorage.removeItem(balloonName+'1');
    window.localStorage.removeItem(balloonName+'2');
}

function getAllData(){
    for (let i = 0; i < window.localStorage.length; i++){
        balloonName = window.localStorage.key(i).slice(0,-1);
        if (balloonList.indexOf(balloonName) == -1 ) balloonList.push(balloonName);
    }
    return balloonList;
}

function lookupBalloonType(){
    formData = document.querySelector("form#weight");
    balloonIndex = Number(formData.querySelector("select#balloonType").value);
    document.querySelector("a#volumeM").textContent = "Balloon Volume in m^3: " + balloon_data[balloonIndex][3];
    calcTotalKG()
    calcLift()
}

function calcTotalKG(){
    formData = document.querySelector("form#weight");
    totalKitKG = Number(formData.querySelector("input#tank1KG").value) + 
                Number(formData.querySelector("input#tank2KG").value) + 
                Number(formData.querySelector("input#tank3KG").value) + 
                Number(formData.querySelector("input#tank4KG").value) + 
                Number(formData.querySelector("input#tank5KG").value) + 
                Number(formData.querySelector("input#tank6KG").value) + 
                Number(formData.querySelector("input#tank7KG").value) + 
                Number(formData.querySelector("input#tank8KG").value) + 
                Number(formData.querySelector("input#burnerKG").value) + 
                Number(formData.querySelector("input#basketKG").value) + 
                Number(formData.querySelector("input#envelopeKG").value)
    formData.querySelector("a#totalKitKG").textContent = "Total Equipment Weight KG: " + totalKitKG;

    totalPaxKG = Number(formData.querySelector("input#pilotKG").value) +
                    Number(formData.querySelector("input#pax1KG").value) +
                    Number(formData.querySelector("input#pax2KG").value) +
                    Number(formData.querySelector("input#pax3KG").value) +
                    Number(formData.querySelector("input#pax4KG").value) +
                    Number(formData.querySelector("input#pax5KG").value) +
                    Number(formData.querySelector("input#pax6KG").value) +
                    Number(formData.querySelector("input#pax7KG").value) +
                    Number(formData.querySelector("input#pax8KG").value)
    formData.querySelector("a#totalPaxKG").textContent = "Total Occupant Weight KG: " + totalPaxKG;
    formData.querySelector("a#totalUpKG").textContent = "Total All Up Weight KG: " + (totalKitKG + totalPaxKG);
    calcLift()
}

function calcLift(){
    formData = document.querySelector("form#location");
    altitudeTO = Number(formData.querySelector("input#altitudeTO").value)/Number(formData.querySelector("input[name=altitudeTO]:checked").value);
    tempTO = Number(formData.querySelector("input#tempTO").value);
    qnh = Number(formData.querySelector("input#qnh").value);
    altitudeMax = Number(formData.querySelector("input#altitudeMax").value)/Number(formData.querySelector("input[name=altitudeMax]:checked").value);
    tempMax = Number(formData.querySelector("input#tempMax").value);

    tempFlight = tempTO - (0.0065*(altitudeMax-altitudeTO));
    hPaFlight = qnh*Math.pow((1-((0.0065*altitudeMax/288.16))),5.256);
    totalLift = 0.3484*Number(balloon_data[balloonIndex][3])*hPaFlight*((1/(tempFlight+273.16))-(1/(tempMax+273.16)));
    excessLift = totalLift-(totalKitKG + totalPaxKG);
    formData.querySelector("a#totalLift").textContent = totalLift;
    formData.querySelector("a#excessLift").textContent = excessLift;
    if (excessLift<0){
        formData.querySelector("a#excessLift").style.color = "red";
    } else {
        formData.querySelector("a#excessLift").style.color = "black";
    }
}

function loadSaved(){
    savedName = document.querySelector("select#savedBalloons").options[document.querySelector("select#savedBalloons").selectedIndex].text;
    form1 = getData(savedName+'1');
    form2 = getData(savedName+'2');
    // console.log(form1);
    // console.log(form2);
    weightData = document.querySelector("form#weight");
    locationData = document.querySelector("form#location");
    weightData.querySelector("select#balloonType").value = form1.balloonType;
    weightData.querySelector("#envelopeKG").value = form1.envelopeKG;
    weightData.querySelector("#basketKG").value = form1.basketKG;
    weightData.querySelector("#burnerKG").value = form1.burnerKG;
    weightData.querySelector("#tank1KG").value = form1.tank1KG;
    weightData.querySelector("#tank2KG").value = form1.tank2KG;
    weightData.querySelector("#tank3KG").value = form1.tank3KG;
    weightData.querySelector("#tank4KG").value = form1.tank4KG;
    weightData.querySelector("#tank5KG").value = form1.tank5KG;
    weightData.querySelector("#tank6KG").value = form1.tank6KG;
    weightData.querySelector("#tank7KG").value = form1.tank7KG;
    weightData.querySelector("#tank8KG").value = form1.tank8KG;
    weightData.querySelector("#pilotKG").value = form1.pilotKG;
    weightData.querySelector("#pax1KG").value = form1.pax1KG;
    weightData.querySelector("#pax2KG").value = form1.pax2KG;
    weightData.querySelector("#pax3KG").value = form1.pax3KG;
    weightData.querySelector("#pax4KG").value = form1.pax4KG;
    weightData.querySelector("#pax5KG").value = form1.pax5KG;
    weightData.querySelector("#pax6KG").value = form1.pax6KG;
    weightData.querySelector("#pax7KG").value = form1.pax7KG;
    weightData.querySelector("#pax8KG").value = form1.pax8KG;

    locationData.querySelector("#altitudeTO").value = form2.altitudeTO;
    locationData.querySelector("#tempTO").value = form2.tempTO;
    locationData.querySelector("#qnh").value = form2.qnh;
    locationData.querySelector("#altitudeMax").value = form2.altitudeMax;
    locationData.querySelector("#tempMax").value = form2.tempMax;
    document.querySelector("input[name=altitudeTO]#"+form2.altitudeTOUnit).checked = true
    document.querySelector("input[name=altitudeMax]#"+form2.altitudeMaxUnit).checked = true
    lookupBalloonType()
    calcTotalKG()
    calcLift()

}

function findSavedData(){
    balloonList = getAllData();
    for (i in balloonList){
        document.querySelector("select#savedBalloons").innerHTML += "<option value=\""+i+"\">"+balloonList[i]+"</option>"
        document.querySelector("select#deleteBalloons").innerHTML += "<option value=\""+i+"\">"+balloonList[i]+"</option>"
    }
    if (balloonList.length == 0){
        document.querySelector("#savedBalloons").style.display = "none";
        document.querySelector("#deleteData").style.display = "none";
    }
}

function deleteBalloon(){
    balloonName = document.querySelector("#deleteBalloons").innerText;
    deleteData(balloonName);
}

function saveBalloon(){
    balloonName = document.querySelector("#newBalloonName").value;
    saveData(balloonName);
}

findSavedData()