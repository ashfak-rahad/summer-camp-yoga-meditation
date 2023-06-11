require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3000
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())

// verify jwt token 
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization
  if(!authorization) {
     return res.status(401).send({error: true, message: "unauthorized access"})
  }

  const token = authorization.split(' ')[1]
  jwt.verify(token, process.env.SECKRET_KEY, (error, decoded) => {
      if(error) {
         return res.status(401).send({error: true, message: "unauthorized access"})
      }
      req.decoded = decoded
      next()
  })
}