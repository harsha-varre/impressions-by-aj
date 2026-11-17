"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  enquirySchema,
  type EnquiryInput,
  occasionOptions,
  sessionOptions,
} from "@/lib/enquiry";
import { site } from "@/lib/site";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 font-sans text-xs text-rose-deep" role="alert">
      {msg}
    </p>
  );
}

export function EnquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      occasion: "",
      session: "",
      date: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: EnquiryInput) {
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        toast.error(
          data.error ?? "Something went wrong. Please email us directly."
        );
        return;
      }

      toast.success("Enquiry sent — we'll reply in ~24 hours.");
      reset();
    } catch {
      toast.error("Network error. Please try again or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError msg={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError msg={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="occasion">Occasion</Label>
          <Select
            id="occasion"
            defaultValue=""
            aria-invalid={!!errors.occasion}
            {...register("occasion")}
          >
            <option value="" disabled>
              Select an occasion
            </option>
            {occasionOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
          <FieldError msg={errors.occasion?.message} />
        </div>
        <div>
          <Label htmlFor="session">Session</Label>
          <Select
            id="session"
            defaultValue=""
            aria-invalid={!!errors.session}
            {...register("session")}
          >
            <option value="" disabled>
              Select a session length
            </option>
            {sessionOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <FieldError msg={errors.session?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="date">Preferred date</Label>
        <Input
          id="date"
          type="text"
          placeholder="e.g. Aug 2026, or a specific day"
          aria-invalid={!!errors.date}
          {...register("date")}
        />
        <FieldError msg={errors.date?.message} />
      </div>

      <div>
        <Label htmlFor="message">Tell us about the day</Label>
        <Textarea
          id="message"
          placeholder="Where, who, what you're picturing…"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError msg={errors.message?.message} />
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {site.replyWindow} · {site.email}
        </p>
      </div>
    </form>
  );
}
