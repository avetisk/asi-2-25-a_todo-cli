import { readFileSync, writeFileSync } from "node:fs"

const DB_PATH = "./db.json"
const readDatabase = () => {
  const json = readFileSync(DB_PATH, { encoding: "utf-8" })

  return JSON.parse(json)
}
const writeDatabase = (db) => {
  const json = JSON.stringify(db)

  writeFileSync(DB_PATH, json, { encoding: "utf-8" })
}
const formatTodo = (description, index) => `[${index}] ${description}`
const printTodo = (description, index) =>
  console.log(formatTodo(description, index))
const [commandName, ...args] = process.argv.slice(2)
const commands = {
  add: (rawDescription) => {
    const description = rawDescription.trim()

    if (!description) {
      console.error("Error: missing description argument")
      process.exit(2)
    }

    const todos = readDatabase()
    const newTodos = [...todos, description]
    const index = newTodos.length - 1

    writeDatabase(newTodos)
    printTodo(description, index)

    process.exit(0)
  },
  list: () => {
    const todos = readDatabase()

    todos.forEach(printTodo)
    process.exit(0)
  },
  delete: (rawIndex) => {
    const index = Number.parseInt(rawIndex, 10)
    const todos = readDatabase()
    const todo = todos[index]

    if (!todo) {
      console.error(
        `Error: missing or invalid index (must be 0-${todos.length - 1})`
      )
      process.exit(2)
    }

    const newTodos = todos.filter((_, i) => i !== index)

    writeDatabase(newTodos)
    printTodo(todo, index)

    process.exit(0)
  },
}
const command = commands[commandName]

if (!command) {
  console.error("Error: command not found")
  process.exit(1)
}

command(...args)
