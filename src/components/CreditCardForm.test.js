import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import CreditCardForm from "./CreditCardForm"
import checkInfoValidation from "../checkInfoValidation"

const valid_values = {
    holderName: "Saharsh",
    CreditCardNumber: "4111111111111111",
    cardExpirationDate: "05/22",
    cardCvc: "352",
    cardPostalCode: "M3J 3P1",
    cardType: "VISA",
}

const null_Values = {
    holderName: "",
    CreditCardNumber: "",
    cardExpirationDate: "",
    cardCvc: "",
    cardPostalCode: "",
    cardType: "",
}

function validations(index, field, msg) {
    let vals = {
        show: true,
        message: "Please try again",
        variant: "danger",
        checkName: true,
        checkNumber: true,
        checkExpiration: true,
        checkCvc: true,
        checkPostalCode: true,
        checkCardType: true,
    }
    let values = Object.create(valid_values);

    switch (index) {
        case 0:
            vals.checkName = false;
            values.holderName = field;
            break;
        case 1:
            vals.checkNumber = false;
            if (field === "") {
                vals.checkCardType = false;
            }
            values.CreditCardNumber = field;
            break;
        case 2:
            vals.checkExpiration = false;
            values.cardExpirationDate = field;
            break;
        case 3:
            vals.checkCvc = false;
            values.cardCvc = field;
            break;
        case 4:
            vals.checkPostalCode = false;
            values.cardPostalCode = field;
            break;
        case 5:
            vals.checkCardType = false;
            values.cardType = field;
            break;
        default:
            break;
    }
    vals.message = msg;
    return [values, vals];
}

describe("test form rendering", () => {
    const elements = [
        "holderName",
        "CreditCardNumber",
        "cardExpirationDate",
        "cardCvc",
        "cardPostalCode",
        "cardType",
        "validCheck",
        "alertMessage",
    ];

    test.each(elements)("focus on card front", async(element) => {
        let { getByTestId } = render( < CreditCardForm /> );
        expect(getByTestId(element)).toBeTruthy();
    });
});

describe("test form functionality", () => {
    const field = [
        ["holderName", valid_values.holderName],
        ["CreditCardNumber", valid_values.CreditCardNumber],
        ["cardExpirationDate", valid_values.cardExpirationDate],
        ["cardCvc", valid_values.cardCvc],
        ["cardPostalCode", valid_values.cardPostalCode],
        ["cardType", valid_values.cardType],
    ];

    test.each(field)("focus on card front", async(field, values) => {
        let { getByTestId } = render( < CreditCardForm / > );
        await act(async() => {
            await fireEvent.focus(getByTestId(field));
            await fireEvent.change(getByTestId(field), {
                target: { value: values },
            });
        });

        expect(getByTestId(field).value).toBe(values);
    });

    test("test onSubmit", () => {
        let { getByTestId } = render( < CreditCardForm / > );
        act(() => {
            fireEvent.click(getByTestId("validCheck"));
        });
        expect(getByTestId("alertMessage").className).toBe(
            "fade alert alert-danger show"
        );
    });
});

describe("test empty fields", () => {
    
    const null_values = {
        holderName: "",
        CreditCardNumber: "",
        cardExpirationDate: "",
        cardCvc: "",
        cardPostalCode: "",
        cardType: "",
    }

    const messages = [
        [0, '', 'Incomplete card holder name'],
        [1, '', 'Incomplete credit card number'],
        [2, '', 'Incomplete expiration date'],
        [3, '', 'Incomplete credit card CVC'],
        [4, '', 'Incomplete postal code'],
        [5, '', 'Incomplete credit card type'],
    ];

    test("test null card", () => {
        expect(checkInfoValidation(null_values)).toStrictEqual({
            message: "Incomplete card holder name",
            show: true,
            variant: "danger",
            checkName: false,
            checkNumber: false,
            checkExpiration: false,
            checkCvc: false,
            checkPostalCode: false,
            checkCardType: false,
        });
    });

    test.each(messages)("test empty card field", (index, field, messages) => {
        let values = validations(index, field, messages);
        expect(checkInfoValidation(values[0])).toStrictEqual(values[1]);
    });
});

describe("test valid fields", () => {
    test("test valid card", () => {
        const result = {
            message: "Valid credit card",
            show: true,
            variant: "success",
            checkName: true,
            checkNumber: true,
            checkExpiration: true,
            checkCvc: true,
            checkPostalCode: true,
            checkCardType: true,
        };
        expect(checkInfoValidation(valid_values)).toStrictEqual(result);
    });
});

describe("test invalid fields", () => {
    const errors = [
        [0, "Invalid card holder name", "4111111111111111"],
        [1, "Invalid credit card number", "411111111111111111111111"],
        [2, "Invalid card expiration date", "0505/20222022"],
        [3, "Invalid credit card CVC", "0"],
        [4, "Invalid card postal code", "0"],
        [5, "Invalid credit card type", "VC"],
    ];

    test.each(errors)("test empty card field", (index, messages, field) => {
        let values = validations(index, field, messages);
        expect(checkInfoValidation(values[0])).toStrictEqual(values[1]);
    });
});