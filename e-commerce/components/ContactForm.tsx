// components/ContactForm.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setServerMessage("Message sent successfully!");
        reset();
      } else {
        setServerMessage("Failed to send message.");
      }
    } catch (error) {
      setServerMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto mt-10">
      <div>
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          className="w-full border p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label>Message</label>
        <textarea
          {...register("message", { required: "Message is required" })}
          className="w-full border p-2"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Send
      </button>

      {serverMessage && (
        <p className={`mt-2 ${serverMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {serverMessage}
        </p>
      )}
    </form>
  );
}
