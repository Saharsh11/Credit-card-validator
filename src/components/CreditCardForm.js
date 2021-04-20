import React from 'react';
import "./CreditCardForm.css"
import useForm from '../useForm'
import { Button, Form, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from 'react-credit-cards'
import '../../node_modules/react-credit-cards/es/styles-compiled.css'

const CreditCardForm = () => {
    const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
    return ( 
    <div className = 'container' >
        <div className = 'box justify-content-center align-items-center' >
            <div className = 'form_Div' >
                <div className = 'credit_Card' >
                    <Cards cvc = { values.cardCvc }
                        expiry = { values.cardExpirationDate }
                        focused = { values.focus }
                        name = { values.holderName }
                        number = { values.CreditCardNumber }/> 
                </div>
                    <Form onSubmit = { handleSubmit }>
                        <Form.Group>
                            <Form.Control type = "text"
                                id = "holderName"
                                data-testid = "holderName"
                                name = "holderName"
                                placeholder = "Card Holder Name"
                                value = { values.holderName }
                                onChange = { handleChange }
                                onFocus = { handleFocus }
                                isValid = { errors.checkName }/> 
                        </Form.Group >
                        <Form.Group>
                            <Form.Control type = "number"
                                id = "CreditCardNumber"
                                data-testid = "CreditCardNumber"
                                name = "CreditCardNumber"
                                placeholder = "Credit Card Number"
                                value = { values.CreditCardNumber }
                                onChange = { handleChange }
                                onFocus = { handleFocus }
                                isValid = { errors.checkNumber }/>
                        </Form.Group >
                        <Form.Group >
                            <Form.Control type = "text"
                                id = "cardExpirationDate"
                                data-testid = "cardExpirationDate"
                                name = "cardExpirationDate"
                                placeholder = "MM/YY"
                                value = { values.cardExpirationDate }
                                onChange = { handleChange }
                                onFocus = { handleFocus }
                                isValid = { errors.checkExpiration }/>
                        </Form.Group >
                        <Form.Group >
                        <Form.Control type = "text"
                            id = "cardCvc"
                            data-testid = "cardCvc"
                            name = "cardCvc"
                            placeholder = "cvc"
                            value = { values.cardCvc }
                            onChange = { handleChange }
                            onFocus = { handleFocus }
                            isValid = { errors.checkCvc }/>
                        </Form.Group >
                        <Form.Group>
                            <Form.Control type = "text"
                                id = "cardPostalCode"
                                data-testid = "cardPostalCode"
                                name = "cardPostalCode"
                                placeholder = "Postal Code"
                                value = { values.cardPostalCode }
                                onChange = { handleChange }
                                onFocus = { handleFocus }
                                isValid = { errors.checkPostalCode }/>
                        </Form.Group >
                        <Form.Group >
                            <Form.Control type = "text"
                                id = "cardType"
                                data-testid = "cardType"
                                name = "cardType"
                                placeholder = "Card Type"
                                value = { values.cardType }
                                onChange = { handleChange }
                                onFocus = { handleFocus }
                                isValid = { errors.checkCardType }/>
                        </Form.Group>
                        <Button size = 'block'
                            id = 'validCheck'
                            data-testid = 'validCheck'
                            type = 'submit' >
                            Validate 
                        </Button> 
                    </Form>
                </div >
                <Alert id = "alertMessage"
                    data-testid = "alertMessage"
                    variant = { errors.variant }
                    show = { errors.show } >
                     { errors.message } 
                </Alert>
            </div > 
        </div>
    );
}

export default CreditCardForm;