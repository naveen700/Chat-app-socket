const express  = require('express');
//path  is  better api to handle the paths
const path = require('path');
// console.log(__dirname + '../public/index.html');  // old way to resolve path
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
// console.log(publicPath);



var app = express();


app.use(express.static(publicPath));
1






app.listen(port, () =>{

    console.log('server started at 3000',port);

})

