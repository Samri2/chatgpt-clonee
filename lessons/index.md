import express from 'express';

const app = express();
//req-- midddleware(loger)--res
/\*
function logger(req,res,next){
const url = req.url;
const method = req.method;
console.log(`Request URL: ${url}, Request Method: ${method}`);
next();
}
function errorHandler(req,res,next){
console.log('Error occurred');
res.status(500).send('Internal Server Error');
next();
}

app.use('/api', logger);
const port = 3000;

app.get('/', (req, res,next) => {
res.send('Hello World!');
});
app.get('/about', (req, res,next) => {
throw new Error('Something went wrong');  
 //res.send('Hello World!');

});
app.get('/api/chat', (req, res,next) => {
res.send('Hello World!');
});
app.get('/api/conversation', (req, res,next ) => {
res.send('Hello World!');
});

app.use(errorHandler);
\*/
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});
