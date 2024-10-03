// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// 1: If successful, returns an array of all the post objects contained
//  in the database. If not, returns a code of 500 with the message
//  "The posts information could not be retrieved"
router.get('/', (req, res) => {

    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

// 2: If successful, returns the post object with the specified id. If
//  not, returns a code of 404 and the message "The post with the 
//  specified ID does not exist"
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

// 3: If successful, creates a post using the information sent inside the request body and returns the newly created post object
router.post('/', (req, res) => {
    const { title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert({ title, contents })
        .then(({ id }) => {
            return Posts.findById(id)
        })
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
        
})

// 4: If successful, updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put('/:id', (req, res) => {
    
})

// 5: If successful, removes the post with the specified id and returns the deleted post object
router.delete('//:id', (req, res) => {
    
})

// 6: If successful, returns an array of all the comment objects associated with the post with the specified id 
router.get('/:id/comments', (req, res) => {
    
})
module.exports = router
