const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

//all authors route
router.get('/', async (req, res) => {

    let searchOptions = {}

    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        })
    }catch{
        res.redirect('/')
    }
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new author() })
})

//create author route
router.post('/', async (req, res) => {

    // use name from form to create Author object
    const author = new Author({
        name: req.body.name
    })

    try{
        const newAuthor = await author.save()
        //if success, redirect to authors page
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        //if error show new authors page with error message
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})

module.exports = router