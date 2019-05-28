const express = require('express')
const Task = require('../models/tasks')

router = new express.Router

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(req.body)

    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/tasks', async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)

    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdate = ["name", "description", "completed"]
    const isValidOperation = updates.every((update) => allowUpdate.includes(update))
        if (!isValidOperation) {
            return res.status(400).send({
                Error: 'Objects cannot be updated'
            })
        }
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!task) {
                res.status(404).send()
            }
            res.send(task)

        } catch (error) {
            res.status(500).send(error)
        }
    })

router.delete('/tasks/:id', async (req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        
    } }
    catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router