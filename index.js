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

// GET BY ID
// Get A Cohorts Students
// EDIT A COHORT
// DELETE

const port = process.env.PORT || 5000;
server.listen(port, ()=> console.log(`\n Running on ${port}\n`))