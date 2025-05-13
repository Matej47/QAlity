"use client";

import { useRef, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [selectedShop, setSelectedShop] = useState<"OXID" | "Plenty" | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<string | null>(null);
  const [customQuantity, setCustomQuantity] = useState<number>(1);
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [article, setArticle] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });
  const handleCreate = () => {
    // Clear any previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Check for required fields
    if (
      !selectedShop ||
      !selectedCountry ||
      !selectedQuantity ||
      (selectedQuantity === "Custom" && customQuantity <= 0) ||
      !article ||
      !customerType ||
      !customerStatus ||
      !contact.email ||
      (!useDefaultAddress && Object.values(address).every((val) => val === ""))
    ) {
      setErrorMessage("Please fill in all required fields before creating!");
      setTimeout(() => setErrorMessage(null), 5000); // Hide after 5s
      return;
    }

    // Success!
    setSuccessMessage("✅ Test case created successfully!");
    setTimeout(() => setSuccessMessage(null), 5000); // Hide after 5s

    // Your logic to handle the created test case can go here
    const testCase = generateTestCase();
    console.log("Test Case:", testCase);
  };

  const [customerType, setCustomerType] = useState<"B2B" | "B2C" | null>(null);
  const [customerStatus, setCustomerStatus] = useState<
    "New" | "Existing" | null
  >(null);
  const exampleAddresses: { [key: string]: any } = {
    Slovakia: {
      firstName: "Ján",
      lastName: "Novák",
      street: "Hlavná 123",
      zip: "04001",
      city: "Košice",
      state: "",
    },
    Germany: {
      firstName: "Max",
      lastName: "Mustermann",
      street: "Musterstraße 12",
      zip: "10115",
      city: "Berlin",
      state: "",
    },
    Polish: {
      firstName: "Jan",
      lastName: "Kowalski",
      street: "Ulica Kwiatowa 5",
      zip: "00-001",
      city: "Warszawa",
      state: "",
    },
    Spain: {
      firstName: "Juan",
      lastName: "Pérez",
      street: "Calle Mayor 10",
      zip: "28013",
      city: "Madrid",
      state: "",
    },
    France: {
      firstName: "Jean",
      lastName: "Dupont",
      street: "12 Rue Lafayette",
      zip: "75009",
      city: "Paris",
      state: "",
    },
    All: {
      firstName: "Alex",
      lastName: "Doe",
      street: "Global Street 1",
      zip: "00000",
      city: "WorldCity",
      state: "",
    },
  };

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    zip: "",
    city: "",
    state: "",
  });

  const generateTestCase = () => {
    const testCase: any = {};

    if (selectedShop) testCase.shop = selectedShop;
    if (selectedCountry) testCase.country = selectedCountry;

    // Quantity logic: button or custom
    if (selectedQuantity === "Custom") {
      testCase.quantity = customQuantity; // Use customQuantity value
    } else if (selectedQuantity) {
      testCase.quantity = Number(selectedQuantity); // For predefined quantities
    }

    // Article (if you have an article state)
    if (article) testCase.article = article;

    if (customerType) testCase.customerType = customerType;
    if (customerStatus) testCase.customerStatus = customerStatus;

    if (contact.email) testCase.email = contact.email;
    if (contact.phone) testCase.phone = contact.phone;

    // Address logic
    if (useDefaultAddress || Object.values(address).some((val) => val !== "")) {
      testCase.address = {};
      Object.entries(address).forEach(([key, value]) => {
        if (value) testCase.address[key] = value;
      });
    }

    // Payment logic
    if (selectedPayment) testCase.payment = selectedPayment;

    return JSON.stringify(testCase, null, 2);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Set to content height
    }
  }, [generateTestCase()]); // Trigger whenever JSON changes

  const handleDefaultAddress = () => {
    const exampleAddresses: { [key: string]: any } = {
      Slovakia: {
        firstName: "Ján",
        lastName: "Novák",
        street: "Hlavná 123",
        zip: "04001",
        city: "Košice",
        state: "",
      },
      Germany: {
        firstName: "Max",
        lastName: "Mustermann",
        street: "Musterstraße 12",
        zip: "10115",
        city: "Berlin",
        state: "",
      },
      Polish: {
        firstName: "Jan",
        lastName: "Kowalski",
        street: "Ulica Kwiatowa 5",
        zip: "00-001",
        city: "Warszawa",
        state: "",
      },
      Spain: {
        firstName: "Juan",
        lastName: "Pérez",
        street: "Calle Mayor 10",
        zip: "28013",
        city: "Madrid",
        state: "",
      },
      France: {
        firstName: "Jean",
        lastName: "Dupont",
        street: "12 Rue Lafayette",
        zip: "75009",
        city: "Paris",
        state: "",
      },
      All: {
        firstName: "Alex",
        lastName: "Doe",
        street: "Global Street 1",
        zip: "00000",
        city: "WorldCity",
        state: "",
      },
    };

    setUseDefaultAddress((prev) => {
      const next = !prev;
      if (next) {
        setAddress(
          selectedCountry && exampleAddresses[selectedCountry]
            ? exampleAddresses[selectedCountry]
            : {
                firstName: "John",
                lastName: "Doe",
                street: "Test Street 123",
                zip: "12345",
                city: "Testville",
                state: "Testland",
              }
        );
      } else {
        setAddress({
          firstName: "",
          lastName: "",
          street: "",
          zip: "",
          city: "",
          state: "",
        });
      }
      return next;
    });
  };

  const handleSelect = (shop: "OXID" | "Plenty") => {
    setSelectedShop((prev) => (prev === shop ? null : shop));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-black">
        <div className="font-bold text-3xl text-yellow-400">
          QAlity <span className="text-base font-normal">v0.1a</span>
        </div>
        <div className="font-semibold text-2xl text-white">Order Creator</div>
        <div className="font-bold text-3xl text-yellow-400">BBG</div>
      </header>

      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700 relative">
        <Link
          href="/"
          className="text-yellow-400 bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          &larr; Back
        </Link>

        {errorMessage && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded shadow-lg">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg">
            {successMessage}
          </div>
        )}

        <button
          onClick={handleCreate}
          className="text-yellow-400 bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          Create
        </button>
      </div>

      <main className="flex flex-1">
        <div className="w-2/3 border-r border-gray-700 p-6">
          {/* Shop buttons selection */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">Shops:</span>
            {["OXID", "Plenty"].map((shop) => (
              <button
                key={shop}
                onClick={() => handleSelect(shop as "OXID" | "Plenty")}
                className={`px-3 py-1 rounded mr-2 transition ${
                  selectedShop === shop
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                }`}
              >
                {shop}
              </button>
            ))}
          </div>

          {/* Country buttons selection */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">Country:</span>
            {["Slovakia", "Germany", "Polish", "Spain", "France", "All"].map(
              (country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry((prev) => {
                      const newCountry = prev === country ? null : country;

                      if (newCountry) {
                        setAddress(
                          exampleAddresses[newCountry] || {
                            firstName: "",
                            lastName: "",
                            street: "",
                            zip: "",
                            city: "",
                            state: "",
                          }
                        );
                        setUseDefaultAddress(true);
                      } else {
                        setAddress({
                          firstName: "",
                          lastName: "",
                          street: "",
                          zip: "",
                          city: "",
                          state: "",
                        });
                        setUseDefaultAddress(false);
                      }

                      return newCountry;
                    });
                  }}
                  className={`px-3 py-1 rounded mr-2 transition ${
                    selectedCountry === country
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  }`}
                >
                  {country}
                </button>
              )
            )}
          </div>

          {/* Customer Selection */}
          <div className="mb-4 flex">
            <span className="mr-2 text-yellow-400 font-semibold whitespace-nowrap">
              Customer:
            </span>
            <div className="flex flex-col">
              <div className="flex mb-2">
                {["B2B", "B2C"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setCustomerType((prev) =>
                        prev === type ? null : (type as "B2B" | "B2C")
                      )
                    }
                    className={`px-3 py-1 rounded mr-2 transition ${
                      customerType === type
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex">
                {["New", "Existing"].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setCustomerStatus((prev) =>
                        prev === status ? null : (status as "New" | "Existing")
                      )
                    }
                    className={`px-3 py-1 rounded mr-2 transition ${
                      customerStatus === status
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    }`}
                  >
                    {status} customer
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Address Fields */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-yellow-400 font-semibold">
                Address:
              </span>
              <button
                onClick={handleDefaultAddress}
                className={`px-3 py-1 rounded mr-2 transition ${
                  useDefaultAddress
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                }`}
              >
                Default
              </button>
            </div>

            <div className="flex mb-2">
              <input
                type="text"
                placeholder="First Name"
                value={address.firstName}
                onChange={(e) =>
                  setAddress({ ...address, firstName: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded mr-2 w-1/2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={address.lastName}
                onChange={(e) =>
                  setAddress({ ...address, lastName: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded w-1/2"
              />
            </div>

            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Street + Number"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded mr-2 w-2/3"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded w-1/3"
              />
            </div>

            <div className="flex">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded mr-2 w-1/2"
              />
              <input
                type="text"
                placeholder="State / Region (optional)"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded w-1/2"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">Contact:</span>

            <input
              type="email"
              placeholder="Email Address"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded mr-2 w-64"
            />

            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded w-64"
            />
          </div>

          {/* Articles drop down menu */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">Article:</span>
            <select
              className="bg-gray-700 border border-gray-700 text-yellow-400 p-2 rounded"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            >
              <option value="">Select article</option>
              <option value="Basic article - 10005399">
                Basic article - 10005399
              </option>
              <option value="Spare Parts article - 10004379">
                Spare Parts article - 10004379
              </option>
              <option value="Kit article - 10005422">
                Kit article - 10005422
              </option>
              <option value="Large-scale article - 10009912">
                Large-scale article - 10009912
              </option>
              <option value="B-ware article - 10009912">
                B-ware article - 10009912
              </option>
            </select>
          </div>

          {/* Quantity Selection */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">
              Quantity:
            </span>

            {["1", "2", "Custom"].map((qty) => (
              <button
                key={qty}
                onClick={() =>
                  setSelectedQuantity((prev) => (prev === qty ? null : qty))
                }
                className={`px-3 py-1 rounded mr-2 transition ${
                  selectedQuantity === qty
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                }`}
              >
                {qty}
              </button>
            ))}
            {selectedQuantity === "Custom" && (
              <input
                type="number"
                min="1"
                className="bg-gray-700 border border-gray-600 text-yellow-400 px-3 py-1 rounded w-24 ml-2 align-middle leading-none"
                value={customQuantity}
                onChange={(e) => setCustomQuantity(Number(e.target.value))}
                placeholder="Number"
              />
            )}
          </div>

          {/* Payment drop down menu */}
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-yellow-400 font-semibold">Payment:</span>
            <select
              className="bg-gray-700 border border-gray-700 text-yellow-400 p-2 rounded"
              onChange={(e) => setSelectedPayment(e.target.value)} // Capture selected payment
              value={selectedPayment} // Bind the selected payment to the state
            >
              <option value="">Select payment method</option>
              <option>Google pay</option>
              <option>PayPal</option>
              <option>PayPal paylater</option>
              <option>Debit/Credit card</option>
              <option>Prepayment</option>
              <option>Klarna (pay now)</option>
              <option>Klarna (pay over time)</option>
              <option>Klarna (pay later)</option>
            </select>
          </div>
        </div>

        {/* Right Pane: Test Cases */}
        <div className="w-1/3 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-yellow-400">Test Cases</h2>
            <button className="text-yellow-400 border border-yellow-400 px-2 py-1 rounded hover:bg-yellow-400 hover:text-gray-800">
              Cross Validation
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-yellow-400 font-semibold mb-2">Test Cases:</h2>
            <textarea
              ref={textareaRef}
              className="w-full bg-gray-800 text-yellow-300 p-2 rounded border border-gray-700 overflow-hidden resize-none"
              readOnly
              value={generateTestCase()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
