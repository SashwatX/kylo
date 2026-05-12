import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  size: string;
  quantity: number;
  color: string;
  productName: string;
  productPrice: string;
  notes?: string;
}

export const sendOrder = async (formData: FormData): Promise<void> => {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      to_email: "kylooclothing@gmail.com",
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: `${formData.address}, ${formData.city}`,
      tshirt_size: formData.size,
      quantity: formData.quantity,
      color_preference: formData.color,
      product_name: formData.productName,
      product_price: formData.productPrice,
      notes: formData.notes || "None",
      order_date: new Date().toLocaleString(),
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID!,
    {
      to_email: formData.email,
      customer_name: formData.name,
      product_name: formData.productName,
      tshirt_size: formData.size,
      quantity: formData.quantity,
      order_date: new Date().toLocaleString(),
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};