import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'

export class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolve = field.resolve || defaultFieldResolver

    field.resolve = function(rv, args, ctx, info) {
      if (!ctx.isAuth) {
        throw new AuthenticationError('not auth homie!')
      }
      return resolve.call(this, rv, args, ctx, info)
    }
  }
}
