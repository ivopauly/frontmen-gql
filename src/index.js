import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'

const typeDefs = gql`
  type User {
    id: ID
    username: String
  }

  type Todo {
    name: String
    done: Boolean
  }

  type Query {
    oneTodo: Todo
  }

  type Mutation {
    newTodo: Todo
  }
`

const resolvers = {
  Query: {
    oneTodo() {}
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
