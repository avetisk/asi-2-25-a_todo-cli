import { readFileSync } from "node:fs"

const DB_PATH = "./db.json"
const formatTodo = (description, index) => `[${index}] ${description}`
const printTodo = (description, index) =>
  console.log(formatTodo(description, index))
const [commandName, ...args] = process.argv.slice(2)

if (commandName === "add") {
  // add
}

if (commandName === "list") {
  const json = readFileSync(DB_PATH, { encoding: "utf-8" })
  const todos = JSON.parse(json)

  todos.forEach(printTodo)
  process.exit(0)
}

console.error("Error: command not found")
process.exit(1)
