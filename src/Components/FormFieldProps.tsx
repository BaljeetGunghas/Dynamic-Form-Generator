import React from 'react';
import { FormikValues } from 'formik';

export interface FormFieldProps {
    field: {
        id: number;
        type: string;
        label: string;
        value: string | boolean;
        options?: string[];
        required:boolean;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onDelete: (id: number) => void;
    defaultValue?: FormikValues;
}
