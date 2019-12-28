const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');
const app = express();

//middleware

//init
app.use(logger);

//handlebars moiddlware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//homepage
app.get('/', (req, res) => res.render('index', {
    title:'Member App',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>console.log(`server started on port ${PORT}`));