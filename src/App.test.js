import puppeteer from "puppeteer";

let browser, page;

const valid_values = {
    holderName: "Saharsh",
    CreditCardNumber: "4111111111111111",
    cardType: "VISA",
    cardExpirationDate: "05/22",
    cardCvc: "352",
    cardPostalCode: "M3J 3P1",
};

// Complete form and submit
async function fillForm(values, page) {
    await page.click("input#holderName");
    await page.type("input#holderName", values.holderName);
    await page.click("input#CreditCardNumber");
    await page.type("input#CreditCardNumber", values.CreditCardNumber);
    await page.click("input#cardExpirationDate");
    await page.type("input#cardExpirationDate", values.cardExpirationDate);
    await page.click("input#cardCvc");
    await page.type("input#cardCvc", values.cardCvc);
    await page.click("input#cardPostalCode");
    await page.type("input#cardPostalCode", values.cardPostalCode);
    await page.click("input#cardType");
    await page.type("input#cardType", values.cardType);
    await page.click("button#validCheck");
}

// Create values object depending on which field is empty
function emptyField(index, field) {
    let values = Object.create(valid_values);
    switch (index) {
        case 0:
            values.holderName = field;
            break;
        case 1:
            values.CreditCardNumber = field;
            break;
        case 2:
            values.cardExpirationDate = field;
            break;
        case 3:
            values.cardCvc = field;
            break;
        case 4:
            values.cardPostalCode = field;
            break;
        case 5:
            values.cardType = field;
            break;
        default:
            break;
    }
    return values;
}

describe("test card animations", () => {
    const field = [
        "input#holderName",
        "input#CreditCardNumber",
        "input#cardExpirationDate",
        "input#cardPostalCode",
        "input#cardType",
    ];

    beforeEach(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
    });

    test.each(field)("focus on card front", async(field) => {
        await page.click(field);
        let cardAnimation = await page.$eval(
            "div.rccs__card",
            (card) => card.classList
        );
        expect(cardAnimation[2]).toBeFalsy();
    });

    test("focus on cvc", async() => {
        await page.click("input#cardSecurityCode");
        let cardAnimation = await page.$eval(
            "div.rccs__card",
            (card) => card.classList
        );
        expect(cardAnimation[2]).toBe("rccs__card--flipped");
    });

    afterEach(async() => {
        await browser.close();
    });
});

describe("test empty fields", () => {
    const errors = [
        [0, 'Incomplete card holder name'],
        [1, 'Incomplete credit card number'],
        [2, 'Incomplete expiration date'],
        [3, 'Incomplete credit card CVC'],
        [4, 'Incomplete postal code'],
        [5, 'Incomplete credit card type'],
    ];

    beforeEach(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
    });

    test("submit empty form", async() => {
        await page.click("button#validCheck");
        let alertMessage = await page.$eval(
            "div#alertMessage",
            (alert) => alert.textContent
        );
        expect(alertMessage).toBe('Incomplete card holder name');
    });

    test.each(errors)("submit empty field ", async(index, err) => {
        let values = emptyField(index, "");
        await fillForm(values, page);

        let alertMessage = await page.$eval(
            "div#alertMessage",
            (alert) => alert.textContent
        );
        expect(alertMessage).toBe(err);
    });

    afterEach(async() => {
        await browser.close();
    });
});

describe("test valid fields", () => {
    beforeEach(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
    });

    test("submit valid card", async() => {
        let values = Object.create(valid_values);
        await fillForm(values, page);

        let alertMessage = await page.$eval(
            "div#alertMessage",
            (alert) => alert.textContent
        );
        expect(alertMessage).toBe("Valid credit card");
    });

    afterEach(async() => {
        await browser.close();
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

    beforeEach(async() => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        await page.goto("http://192.168.2.218:3000");
    });

    test.each(errors)("submit empty field ", async(index, err, val) => {
        let values = emptyField(index, val);
        await fillForm(values, page);

        let alertMessage = await page.$eval(
            "div#alertMessage",
            (alert) => alert.textContent
        );
        expect(alertMessage).toBe(err);
    });

    afterEach(async() => {
        await browser.close();
    });
});