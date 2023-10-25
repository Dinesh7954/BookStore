
import express from 'express';
import {Book} from "../models/bookmodels.js"

const router = express.Router();

// route to save a book 
router.post("/", async (req, res) =>{
    try {
        if(!req.body.title || !req.body.author|| !req.body.publishYear){
            return res.status(400).send({message:`send all details title , author ,publishYear`});
        }
        const newBook = {
            title:req.body.title ,
            author:req.body.author,
            publishYear:req.body.publishYear
        };
        const book =  await Book.create(newBook);
        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message});
    }
})

// Route to Get one book  from database by id  
router.get("/:id",  async (req ,res )=>{
    try {
        const {id} = req.params;
          const book = await Book.findById(id);
          return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})


// Route to Get all books  from database 
router.get("/",  async (req ,res )=>{
    try {
          const books = await Book.find({});
          return res.status(200).json({
            count:books.length,
            data:books
          });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

//Route to update a book  from database 
router.put("/:id" , async (req, res) =>{
try {
    if(!req.body.title || !req.body.author|| !req.body.publishYear){
        return res.status(400).send({message:`send all details title , author ,publishYear`});
    }
    const {id} = req.params;
    const result =await Book.findByIdAndUpdate(id, req.body);
    if(!result){
      return  res.status(404).json({message:`book not found`})
    }
    return res.status(200).send({message:"book updated successfully "})
} catch (error) {
    console.log(error);
    return res.status(500).send({message:error.message});
}})

//Route to delete a book
router.delete("/:id" , async (req, res)=>{
try {
    const {id} = req.params;
     const result = await Book.findByIdAndDelete(id);
    if(!result){
        return res.status(400).send({message:`book not found`})
    }
    return res.status(200).send({message:`book deleted successfully`})
} catch (error) {
    console.log(error);
    return res.status(500).send({message:error.message})
}})

export default router;