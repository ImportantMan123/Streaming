const trackLinkArray = ["tracks/01-Elimination_Chamber.mp3", "tracks/02-The-Daily-News.mp3", "tracks/03-Gamebreaker.mp3", "tracks/04-Between-Villains.mp3", "tracks/05-45.mp3", "tracks/06-Balance.mp3", "tracks/07-Nebraska.mp3", "tracks/08-Quest-Power.mp3", "tracks/09-Wind-In-My-Sails.mp3", "tracks/10-Warlord-Leather.mp3", "tracks/11-Knucklehead.mp3", "tracks/12-Bill.mp3"];
/* Just changing this so it has the most up to date bits on the master yoo */
const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackDiv = projectTrackCont.children[1];
var projectTrackTitle = projectTrackDiv.children[0];

/* Dynamically copy & create all the track information */
for(let i = 0; i < trackLinkArray.length; i++) {
    createProjectTrackCont(i);
}
function createProjectTrackCont(cycleNumber) {
    if (projectTrackTitle.innerHTML === ""){
        projectTrackTitle.innerHTML = trackLinkArray[cycleNumber];
        var projectTrackNo = projectTrackCont.children[0];
        projectTrackNo.children[0].innerHTML = cycleNumber + 1;
    }
    else {
        var projectTrackClone = projectTrackCont.cloneNode(true);
        projectContBtm.appendChild(projectTrackClone);
        var projectTrackCloneNo = projectTrackClone.children[0];
        projectTrackCloneNo.children[0].innerHTML = cycleNumber + 1;
        var projectTrackCloneTitle = projectTrackClone.children[1];
        projectTrackCloneTitle.children[0].innerHTML = trackLinkArray[cycleNumber];
    }
}

/* Information for playing music */
const player = document.getElementById('music_player');
var trackLinkArrayLength = trackLinkArray.length;
var trackNumber = 0;
var currentSong = trackLinkArray[trackNumber];

const playTrackBtn = document.getElementById('play-track');
/* Change the play button to play symbol */
function play_btn_play() {
    playTrackBtn.setAttribute('src', 'images/play.gif');
}
/* Change the play button to pause symbol */
function play_btn_pause() {
    playTrackBtn.setAttribute('src', 'images/pause.gif');
}

/* play/pause button */
function play_pause_aud() {
    if (player.paused){
        if (player.currentTime > 0) {
            player.play();
            play_btn_pause();
        }
        else {
            player.setAttribute('src', currentSong);
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
    if (trackNumber +1 === trackLinkArray.length) {
        lastTrack();
    }
    else {
        resetProgressBar();
        trackNumber ++;
        var currentSong = trackLinkArray[trackNumber];
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
const projectTitleDiv = document.getElementById('project-title').children[0];
projectTitleDiv.innerHTML = currentSong;

const projectArtistDiv = document.getElementById('project-artist').children[0];
projectArtistDiv.innerHTML = currentSong;

const playTitleDiv = document.getElementById('play-title').children[0];
playTitleDiv.innerHTML = currentSong;

const playArtistDiv = document.getElementById('play-artist').children[0];
playArtistDiv.innerHTML = currentSong;

function updateTrack(trackNumber) {
    currentSong = trackLinkArray[trackNumber];
    player.setAttribute('src', currentSong);
    projectTitleDiv.innerHTML = currentSong;
    playTitleDiv.innerHTML = currentSong;
    playArtistDiv.innerHTML = currentSong;
    projectArtistDiv.innerHTML = currentSong;
}