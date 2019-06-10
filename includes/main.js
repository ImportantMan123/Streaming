const trackLinkArray = ["streaming/tracks/01-Elimination_Chamber.mp3", "streaming/tracks/02-The-Daily-News.mp3", "streaming/tracks/03-Gamebreaker.mp3", "streaming/tracks/04-Between-Villains.mp3", "streaming/tracks/05-45.mp3", "streaming/tracks/06-Balance.mp3", "streaming/tracks/07-Nebraska.mp3", "streaming/tracks/08-Quest-Power.mp3", "streaming/tracks/09-Wind-In-My-Sails.mp3", "streaming/tracks/10-Warlord-Leather.mp3", "streaming/tracks/11-Knucklehead.mp3", "streaming/tracks/12-Bill.mp3"];

const projectContBtm = document.getElementById('project-cont-btm');
var projectTrackCont = projectContBtm.lastElementChild;
var projectTrackTitle = projectTrackCont.children[1];

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



