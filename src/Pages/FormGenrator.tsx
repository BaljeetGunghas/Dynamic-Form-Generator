// FormGenerator.tsx
import React, { useState } from 'react';
import classes from './FormGenrator.module.scss';
import FormField from '@/Components/FormField';
import InputTypeModel from './InputTypeModel';
import { useFormik } from 'formik';
import { validateSchema } from '@/utils/schema';

interface FormFieldConfig {
    id: number;
    type: string;
    label: string;
    value: string | boolean;
    options?: string[];
    required: boolean;
}

const FormGenerator: React.FC = () => {
    const [formFields, setFormFields] = useState<FormFieldConfig[]>([]);
    const [isInputModelOpen, setIsInputModelOpen] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {},
        // validationSchema: validateSchema,
        onSubmit: async (values) => {
            const formValuesJson = formFields.reduce((json, field) => {
                json[field.label.toLowerCase().trim().replace(" ", "_")] = field.value;
                return json;
            }, {} as Record<string, string | boolean>);

            console.log("Form Values JSON:", formValuesJson);
            console.log(formik.values, '>>>>>>');

        },
    });


    const addFormField = (
        label: string,
        type: string,
        required: boolean,
        options?: string,
        value?: string,
    ) => {
        const newField: FormFieldConfig = {
            id: Date.now(),
            type: type,
            label: label || `Field ${formFields.length + 1}`,
            value: type === 'Dropdown' || type === 'Checkbox' || type === 'Radio' ? options?.trim()?.split(',')[0] || '' : '',
            options: options?.split(',') || [],
            required: required,
        };

        setFormFields([...formFields, newField]);
        formik.setFieldValue(newField.label.toLowerCase().trim().replace(" ", "_"), newField.value);
    };

    const deleteFormField = (id: number) => {
        const updatedFields = formFields.filter((field) => field.id !== id);
        setFormFields(updatedFields);
    };


    const handleFieldType = () => {
        setIsInputModelOpen(true);
    };

    return (
        <div className={classes.main_Body}>
            <div className={classes.leftBody}>
                <button type="button" onClick={handleFieldType}>
                    Add Text Field
                </button>
            </div>
            <form onSubmit={formik.handleSubmit} className={classes.formMainBody}>
                {formFields.length < 1 && (
                    <div className={classes.EmptyFormBody}>
                        <h2>Create New Form</h2>
                    </div>
                )}

                {formFields.map((field) => (
                    <FormField
                        key={field.id}
                        field={field}
                        onChange={(e) => {
                            // Manually handle Checkbox and Radio changes
                            if (field.type === 'Checkbox' || field.type === 'Radio') {
                                const updatedValue = e.target.type === 'Checkbox' ? e.target.type : e.target.value;
                                setFormFields((prevFields) =>
                                    prevFields.map((prevField) =>
                                        prevField.id === field.id ? { ...prevField, value: updatedValue } : prevField
                                    )
                                );
                            } else {
                                formik.handleChange(e);
                            }
                        }}
                        onDelete={deleteFormField}
                    />
                ))}
                {formFields.length >= 1 && (
                    <button type="submit" className={classes.formButton}>
                        Submit
                    </button>
                )}
            </form>
            {isInputModelOpen && <InputTypeModel setIsOpen={setIsInputModelOpen} addField={addFormField} />}
        </div>
    );
};

export default FormGenerator;
