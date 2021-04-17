import react from 'react';
import userForm from '../userForm'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from 'react-credit-cards'
import 'node_modules\react-credit-cards\es\styles-compiled.css'

const CreditCardForm = () => {
    const { handleChange, handleFocus, handleSubmit, values, errors } = userForm();
    return ( <
        div className = 'container' >
        <
        div className = 'box justify-content-center align-items-center' >
        <
        div className = 'formDiv' >
        <
        div className = 'creditCard' >
        <
        Cards cvc = { values.cvc }
        expiry = { values.expiration }
        focused = { values.focus }
        name = { values.name }
        number = { values.number }
        /> < /
        div > <
        /div> < /
        div > <
        /div>
    );
}

export default CreditCardForm;