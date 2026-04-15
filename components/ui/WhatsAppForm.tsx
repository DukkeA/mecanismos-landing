"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { openWhatsApp, type WhatsAppLeadInput } from "@/lib/whatsapp";

const initialState: WhatsAppLeadInput = {
  name: "",
  company: "",
  service: "",
  message: "",
};

export function WhatsAppForm() {
  const [form, setForm] = useState<WhatsAppLeadInput>(initialState);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-gold/20 bg-pure-white p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]"
    >
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="name">
            Nombre
          </label>
          <input
            required
            className="w-full rounded-2xl border border-silver-light bg-warm-white px-4 py-3 text-charcoal outline-none transition focus:border-gold"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Tu nombre"
            type="text"
            value={form.name}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="company">
            Empresa o vehículo
          </label>
          <input
            className="w-full rounded-2xl border border-silver-light bg-warm-white px-4 py-3 text-charcoal outline-none transition focus:border-gold"
            id="company"
            name="company"
            onChange={handleChange}
            placeholder="Ej. Flota Norte / Chevrolet D-Max"
            type="text"
            value={form.company ?? ""}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="service">
            Servicio
          </label>
          <select
            className="w-full rounded-2xl border border-silver-light bg-warm-white px-4 py-3 text-charcoal outline-none transition focus:border-gold"
            id="service"
            name="service"
            onChange={handleChange}
            value={form.service ?? ""}
          >
            <option value="">Seleccioná un servicio</option>
            <option value="Inyección Diésel">Inyección Diésel</option>
            <option value="Motores Diésel">Motores Diésel</option>
            <option value="Transmisiones Automáticas">Transmisiones Automáticas</option>
            <option value="Diagnóstico General">Diagnóstico General</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="message">
            Contanos qué necesitás
          </label>
          <textarea
            required
            className="min-h-32 w-full rounded-2xl border border-silver-light bg-warm-white px-4 py-3 text-charcoal outline-none transition focus:border-gold"
            id="message"
            name="message"
            onChange={handleChange}
            placeholder="Describí la falla o el servicio que necesitás."
            value={form.message}
          />
        </div>

        <button
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-gold-light"
          type="submit"
        >
          Abrir WhatsApp
        </button>
      </div>
    </form>
  );
}

export default WhatsAppForm;
