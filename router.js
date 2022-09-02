var express = require('express');
var router = express.Router();
// var moment = require('moment');
var crud = require("./Models");
var formidable = require('formidable');
 var fs = require('fs');


router.post('/api/v3/app/events/uploads', async (req, res) =>{
    try {
        var formData = new formidable.IncomingForm();
        formData.parse( function(error, field, files){
            var extension = files.file.name.substr(files.file.name.lastIndexOf("."));
            var newpath = "uploads/" + field.fileName + extension;
            fs.rename(files.file.path, newpath, function(errRename){
                res.send("File Save" + newpath)
            })
        })
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);

    }
});

router.post('/api/v3/app/events', async (req, res) => {


    try {
        const userdata = new crud({
            type: req.body.type,
            uid: req.body.uid,
            name: req.body.name,
            tagline: req.body.tagline,
            schedule: req.body.schedule,
            description: req.body.description,
            moderator: req.body.moderator,
            category: req.body.category,
            sub_category: req.body.sub_category,
            rigor_rank: req.body.rigor_rank,
            attendees: req.body.attendees

        });

        success = true;
        const Createuser = await userdata.save();
        res.status(201).send(Createuser);
    

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);

    }

});

router.get('/api/v3/app/events', async (req, res) => {
    try { 
        const user = await crud.find()
        res.send(user) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error") 
    }

});


router.get('/api/v3/app/events/:id', async (req, res) =>{
    try { 
        // user = req.params.id;
        const user = await crud.findById(req.params.id)
        res.send(user) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error") 
    }
});

router.put('/api/v3/app/events/:id', async (req, res) => {
    try {

        const { type, name, tagline, description, moderator, category, sub_category, rigor_rank, attendees } = req.body;
        // Create a new note Object
        const newUpdate = {};
        if (type) {
            newUpdate.type = type;
        }
        if (name) {
            newUpdate.name = name;
        }
        if (tagline) {
            newUpdate.tagline = tagline;
        }
        if (description) {
            newUpdate.tagline = description;
        }
        if (moderator) {
            newUpdate.moderator = moderator;
        }
        if (category) {
            newUpdate.category = category;
        }
        if (sub_category) {
            newUpdate.sub_category = sub_category;
        }
        if (rigor_rank) {
            newUpdate.sub_category = rigor_rank;
        }
        if (attendees) {
            newUpdate.attendees = attendees;
        }
        // Find the note to be Updated and update it

        let update = await crud.findById(req.params.id);
        if (!update) {
            return res.status(404).send('Not found');
        }
        // note.user.toString is given the user id 
        // if (update.user. !== req.user.id) {
        //     return res.status(401).send('Not allowed');
        // }
        update = await crud.findByIdAndUpdate(req.params.id, { $set: newUpdate }, { new: true })
        res.json({ update });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})


router.delete("/api/v3/app/events/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedata = await crud.findByIdAndDelete(_id);

        if (!deletedata) {
            res.status(404).send();
        }
        else {
            res.send(deletedata)
        }
        

    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router;