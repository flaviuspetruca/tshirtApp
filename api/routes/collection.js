const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const articol = require('../models/Post');
const multer = require('multer');
const authenticate = require('./verify');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
  });

  router.get("/", (req, res) => {
    articol.find()
      .then(docs => {
        const response = {
          count: docs.length,
          articole: docs.map(doc => {
            return {
                tip: doc.tip,
                pret: doc.pret,
                marime: doc.marime,
                productImage: doc.productImage,
                _id: doc._id
            };
          })
        };
        if (docs.length >= 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
            message: 'No entries found'
        });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post('/', authenticate, upload.single('productImage'), async(req, res) => {
    const art = new articol({
        _id: new mongoose.Types.ObjectId(),
        tip: req.body.tip,
        pret: req.body.pret,
        marime: req.body.marime,
        productImage: "http://localhost:3000/"+req.file.path
    });
    art.save()
    .then(result => {
    console.log(result);
    res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            
        }
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

module.exports = router;