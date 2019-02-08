import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'

const typeDefs = gql`
  enum TodoType {
    checklist
    reminder
  }

  type User {
    id: ID
    username: String
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

  type Mutation {
    newTodo: Todo
  }
`

const resolvers = {
  Query: {
    oneTodo() {},
    todos() {}
  },
  Mutation: {
    newTodo() {}
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
