// let com = [];
let balloon_data = [];
let totalKitKG,totalPaxKG = 0;
let altitudeTO,tempTO,altitudeMax = 0;
let qnh = 1013.25;
let tempMax = 100;
let balloonIndex = 0;
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
        document.querySelector("select#balloon_type").innerHTML+="<option value=\""+i+"\">"+balloon_data[i][0]+"</option>";
    }
});

function lookupBalloonType(){
    formData = document.querySelector("form#weight");
    balloonIndex = Number(formData.querySelector("select#balloon_type").value);
    document.querySelector("a#volumeM").textContent = "Balloon Volume in m^3: " + balloon_data[balloonIndex][3];
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
}