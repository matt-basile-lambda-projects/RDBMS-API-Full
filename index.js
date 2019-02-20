const express = require("express")
const helmet = require("helmet")
const knex = require("knex")
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();
server.use(helmet())
server.use(express.json());

// GET
server.get('/cohorts', async (req, res) =>{
    try {
     const cohorts = await db('cohorts');
     res.status(200).json(cohorts)
    } catch (error) {
        res.status(500).json(error)
    }
})
server.get('/cohorts/:id', async (req, res) =>{
    try {
     const cohorts = await db('cohorts').where({id: req.params.id});
     res.status(200).json(cohorts)
    } catch (error) {
        res.status(500).json(error)
    }
})
server.get('/cohorts/:id/students', async (req, res) =>{
    try {
     const students = await db('students').where({cohort_id: req.params.id});
     res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error)
    }
})
// ADD A Cohort
server.post('/cohorts', async (req, res) => {
    try{
      const [id] = await db('cohorts').insert(req.body);
      const cohort = await db('cohorts').where({id}).first();
      res.status(200).json(cohort);
    }
    catch(error){
     res.status(500).json(error);
    }
});
// EDIT A COHORT
server.put('/cohorts/:id', async (req, res)=>{
    try{
        const count = await db('cohorts').where({id: req.params.id}).update(req.body);
        if(count >0){
            const cohort = await db('cohorts').where({id: req.params.id}).first();
            res.status(200).json(cohort);
        }else{
            res.status(404).json({message: "Record not found"})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});
// DELETE
server.delete('/cohorts/:id', async (req, res)=>{
    try{
        const count = await db('cohorts').where({id: req.params.id}).del();
        if(count >0){
            res.status(204).end();
        }else{
            res.status(404).json({message: "Cohort not found"})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

const port = process.env.PORT || 5000;
server.listen(port, ()=> console.log(`\n Running on ${port}\n`))