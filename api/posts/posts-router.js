// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// 1: If successful, returns an array of all the post objects contained in the database. 
//  If not, returns a code of 500
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

// 2: If successful, returns the post object with the specified id. If not, returns a 
//  code of 404
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
// Another method may have been changing it to "('/:id', async(req, res) =>" and having 
//  the body be:
/***
try {
    const post = await Posts.findById(req.params.id)
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: ""})
    }
} catch (err) {
    console.log(err)
    res.status(500).json({ message: ""})
}
***/

// 3: If successful, creates a post using the information sent inside the request body 
//  and returns the newly created post object with the code 201. If the request body 
//  is missing the title or contents property, return a code of 400. If there's an 
//  error while saving the post, return a code of 500
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

// 4: If successful, updates the post with the specified id using data from the request 
//  body and returns the modified document, not the original, along with the code 200. 
//  If the post with the specified id is not found, return a code of 404. If the request 
//  body is missing the title or contents property, return a code of 400. If there's an 
//  error when updating the post, return a code of 500
router.put('/:id', (req, res) => {
    const { title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.findById(req.params.id)
            .then(posts => {
                if (!posts) {
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                } else {
                    return Posts.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return Posts.findById(req.params.id)
                }
            })
            .then(post => {
                if (post) {
                    res.json(post)
                }
            })
            .catch (err => {
                console.log(err)
                res.status(500).json({ message: "The post information could not be modified" })
            })
    }
})

// 5: If successful, removes the post with the specified id and returns the deleted post
//  object. If the post with the specified id is not found, return a code of 404. If 
//  there's an error in removing the post from the database, return a code of 500
router.delete('/:id', async(req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            await Posts.remove(req.params.id)
            res.json(post)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The post could not be removed" })
    }
})

// 6: If successful, returns an array of all the comment objects associated with the post
//  with the specified id If the post with the specified id is not found, return a code of 
//  404. If there's an error in removing the post from the database, return a code of 500
router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            const comments = await Posts.findPostComments(req.params.id)
            res.json(comments)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})


module.exports = router
