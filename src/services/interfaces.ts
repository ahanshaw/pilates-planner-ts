export interface FilterValues {
    type: string[],
    focus: string[],
    level: string[],
    equipment: string[],
    props: string[];
};

export interface BlockValues {
    title: string,
    type: string,
    focus: string,
    level: string,
    equipment: string,
    props: string[],
    start: string,
    instructions: { step: string }[];
};