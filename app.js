// let com = [];
let balloon_data = [];
jQuery.get('Balloon_Data.csv', function(data) {
    if (data.search("\r\n")) {
        com = data.split("\r\n");
    } else {
        com = data.split("\n");
    }
    // console.log(com);
    for (i in com) {
        balloon = com[i].split(",");
        balloon_data.push(balloon);
    }
    balloon_data.shift();
    balloon_data.pop();
    // console.log(balloon_data);
    // document.getElementById("test").textContent=balloon_data;
    for (i in balloon_data){
        document.querySelector("select#ballon_type").innerHTML+="<option value=\""+balloon_data[i][0]+"\">"+balloon_data[i][0]+"</option>";
    }
});