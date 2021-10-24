'use strict';

console.log(domainName("http://google.co.jp"));
console.log(domainName("www.xakep.ru"));
console.log(domainName("https://youtube.com"));
console.log(domainName("https://www.cnet.com"));
console.log(domainName("http://www.cnet.com/index.html"));
console.log(domainName("xakep.ru"));
console.log(domainName("xakep"));

function domainName(url){
    const replaceFront = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)/i;
    const replaceBack = /\.[a-z\.\/]{0,}$/i;

    return url.replace(replaceFront, '').replace(replaceBack, '');
}