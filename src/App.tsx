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
import Form from "@/components/Form/Form";
import useFormFields from "./hooks/useFormFields";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import transformAddress, { RawAddressModel } from "./core/models/address";

type ApiOk = {
  status: "ok";
  details: AddressType[]; 
};



function App() {
  const { fields, onChange, resetFields,  } = useFormFields({
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

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setLoading(true);

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
      const payload = (await res.json())  as ApiOk 
        if (payload.status === "ok" && Array.isArray(payload.details)) {
        const list = payload.details.map((raw) =>
            transformAddress({
              city: raw.city ?? "",
              street: raw.street ?? "",
              postcode: String(raw.postcode ?? ""),
              houseNumber: (raw.houseNumber ?? houseNumber ?? "").toString(),
              firstName: "",          
              lastName: "",
              id: "",                   
            } as RawAddressModel)    
        );
        setAddresses(list);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

    const success = addAddress({ ...foundAddress, firstName, lastName });
    if (!success) {
      setError("This address already exists");
      return;
    }
    resetFields();
    setAddresses([]);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  onChange({
    target: {
      name: "selectedAddress",
      value: selectedAddress === val ? "" : val,
    },
  } as unknown as React.ChangeEvent<HTMLInputElement>);
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
              onChange={onRadioChange}
              checked={selectedAddress === address.id}
            >
              <Address {...address} />
            </Radio>
          ))}

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