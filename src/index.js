import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'

const wait = async time => new Promise(resolve => setTimeout(resolve, time))

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION

  enum TodoType {
    checklist
    reminder
  }

  type User {
    id: ID
    username: String
    todos: [Todo]
  }

  type Todo {
    user: User!
    name: String
    done: Boolean
    type: TodoType
    secret: String @auth
  }

  type Query {
    oneTodo: Todo!
    todos: [Todo!]!
  }

  input NewTodoInput {
    name: String!
    done: Boolean = false
    type: TodoType!
    user: ID
  }

  type Mutation {
    newTodo(input: NewTodoInput!): Todo
  }
`

const db = {
  todos: [
    {
      name: 'cleaning',
      done: false,
      type: 'reminder'
    },
    {
      name: 'walk with the dog',
      done: false,
      type: 'reminder'
    },
    {
      name: '4 apples',
      done: false,
      type: 'checklist'
    }
  ]
}

const resolvers = {
  Query: {
    oneTodo() {
      return db.todos[0]
    },
    todos(root, args, context) {
      return db.todos.find({}).then(results => results.data)
    }
  },
  Mutation: {
    newTodo(rootValue, { input }, context, info) {
      db.todos.push(input)
      return input
    }
  },
  Todo: {
    async user(todo) {
      await wait(200)
      return {
        id: todo.user,
        username: 'John Doe'
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(data => console.log(data.url))
  .catch(err => console.error(err))
