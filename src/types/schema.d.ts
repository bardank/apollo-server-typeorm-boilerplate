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

interface IError {
__typename: "Error";
node: string | null;
message: string;
statusCode: string | null;
}

interface IErrors {
__typename: "Errors";
errors: Array<IError> | null;
}

interface ISuccess {
__typename: "Success";
message: string;
statusCode: string;
}

interface IUser {
__typename: "User";
id: string;
fullName: string;
email: string;
}

type LoginResult = ILogin | IErrors;



interface ILogin {
__typename: "Login";
user: IUser;
token: string;
}

interface IQuery {
__typename: "Query";
login: LoginResult;
}

interface ILoginOnQueryArguments {
email: string;
password: string;
}

type RegisterResult = ISuccess | IErrors;



interface IMutation {
__typename: "Mutation";
register: RegisterResult;
}

interface IRegisterOnMutationArguments {
fullName: string;
email: string;
password: string;
}
}

// tslint:enable
