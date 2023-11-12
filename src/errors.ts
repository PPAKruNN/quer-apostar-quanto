import httpStatus from 'http-status';

export class ApplicationError extends Error {
    statusCode: number;

    constructor(statusCode: number, name: string, message: string) {
        super(message);

        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export function invalidDataError(message: string) {
    return new ApplicationError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid payload format', message);
}

export function insufficientBalancePolicy(balance: number, minBalance: number) {
    return new ApplicationError(
        httpStatus.BAD_REQUEST,
        'Balance below minimum',
        `Balance R$${balance / 100} is lower than the minimum R$${minBalance / 100}.`,
    );
}

export function resourceNotFound(resource: string, extra = '') {
    return new ApplicationError(httpStatus.NOT_FOUND, 'Not found', `${resource} was not found ${extra}`);
}
