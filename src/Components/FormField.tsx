// FormField.tsx
import React from 'react';
import { RxCrossCircled } from "react-icons/rx";
import classes from './FormField.module.scss';
import { Form } from 'react-bootstrap';
import { FormFieldProps } from './FormFieldProps';



const FormField: React.FC<FormFieldProps> = ({ field, onChange, onDelete, defaultValue }) => {

    const handleFieldChange = (e: any) => {
        onChange(e)
    };



    const renderField = () => {
        const fieldId = field.id.toString();
        switch (field.type) {
            case 'Text':
                return (
                    <Form.Control
                        // as={field.type}
                        type={field.type}
                        placeholder={field.label}
                        value={defaultValue?.fieldId}
                        name={fieldId}
                        onChange={handleFieldChange}
                        required={field.required}
                    />
                );
            case 'Textarea':
                return (
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px', width: '-webkit-fill-available' }}
                        name={fieldId}
                        onChange={handleFieldChange}
                        value={defaultValue?.fieldId}
                        required={field.required}
                    />
                );
            case 'Dropdown':
                return (
                    <Form.Select
                        value={defaultValue?.fieldId}
                        name={fieldId}
                        onChange={handleFieldChange}
                        required={field.required}
                    >
                        <option value="" disabled>Select an option</option>
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                );
            case 'Checkbox':
                return (
                    <div className={classes.optionsListSec}>
                        {field.options?.map((option) => (
                            <div key={option}>
                                <input
                                    type="Checkbox"
                                    id={option}
                                    // checked={defaultValue?.fieldId || field.value === option}
                                    name={fieldId}
                                    onChange={handleFieldChange}
                                    value={defaultValue?.fieldId}
                                    required={field.required}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                    </div>
                );
            case 'Radio':
                return (
                    <div className={classes.optionsListSec}>
                        {field.options?.map((option) => (
                            <div key={option}>
                                <Form.Control
                                    type="Radio"
                                    id={option}
                                    // checked={defaultValue?.fieldId || field.value === option}
                                    name={fieldId}
                                    onChange={handleFieldChange}
                                    value={defaultValue?.fieldId}
                                    required={field.required}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={classes.formFields}>
                <div className={classes.FormInputSec}>
                    <label aria-required='true'>{field.label}{field.required && <span className={classes.required}>*</span>}</label>
                    {renderField()}
                </div>
                <button onClick={() => onDelete(field.id)} className={classes.DeleteButton}><RxCrossCircled /></button>
            </div>
            {/* <p className={classes.error} >Required</p> */}
            {/* <div>
            </div> */}
        </>
    );
};

export default FormField;
