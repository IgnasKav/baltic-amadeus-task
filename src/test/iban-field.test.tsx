import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AccountProvider, useAccount } from "@/contexts/account-context";
import { IbanField } from "@/components/inputs/iban-input";
import { defaultValues, useAppForm } from "@/lib/form-config";

// Mock fetch
globalThis.fetch = vi.fn();

const mockAccounts = [
  { id: "0", iban: "LT121000011101001000", balance: 1000.5 },
  { id: "1", iban: "LT121000011101001001", balance: -500.25 },
];

const TestComponent = () => {
  const form = useAppForm({
    ...defaultValues,
  });

  const { translations } = useAccount();

  return (
    <form>
      <IbanField
        form={form}
        label={translations.payerAccountIbanField.label}
        name="payerAccountIBAN"
      />
    </form>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AccountProvider accounts={mockAccounts}>{ui}</AccountProvider>
    </QueryClientProvider>
  );
};

describe("IbanField", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input field with label", () => {
    renderWithProviders(<TestComponent />);

    expect(screen.getByLabelText("Payer Account IBAN"));
  });

  it("validates IBAN min length", async () => {
    const user = userEvent.setup();

    renderWithProviders(<TestComponent />);

    const input = screen.getByLabelText("Payer Account IBAN");
    await user.type(input, "xx");
    await user.tab(); // trigger onBlur

    // checks if correct translation key is used
    await waitFor(() => {
      expect(screen.getByText("minLength"));
    });
  });

  it("calls API validation for valid IBAN format", async () => {
    const user = userEvent.setup();

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: true, iban: "LT121000011101001000" }),
    });

    renderWithProviders(<TestComponent />);

    const input = screen.getByLabelText("Payer Account IBAN");

    await user.type(input, "LT121000011101001000");
    await user.tab();

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("LT121000011101001000")
      );
    });
  });

  it("shows error when API validation fails", async () => {
    const user = userEvent.setup();

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: false, iban: "LT121000011101001000" }),
    });

    renderWithProviders(<TestComponent />);

    const input = screen.getByLabelText("Payer Account IBAN");

    await user.type(input, "LT121000011101001000");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("IBAN format is invalid."));
    });
  });
});
