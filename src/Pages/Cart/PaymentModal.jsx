import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PaymentModal({ open, onClose, onSuccess, userEmail, amount }) {
  const [method, setMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [trxId, setTrxId] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  const resetForm = () => {
    setMethod("bkash");
    setPhone("");
    setTrxId("");
    setProcessing(false);
  };

  const handlePay = async () => {
    if (processing) return;
    if (!phone || (method !== "cod" && trxId.trim().length < 3)) {
      return toast.error("দয়া করে সব প্রয়োজনীয় তথ্য দিন");
    }

    setProcessing(true);

    try {
      await new Promise((res) => setTimeout(res, 1200));

      if (Math.random() < 0.10) throw new Error("Random demo failure");

      toast.success("Payment confirmed (demo). অর্ডার প্লেস করা হয়েছে!");
      onSuccess(); 
      resetForm();
      onClose();
    } catch (err) {
      console.error("Demo payment error:", err);
      toast.error("Payment failed (demo). আবার চেষ্টা করুন");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">প্রসেস টু পেমেন্ট — ডেমো</h3>
          <button onClick={() => { resetForm(); onClose(); }} className="text-gray-500">✕</button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          মোট পরিমাণ: <span className="font-semibold">{amount.toFixed(2)}৳</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <button
            onClick={() => setMethod("bkash")}
            className={`py-2 px-3 rounded-lg border ${method === "bkash" ? "border-primary bg-primary/10" : "border-gray-200"}`}
          >
            bKash
          </button>
          <button
            onClick={() => setMethod("nagad")}
            className={`py-2 px-3 rounded-lg border ${method === "nagad" ? "border-primary bg-primary/10" : "border-gray-200"}`}
          >
            Nagad
          </button>
          <button
            onClick={() => setMethod("rocket")}
            className={`py-2 px-3 rounded-lg border ${method === "rocket" ? "border-primary bg-primary/10" : "border-gray-200"}`}
          >
            Rocket
          </button>
          <button
            onClick={() => setMethod("cod")}
            className={`py-2 px-3 rounded-lg border ${method === "cod" ? "border-primary bg-primary/10" : "border-gray-200"}`}
          >
            Cash on Delivery
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Phone (পেমেন্ট নাম্বার)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full border rounded px-3 py-2"
          />

          {method !== "cod" && (
            <>
              <label className="block text-sm font-medium">Transaction ID (টার্গ)</label>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="ডেমো: TXN123456"
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-gray-500">
                ডেমো মোড — তুমি কোনো পেমেন্ট গেটওয়ে কল করো না। এখানে যেকোনো ট্রানজেকশন আইডি লিখলে OK ধরা হবে (প্রডাকশনে অবশ্যই ভ্যালিডেশন দরকার)।
              </p>
            </>
          )}

          {method === "cod" && (
            <p className="text-sm text-gray-600">Cash on Delivery নির্বাচন করলে ফোন নম্বর মোবাইল কনফার্মেশনের জন্য নেওয়া হচ্ছে।</p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => { resetForm(); onClose(); }} className="btn ghost">Cancel</button>
          <button
            onClick={handlePay}
            disabled={processing}
            className="btn primary text-white"
          >
            {processing ? "Processing..." : method === "cod" ? "Confirm COD" : "Pay (Demo)"}
          </button>
        </div>
      </div>
    </div>
  );
}
