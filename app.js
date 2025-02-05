import express from 'express';
import nunjucks from 'nunjucks';


//! Setup serveur web
const app = express();

// Moteur de vue
app.set('view engine', 'njk');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Middleware pour les formulaires
// Permet de traiter les requetes → application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//! Routing
app.get('/formulaire', (req, res) => {
    res.status(200).render('formulaire');
})

app.post('/formulaire', (req, res) => {
    console.log(req.body);

    if(!req.body?.message) {
        res.status(200).render('formulaire', { error: 'Veuillez completer le formulaire !'});
        return;
    }

    res.redirect('/response');
});

app.get('/response', (req, res) => {
    res.status(200).render('response');
})

//! Demarrage du serveur
app.listen(8080, () => {
    console.log('Web server up on port 8080');
});

