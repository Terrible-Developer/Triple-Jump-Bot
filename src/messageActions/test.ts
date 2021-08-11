const sayHello = (msg: any): void => {
    if(msg.content.toLowerCase().includes('hello')){
        msg.channel.send('bitch lasagna');
    }
};

export{
    sayHello
};
