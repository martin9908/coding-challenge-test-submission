import { Address } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface AddressBookState {
  addresses: Address[];
}

// Define the initial state using that type
const initialState: AddressBookState = {
  addresses: [],
};

export const addressBookSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      /** Prevent duplicate addresses
       * Here we assume uniqueness is based on a combination of postcode + streetnumber
       * (adjust if your Address type has an `id` or other unique key)
       */
      const exists = state.addresses.some(
        (addr) =>
          addr.postcode === action.payload.postcode &&
          addr.street === action.payload.street
      );

      if (!exists) {
        state.addresses.push(action.payload);
      }
    },
    removeAddress: (state, action: PayloadAction<Address>) => {
      /** Remove address by ID (or another unique field) */
      state.addresses = state.addresses.filter(
        (addr) =>
          !(
            addr.postcode === action.payload.postcode &&
            addr.street === action.payload.street
          )
      );
    },
    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
  },
});

export const { addAddress, removeAddress, updateAddresses } =
  addressBookSlice.actions;

// Selector
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
