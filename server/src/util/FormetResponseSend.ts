const FormetResponseSend = (status: number, Message: string, data: any) => {
    return {
        status,
        message: Message,
        data
    }
};

export default FormetResponseSend;