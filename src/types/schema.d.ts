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

type loginResult = ILogin | IError;



interface IQuery {
__typename: "Query";
login: loginResult;
}

interface ILoginOnQueryArguments {
email: string;
}

interface ILogin {
__typename: "Login";
user: IUser;
token: string;
}

type RegisterResult = ISuccess | IError;



interface IMutation {
__typename: "Mutation";
register: RegisterResult;
}

interface IRegisterOnMutationArguments {
fullName: string;
email: string;
password: string;
}

interface IError {
__typename: "Error";
node: string;
message: string;
}

interface ISuccess {
__typename: "Success";
message: string;
}

interface IUser {
__typename: "User";
id: string;
fullName: string;
email: string;
}
}

// tslint:enable
