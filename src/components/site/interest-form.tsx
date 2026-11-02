"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Mail,
  LoaderCircle,
} from "lucide-react";
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
import {
  getFormDefinition,
  type FormKind,
  type FormField,
} from "@/content/forms";
import {
  draftText,
  emailHref,
  submissionSchema,
  submissionErrors,
  type Submission,
} from "@/lib/submission";
import { localHref, translate, type Locale } from "@/lib/locale";
import { FormSubmissionError, submitInterest } from "@/lib/form-client";

export function InterestForm({
  kind,
  locale,
  deliveryEnabled,
  intent,
  initial = {},
}: {
  kind: FormKind;
  locale: Locale;
  deliveryEnabled: boolean;
  intent?: "brief";
  initial?: Record<string, string>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const requestInFlight = useRef(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const definition = getFormDefinition(kind, intent);
  const additional = definition.fields.filter((f) => f.additional);

  useEffect(() => {
    if (draft || success) statusRef.current?.focus();
  }, [draft, success]);
  useEffect(() => {
    if (error && !Object.keys(errors).length) errorRef.current?.focus();
  }, [error, errors]);

  function focusField(name: string) {
    const control = ref.current?.elements.namedItem(name);
    const element = control instanceof RadioNodeList ? control[0] : control;
    if (element instanceof HTMLElement) {
      const disclosure = element.closest("details");
      if (disclosure) disclosure.open = true;
      element.focus();
    }
  }
  function validate() {
    if (!ref.current) return;
    const data = new FormData(ref.current);
    const values: Submission["values"] = {};
    for (const field of definition.fields) {
      values[field.name] =
        field.type === "checkboxes"
          ? data.getAll(field.name).map(String)
          : String(data.get(field.name) ?? "").trim();
    }
    const result = submissionSchema.safeParse({
      form: kind,
      intent,
      values,
      website: data.get("website") || "",
    });
    if (!result.success) {
      const next = submissionErrors(result.error);
      setErrors(next);
      setError("Please review the highlighted fields.");
      focusField(Object.keys(next)[0]);
      return;
    }
    setErrors({});
    setError("");
    return result.data;
  }
  function prepare(openEmail = false) {
    const data = validate();
    if (!data) return;
    const text = draftText(kind, data.values, intent);
    setDraft(text);
    setSuccess("");
    setCopied(false);
    if (openEmail) {
      try {
        window.location.assign(emailHref(kind, text, intent));
      } catch {
        setError(
          "Your email app could not open. Copy the details below into an email, or download a copy.",
        );
      }
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestInFlight.current) return;
    if (!deliveryEnabled) {
      prepare(true);
      return;
    }
    const data = validate();
    if (!data) return;
    requestInFlight.current = true;
    setBusy(true);
    setSuccess("");
    setDraft("");
    try {
      const confirmation = await submitInterest(data);
      setSuccess(confirmation);
      ref.current?.reset();
    } catch (failure) {
      setError(
        failure instanceof FormSubmissionError
          ? failure.message
          : "We could not confirm submission. Your details are still here. Please try again or continue by email.",
      );
      if (failure instanceof FormSubmissionError && failure.fields) {
        setErrors(failure.fields);
        focusField(Object.keys(failure.fields)[0]);
      }
    } finally {
      requestInFlight.current = false;
      setBusy(false);
    }
  }
  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(
        draft.replace(
          "DRAFT — NOT SENT",
          "Enquiry prepared on the NeuroZehn website",
        ),
      );
      setCopied(true);
    } catch {
      setCopied(false);
      setError(
        "Copy is unavailable in this browser. Open ‘Review your email’ below to select the text, or download a copy.",
      );
    }
  }

  function renderField(field: FormField) {
    const id = `${kind}-${field.name}`,
      problem = errors[field.name];
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
        data-disabled={busy || undefined}
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
                    disabled={busy}
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
              disabled={busy}
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
            {field.hint ? (
              <FieldDescription id={`${id}-hint`}>
                {field.hint}
              </FieldDescription>
            ) : null}
            <Textarea
              disabled={busy}
              id={id}
              name={field.name}
              rows={5}
              maxLength={field.max}
              required={field.required}
              defaultValue={initial[field.name] || ""}
              aria-invalid={!!problem}
              aria-describedby={described}
            />
          </>
        ) : field.type === "select" ? (
          <select
            disabled={busy}
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
            disabled={busy}
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
          <FieldDescription id={`${id}-hint`}>{field.hint}</FieldDescription>
        ) : null}
        {problem ? <FieldError id={`${id}-error`}>{problem}</FieldError> : null}
      </Field>
    );
  }
  return (
    <form
      ref={ref}
      className="interest-form"
      data-kind={kind}
      onSubmit={submit}
      noValidate
      aria-busy={busy}
      lang="en"
      dir="ltr"
      onChange={(event) => {
        setDraft("");
        setSuccess("");
        setCopied(false);
        const target = event.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLTextAreaElement
        ) {
          if (errors[target.name])
            setErrors((previous) => {
              const next = { ...previous };
              delete next[target.name];
              return next;
            });
        }
        setError("");
      }}
    >
      {error ? (
        <Alert ref={errorRef} tabIndex={-1} variant="destructive">
          <AlertTitle>
            {Object.keys(errors).length
              ? "Please check your form"
              : "Please try another way"}
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <p className="form-instructions">
        Fields marked optional can be left blank.
      </p>
      <FieldGroup className="form-grid">
        {definition.fields
          .filter((f) => !f.additional && f.name !== "consent")
          .map(renderField)}
      </FieldGroup>
      {additional.length ? (
        <details className="optional-fields">
          <summary>
            Add a little about yourself <span>(optional)</span>
          </summary>
          <FieldGroup className="form-grid">
            {additional.map(renderField)}
          </FieldGroup>
        </details>
      ) : null}
      {renderField(definition.fields.find((f) => f.name === "consent")!)}
      {deliveryEnabled ? (
        <p className="form-instructions">
          Your details are processed by our form delivery provider so the team
          can respond. Please do not include personal medical information.
        </p>
      ) : null}
      {!deliveryEnabled ? (
        <p className="email-explanation">
          <Mail aria-hidden="true" />
          <span>
            Continue in your email app to send this to{" "}
            <strong>NeuroZehn@outlook.com</strong>. You review and send the
            email yourself.
          </span>
        </p>
      ) : null}
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
                : "Continue in email app"}
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </Button>
        {deliveryEnabled && error ? (
          <Button type="button" variant="outline" onClick={() => prepare(true)}>
            Continue by email
          </Button>
        ) : null}
      </div>
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="form-result"
      >
        {success ? (
          <Alert>
            <Check aria-hidden="true" />
            <AlertTitle>Request submitted</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        ) : null}
        {draft ? (
          <section className="email-handoff">
            <h3>Finish in your email app.</h3>
            <p>
              Your details have not been sent yet. If your email app did not
              open, use the link below or copy the details into an email to
              NeuroZehn@outlook.com.
            </p>
            <div className="handoff-actions">
              <a className="text-link" href={emailHref(kind, draft, intent)}>
                Open email app <ArrowRight aria-hidden="true" />
              </a>
              <Button type="button" variant="outline" onClick={copyDetails}>
                {copied ? (
                  <Check aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                {copied ? "Details copied" : "Copy details"}
              </Button>
            </div>
            <details>
              <summary>Review your email</summary>
              <pre>{draft}</pre>
              <a
                className="text-link"
                download={`neurozehn-${kind}-enquiry.txt`}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(draft)}`}
              >
                <Download aria-hidden="true" />
                Download a copy
              </a>
            </details>
          </section>
        ) : null}
      </div>
      <noscript>
        Please enable JavaScript to use this form, or email
        NeuroZehn@outlook.com.
      </noscript>
    </form>
  );
}
