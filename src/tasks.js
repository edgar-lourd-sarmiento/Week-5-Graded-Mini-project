export const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export const people = [
  'Leanne Graham',
  'Ervin Howell',
  'Clementine Bauch',
  'Patricia Lebsack',
  'Chelsey Dietrich',
]

export function formatTask(todo) {
  return {
    id: todo.id,
    title: todo.title,
    assignee: people[(todo.userId - 1) % people.length],
    status: todo.completed ? 'Done' : 'Open',
  }
}

export async function fetchTasks({ signal }) {
  const response = await fetch(API_URL, {
    signal,
  })

  if (!response.ok) {
    throw new Error('Something went wrong loading tasks. Please try again.')
  }

  const todos = await response.json()

  return todos.map(formatTask)
}
