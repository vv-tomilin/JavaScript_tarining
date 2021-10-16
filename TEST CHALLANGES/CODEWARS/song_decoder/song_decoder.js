'use strict';

console.log(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"));

function songDecoder(song){
    return song
            .toUpperCase()
            .split("WUB")
            .filter((item) => {
                if(item !== '') return item;
            })
            .join(' ');
}