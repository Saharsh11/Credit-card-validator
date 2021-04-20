import valid from 'card-validator'

export default function checkInfoValidation(values) {
    let errors = {}
    let creditCard = valid.number(values.CreditCardNumber)

    creditCard.expirationDate = valid.expirationDate(values.cardExpirationDate)
    creditCard.cvv = valid.cvv(values.cardCvc)
    creditCard.cardholderName = valid.cardholderName(values.holderName)
    creditCard.postalCode = valid.postalCode(values.cardPostalCode)

    console.log(creditCard)
    errors.show = true
    errors.variant = 'danger'
    errors.message = 'please try again.'
    errors.checkName = false
    errors.checkNumber = false
    errors.checkExpiration = false
    errors.checkCvc = false
    errors.checkPostalCode = false
    errors.checkCardType = false

    //Checking Credit type Validation
    if (
        values.cardType === null || !values.cardType || creditCard.card === null
    ) {
        errors.message = 'Incomplete credit card type'
    } else if (
        creditCard.card.type && creditCard.card.type.toUpperCase() === values.cardType.toUpperCase()
    ) {
        errors.checkCardType = true
    } else {
        errors.message = 'Invalid credit card type'
    }

    //Checking Card Holder's postal code Validation
    if (values.cardPostalCode === null || !values.cardPostalCode.trim()) {
        errors.message = 'Incomplete postal code'
    } else if (creditCard.postalCode.isValid) {
        errors.checkPostalCode = true
    } else {
        errors.message = 'Invalid card postal code'
    }

    //Checking Credit Card CVC Validation
    if (values.cardCvc === null || !values.cardCvc.trim()) {
        errors.message = 'Incomplete credit card CVC'
    } else if (creditCard.cvv.isValid) {
        errors.checkCvc = true
    } else {
        errors.message = 'Invalid credit card CVC'
    }
    
    //Checking Credit Card Expiration Date Validation
    if (values.cardExpirationDate === null || !values.cardExpirationDate.trim()) {
        errors.message = 'Incomplete expiration date'
    } else if (creditCard.expirationDate.isValid) {
        errors.checkExpiration = true
    } else {
        errors.message = 'Invalid card expiration date'
    }

    //Card Credit Card Number Verification
    if (values.CreditCardNumber === null || !values.CreditCardNumber.trim()) {
        errors.message = "Incomplete credit card number";
    } else if (creditCard.isValid) {
        errors.checkNumber = true;
    } else {
        errors.message = "Invalid credit card number";
    }

    //Checking Credit Cardholder Name Validation
    if (values.holderName === null || !values.holderName.trim()) {
        errors.message = 'Incomplete card holder name'
    } else if (creditCard.cardholderName.isValid) {
        errors.checkName = true
    } else {
        errors.message = 'Invalid card holder name'
    }

    if (errors.checkCardType &&
        errors.checkName &&
        errors.checkNumber &&
        errors.checkCvc &&
        errors.checkExpiration &&
        errors.checkPostalCode) {
        errors.variant = 'success'
        errors.message = 'Valid credit card'
    }

    return errors
}