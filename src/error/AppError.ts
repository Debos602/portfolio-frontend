class AppError extends Error {
    public status: number;
    public statusText: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.statusText = message;
    }
}

export default AppError;
