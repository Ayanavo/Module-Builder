export type FieldModel = {
    id: string;
    type: string;
    label: string;
    input: boolean;
    default: string;
    options: Array<any>;
    validators: Object;
    "col-width": string;
    seq: number;
};
