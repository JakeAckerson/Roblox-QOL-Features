// ==UserScript==
// @name         Roblox Tweaks
// @namespace    http://tampermonkey.net/
// @version      2024-07-21
// @description  QOL features
// @author       Jake
// @match        https://www.roblox.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function mainLoop() {

        try {

            const url = document.URL;
            const isGamePage = url.includes('www.roblox.com/games');
            const isGamePassPage = url.includes('www.roblox.com/game-pass');
        
            if (isGamePage && !document.getElementById('likeRatioPercentage')) {
                const getTitleAsInt = id => parseInt(document.getElementById(id).title.replace(/,/g, ''), 10);
                const upvotes = getTitleAsInt('vote-up-text');
                const downvotes = getTitleAsInt('vote-down-text');
                const totalVotes = upvotes + downvotes;
                const percentage = totalVotes > 0 ? ((upvotes / totalVotes) * 100).toFixed(2) : '0.00';
        
                const ratioElement = document.createElement('h1');
                ratioElement.innerHTML = `Ratio: ${percentage}%`;
                ratioElement.id = "likeRatioPercentage";
                document.getElementsByClassName('favorite-follow-vote-share')[0]?.appendChild(ratioElement);
            }
        
            if (isGamePassPage && !document.getElementById('minimumearned')) {
                const price = Number(document.getElementsByClassName('text-robux-lg wait-for-i18n-format-render')[0].innerHTML);
                const likes = Number(document.getElementById('vote-up-text').title);
                const dislikes = Number(document.getElementById('vote-down-text').title);
                const totalRatings = likes + dislikes;
                const minimumEarnings = price * totalRatings;
        
                const makeResultReadable = num => {
                    if (num >= 1e8) return `${(num / 1e6).toFixed(0)}M`;
                    if (num >= 1e7) return `${(num / 1e6).toFixed(0)}M`;
                    if (num >= 1e6) return `${(num / 1e6).toFixed(0)}M`;
                    if (num >= 1e5) return `${(num / 1e3).toFixed(0)}K`;
                    if (num >= 1e4) return `${(num / 1e3).toFixed(0)}K`;
                    return num;
                };
        
                const earningsElement = document.createElement('h1');
                earningsElement.innerHTML = `Minimum Earnings: ${makeResultReadable(minimumEarnings)}`;
                earningsElement.id = "minimumearned";
                document.getElementsByClassName('item-details')[0]?.appendChild(earningsElement);
            }
        } catch (e) {
            console.error('Error:', e);
        }        
    }
    
    setInterval(mainLoop, 1000);

})();