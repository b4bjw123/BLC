// let com = [];
let balloon_data = [];
jQuery.get('Balloon_Data.csv', function(data) {
    console.log(data);
    com = data.split("\r\n");
    console.log(com);
    for (i in com) {
        console.log(com[i]);
        balloon = com[i].split(",");
        balloon_data.push(balloon);
    }
    // balloon_data.shift();
    // balloon_data.pop();
    console.log(balloon_data);
    document.getElementById("test").textContent=balloon_data;
});