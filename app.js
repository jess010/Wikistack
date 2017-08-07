const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const express = require('express')
const models = require('./models');
const routes = require("./routes");
const app = express()
const router = express.Router();
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

//route to index.js
router.use(routes);

/*models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.catch(console.error);
*/
//console.log(models.db)
models.db.sync({force: true})
.then(function () {
    app.listen(1337, function () {
        console.log('Server is listening on port 1337!');
    })
})
.catch(console.error);

