const express = require("express")
const cors = require("cors")
const collection = require("./Mongo") // Assuming Mongo collection is accessible here

exports.handler = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await collection.findOne({ email: email });

    if (!user) {
      res.json("notexist");
      return;
    }

    if (user.password === password) {
      res.json("exist");
    } else {
      res.json("incorrectpassword");
    }
  } catch (e) {
    res.json("fail")
  }
}