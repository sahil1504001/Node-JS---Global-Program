const express = require('express');
const Joi = require('joi');
const userRouter = express.Router();
const { validateSchema } = require('./utils');

const userSchema = Joi.object().keys({
    id: Joi.number().required(),
    login: Joi.string().required().regex(/^[a-zA-Z ]{3,20}$/),
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,50}$/),
    age: Joi.number().min(18).max(60).required(),
    isDeleted: Joi.boolean().required()
});

let users = [
    {
        id: 1,
        login: 'John Doe',
        password: Math.random().toString(36),
        age: Math.floor(Math.random() * 100) + 1,
        isDeleted: false
    },
    {
        id: 2,
        login: 'Albert',
        password: Math.random().toString(36),
        age: Math.floor(Math.random() * 100) + 1,
        isDeleted: false
    },
    {
        id: 3,
        login: 'Alex',
        password: Math.random().toString(36),
        age: Math.floor(Math.random() * 100) + 1,
        isDeleted: false
    },
    {
        id: 4,
        login: 'Alexandre',
        password: Math.random().toString(36),
        age: Math.floor(Math.random() * 100) + 1,
        isDeleted: false
    },
    {
        id: 5,
        login: 'Christin',
        password: Math.random().toString(36),
        age: Math.floor(Math.random() * 100) + 1,
        isDeleted: false
    }
];

// helper
const getAutoSuggestUsers = (loginSubString, limit) => {
    return users.filter(_ => _.login.toLowerCase().includes(loginSubString.toLowerCase()))
        .sort((a, b) => b.login.toLowerCase -  a.login.toLowerCase())
        .slice(0, limit);
};

// get user by id
userRouter.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(_ => _.id === parseInt(id, 10));
    if (user) {
        res.json(user);
        return;
    }
    res.json({ status: 200, message: `User of ID: ${id} is not available.` });
});

// create user
userRouter.post('/users', validateSchema(userSchema), (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    const newUsers = [...users, user];
    users = newUsers;

    res.json(newUsers);
});

// update user
userRouter.put('/users', (req, res) => {
    const user = req.body;
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex(_ => _.id === parseInt(user.id, 10));
    if (index === -1) {
        res.json({ status: 200, message: `User of ID: ${user.id} is not available to update.` });
        return;
    }
    updatedUsers[index] = user;
    users = updatedUsers;

    res.json(updatedUsers);
});

// remove user [soft delete] makrk isDeleted as true
userRouter.put('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex(_ => _.id === parseInt(id, 10));
    if (index === -1) {
        res.json({ status: 200, message: `User of ID: ${id} is not available to delete.` });
        return;
    }
    users[id - 1].isDeleted = true;

    res.json(users);
});

userRouter.get('/users', (req, res) => {
    const { sort = 'asc', query = '', limit = 5 } = req.query;

    const sortedUsers = getAutoSuggestUsers(query, limit);
    return (sort === 'desc') ? res.json(sortedUsers.reverse()) : res.json(sortedUsers);
});

module.exports = userRouter;
