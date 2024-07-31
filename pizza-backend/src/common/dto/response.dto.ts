export class SuccessResponseDto<T> {
    Success : boolean
    Message : String;
    Data : T;
}

export class ErrorResponseDto {
    Success : boolean;
    Message : String;
    Error : {
        Code : number;
        Message: string;
    };
}