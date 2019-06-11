const trackLinkArray = ["tracks/01-Elimination_Chamber.mp3", "tracks/02-The-Daily-News.mp3", "tracks/03-Gamebreaker.mp3", "tracks/04-Between-Villains.mp3", "tracks/05-45.mp3", "tracks/06-Balance.mp3", "tracks/07-Nebraska.mp3", "tracks/08-Quest-Power.mp3", "tracks/09-Wind-In-My-Sails.mp3", "tracks/10-Warlord-Leather.mp3", "tracks/11-Knucklehead.mp3", "tracks/12-Bill.mp3"];

const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackTitle = projectTrackCont.children[1];

var currentSong = trackLinkArray[1];

/* Dynamically copy & create all the track information */
for(let i = 0; i < trackLinkArray.length; i++) {
    createProjectTrackCont(i);
}

function createProjectTrackCont(cycleNumber) {

    if (projectTrackTitle.innerHTML === ""){
        projectTrackTitle.innerHTML = trackLinkArray[cycleNumber];
        var projectTrackNo = projectTrackCont.children[0];
        projectTrackNo.innerHTML = cycleNumber + 1;
    }

    else {
        var projectTrackClone = projectTrackCont.cloneNode(true);
        projectContBtm.appendChild(projectTrackClone);
        var projectTrackCloneNo = projectTrackClone.children[0];
        projectTrackCloneNo.innerHTML = cycleNumber + 1;
        var projectTrackCloneTitle = projectTrackClone.children[1];
        projectTrackCloneTitle.innerHTML = trackLinkArray[cycleNumber];

    }

}

const player = document.getElementById('music_player');
player.setAttribute('src',currentSong);




function play_aud() {
    player.play();
}

function pause_aud() {
    player.pause();
}

function stop_aud() {
    player.pause();
    player.currentTime = 0;
}

function change_vol() {
    player.volume = document.getElementById("change_vol").value;
}

/*Play Functionality */
/*let j = 0;
var songNumber = j;
var currentSong = trackLinkArray[songNumber];

function clickPlay() {
    currentSong
}

function clickNext() {
    j++;
}

function clickPrev(){
    J--;
} */




