import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order submitted:', data);
    setIsSubmitted(true);
  };

  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <label>First Name:</label>
          <input {...register('firstName')} className="border p-2 w-full" />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <input {...register('lastName')} className="border p-2 w-full" />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email')} className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label>Address:</label>
          <input {...register('address')} className="border p-2 w-full" />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>

        <button
          type="submit"
          className={`p-2 w-full mt-4 ${isValid ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          disabled={!isValid}
        >
          Submit
        </button>
      </form>

      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <h3 className="mt-4 mb-2 font-semibold">Items in Cart:</h3>
            <ul className="list-disc pl-6 space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title} - Quantity: {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-semibold">
              <p>Total Cost: ${totalCost.toFixed(2)}</p>
            </div>
            <p className="mt-4 text-green-600">Form successfully submitted!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
