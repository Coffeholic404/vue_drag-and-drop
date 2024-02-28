export type ID = string;

export interface Column{
    id: ID;
    title: string;
    // eslint-disable-next-line no-use-before-define
    tasks: Task[]
}

export interface Task{
    id: ID;
    title: string;
    createdAt: Date;
}
