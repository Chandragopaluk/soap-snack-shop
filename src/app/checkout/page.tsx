"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";

type AccountStep = "choice" | "guest" | "signed-in";

interface ShippingForm {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
}

export default function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const user = useStore((s) => s.user);
  const isGuest = useStore((s) => s.isGuest);
  const setGuest = useStore((s) => s.setGuest);
  const setUser = useStore((s) => s.setUser);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const clearCart = useStore((s) => s.clearCart);

  const [accountStep, setAccountStep] = useState<AccountStep>(
    user ? "signed-in" : "choice"
  );
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "apple"
  >("card");
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 30 ? 0 : 4.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    const num = `SS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "user-1",
      name: loginEmail.split("@")[0],
      email: loginEmail,
    });
    setAccountStep("signed-in");
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ id: "user-new", name: createName, email: createEmail });
    setAccountStep("signed-in");
  };

  const handleContinueAsGuest = () => {
    setGuest(true);
    setAccountStep("guest");
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Nothing to check out
        </h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link
          href="/products"
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank You!
          </h1>
          <p className="text-gray-500 mb-6">
            Your order has been placed successfully.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-lg font-mono font-bold text-purple-600">
              {orderNumber}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email has been sent to your email address. You can
            track your order in your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/profile"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canPlaceOrder =
    (accountStep === "signed-in" || accountStep === "guest") &&
    (accountStep === "signed-in" ||
      (shippingForm.name &&
        shippingForm.email &&
        shippingForm.address &&
        shippingForm.city &&
        shippingForm.postcode));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Checkout Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Account */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-lg font-bold text-gray-900">Account</h2>
            </div>

            {accountStep === "choice" && (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm mb-4">
                  How would you like to proceed?
                </p>

                {/* Sign In */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Sign In</h3>
                  <form onSubmit={handleSignIn} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                    >
                      Sign In
                    </button>
                  </form>
                </div>

                {/* Create Account */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Create Account
                  </h3>
                  <form onSubmit={handleCreateAccount} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={createEmail}
                      onChange={(e) => setCreateEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
                    >
                      Create Account
                    </button>
                  </form>
                </div>

                {/* Guest */}
                <button
                  onClick={handleContinueAsGuest}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  <span className="font-semibold text-gray-700">
                    Continue as Guest
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">
                    No account needed
                  </span>
                </button>
              </div>
            )}

            {accountStep === "signed-in" && user && (
              <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Logged in as {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-green-600 text-sm font-medium">
                  Saved address will be used
                </span>
              </div>
            )}

            {accountStep === "guest" && (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Please enter your shipping details.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={shippingForm.name}
                      onChange={(e) =>
                        setShippingForm({ ...shippingForm, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          address: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          city: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={shippingForm.postcode}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          postcode: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Order Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-3"
                >
                  <div className="w-14 h-14 flex-shrink-0">
                    <ProductImage
                      product={item.product}
                      size="sm"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    &pound;{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-lg font-bold text-gray-900">Payment</h2>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-amber-800 font-medium">
                DEMO MODE &mdash; No real payments will be processed
              </p>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  paymentMethod === "card"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  paymentMethod === "paypal"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                PayPal
              </button>
              <button
                onClick={() => setPaymentMethod("apple")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  paymentMethod === "apple"
                    ? "border-gray-900 bg-gray-100 text-gray-900"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Apple Pay
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number{" "}
                    <span className="text-xs text-gray-400">(DEMO)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardForm.number}
                    onChange={(e) =>
                      setCardForm({ ...cardForm, number: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry{" "}
                      <span className="text-xs text-gray-400">(DEMO)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={(e) =>
                        setCardForm({ ...cardForm, expiry: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV{" "}
                      <span className="text-xs text-gray-400">(DEMO)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardForm.cvv}
                      onChange={(e) =>
                        setCardForm({ ...cardForm, cvv: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">P</span>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  Pay with PayPal
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  You will be redirected to PayPal to complete your payment.
                </p>
                <button className="bg-blue-500 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm">
                  Connect PayPal (Demo)
                </button>
              </div>
            )}

            {paymentMethod === "apple" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold mb-2">Apple Pay</p>
                <p className="text-sm text-gray-400 mb-4">
                  Quick and secure payment with Apple Pay.
                </p>
                <button className="bg-gray-900 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm">
                  Pay with Apple Pay (Demo)
                </button>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder}
            className={`w-full py-4 rounded-full font-bold text-lg transition-colors ${
              canPlaceOrder
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Place Order &mdash; &pound;{total.toFixed(2)}
          </button>
        </div>

        {/* Sidebar Totals */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Order Total
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)
                </span>
                <span>&pound;{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span>&pound;{shippingCost.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (20%)</span>
                <span>&pound;{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-900">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold">
                  &pound;{total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-5 block text-center text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
