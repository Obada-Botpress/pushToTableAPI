//Packages
const express = require("express");
const bodyParser = require ("body-parser");
const axios  = require ("axios");
const path = require ("path");

//Creating an Express App + Port
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse form data/JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Using the HTML (in public folder)
app.use(express.static(path.join(__dirname, "public")));

//Post Requests
app.post("/submit-form", async(req, res) => {
    const formData = req.body; //data froim the form

    try{
        //Where we push the data to API path:
        const response = await axios.post("https://api.botpress.cloud/v1/tables/RodrigoExerciseTable/rows/upsert", {
            rows: [
                {
                   id: Number(formData.id),
                   firstName: formData.firstName, 
                   lastName: formData.lastName,
                   age: formData.age 
                }
            ]
            
        }, {
            headers: {
                accept: 'application/json',
                'x-bot-id': '72855465-8e77-4b49-b6b3-19f36406ce0c',
                'x-workspace-id': 'wkspace_01JQ7B996FTQSH23XHV8RT1B0N',
                'content-type': 'application/json',
                authorization: "Bearer bp_pat_nYizaKRNuywTeKsSuyPu9AcLA2CQfxPUxpze"
            }
        })
        //When push is complete:
        res.send('<h2>✅ Your data has been submitted successfully!</h2><a href="/">Submit another</a>');
    } catch (error){
        //In case of error
        console.error('Error submitting to API:', error.response?.data || error.message);
        res.status(500).send('Error pushing data to the API.');
    }
});

//Launch the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });