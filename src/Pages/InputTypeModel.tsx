import React from 'react'
import classes from "./InputTypeModal.module.scss"
import { useFormik } from 'formik';
import { RxCrossCircled } from 'react-icons/rx';
import { Button, Form } from 'react-bootstrap';

interface ComponentsInterface {
    setIsOpen: (val: boolean) => void;
    addField: (label: string, type: string, required: boolean, options?: string,) => void;
}


const InputTypeModel = ({ setIsOpen, addField }: ComponentsInterface) => {


    const formik = useFormik({
        initialValues: {
            label: '',
            type: '',
            options: '',
            require: false
        },
        onSubmit: async (values) => {
            console.log(values);
            setIsOpen(false)
            addField(values.label, values.type, values.require, values.options,);
        },
    });



    return (
        <div className={classes.InputFormModle_mainBody}>
            <div className={classes.Modal_body}>
                <h2>Input modal</h2>

                <Form onSubmit={formik.handleSubmit} className={classes.modalForm}>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label>Field Name </Form.Label>
                        <Form.Control
                            name='label' onChange={formik.handleChange}
                        />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label>Field Type</Form.Label>
                        <Form.Select aria-label="Default select example" value={formik.values.type as string}
                            onChange={formik.handleChange}
                            name='type'>
                            <option>Open this select menu</option>
                            <option value={'Text'}>
                                Text
                            </option>
                            <option value={'Textarea'}>
                                Textarea
                            </option>
                            <option value={'Dropdown'}>
                                Dropdown
                            </option>
                            <option value={'Radio'}>
                                Radio
                            </option>
                            <option value={'Checkbox'}>
                                Checkbox
                            </option>
                        </Form.Select>
                    </Form.Group>

                    {
                        (formik.values.type === 'Dropdown' || formik.values.type === 'Checkbox' || formik.values.type === 'Radio') &&
                        <Form.Group className={classes.formGroup}>
                            <Form.Label>Options</Form.Label>
                            <Form.Control name='options' onChange={formik.handleChange} value={formik.values.options} />
                        </Form.Group>
                    }

                    <Form.Group>
                        <Form.Label>
                            Require
                        </Form.Label>
                        <Form.Control
                            type="Checkbox"
                            name="require"
                            checked={formik.values.require}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>

                    <Button className={classes.submitBtn} type='submit'>Genrate</Button>
                    <button onClick={() => setIsOpen(false)} className={classes.DeleteButton}><RxCrossCircled /></button>
                </Form>
            </div>

        </div>
    )
}

export default InputTypeModel