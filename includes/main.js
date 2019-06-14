var earlProject = {
    "artist_name" : "Earl Sweatshirt",
    "project_name" : "Earl Sweatshirt - Not On Spotify",
    "project_tracks" : {
        track_1 : {
            track_title : "Elimination Chamber",
            track_src : "tracks/01-Elimination_Chamber.mp3"
        },
        track_2 : {
            track_title : "The Daily News",
            track_src : "tracks/02-The-Daily-News.mp3"
        },
        track_3 : {
            track_title : "Gamebreaker",
            track_src : "tracks/03-Gamebreaker.mp3"
        },
        track_4 : {
            track_title : "Between Villains",
            track_src : "tracks/04-Between-Villains.mp3"
        },
        track_5 : {
            track_title : "45",
            track_src : "tracks/05-45.mp3"
        },
        track_6 : {
            track_title : "45",
            track_src : "tracks/06-Balance.mp3"
        },
        track_7 : {
            track_title : "Nebraska",
            track_src : "tracks/07-Nebraska.mp3"
        },
        track_8 : {
            track_title : "Quest/Power",
            track_src : "tracks/07-Nebraska.mp3"
        },
        track_9 : {
            track_title : "Wind In My Sails",
            track_src : "tracks/09-Wind-In-My-Sails.mp3"
        },
        track_10 : {
            track_title : "Warlord-Leather",
            track_src : "tracks/10-Warlord-Leather.mp3"
        },
        track_11 : {
            track_title : "Knucklehead",
            track_src : "tracks/11-Knucklehead.mp3"
        },
        track_12 : {
            track_title : "Bill",
            track_src : "tracks/12-Bill.mp3
        }
    }
}




/*
const trackLinkArray = ["tracks/01-Elimination_Chamber.mp3", "tracks/02-The-Daily-News.mp3", "tracks/03-Gamebreaker.mp3", "tracks/04-Between-Villains.mp3", "tracks/05-45.mp3", "tracks/06-Balance.mp3", "tracks/07-Nebraska.mp3", "tracks/08-Quest-Power.mp3", "tracks/09-Wind-In-My-Sails.mp3", "tracks/10-Warlord-Leather.mp3", "tracks/11-Knucklehead.mp3", "tracks/12-Bill.mp3"];
 */

const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackTitle = projectTrackCont.children[1];


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
/* Information for playing music */
const player = document.getElementById('music_player');
var trackLinkArrayLength = trackLinkArray.length;
var trackNumber = 0;
var currentSong = trackLinkArray[trackNumber];

/* play/pause button */
function play_pause_aud() {
    if (player.paused){
        player.setAttribute('src', currentSong);
        player.play();
    }
    else if (trackNumber +1 === trackLinkArray.length) {
        lastTrack();
    }
    else {
        player.pause();
    }
}

/* automatically plays next track function */
player.addEventListener("ended", auto_play);
function auto_play() {
    if (trackNumber +1 === trackLinkArray.length) {
        lastTrack();
    }
    else {
        trackNumber ++;
        var currentSong = trackLinkArray[trackNumber];
        updateTrack(currentSong);
        player.setAttribute('src',currentSong);
        player.play();
    }
}

/* Skip & back functionality */
function prev_aud() {
    if (trackNumber  === 0) {
        resetTrack();
    }
    else if (player.paused) {
        var currentSong = trackLinkArray[trackNumber];
        trackNumber --;
        updateTrack(currentSong);
        return trackNumber;
    }
    else {
        already_playing(trackNumber--);
    }
}

function next_aud() {
    if (trackNumber +1 === trackLinkArrayLength) {
        resetTrack();
    }
    else if (player.paused) {
        var currentSong = trackLinkArray[trackNumber];
        trackNumber ++;
        updateTrack(currentSong);
        return trackNumber;
    }
    else {
        already_playing(trackNumber++);
    }
}

function already_playing() {
    var currentSong = trackLinkArray[trackNumber];
    player.setAttribute('src', currentSong);
    updateTrack(currentSong);
    player.play();
}

/* Looks out for when the last track of the array has played */
player.addEventListener(trackNumber +1 === trackLinkArrayLength, lastTrack);
function lastTrack() {
    resetTrack();
}

function resetTrack() {
    player.pause();
    trackNumber = 0;
    updateTrack(currentSong);
    return trackNumber;
}

/* Changing volume */
function change_vol(value) {
    player.volume = value;
}

/* Updates divs to display information of currentSong */
const projectTitleDiv = document.getElementById('project-title').children[0];
projectTitleDiv.innerHTML = currentSong;

const projectArtistDiv = document.getElementById('project-artist').children[0];
projectArtistDiv.innerHTML = currentSong;

const playTitleDiv = document.getElementById('play-title').children[0];
playTitleDiv.innerHTML = currentSong;

const playArtistDiv = document.getElementById('play-artist').children[0];
playArtistDiv.innerHTML = currentSong;

function updateTrack(currentSong) {
    projectTitleDiv.innerHTML = currentSong;
    playTitleDiv.innerHTML = currentSong;
    playArtistDiv.innerHTML = currentSong;
    projectArtistDiv.innerHTML = currentSong;
}


