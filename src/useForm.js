import { useState } from 'react'

import checkInfoValidation from './checkInfoValidation';

const useForm = () => {

    const [values, setValues] = useState({
        holderName: '',
        CreditCardNumber: '',
        cardExpirationDate: '',
        cardCvc: '',
        cardPostalCode: '',
        cardType: '',
        focus: ''
    })

    const [errors, setErrors] = useState({})

    const handleFocus = e => {
        setValues({
            ...values,
            // Quick fix for enabling focus on back of the card 
            focus: (e.target.name === 'cardCvc') ? 'cvc' : e.target.name
        })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(checkInfoValidation(values))
    }

    return { handleFocus, handleChange, handleSubmit, values, errors }
}

export default useForm;