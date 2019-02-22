const express = require("express")
const knex = require("knex")
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await db('students');
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error);
    }
});
//GET SINGLE Student
router.get('/:id', async (req, res) => {
    try {
      const student = await db('students').where({id: req.params.id}).first();
      res.status(200).json(student)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //CREATE student
  router.post('/', async (req, res) => {
    try {
      const [id] = await db('students').insert(req.body);
      const student = await db('students').where({id}).first();
      res.status(200).json(student)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //UPDATE student
  router.put('/:id', async (req, res) => {
    try {
      const count = await db('students').where({id: req.params.id}).update(req.body);
      if(count > 0){
        const student = await db('students').where({id: req.params.id}).first();
        res.status(200).json(student);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //DELETE student
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('students').where({id: req.params.id}).del();
      if(count> 0){
        res.status(204).end();
      } else{
        res.status(404).json({message: "student not found"})
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });




module.exports = router