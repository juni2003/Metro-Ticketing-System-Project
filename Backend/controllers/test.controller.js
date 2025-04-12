const testModel = require('../models/test.model')
const mongoose = require('mongoose')

const getHello = (req, res)=>{
    res.json({mssg: "Hello, BKL!"})
}

const getHome = (req, res)=>{
    res.json({mssg: "Hello, Home!"})
}

const testDB = async(req, res)=>{
    const title = "first title"
    const description = "first description"

    try{
      const test = await testModel.create({title, description})

      if(!test){
        throw new Error("Error creating test")
      }     

      res.status(200).json({
        success: true,
        test
        })

    }catch(error){
        res.status(404).json({
            success: false,
            error: error.message
            })
    }
}


// create a single test data
const createData = async(req, res)=>{
    const {title, description} = req.body

    try{

        if(!title && !description){
            throw new Error("Title and desc. is required")
        }

      const test = await testModel.create({title, description})

      if(!test){
        throw new Error("Error creating test")
      }

      res.status(200).json({
        success: true,
        test
        })

    }catch(error){
        res.status(404).json({
            success: false,
            error: error.message
            })
    }
}


// get all test data
const getAllData = async(req, res)=>{
    try{
        const tests = await testModel.find()

        if(!tests){
            throw new Error("Error fetching data")
        }

        res.status(200).json({
            success: true,
            tests
            })

    }catch(error){
        res.status(404).json({
            success: false,
            error: error.message
            })
    }
}

// get single test data
const getSingleData = async(req, res)=>{
    const {id} = req.params

    try{

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid ID")
        }

        // const test = await testModel.findById(id)
        // const test = await testModel.findOneAndDelete({_id: id})

        if(!test){
            throw new Error("Error fetching data")
        }

        res.status(200).json({
            success: true,
            test
            })


    }catch(error){
        res.status(404).json({success: false,error: error.message})
    }

}

// update a test data

const updateData = async (req, res)=>{
    const {id} = req.params

    try {
        
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid ID")
        }

        let test = await testModel.findByIdAndUpdate(id, {
            ...req.body
        })

        if(!test){
            throw new Error("Error updating data")
        } 

        res.status(200).json({success: true, test})
    } catch (error) {
        res.status(404).json({success: false,error: error.message})
    }
}

module.exports = {
    getHello,
    getHome,
    testDB,
    createData,
    getAllData,
    getSingleData,
    updateData
}