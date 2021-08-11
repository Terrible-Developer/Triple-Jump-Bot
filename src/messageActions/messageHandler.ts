//This file is supposed to act as some form of router, receiving the regular text meesages from index
// and using them according to the situation.

const messageHandler = (msg: any): any => {
    //call functions here, no idea yet, maths will be a slash command
    if(msg.content.toLowerCase().includes('hello there'))
        msg.channel.send('GENERAL KENOBI');
}

export{
    messageHandler
}
