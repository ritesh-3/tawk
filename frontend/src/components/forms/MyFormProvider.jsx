import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

MyFormProvider.propTypes = {
    children: PropTypes.node,
    methods: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default function MyFormProvider({ children, onSubmit, methods }) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
