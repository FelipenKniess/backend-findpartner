﻿class AppError {
    public message: string;
    public code: number;

    constructor(message: string, code = 400){
        this.message = message;
        this.code = code;
    }
}

export default AppError;
