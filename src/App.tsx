import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";
import useFormFields from "@/hooks/useFormFields";
import Form from "@/components/Form/Form";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

// helper
function transformAddress(addr: AddressType, houseNumber: string): AddressType {
  return { ...addr, houseNumber };
}

function App() {
  const { fields, onChange, resetFields, setFields } = useFormFields({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });

  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    fields;

  const [error, setError] = React.useState<string>();
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { addAddress } = useAddressBook();

  /**  fetch addresses */
  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setLoading(true);

    // validation
    if (!postCode.trim()) {
      setError("Post code is required");
      setLoading(false);
      return;
    }
    if (!houseNumber.trim()) {
      setError("House number is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
      );
      if (!res.ok) throw new Error("Failed to fetch addresses");
      const data: AddressType[] = await res.json();
      setAddresses(data.map((a) => transformAddress(a, houseNumber)));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**  validate + add person */
  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required");
      return;
    }
    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find((a) => a.id === selectedAddress);
    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName, lastName });
    resetFields();
    setAddresses([]);
  };

  const handleClear = () => {
    resetFields();
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>

        {/*  Find Address Form */}
        <Form
          legend="🏠 Find an address"
          onSubmit={handleAddressSubmit}
          submitLabel="Find"
        >
          <div className={styles.formRow}>
            <InputText
              name="postCode"
              onChange={onChange}
              placeholder="Post Code"
              value={postCode}
              required
              minLength={4}
            />
          </div>
          <div className={styles.formRow}>
            <InputText
              name="houseNumber"
              onChange={onChange}
              placeholder="House Number"
              value={houseNumber}
              required
            />
          </div>
        </Form>

        {loading && <p>Loading addresses...</p>}

        {addresses.length > 0 &&
          addresses.map((address) => (
            <Radio
              key={address.id}
              id={address.id}
              name="selectedAddress"
              onChange={onChange}
              checked={selectedAddress === address.id}
            >
              <Address {...address} />
            </Radio>
          ))}

        {/*  Add Personal Info Form */}
        {selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
            submitLabel="Add to addressbook"
          >
            <div className={styles.formRow}>
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={onChange}
                value={firstName}
                required
              />
            </div>
            <div className={styles.formRow}>
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={onChange}
                value={lastName}
                required
              />
            </div>
          </Form>
        )}

        {error && <ErrorMessage message={error} />}

        <Button variant="secondary" onClick={handleClear}>
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
