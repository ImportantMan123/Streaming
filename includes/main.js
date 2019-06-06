var trackLinkArray = ["streaming/tracks/01-Elimination_Chamber.mp3", "streaming/tracks/02-The-Daily-News.mp3", "streaming/tracks/03-Gamebreaker.mp3", "streaming/tracks/04-Between-Villains.mp3", "streaming/tracks/05-45.mp3", "streaming/tracks/06-Balance.mp3", "streaming/tracks/07-Nebraska.mp3", "streaming/tracks/08-Quest-Power.mp3", "streaming/tracks/09-Wind-In-My-Sails.mp3", "streaming/tracks/10-Warlord-Leather.mp3", "streaming/tracks/11-Knucklehead.mp3", "streaming/tracks/12-Bill.mp3"];


var trackCont = document.getElementById("project-track-cont");

trackLinkArray.forEach (function(entry) {
    console.log(entry);
});


var itm = document.getElementsByID("project-cont-btm").lastChild;
var cln = itm.cloneNode(true);
document.getElementById("project-cont-btm").appendChild(cln);