const express = require('express')
const app = express();

app.use(express.static('src'));

const port = 3004;
app.listen(port,()=>{
    console.log(`Ouvindo na porta ${port}`)
})
