const trackLinkArray = ["tracks/test_beat.mp3", "tracks/02-The-Daily-News.mp3", "tracks/03-Gamebreaker.mp3", "tracks/04-Between-Villains.mp3", "tracks/05-45.mp3", "tracks/06-Balance.mp3", "tracks/07-Nebraska.mp3", "tracks/08-Quest-Power.mp3", "tracks/09-Wind-In-My-Sails.mp3", "tracks/10-Warlord-Leather.mp3", "tracks/11-Knucklehead.mp3", "tracks/12-Bill.mp3"];

const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackTitle = projectTrackCont.children[1];

const player = document.getElementById('music_player');
var trackNumber = 0;

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

/* Play functionality */

function play_pause_aud() {
    if (player.paused){
        currentSong = trackLinkArray[trackNumber];
        player.setAttribute('src',currentSong);
        player.play();
    }
    else {
        player.pause();
    }
}

function already_playing() {
    currentSong = trackLinkArray[trackNumber];
    player.setAttribute('src',currentSong);
    player.play();
}

function auto_play() {
    trackNumber ++;
    currentSong = trackLinkArray[trackNumber];
    player.setAttribute('src',currentSong);
    player.play();
}

/* Skip & back functionality */
function prev_aud() {
    if (player.paused) {
        trackNumber --;
        return trackNumber;
    }
    else {
        already_playing(trackNumber--);
    }
}

function next_aud() {
    if (player.paused) {
        trackNumber ++;
        return trackNumber;
    }
    else {
        already_playing(trackNumber++);
    }
}
player.addEventListener("ended", auto_play);