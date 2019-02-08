import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'

export class Auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolve = field.resolve || defaultFieldResolver

    field.resolve = function(rv, args, ctx, info) {
      if (!ctx.isAuth) {
        throw new AuthenticationError('not auth homie!')
      }
    }
  }
}
