"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { sendContact } from "@/lib/api";
import { useContent } from "@/components/content-provider";

const contactInfo = [
  { key: "email", icon: Mail, value: "santana.dayvid@outlook.com", href: "mailto:santana.dayvid@outlook.com" },
  { key: "linkedin", icon: Linkedin, value: "/dayvid-santana-jr", href: "https://www.linkedin.com/in/dayvid-santana-jr/" },
  { key: "github", icon: Github, value: "@Dayvid-San", href: "https://github.com/Dayvid-San" },
  { key: "location", icon: MapPin, value: "Paraná, Brasil", href: null },
];

export default function ContactPage() {
  const { t } = useContent();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message ?? t("contato.form.genericError"));
    }
  };

  return (
    <div className="container relative px-4 py-16 md:py-24">
      {/* Contact Cards Section */}
      <section className="relative z-20 mx-auto max-w-4xl mb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {contactInfo.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card key={contact.key} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{t(`contato.info.${contact.key}.label`)}</h3>
                      {contact.href ? (
                        <Link
                          href={contact.href}
                          className="text-primary hover:underline mb-1 block"
                          target={contact.href.startsWith('http') ? '_blank' : undefined}
                        >
                          {contact.value}
                        </Link>
                      ) : (
                        <p className="text-muted-foreground mb-1">{contact.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {t(`contato.info.${contact.key}.description`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-20 mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-1">{t("contato.form.heading")}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t("contato.form.intro")}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm mb-1 block">{t("contato.form.name")}</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">{t("contato.form.email")}</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">{t("contato.form.subject")}</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">{t("contato.form.message")}</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>

              {status === "sent" && (
                <p className="text-sm font-medium text-green-500">
                  {t("contato.form.success")}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-500">{errorMessage}</p>
              )}

              <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                {status === "sending" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("contato.form.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
