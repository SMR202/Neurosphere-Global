"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Download, Info, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "./ui/field";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { TextLink } from "./editorial";
import { domains } from "@/data/resources";
import {
  enquiryTypes,
  enquirySchema,
  enquiryDraft,
  type Enquiry,
} from "@/lib/enquiry";
type Errors = Partial<Record<keyof Enquiry, string[]>>;
export function EnquiryForm({
  deliveryEnabled,
  initialType,
  initialArea,
  initialTopic,
}: {
  deliveryEnabled: boolean;
  initialType: string;
  initialArea: string;
  initialTopic: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [draft, setDraft] = useState("");
  function readForm() {
    if (!form.current) return;
    const parsed = enquirySchema.safeParse(
      Object.fromEntries(new FormData(form.current)),
    );
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors(fields);
      setError("Please review the highlighted fields.");
      const first = Object.keys(fields)[0];
      requestAnimationFrame(() => {
        (
          form.current?.elements.namedItem(first) as HTMLElement | null
        )?.focus();
      });
      return;
    }
    setErrors({});
    setError("");
    return parsed.data;
  }
  function prepareDraft() {
    const values = readForm();
    if (!values) return;
    setDraft(enquiryDraft(values));
    setSuccess(false);
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  function downloadDraft() {
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "neurosphere-research-enquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deliveryEnabled) {
      prepareDraft();
      return;
    }
    const values = readForm();
    if (!values) return;
    setBusy(true);
    setSuccess(false);
    setDraft("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(
          result.error || "Unable to submit your enquiry. Please try again.",
        );
        if (result.fields) setErrors(result.fields);
        return;
      }
      setSuccess(true);
      form.current?.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setError(
        "We could not confirm delivery. Please check your connection or prepare a draft below.",
      );
    } finally {
      setBusy(false);
    }
  }
  const fieldError = (name: keyof Enquiry) =>
    errors[name] ? (
      <FieldError id={`${name}-error`}>{errors[name]?.[0]}</FieldError>
    ) : null;
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="enquiry-form"
      onChange={() => {
        setDraft("");
        setSuccess(false);
      }}
    >
      {!deliveryEnabled ? (
        <Alert role="note">
          <Info aria-hidden="true" />
          <AlertDescription>
            Enquiry delivery is not yet available. You can prepare and download
            a draft below.
          </AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <Info aria-hidden="true" />
          <AlertTitle>Enquiry needs attention</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <FieldGroup className="form-grid">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {fieldError("name")}
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {fieldError("email")}
        </Field>
        <Field className="field-wide" data-invalid={!!errors.institution}>
          <FieldLabel htmlFor="institution">
            Institution / Organization <span>(optional)</span>
          </FieldLabel>
          <Input
            id="institution"
            name="institution"
            autoComplete="organization"
            maxLength={200}
            aria-invalid={!!errors.institution}
            aria-describedby={
              errors.institution ? "institution-error" : undefined
            }
          />
          {fieldError("institution")}
        </Field>
        <Field data-invalid={!!errors.type}>
          <FieldLabel htmlFor="type">Enquiry type</FieldLabel>
          <select
            id="type"
            name="type"
            defaultValue={initialType}
            required
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? "type-error" : undefined}
          >
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {fieldError("type")}
        </Field>
        <Field data-invalid={!!errors.area}>
          <FieldLabel htmlFor="area">
            Research area <span>(optional)</span>
          </FieldLabel>
          <select
            id="area"
            name="area"
            defaultValue={initialArea}
            aria-invalid={!!errors.area}
            aria-describedby={errors.area ? "area-error" : undefined}
          >
            <option value="">Select an area</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.title}
              </option>
            ))}
          </select>
          {fieldError("area")}
        </Field>
        <Field className="field-wide" data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            defaultValue={
              initialTopic
                ? `I would like guidance on ${initialTopic}.\n\n`
                : ""
            }
            required
            minLength={20}
            maxLength={5000}
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={`message-note${errors.message ? " message-error" : ""}`}
          />
          <FieldDescription id="message-note">
            Please do not include patient-identifying or sensitive medical
            information.
          </FieldDescription>
          {fieldError("message")}
        </Field>
      </FieldGroup>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-actions">
        <Button type="submit" disabled={busy}>
          {busy ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              {deliveryEnabled ? "Send enquiry" : "Prepare enquiry"}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
        {deliveryEnabled ? (
          <Button
            type="button"
            variant="ghost"
            disabled={busy}
            onClick={prepareDraft}
          >
            Prepare a draft
          </Button>
        ) : null}
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {success ? (
          <Alert>
            <Check aria-hidden="true" />
            <AlertTitle>Enquiry submitted</AlertTitle>
            <AlertDescription>
              Your enquiry has been submitted. Thank you for contacting
              NeuroSphere Global.
            </AlertDescription>
          </Alert>
        ) : null}
        {draft ? (
          <section className="draft-preview">
            <h2>Your enquiry draft is ready.</h2>
            <p>
              This draft has not been sent. Download it to keep a copy on your
              device.
            </p>
            <pre>{draft}</pre>
            <Button type="button" variant="outline" onClick={downloadDraft}>
              <Download data-icon="inline-start" aria-hidden="true" />
              Download draft
            </Button>
          </section>
        ) : null}
      </div>
      <div className="form-explore">
        <span>Prefer to explore first?</span>
        <TextLink href="/research">Browse Resources</TextLink>
      </div>
      <noscript>
        Please enable JavaScript to prepare or submit an enquiry.
      </noscript>
    </form>
  );
}
