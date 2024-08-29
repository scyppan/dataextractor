function processPlayer(){
    console.log("Processing player", player); 
    getnatfromextract();
    getplayernamesfromextract();
    transferval
}

function getnatfromextract(){
    let nations=nations();
    if(nations.find(x=>x.nation==player.nationality)){
        player.nat;

    }
}

function getplayernamesfromextract(){

    let parts = player.playerName.split(' ')
    switch(parts.length){
        case 0: 
            player.given = '';
            player.sur = '';
            player.jersey = '';
            player.nick = '';
        break;
        case 1: 
            player.given = '';
            player.sur = parts[0];
            player.jersey = parts[0];
            player.nick = parts[0];
        break;
        case 2:
            player.given = parts[0];
            player.sur = parts[1];
            player.jersey = parts[1];
            player.nick = '';
        break;
        default:
            player.given='';
            for (let i=0;i<parts.length; i++){
                if(i<parts.length-1){
                    player.given+=' ' + parts[i];
                }else{
                    player.sur=parts[i];
                    player.jersey=parts[i];
                }
            }
        break;
    }
}

// {
//     "playerName": "Erling Haaland",
//     "Born": "21.07.2000",
//     "Place of birth": "Leeds, \nEngland",
//     "Nationality": "Norway",
//     "Height": "194 cm",
//     "Weight": "88 kg",
//     "Position(s)": "Centre Forward",
//     "Foot": "left"
// }