import { readFileSync, writeFileSync } from "node:fs"

const DB_PATH = "./db.json"
const formatTodo = (description, index) => `[${index}] ${description}`
const printTodo = (description, index) =>
  console.log(formatTodo(description, index))
const [commandName, ...args] = process.argv.slice(2)

if (commandName === "add") {
  const description = args[0].trim()

  if (!description) {
    console.error("Error: missing description argument")
    process.exit(2)
  }

  const json = readFileSync(DB_PATH, { encoding: "utf-8" })
  const todos = JSON.parse(json)
  const newTodos = [...todos, description]
  const newJson = JSON.stringify(newTodos)

  writeFileSync(DB_PATH, newJson, { encoding: "utf-8" })

  const index = newTodos.length - 1

  printTodo(description, index)

  process.exit(0)
}

if (commandName === "list") {
  const json = readFileSync(DB_PATH, { encoding: "utf-8" })
  const todos = JSON.parse(json)

  todos.forEach(printTodo)
  process.exit(0)
}

console.error("Error: command not found")
process.exit(1)
