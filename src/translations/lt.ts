import type { Translations } from "./en";

export const lt: Translations = {
    "language": "Kalba",
    "paymentFormTitle": "Mokėjimo forma",
    "ibanField": {
        'apiValidationFailed': "IBAN formatas yra neteisigas.",
        'minLength': "IBAN turi būti bent 15 simbolių ilgio.",
        'maxLength': "IBAN negali viršyti 34 simbolių."
    },
    "payerAccountIbanField": {
        "label": "Siuntėjo sąskaitos IBAN",
        "notFound": "Siuntėjo sąskaitos IBAN nerastas."
    },
    "payeeAccountIbanField": {
        "label": "Gavėjo sąskaitos IBAN",
        "sameAsPayer": "Siuntėjo ir gavėjo IBAN negali būti tas pats."
    },
    "paymentField": {
        "label": "Mokėjimo suma",
        "insufficientPayerBalance": "Nepakanka lėšų siuntėjo sąskaitoje.",
        "min": "Mokėjimo suma turi būti bent 0.01",
    },
    "payeeField": {
        "label": "Gavėjas",
        "required": "Gavėjas yra privalomas.",
        "maxLength": "Gavėjas negali viršyti 70 simbolių."
    },
    "purposeField": {
        "label": "Tikslas",
        "required": "Tikslas yra privalomas.",
        "maxLength": "Tikslas negali viršyti 135 simbolių."
    },
    "submit": "Pateikti",
    "accountsInfoBanner": {
        "title": "Galimos mokėtojo sąskaitos",
        "note": "Mokėjimai gali būti atliekami tik iš nurodytų sąskaitų. Jei mokėjimas atliekamas į vieną iš šių sąskaitų, likutis bus atitinkamai atnaujintas."
    },
    "currentAccountInfoBanner": {
        "currentAccount": "Einamoji sąskaita",
        "balance": "Likutis",
        "noAccountSelected": "Nėra pasirinktos sąskaitos"
    }
};