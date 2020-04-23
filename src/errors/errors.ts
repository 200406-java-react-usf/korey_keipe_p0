class AppError {

    message: string;
    reason: string;

    constructor(reason?: string){
        this.message = 'An unexpected error has occured.';
        reason ? (this.reason = reason) : this.reason = 'Unknown reason'
    }

    setMessage(message: string){
        this.message = message;
    }
}

class DataNotFoundError extends AppError{
    constructor(reason?: string){
        super(reason);
        super.setMessage('Error: No data was found')
    }
}

class InvalidRequestError extends AppError{
    constructor(reason?: string){
        super(reason);
        super.setMessage('Error: Invalid Request')
    }
}

class AuthenticationError extends AppError{
    constructor(reason?: string){
        super(reason);
        super.setMessage('Error: Authentication Failed')
    }
}

class DataNotStoredError extends AppError{
    constructor(reason?: string){
        super(reason);
        super.setMessage('Error: The data has not been stored')
    }
}

export {
    DataNotFoundError,
    DataNotStoredError,
    AuthenticationError,
    InvalidRequestError
}