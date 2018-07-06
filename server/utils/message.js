var generateMessage = (from , text) => {

    return {
        from ,

        text,

        createdAt : new Date().getTime()
    }


}
moduule.exports= {generateMessage};