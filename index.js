const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 3000;
const todoRoutes = require('./routes/todos')


var app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//для того щоб парсити title
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes);

async function start(){
  try {
    await mongoose.connect(
        'mongodb+srv://maxtiger:wert1@cluster0.i66cn.mongodb.net/todos?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      });
    app.listen(PORT, () => {
      console.log("server started.....");
    });
  }
  catch (e) {
      console.log(e);
  }
}
start();
