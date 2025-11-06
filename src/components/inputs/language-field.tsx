import { useAccount } from "@/contexts/account-context";
import type { Locale } from "@/translations/translations";
import { InputLabel, MenuItem, Select } from "@mui/material";

const languages = [
  { value: "en", label: "EN" },
  { value: "lt", label: "LT" },
];

export const LanguageField = () => {
  const { locale, setLocale, translations } = useAccount();
  const handleChange = (value: Locale) => {
    setLocale(value);
  };

  return (
    <div>
      <InputLabel id="demo-simple-select-label">
        {translations.language}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale}
        label="Age"
        onChange={(event) => handleChange(event.target.value)}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.value} value={lang.value}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
