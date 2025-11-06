export const en = {
    "language": "Language",
    "paymentFormTitle": "Payment Form",
    "ibanField": {
        'apiValidationFailed': "IBAN format is invalid.",
        'minLength': "IBAN must be at least 15 characters long.",
        'maxLength': "IBAN cannot exceed 34 characters."
    },
    "payerAccountIbanField": {
        "label": "Payer Account IBAN",
        "notFound": "Payer account IBAN not found."
    },
    "payeeAccountIbanField": {
        "label": "Payee Account IBAN",
        "sameAsPayer": "Payer and Payee IBANs cannot be the same."
    },
    "paymentField": {
        "label": "Payment Amount",
        "insufficientPayerBalance": "Insufficient funds in the payer account.",
        "min": "Payment amount must be at least 0.01",
    },
    "payeeField": {
        "label": "Payee",
        "required": "Payee is required.",
        "maxLength": "Payee cannot exceed 70 characters."
    },
    "purposeField": {
        "label": "Purpose",
        "required": "Purpose is required.",
        "maxLength": "Purpose cannot exceed 135 characters."
    },
    "submit": "Submit",
    "accountsInfoBanner": {
        "title": "Available payer accounts",
        "note": "Payments can be made only from the listed accounts. If payment is made to one of these accounts, the balance will update accordingly."
    },
    "currentAccountInfoBanner": {
        "currentAccount": "Current Account",
        "balance": "Balance",
        "noAccountSelected": "No account selected"
    }
};

export type Translations = typeof en;