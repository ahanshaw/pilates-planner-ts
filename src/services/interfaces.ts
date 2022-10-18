export interface FilterValues {
    type: string[],
    focus: string[],
    level: string[],
    equipment: string[],
    props: string[];
};

export interface BlockValues {
    key: string,
    title: string,
    type: string,
    focus: string,
    level: string,
    equipment: string,
    props: string[],
    start: string,
    instructions: { step: string }[];
};

export interface WorkoutValues {
    user: string,
    title: string,
    description: string,
    blocks: { block: string }[];
};