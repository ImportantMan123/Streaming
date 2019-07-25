const earlProject = {
    artist_name : "Earl Sweatshirt",
    album_title : "Loosies",
    release_year : "2019",
    cover_art : "albumart/loosie.png",
    project_type : "Album",
    tracks: [
        {
            song_title : "Elimination Chamber",
            string_link : "tracks/01-Elimination_Chamber.mp3"
        }, {
            song_title : "The Daily News",
            string_link : "tracks/02-The-Daily-News.mp3"
        }, {
            song_title : "Gamebreaker",
            string_link : "tracks/03-Gamebreaker.mp3"
        }, {
            song_title : "Between Villains",
            string_link : "tracks/04-Between-Villains.mp3"
        }, {
            song_title : "45",
            string_link : "tracks/05-45.mp3"
        }, {
            song_title : "Balance",
            string_link : "tracks/06-Balance.mp3"
        }, {
            song_title : "Nebraska",
            string_link : "tracks/07-Nebraska.mp3"
        }, {
            song_title : "Quest/Power",
            string_link : "tracks/08-Quest-Power.mp3"
        }, {
            song_title : "Wind In My Sails",
            string_link : "tracks/09-Wind-In-My-Sails.mp3"
        }, {
            song_title : "Warlord Leather",
            string_link : "tracks/10-Warlord-Leather.mp3"
        }, {
            song_title : "Knucklehead",
            string_link : "tracks/11-Knucklehead.mp3"
        }, {
            song_title: "Bill",
            string_link: "tracks/12-Bill.mp3"
        }]
};

/* Just changing this so it has the most up to date bits on the master yoo */
const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackNoCont = projectTrackCont.children[1];
var projectTrackAhref = projectTrackNoCont.children[0];
var projectTrackTitle = projectTrackAhref.children[0];

/* Dynamically copy & create all the track information */

Object.keys(earlProject.tracks).forEach(function(trackIteration) {
    if (projectTrackTitle.innerHTML === ""){
        projectTrackTitle.innerHTML = earlProject.tracks[trackIteration].song_title;
        var projectTrackNoAhref = projectTrackCont.children[0];
        var projectTrackNoP = projectTrackNoAhref.children[0];
        var projectTrackNo = projectTrackNoP.children[0];
        projectTrackNo.children[0].innerHTML = parseInt(trackIteration) + 1;
    }
    else {
        var projectTrackClone = projectTrackCont.cloneNode(true);
        projectContBtm.appendChild(projectTrackClone);
        var projectTrackCloneNoAhref = projectTrackClone.children[0];
        var projectTrackCloneNoP = projectTrackCloneNoAhref.children[0];
        var projectTrackCloneNo = projectTrackCloneNoP.children[0];
        projectTrackCloneNo.children[0].innerHTML = parseInt(trackIteration) + 1;
        var projectTrackCloneTitle = projectTrackClone.children[1];
        projectTrackCloneTitle.children[0].innerHTML = earlProject.tracks[trackIteration].song_title;
    }

});


/* Information for playing music */
const player = document.getElementById('music_player');
var trackLinkArrayLength = Object.keys(earlProject.tracks).length;
var trackNumber = 0;
var currentSong = earlProject.tracks[trackNumber].string_link;
var currentCover = earlProject.cover_art;

const playTrackBtn = document.getElementById('play-track');
/* Change the play button to play symbol */
function play_btn_play() {
    playTrackBtn.setAttribute('src', 'images/play.png');
}
/* Change the play button to pause symbol */
function play_btn_pause() {
    playTrackBtn.setAttribute('src', 'images/pause.png');
}

/* play/pause button */
function play_pause_aud() {
    if (player.paused) {
        if (player.currentTime > 0) {
            player.play();
            play_btn_pause();
        }
        else {
            player.setAttribute('src', currentSong);
            updateTrack(trackNumber);
            player.play();
            play_btn_pause();
        }
    }
    else {
        player.pause();
        play_btn_play();
    }
}

/* automatically plays next track function */
player.addEventListener("ended", auto_play);
function auto_play() {
    if (trackNumber +1 === trackLinkArrayLength) {
        lastTrack();
    }
    else {
        resetProgressBar();
        trackNumber ++;
        updateTrack(trackNumber);
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
        trackNumber --;
        updateTrack(trackNumber);
    }
    else if (player.currentTime < 3) {
        trackNumber --;
        updateTrack(trackNumber);
        already_playing(currentSong);
    }
    else {
        already_playing(currentSong);
    }
    resetProgressBar();
}

function next_aud() {
    if (trackNumber +1 === trackLinkArrayLength) {
        resetTrack();
    }
    else if (player.paused) {
        trackNumber ++;
        updateTrack(trackNumber);
    }
    else {
        trackNumber ++;
        updateTrack(trackNumber);
        already_playing(currentSong);
    }
    resetProgressBar();
}

function already_playing(currentSong) {
    player.setAttribute('src', currentSong);
    player.play();
}

/* Looks out for when the last track of the array has played */
player.addEventListener(trackNumber +1 === trackLinkArrayLength, lastTrack);
function lastTrack() {
    resetTrack();
}

function resetTrack() {
    player.pause();
    play_btn_play();
    trackNumber = 0;
    updateTrack(trackNumber);
}

/* Changing volume */
function change_vol(value) {
    player.volume = value;
}

/* Displays amount of time played by track thus far */
const currentTimeDiv = document.getElementById('current-time');
var currentTimeDivText = currentTimeDiv.children[0];
const endTimeDiv = document.getElementById('end-time');
var endTimeDivText = endTimeDiv.children[0];

player.ontimeupdate = function() {
    updateTime();
    updateProgressBar();
};

function updateTime() {
    var s = Math.floor(player.currentTime);
    var m = 0;
    var h = 0;
    if (s >= 60) {
        m = Math.floor(s/60);
        s = s - (m * 60);
    }
    m = checkTime(m);
    s = checkTime(s);

    function checkTime(i) {
        if (i < 10) {i = "0" + i}; //adds zero in front of number < 10
        return i;
    }

    var endS = Math.floor(player.duration - player.currentTime);
    var endM = 0;
    var endH = 0;
    if (endS >= 60) {
        endM = Math.floor(endS/60);
        endS = endS - (endM * 60);
    }
    else if (endS === 0) {
        endM = 0;
        endS = 0;
    }

    endM = checkTime(endM);
    endS = checkTime(endS);

    currentTimeDivText.innerHTML = m + ":" + s;
    endTimeDivText.innerHTML = endM + ":" + endS;
}

/* Updates progress bar as track plays */
const progressBar = document.getElementById('progress-bar');
function updateProgressBar(){
    increment = 10/player.duration;
    var progressTime = Math.min(increment * player.currentTime * 10, 100);
    progressBar.style.width = progressTime+'%';
}

function resetProgressBar(){
    progressBar.style.width = 0;
}

/* Updates divs to display information of currentSong */
const projectCoverDiv = document.getElementById('project-art').children[0];
const projectTypeDiv = document.getElementById('project-title').children[0];
const projectTitleDiv = document.getElementById('project-title').children[1];
const projectByDiv = document.getElementById('project-artist').children[0];
const projectArtistDiv = document.getElementById('project-artist').children[1];
const projectNowPlaying = document.getElementById('project-track').children[0];
const projectTrackDiv = document.getElementById('project-track').children[1];

const playTitleDiv = document.getElementById('play-title').children[0];
const playArtistDiv = document.getElementById('play-artist').children[0];
const playCoverDiv = document.getElementById('play-img').children[0];

function updateTrack(trackNumber) {
    currentSong = earlProject.tracks[trackNumber].string_link;
    player.setAttribute('src', currentSong);
    projectCoverDiv.setAttribute('src', currentCover);
    projectTypeDiv.innerHTML = earlProject.project_type;
    projectTitleDiv.innerHTML = earlProject.album_title;
    projectByDiv.innerHTML = "By: ";
    projectArtistDiv.innerHTML = earlProject.artist_name;
    projectNowPlaying.innerHTML = "Song Playing:";
    projectTrackDiv.innerHTML = earlProject.tracks[trackNumber].song_title;

    playTitleDiv.innerHTML = earlProject.tracks[trackNumber].song_title;
    playArtistDiv.innerHTML = earlProject.artist_name;
    playCoverDiv.setAttribute('src', currentCover);
}

/* Plays track selected in the project-track-title-cont */
function playTrackNumber(ogNumber) {
    var strippedNumber = ogNumber.replace(/(<([^>]+)>)/ig, "");
    var trimmedNumber = strippedNumber.trim();
    trackNumber = trimmedNumber - 1;
    updateTrack(trackNumber);
    play_pause_aud();
}

function playSpecTrack(ogTrack) {
    var strippedTrack = ogTrack.replace(/(<([^>]+)>)/ig, "");
    var trimmedTrack = strippedTrack.trim();
    for(let i = 0; i < trackLinkArrayLength; i++) {
        findTrackNumber(i);
    }
    function findTrackNumber(cycleNumber) {
        let foundTrack = earlProject.tracks[cycleNumber].song_title;
        if (foundTrack === trimmedTrack){
            trackNumber = cycleNumber;
            updateTrack(trackNumber);
            play_pause_aud();
        }
    }
}