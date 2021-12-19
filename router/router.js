import express from 'express'
import mongoose from 'mongoose'
import Article from '../db/articles.js'

const router = express.Router()

// Get Istegi
router.get('/', async (req, res) => {
    try {
        const allArticles = await Article.find()
        res.json(allArticles)
    } catch (error) {
        console.log(error)
    }
})

// ID'ye Ozel Get Istegi
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findById(id)
        if(!article) return
        res.status(200).json(article)
    } catch (error) {
        console.log(error)
    }
})

// Post Istegi
router.post('/', async (req, res) => {
    try {
        const article = req.body
        const createdArticle = await Article.create(article)
        res.status(201).json(createdArticle)
    } catch (error) {
        console.log(error)
    }
})

// Put Istegi
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {title, content, author} = req.body
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('article bulunamadi')
        const updatedArticle = {title, content, author, _id: id}
        await Article.findByIdAndUpdate(id, updatedArticle, {new:true})
        res.json((updatedArticle))
    } catch (error) {
        console.log(error)
    }
})

// Delete Istegi
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Article.findByIdAndRemove(id)
        res.json({message: 'Article Silindi'})
    } catch (error) {
        console.log(error)
    }
})

export default router