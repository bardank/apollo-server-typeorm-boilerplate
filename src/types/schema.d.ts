// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
login: IUser | null;
}

interface ILoginOnQueryArguments {
email: string;
}

interface IMutation {
__typename: "Mutation";
register: boolean;
}

interface IRegisterOnMutationArguments {
fullName: string;
email?: string | null;
password: string;
}

interface IUser {
__typename: "User";
id: string;
fullName: string;
email: string;
}
}

// tslint:enable
