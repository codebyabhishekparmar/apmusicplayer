// const { createElement } = require("react");

console.log("har har mahadev");
console.log("ok");
let currentsong = new Audio();// global variable 
let songs; // global variable 

//play songs me agar hum direct folder use karange toh notdefined aa jai ga 
let currentfolder; 

//function to convert seconds in min:sec formate 
function convertToMinutesSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60); // ensures no milliseconds

    // Format with leading zero if needed
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const formattedSecs = secs < 10 ? '0' + secs : secs;

    return `${formattedMins}:${formattedSecs}`;
} 





//this function will return songs from the songs directory 
async function getsongs(folder){
    currentfolder = folder; //updating the global variable current folder so we can use it in playmusic function  
    let a = await fetch(`/song/${folder}/`);//get data from the server (we are using await taki sare song ek sath aa jai)
    let response = await a.text(); // read the response as text (convert into plain text(string) )

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a"); //extracting <a> from the data

    //there are multiple <a> , now we have to extract <a> whose (link)href ends with .mp3  
    songs =[];
    for (let i = 0; i < as.length; i++){
        if(as[i].href.endsWith(".mp3")){  //Checks if the href (the link) ends with .mp3 — meaning it's an MP3 file.
            // songs.push(as[i].href.split("/song/")[1]) /*all the song links*/
            //  songs.push(as[i].href.split("/song/")[1].replaceAll("(Mp3 Song)"," ").replaceAll("(SambalpuriStar.In)"," ").replaceAll("-"," ").replaceAll(".mp3"," "););//split:-to extract song name from link. split will break the link in two array[0] consists of data before  /song/ and array[1] consists of data after /song/.
            songs.push(as[i].href.split(`/${folder}/`)[1]);
        }    
    }            
    

// return songs;


 
    //to show songs in songlist(below library)    
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    songul.innerHTML="";// (blank) because to clear all the song of the old folder when we want to load new folder when we click on card 

    for (const song of songs){
        // songul.innerHTML = songul.innerHTML + song; 
        // songul.innerHTML = songul.innerHTML + `<li>${song}</li>`;  shows song name only not in card
        songul.innerHTML = songul.innerHTML + `<li class="border round">
                            <div>
                            <svg class="invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#000000" fill="none"><path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5"></path><path d="M13 14.5C13 15.8807 11.8807 17 10.5 17C9.11929 17 8 15.8807 8 14.5C8 13.1193 9.11929 12 10.5 12C11.8807 12 13 13.1193 13 14.5ZM13 14.5V7C13.3333 7.5 13.6 9.6 16 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                            <div class="songinfo">
                                <div>${song}</div> 
                                <div>~Abhishek</div>
                            </div>  
                            <div class="playnow">     
                                <div>Play Now</div>
                                <svg class="invert" width="37" height="37" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="35,25 75,50 35,75" fill="black" /></svg>
                            </div>    
                        </li>`    
    } 
    //array.from() can converts any iterable object into a array 
    //foreach loop lagane k liye hamko pahle sari list ko array me convert karna padega using array.from()

    // array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => { //songlist class me jo li(songlist in library) hai us pr foreach loop 
    //     e.addEventListener("click",element=>{  //song card pr click karne pr 
    //         console.log(e.querySelector("songinfo").firstElementchild.innerHTML) // i.e song name (songlist class me jo songinfo class hai uska pehla element child ke innerHTML i.e songname)

    //     })
    // });
    

    //attach an event listener to each songlist to play when we click
    // songlist me jo li hai usme jo songinfo uske pehle div ke innerHTML 
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",()=>{
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)//song name
            playmusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim()); //.trim will remove spaces from starting and ending of song 
        });
    });  

}  






function playmusic(track) {
    /*const audioPath = "/song/" + track; // /song/ path hai jaha songs stored hai 
    console.log("Trying to play:", audioPath);
    let audio = new Audio(audioPath);
    audio.play()
    .then(() => console.log("Playback started"))
    .catch(err => console.error("Playback error:", err));   
    or 
    let  audio = new Audio("/song/" + track);
    audio.play();         ek time pr sare song play kr sakte hai*/
    
    
    
    currentsong.src= `/song/${currentfolder}/` + track; // to play one song at a time 
    currentsong.play();
    // jb song play ho raha hoga toh pause vali svg show karegi
    play.src="pause.svg" //wecan directly access id selector (here play is id of songbutton)
    
    //play music function me likhne se song name or songtime jb he i ga jb hum song ko play karange 
    let  a =  track.replaceAll("%20","").replaceAll("___Baani_Sandhu___Gur_Sidhu___Gurneet_Dosanjh___Punjabi_Song___Ishtar_Punjabi_#punjabisong","").replaceAll("(MrJat.in)","").replaceAll("_Ride_It__Lyrics_(48k)","").replaceAll("__Official_Music_Video_(48k)","").replaceAll("(48k)","").replaceAll("(Mp3 Song)","").replaceAll("(SambalpuriStar.In)","").replaceAll("(PenduJatt.Com.Se)","").replaceAll("-","").replaceAll(".mp3",""); 
    document.querySelector(".songname").innerHTML= a;
    document.querySelector(".songtime").innerHTML= "00:00/00:00" 
} 


// display all the album on the page(populating album i.e the website will automatically detect  the song folder) 
async function displayalbum(){
    console.log("display card function  running")
    let a = await fetch("/song/") // yaha ham sirf song folder ko fetch kr rahe hai taki song folder me jo songs k folder hai unka naam find kr sake 
    let response = await a.text();
    let  div = document.createElement("div");
    div.innerHTML= response;
    let as = div.getElementsByTagName("a");

    // Array.from(as).forEach(async  e => {
        for(let i=0;i<as.length;i++){ 
        if(as[i].href.includes("/song/") && !as[i].href.includes(".htaccess")){
            let folder=as[i].href.split("/song/")[1].replaceAll("/",""); //note dont give space  in " " the path will be disturbed 

            // get the meta data of the folder 
            let a = await fetch(`/song/${folder}/info.json`); //jsonfile ke information  fetch  kr rahe hai
            let response = await a.json(); 
            console.log(response);
            
            document.querySelector(".cardcontainer").innerHTML = document.querySelector(".cardcontainer").innerHTML + 
            `       <div data-folder="${folder}" class="card p1 h1">
            <img id="coverimage" src="/song/${folder}/cover.jpg"  alt="404"> 
            <h4>${response.title}</h4>
                        <p>${response.description}</p>

                        <div class="playbutton">
                            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="green" /><polygon points="40,30 70,50 40,70" fill="black" /></svg>
                            </div>
                    </div>`
        }
    }       
    

//the songs of the album are not loading when the below function are written outside the displaycard  function 

    //loading  the playlist whenever card is clicked 
    // Array.from(document.getElementsByClassName("card")).forEach(e=> {
    //     e.addEventListener("click",async item=>{ // async because th getsong function is await 
    //         //item.dataset.folder   i.e har folder se connected data atribute which will give the folder name of that card
    //         //songs = await getsongs(`${item.target.dataset.folder}`); item.target vo dega hamko vo element jis pr click hua hai   i.e agar ham paragraph pr click karte hai toh paragrapt , agar ham image pr click karte hai toh img i ga 
    //         await getsongs(`${item.currentTarget.dataset.folder}`);
    //     })
    // });
  Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", item=>{
            getsongs(`${item.currentTarget.dataset.folder}`)
        })
    });

    
    
}    




async function main(){     
    displayalbum();  
    
    //get the list of all the songs 
    await getsongs("guru"); // this will set the default album
    //    console.log(songs);  
    
    
    
    
    // Set the first song as the default song of any album
    if (songs.length > 0) { // condition : agar ek bhi song present hai toh 
        playmusic(songs[0]);
        currentsong.pause(); // Ensure it doesn't autoplay
    play.src = "play.svg"; // Show play icon since it's paused
} 


    //attach an event listener for song button (play pause)
    play.addEventListener("click",()=>{  // we can directly access id selector
        if(currentsong.paused){ 
            currentsong.play();
            play.src="pause.svg"
        } 
        else{
            currentsong.pause();
            play.src="play.svg"
        }
    }) 

    // attach an event listener for timeupdate 
    currentsong.addEventListener("timeupdate",()=>{
        console.log(currentsong.currentTime + "/" + currentsong.duration);
        document.querySelector(".songtime").innerHTML = convertToMinutesSeconds(currentsong.currentTime) + "/" + convertToMinutesSeconds(currentsong.duration)


        //with the help of current time and duration making the circle of seek bar move w.r.t time of song played 
        document.querySelector(".circle").style.left=(currentsong.currentTime / currentsong.duration)*100 + "%" ;
    })   

    //adding eventlistener to seekbar to make the song forward backward (2:50)
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 ;
        
        document.querySelector(".circle").style.left= percent + "%";  // ise ham bus seekbar pr circle ko forward/backward kr sakte hai song ko nahi
        currentsong.currentTime = ((currentsong.duration)* percent)/100; // ise song bhi forward backward hoga seekbar k circle ko move karne pr
    })

//hamburger logo jb he visible hoga jb screen 1270 px se choti hogi i.e mobile. hamne @media me left container ke position absolute kr k left:-100%  kr diya tha taki vo choti screen me hide ho jai , now if we click on hamburger the left container's left will become 0 i.e visible 
    document.querySelector(".hamburger").addEventListener("click",()=>{  
        document.querySelector(".left").style.left = "0";
    })

    //to close hamburger with cross button 
    document.querySelector(".crosssvg").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-130%";
    })
 
    //adding event listener to next and previous 
    next.addEventListener("click",()=>{
// hamko songs me currentsong.src ko search karna hai pr currentsong.src me puri link aati hai or song list me (name of song). toh hamko currentsong.src ko songs me search karne k liye slice karna padega  

       console.log(currentsong.src);// puri song link hai 
       /*http://127.0.0.1:3000/spotifyclone2/song/mix/Kendrick%20Lamar,%20SZA%20-%20All%20The%20Stars.mp3*/

       console.log(songs) // only song name 
       /*"Kendrick%20Lamar,%20SZA%20-%20All%20The%20Stars.mp3",
         "Pardesiya-(SambalpuriStar.In).mp3",
         "Saiyaara-(SambalpuriStar.In).mp3",
         "Sapphire%20(Mp3%20Song)-(SambalpuriStar.In).mp3",
         "Tere%20Bina-(SambalpuriStar.In).mp3",
         "Wavy-(SambalpuriStar.In).mp3" */

        console.log(currentsong.src.split(`/${currentfolder}/`)[1]);
        /*"Kendrick%20Lamar,%20SZA%20-%20All%20The%20Stars.mp3"*/
        
        /*finding the index of currentsong.src in songs*/
        let index = songs.indexOf(currentsong.src.split(`/${currentfolder}/`)[1]);

        if((index+1) < songs.length){   
            playmusic(songs[index + 1]);
        } 
    })  
   

    //adding event listener to next and previous 
    previous.addEventListener("click",()=>{
        let index = songs.indexOf(currentsong.src.split(`/${currentfolder}/`)[1]);
        
        if((index-1)>=0){
            playmusic(songs[index - 1]);
        }
    });   
    
    
    
    
    
  
    
    

    
}   
   


main();  