"use client";

import { useState, useEffect, FormEvent } from "react";
import { sendOrder } from "@/hooks/useOrderForm";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  size?: string;
  quantity?: string;
  color?: string;
}

export default function OrderModal({ isOpen, onClose, productName, productPrice }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    size: "",
    quantity: 1,
    color: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const validateField = (name: string, value: string | number): string | undefined => {
    switch (name) {
      case "name":
      case "address":
      case "city":
      case "size":
      case "color":
        return value ? undefined : "This field is required";
      case "email":
        if (!value) return "This field is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) return "Please enter a valid email";
        return undefined;
      case "phone":
        if (!value) return "This field is required";
        if ((value as string).replace(/\D/g, "").length < 10) return "Phone must have at least 10 digits";
        return undefined;
      case "quantity":
        const qty = Number(value);
        if (qty < 1) return "Minimum quantity is 1";
        if (qty > 10) return "Maximum quantity is 10";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: string) => {
    const value = formData[name as keyof typeof formData];
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      if (key === "notes") return;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await sendOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        size: formData.size,
        quantity: formData.quantity,
        color: formData.color,
        productName,
        productPrice,
        notes: formData.notes,
      });
      setIsSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputBase =
    "w-full bg-black border text-white placeholder-white/50 px-4 py-3 outline-none transition-all duration-200";
  const inputFocus =
    "focus:border-white focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]";
  const inputError = "border-red-500";
  const inputNormal = "border-white/50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[480px] bg-black border border-white p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          ✕
        </button>

        {submitError && (
          <div className="mb-6 p-4 bg-red-600 text-white text-sm text-center">
            {submitError}
          </div>
        )}

        {isSuccess ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <svg viewBox="0 0 52 52" className="w-20 h-20 animate-checkmark">
                <circle cx="26" cy="26" r="25" fill="none" stroke="white" strokeWidth="2" className="circle" />
                <path fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" className="checkmark" />
              </svg>
            </div>
            <h2
              className="text-4xl tracking-widest text-white mb-4"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              ORDER RECEIVED!
            </h2>
            <p className="text-white/70 text-sm">
              We&apos;ll contact you on {formData.email} within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-8 pr-8">
              <h2
                className="text-3xl tracking-widest text-white mb-2"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                COMPLETE YOUR ORDER
              </h2>
              <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
                <span>{productName}</span>
                <span className="text-white/30">|</span>
                <span className="font-medium text-white">{productPrice}</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`${inputBase} ${inputFocus} ${errors.name ? inputError : inputNormal}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`${inputBase} ${inputFocus} ${errors.email ? inputError : inputNormal}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={`${inputBase} ${inputFocus} ${errors.phone ? inputError : inputNormal}`}
                placeholder="+92 300 1234567"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Delivery Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                onBlur={() => handleBlur("address")}
                rows={3}
                className={`${inputBase} ${inputFocus} resize-none ${errors.address ? inputError : inputNormal}`}
                placeholder="House #, Street, Area"
              />
              {errors.address && <p className="text-red-500 text-[10px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                className={`${inputBase} ${inputFocus} ${errors.city ? inputError : inputNormal}`}
                placeholder="Karachi"
              />
              {errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                T-Shirt Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => handleChange("size", e.target.value)}
                onBlur={() => handleBlur("size")}
                className={`${inputBase} ${inputFocus} cursor-pointer ${errors.size ? inputError : inputNormal}`}
              >
                <option value="" className="bg-black">Select Size</option>
                <option value="XS" className="bg-black">XS</option>
                <option value="S" className="bg-black">S</option>
                <option value="M" className="bg-black">M</option>
                <option value="L" className="bg-black">L</option>
                <option value="XL" className="bg-black">XL</option>
                <option value="XXL" className="bg-black">XXL</option>
              </select>
              {errors.size && <p className="text-red-500 text-[10px] mt-1">{errors.size}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 1)}
                onBlur={() => handleBlur("quantity")}
                min={1}
                max={10}
                className={`${inputBase} ${inputFocus} ${errors.quantity ? inputError : inputNormal}`}
              />
              {errors.quantity && <p className="text-red-500 text-[10px] mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Color Preference
              </label>
              <div className="flex gap-6">
                {["Black", "White", "Both"].map((color) => (
                  <label key={color} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={formData.color === color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      onBlur={() => handleBlur("color")}
                      className="appearance-none w-4 h-4 border border-white/50 checked:border-white checked:bg-white bg-black cursor-pointer"
                    />
                    <span className="text-white text-sm">{color}</span>
                  </label>
                ))}
              </div>
              {errors.color && <p className="text-red-500 text-[10px] mt-1">{errors.color}</p>}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Additional Notes <span className="text-white/30">(optional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={2}
                className={`${inputBase} ${inputFocus} resize-none border-white/50`}
                placeholder="Any special requests..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-white text-black font-bold tracking-[0.2em] uppercase py-4 hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </span>
              ) : (
                "SEND ORDER"
              )}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes checkdraw {
          0% { stroke-dashoffset: 166; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circledraw {
          0% { stroke-dashoffset: 157; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-checkmark .circle {
          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          animation: circledraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .animate-checkmark .checkmark {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: checkdraw 0.4s 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
      `}</style>
    </div>
  );
}