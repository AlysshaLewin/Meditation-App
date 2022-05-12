const app = () => {
    //song
    const song = document.querySelector('.song');
    //play button
    const play = document.querySelector('.play');
    //circle outline
    const outline = document.querySelector('.moving-outline circle');
    //video
    const video = document.querySelector('.vid-container video');

    //all sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    //All of the time buttons
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Fake durations of songs
    let fakeDuration = 600;

    //StrokeDashArray, StokeDashOffset making it look like circle is starting from 0 and animating in
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src =  this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });


    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            //data-time of time-select buttons
           fakeDuration = this.getAttribute('data-time');
           //updates textContent from timer
           timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });




    //Create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if (song.paused){
            song.play();
            //animating background and stopping background
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };


    //Can animate the circle and check the time
    //this function will run everytime the song runs. Once we hit play it will execute, and will keep updating as the song goes on. When the song stops the function will no longer run.
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        //will go through 1-10, when it gets to 60, will go back to 0
        //Math.floor to get an exact whole number
        let seconds = Math.floor(elapsed % 60);
        //60 seconds divided by 60 = 1 minute
        let minutes = Math.floor(elapsed / 60);

        //Animated progress circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            //resets the duration of time on the song
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };

};


app();