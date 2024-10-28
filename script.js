// Playlist and song data
const songs = [
    { title: "All i want is you", artist: "Tomas Skyldeberg", duration: "03:16", src: "songs/all_i_want_is_you.mp3" },
    { title: "Beloved", artist: "Dj Vianu", duration: "04:12", src: "songs/dj_vianu_beloved.mp3" },
    { title: "The moment i found you", artist: "A-mase", duration: "03:17", src: "songs/the_moment_i_found_you_a-mase.mp3" },
    { title: "Amost too easy", artist: "Tomas Skyldeberg", duration: "03:05", src: "songs/tomas_skyldeberg_almost_too_easy.mp3" },
    { title: "California life", artist: "Tomas Skyldeberg", duration: "03:14", src: "songs/tomas_skyldeberg_california_life.mp3" },
    { title: "Vibrations from you", artist: "Tomas Skyldeberg", duration: "03:10", src: "songs/tomas_skyldeberg_vibrations_from_you.mp3" },
    { title: "Weekend love", artist: "Tomas Skyldeberg", duration: "03:15", src: "songs/tomas_skyldeberg_weekend_love.mp3" }
];

// Variables
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
audio.src = songs[currentSongIndex].src;

// DOM elements
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volume");
const playlistElement = document.getElementById("playlist");

// Load the playlist in the HTML
function loadPlaylist() {
    songs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.innerHTML = `<span>${song.title} - ${song.artist}</span> <span>${song.duration}</span>`;
        songItem.addEventListener("click", () => selectSong(index));
        playlistElement.appendChild(songItem);
    });
}

// Load the selected song
function selectSong(index) {
    currentSongIndex = index;
    loadSong();
    playSong();
}

// Load the song into the player
function loadSong() {
    audio.src = songs[currentSongIndex].src;
    isPlaying = false;
    playPauseBtn.innerText = "Play";
}

// Play and pause functionality
function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerText = "Pause";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerText = "Play";
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Skip to next and previous songs
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
});

// Update the progress bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Seek song position when progress bar is changed
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Initialize the playlist and load the first song
loadPlaylist();
loadSong();
