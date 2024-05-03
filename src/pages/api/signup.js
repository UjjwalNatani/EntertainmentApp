const express = require("express")
const cors = require("cors")
const collection = require("./Mongo") // Assuming Mongo collection is accessible here

exports.handler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = {
      name: name,
      email: email,
      password: password
    }

    const check = await collection.findOne({ email: email })

    if (check) {
      res.json("exist")
    } else {
      await collection.insertMany([data])
      res.json("success") // Indicate successful signup
    }
  } catch (e) {
    res.json("fail")
  }
}
