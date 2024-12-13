import { Todo } from "../models/todo.js"

class todoController {
    constructor() {
        this.TODOS = []
    }

    createTodo(req, res) {
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        res.json({
            message: 'created new Todo object',
            newTask: newTodo
        })
    }

    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }

    updateTodo(req, res) {
        try {
            const todoId = req.params.id
            const updatedTask = req.body.task

            const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

            if(todoIndex < 0) {
                res.json({
                    message: 'could not find todos with such index'
                })
                throw new Error('could not find todo')
            }

            this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
            res.json({
                message: 'todo is updated',
                updatedTask: this.TODOS[todoIndex]
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const TodoController = new todoController()