const FormetResponseErrorSend = (status: number, errorMessage: string, error: any) => {
    return {
        status,
        errorMessage,
        error
    }
};

export default FormetResponseErrorSend;