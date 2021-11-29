import axios from 'axios';

//Interface for the gacha pools used, needed because of typescript shenanigans.
interface IGachaPool {
    0?: {
        [key: string]: string
    };
}

//When I remove all the useless comments inside, the function will look way better (I hope)
const rollSingleGacha = async (): Promise<string> => {
    //NEW PLAN
    // random number first decides type of pull (character or ce)
    // second decides rarity
    // third decides actual item
    // Limited or not doesn't matter with this layout, since the characters will be distributed by banner

    //@Prototype
    // still not actually banner sensitive

    let servantsPool: IGachaPool = {};
    let cePool: IGachaPool = {};

    await axios.get('http://localhost:3000/servants').then(response => {
        servantsPool = response.data;
    });
    await axios.get('http://localhost:3000/ces').then(response => {
        cePool = response.data;
    });


    const itemType = Math.floor(Math.random() * 100) % 2 ? 0 : 1;
    let rarity = Math.floor(Math.random() * 100);
    if(rarity >= 99)
        rarity = 5;
    else if(rarity >= 85)
        rarity = 4;
    else if(rarity >= 65)
        rarity = 3;
    else if(rarity >= 40)
        rarity = 2;
    else
        rarity = 1;
    const item = Math.floor(Math.random() * 2);

    if(itemType === 0){
        return servantsPool["0"]![rarity][item]; //probably could make this less ugly, but hey, if it works, it works
    }
    return cePool["0"]![rarity][item];
};

//Idea for guaranteed 4* when rolling 10: pass an bool argument to singleroll that defines if it is a guaranteed roll (then change the rarity odds in case it's true)
// in the 10-roll, get a random number between 0 and 9, and whichever it is, pass the guaranteed true argument to single roll

const roll10Gacha = async (): Promise<string> => {
    let gachaResults: string = '';
    for(var i = 0; i < 10; i++){
        gachaResults += await rollSingleGacha() + '\n';
    }
    console.log(gachaResults);
    return gachaResults;
};


export{
    rollSingleGacha,
    roll10Gacha
}
