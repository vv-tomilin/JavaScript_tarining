'use strict';

console.log(DNAStrand('ATTGC'));

function DNAStrand(dna){
    return dna
        .split('')
        .map((elem) => {
            let res = '';
            switch (elem) {
                case 'A':
                    res = 'T';
                    break;
                case 'T':
                    res = 'A';
                    break;
                case 'C':
                    res = 'G';
                    break;
                case 'G':
                    res = 'C';
                    break;
            }
            return res;
        })
        .join('');
}

function DNAStrandV2(dna){
    var table = {
        C : 'G',
        G : 'C',
        A : 'T',
        T : 'A'
    };

    return dna.split('').map(function(cv) {
        return table[cv]; 
    }).join('');
}