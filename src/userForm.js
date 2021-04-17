import { useState } from "react"

const userForm = () => {

    const [values, setValues] = useState({
        name: '',
        number: '',
        expiration: '',
        cvc: '',
        focus: ''
    })

    const [errors, setErrors] = useState({})

    const handleFocus = e => {

    }

    const handleChange = e => {

    }

    const handleSubmit = e => {

    }

    return { handleFocus, handleChange, handleSubmit, values, errors }
}

export default userForm;