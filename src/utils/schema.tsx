import * as Yup from "yup";


export const validateSchema = Yup.object().shape({
    textbox: Yup.string()
        .nullable()
        .default("")
        .max(1000, "Maximum 1000 characters allowed")
        .matches(
            /[a-zA-Z0-9,.'":() -]+/,
            `Only alphabets, numbers, spaces, commas, periods, single quotes, colons, double quotes, hyphens, parentheses are allowed.`
        ),
});