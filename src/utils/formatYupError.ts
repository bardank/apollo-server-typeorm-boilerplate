import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
    const errors: Array<{ node: string | undefined ; message: string }> = [];
    err.inner.forEach(e => {
        errors.push({
            node: e.path,
            message: e.message
        });
    });

    return {errors};
};
