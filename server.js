import express from 'express';
import path from 'path';
import multer from 'multer';
import mergePdfs from './merge.js';
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3000;

app.use('/static',express.static('public'));
const __dirname = path.resolve();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge',upload.array('pdfs',5),async(req,res,next)=>{
    console.log(req.files);
    let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    // res.send({data: req.files})
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
