export interface ITask {
    title: string;
    point: string;
    category: string;
    status: string;
    context?: string;  // Optional
    question?: string;  // Optional
    answer?: string;    // Optional
    link?: string;      // Optional
}
