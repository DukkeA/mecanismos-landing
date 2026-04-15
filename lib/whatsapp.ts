const PHONE_NUMBER = "573105614469";

export interface WhatsAppLeadInput {
  name: string;
  company?: string;
  service?: string;
  message: string;
}

export function buildWhatsAppUrl(input?: WhatsAppLeadInput): string {
  if (!input) {
    return `https://wa.me/${PHONE_NUMBER}`;
  }

  const lines: string[] = [];

  if (input.name) {
    lines.push(`Hola, soy ${input.name}.`);
  }

  if (input.company) {
    lines.push(`Empresa: ${input.company}.`);
  }

  if (input.service) {
    lines.push(`Me interesa el servicio de: ${input.service}.`);
  }

  if (input.message) {
    lines.push(input.message);
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${PHONE_NUMBER}?text=${text}`;
}

export function openWhatsApp(input?: WhatsAppLeadInput): void {
  const url = buildWhatsAppUrl(input);
  window.open(url, "_blank", "noopener,noreferrer");
}
