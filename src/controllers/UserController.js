import express from "express"
import userModel from "../Model/userModel"
const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser()
    res.render('home', { data: { title: 'List User', page: 'listUser', rows: userList } })
}
const createUser = (req, res) => {
    res.render('home', { data: { title: 'Create New User', page: 'createNewUser' } })
}

export default { getAllUser, createUser }