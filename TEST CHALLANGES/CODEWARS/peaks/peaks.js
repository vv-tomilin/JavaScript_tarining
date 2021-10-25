'use strict';

// console.log(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]));
console.log([2,1,3,1,2,2,2,2]);
console.log(pickPeaks2([2,1,3,1,2,2,2,2])); //* pos[2] & peak[3]

function pickPeaks(arr) {
    
    let positions = [];
    let peaks = [];
    let current = 0;

    arr.forEach((item, i, arr) => {
        if (i > 0) {
            const prev = arr[i - 1];
            const next = arr[i + 1];

            if (item > prev && item > next) {
                positions.push(i);
                peaks.push(item);
                current = item;
            } else if (item === prev && item === next) {

                if (current !== item && arr[arr.length - 1] !== item) {
                    positions.push(i - 1);
                    peaks.push(item);
                    current = item;
                }

            }
        }

        //console.log(positions, peaks, current, i); //! 0000000000000000000000
    });

    return {pos: positions, peaks: peaks}
}

function pickPeaks2(arr){
    let pos = [];
    let peaks =[];
    for(let i = 1; i < arr.length - 1; i++){
      if(arr[i] > arr[i+1] && arr[i] > arr[i-1]) {
        //Peak identified
        pos.push(i);
        peaks.push(arr[i]);
        i++;
        continue;
      } else if(arr[i] > arr[i-1] && arr[i] === arr[i + 1]){
        //Potential Plateau
        for(let j = i + 1; j < arr.length - 1; j++) {
          if(arr[j] === arr[j+1]) {
            continue;
          } else if(arr[j] > arr[j+1]) {
            //Peak identified
            pos.push(i);
            peaks.push(arr[i]);
            i = j + 1; 
            break;
          } else {
            //No peak found
            i = j + 1;
          }
        }
      } else {
        //no peak yet
      }
    }
    return {pos, peaks};
}