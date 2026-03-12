// ==UserScript==
// @name         Google Dice Controller (Silent Mode - Kecil Only)
// @namespace    http://tampermonkey.net
// @version      3.5
// @description  9 Dadu Otomatis: Fix Kecil (25-31) - Tanpa UI/Tombol
// @author       User
// @match        https://www.google.com*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Langsung set ke mode kecil secara permanen
    const mode = 'kecil'; 
    const originalRandom = Math.random;

    // LOGIKA DISTRIBUSI PRESISI (MODE KECIL)
    Math.random = function() {
        const r = originalRandom();
        
        if (mode === 'kecil') {
            // TARGET TOTAL: 25 - 31
            const subR = originalRandom();
            if (subR < 0.15) return 0.05; // Angka 1
            if (subR < 0.40) return 0.25; // Angka 2
            if (subR < 0.75) return 0.45; // Angka 3
            if (subR < 0.93) return 0.60; // Angka 4
            return 0.75;                  // Angka 5
        }
        
        return r; 
    };

    // OTOMATIS 9 DADU
    function setupNineDice() {
        const d6Button = document.querySelector('div[jsname="v8pSle"]'); 
        const currentDice = document.querySelectorAll('.Yv969b'); 
        if (d6Button && currentDice.length < 9) {
            for (let i = currentDice.length; i < 9; i++) { 
                d6Button.click(); 
            }
        }
    }

    // Interval pengecekan jumlah dadu tanpa membuat UI
    const init = setInterval(() => {
        if (document.body) {
            setInterval(setupNineDice, 1500); 
            clearInterval(init);
        }
    }, 100);
})();
