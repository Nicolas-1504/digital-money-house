import {
    TNewCardSchema,
    NewCardSchema,
  } from "DMH/utils/schemas/newCardSchemas";

describe("SchemaPayment", () => {
    describe("when validating a complete payment schema", () => {
      it("should return true", async () => {
        const user: TNewCardSchema = {
          number: "4242424242424242",
          cvc: "123",
          expiry: "12/2029",
          name: "Pepe pepardo",
        };
        expect(await NewCardSchema.isValid(user)).toBeTruthy();
      });
    });
    describe("when validating a schema without fields", () => {
      it("should return false", async () => {
        const user: TNewCardSchema = {
          number: "",
          cvc: "",
          expiry: "",
          name: "",
        };
        expect(await NewCardSchema.isValid(user)).toBeFalsy();
      });
    });
    describe("when validating a schema with a longer number field, cvc field and name field, and wrong expiry field", () => {
      it("should return false", async () => {
        const user: TNewCardSchema = {
          number: "424242424242424242",
          cvc: "12345",
          expiry: "12/29",
          name: "Pepe Pepin Pepardo Pepudo",
        };
        expect(await NewCardSchema.isValid(user)).toBeFalsy();
      });
    });
    describe("when validating a schema with a shorter number field and cvc field, and wrong expiry field", () => {
      it("should return false", async () => {
        const user: TNewCardSchema = {
          number: "4242424242",
          cvc: "12",
          expiry: "13/2029",
          name: "Pepe Pepardo",
        };
        expect(await NewCardSchema.isValid(user)).toBeFalsy();
      });
    });
  });
  