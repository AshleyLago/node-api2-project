// implement your posts router here
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send("GET /posts endpoint. ")
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send(`GET /posts/${id} endpoint. `)
})

router.post('/', (req, res) => {
    res.status(200).send("POST /posts endpoint. ")
})

module.exports = router
