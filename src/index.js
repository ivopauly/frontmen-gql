import { ApolloServer, UserInputError } from 'apollo-server'
import gql from 'graphql-tag'

const typeDefs = gql`
  enum TodoType {
    checklist
    reminder
  }

  type User {
    id: ID
    username: String
    friends: [User]
  }

  type Todo {
    name: String
    done: Boolean
    type: TodoType
  }

  type Query {
    oneTodo: Todo!
    todos: [Todo!]!
  }

  input NewTodoInput {
    name: String!
    done: Boolean = false
    type: TodoType!
  }

  type Mutation {
    newTodo(input: NewTodoInput!): Todo
  }
`

const db = {
  todos: []
}

const resolvers = {
  Query: {
    oneTodo() {
      return db.todos[0]
    },
    todos() {}
  },
  Mutation: {
    newTodo(rootValue, { input }, context, info) {
      db.todos.push(input)
      return input
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
