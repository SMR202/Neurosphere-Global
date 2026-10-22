"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Download, Info, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { formDefinitions, type FormKind } from "@/content/forms";
import {
  draftText,
  submissionSchema,
  submissionErrors,
  type Submission,
} from "@/lib/submission";
import { localHref, translate, type Locale } from "@/lib/locale";

export function InterestForm({
  kind,
  locale,
  deliveryEnabled,
  initial = {},
}: {
  kind: FormKind;
  locale: Locale;
  deliveryEnabled: boolean;
  initial?: Record<string, string>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [draft, setDraft] = useState("");
  const definition = formDefinitions[kind];
  useEffect(() => {
    if (draft || success) statusRef.current?.focus();
  }, [draft, success]);
  function validate() {
    if (!ref.current) return;
    const data = new FormData(ref.current);
    const values: Submission["values"] = {};
    for (const field of definition.fields)
      values[field.name] =
        field.type === "checkboxes"
          ? data.getAll(field.name).map(String)
          : String(data.get(field.name) ?? "");
    const result = submissionSchema.safeParse({
      form: kind,
      values,
      website: data.get("website") || "",
    });
    if (!result.success) {
      const next = submissionErrors(result.error);
      setErrors(next);
      setError("Please review the highlighted fields.");
      const element = ref.current?.elements.namedItem(Object.keys(next)[0]);
      if (element instanceof HTMLElement) element.focus();
      else if (element instanceof RadioNodeList)
        (element[0] as HTMLElement)?.focus();
      return;
    }
    setErrors({});
    setError("");
    return result.data;
  }
  function prepare() {
    const data = validate();
    if (!data) return;
    setDraft(draftText(kind, data.values));
    setSuccess("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deliveryEnabled) {
      prepare();
      return;
    }
    const data = validate();
    if (!data) return;
    setBusy(true);
    setSuccess("");
    setDraft("");
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        if (result.fields) setErrors(result.fields);
      } else {
        setSuccess(result.message);
        ref.current?.reset();
      }
    } catch {
      setError(
        "We could not confirm delivery. Please try again or prepare a draft below.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      ref={ref}
      className="interest-form"
      onSubmit={submit}
      noValidate
      onChange={(event) => {
        setDraft("");
        setSuccess("");
        const target = event.target;
        const name =
          target instanceof HTMLInputElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLTextAreaElement
            ? target.name
            : "";
        if (name && errors[name])
          setErrors((previous) => {
            const next = { ...previous };
            delete next[name];
            return next;
          });
        setError("");
      }}
      lang="en"
      dir="ltr"
    >
      {!deliveryEnabled ? (
        <Alert role="note">
          <Info aria-hidden="true" />
          <AlertDescription>
            Delivery is not yet available. Prepare a draft to keep a copy of
            your details. Nothing will be sent.
          </AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <Info aria-hidden="true" />
          <AlertTitle>Please check your form</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <p className="form-instructions">
        Fields are required unless marked optional.
      </p>
      <FieldGroup className="form-grid">
        {definition.fields.map((field) => {
          const id = `${kind}-${field.name}`;
          const problem = errors[field.name];
          const described =
            [field.hint ? `${id}-hint` : "", problem ? `${id}-error` : ""]
              .filter(Boolean)
              .join(" ") || undefined;
          return (
            <Field
              key={field.name}
              className={
                ["textarea", "checkbox", "checkboxes"].includes(field.type)
                  ? "field-wide"
                  : ""
              }
              data-invalid={!!problem}
            >
              {field.type !== "checkbox" && field.type !== "checkboxes" ? (
                <FieldLabel htmlFor={id}>
                  {field.label}
                  {field.required ? (
                    <span className="sr-only"> (required)</span>
                  ) : (
                    <span>(optional)</span>
                  )}
                </FieldLabel>
              ) : null}
              {field.type === "checkboxes" ? (
                <fieldset aria-describedby={described} aria-invalid={!!problem}>
                  <legend>{field.label}</legend>
                  <div className="checkbox-options">
                    {field.options?.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          name={field.name}
                          value={option}
                          defaultChecked={initial[field.name] === option}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : field.type === "checkbox" ? (
                <label className="consent-label" htmlFor={id}>
                  <input
                    id={id}
                    name={field.name}
                    type="checkbox"
                    value="yes"
                    required={field.required}
                    aria-invalid={!!problem}
                    aria-describedby={described}
                  />
                  <span>
                    {field.label}
                    {field.name === "consent" ? (
                      <>
                        {" "}
                        <Link href={localHref("/privacy-policy", locale)}>
                          Privacy Policy
                        </Link>
                      </>
                    ) : null}
                    {!field.required ? <small> (optional)</small> : null}
                  </span>
                </label>
              ) : field.type === "textarea" ? (
                <>
                  <FieldDescription id={`${id}-hint`}>
                    {field.hint}
                  </FieldDescription>
                  <Textarea
                    id={id}
                    name={field.name}
                    rows={6}
                    maxLength={field.max}
                    required={field.required}
                    defaultValue={initial[field.name] || ""}
                    aria-invalid={!!problem}
                    aria-describedby={described}
                  />
                </>
              ) : field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  defaultValue={
                    field.options?.includes(initial[field.name])
                      ? initial[field.name]
                      : ""
                  }
                  aria-invalid={!!problem}
                  aria-describedby={described}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <Input
                  id={id}
                  name={field.name}
                  type={field.type}
                  maxLength={field.max}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  defaultValue={initial[field.name] || ""}
                  aria-invalid={!!problem}
                  aria-describedby={described}
                />
              )}
              {field.hint && field.type !== "textarea" ? (
                <FieldDescription id={`${id}-hint`}>
                  {field.hint}
                </FieldDescription>
              ) : null}
              {problem ? (
                <FieldError id={`${id}-error`}>{problem}</FieldError>
              ) : null}
            </Field>
          );
        })}
      </FieldGroup>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this field empty</label>
        <input
          id={`${kind}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-actions">
        <Button type="submit" disabled={busy}>
          {busy ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              {deliveryEnabled
                ? translate(definition.button, locale)
                : "Prepare draft"}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
        {deliveryEnabled ? (
          <Button
            type="button"
            variant="ghost"
            onClick={prepare}
            disabled={busy}
          >
            Prepare a draft
          </Button>
        ) : null}
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {success ? (
          <Alert>
            <Check aria-hidden="true" />
            <AlertTitle>Thank you</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        ) : null}
        {draft ? (
          <section className="draft-preview">
            <h3>Your draft is ready.</h3>
            <p>
              This draft has not been sent. Download it to keep a copy on your
              device.
            </p>
            <pre>{draft}</pre>
            <Button asChild variant="outline">
              <a
                download={`neurosphere-${kind}-draft.txt`}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(draft)}`}
              >
                <Download data-icon="inline-start" aria-hidden="true" />
                Download draft
              </a>
            </Button>
          </section>
        ) : null}
      </div>
      <noscript>
        Please enable JavaScript to prepare or send this form.
      </noscript>
    </form>
  );
}
