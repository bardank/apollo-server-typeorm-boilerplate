export interface Context {
  url: string;
  req: Express.Request;
  user: GQL.IUser | null ;
}


export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface DecodedToken {
  [key: string]: {
    [user: string]: {
      id: string,
    };
  };
}
