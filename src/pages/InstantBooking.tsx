import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  ADDONS, CONDITIONS, SERVICE_MODES, TIME_WINDOWS, VEHICLE_SIZES, getPackage,
} from "@/lib/booking-config";
import { supabase } from "@/integrations/supabase/client";

type AddonKey = typeof ADDONS[number]["key"];

const STEPS = ["Vehicle", "Condition", "Add-ons", "Details", "Appointment", "Review"];

const InstantBooking = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const pkg = getPackage(slug);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const initialPayType = (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("pay") === "full") ? "full" : "deposit";
  const [paymentType, setPaymentType] = useState<"deposit" | "full">(initialPayType);

  const [size, setSize] = useState<typeof VEHICLE_SIZES[number] | null>(null);
  const [condition, setCondition] = useState<typeof CONDITIONS[number] | null>(null);
  const [addons, setAddons] = useState<Record<AddonKey, boolean>>(
    Object.fromEntries(ADDONS.map((a) => [a.key, false])) as Record<AddonKey, boolean>,
  );
  const [details, setDetails] = useState({
    first_name: "", last_name: "", phone: "", email: "",
    vehicle_year: "", vehicle_make: "", vehicle_model: "",
    address: "", notes: "",
  });
  const [date, setDate] = useState<Date | undefined>();
  const [timeWindow, setTimeWindow] = useState<string>("");
  const [serviceMode, setServiceMode] = useState<string>("");
  const [blockedWindows, setBlockedWindows] = useState<string[]>([]);

  useEffect(() => {
    if (!pkg) navigate("/book", { replace: true });
  }, [pkg, navigate]);

  // Look up which time windows are already booked when the user picks a date
  useEffect(() => {
    if (!date) { setBlockedWindows([]); return; }
    const d = format(date, "yyyy-MM-dd");
    supabase.from("blocked_slots").select("time_window").eq("slot_date", d).then(({ data }) => {
      setBlockedWindows((data ?? []).map((r: any) => r.time_window));
      if (timeWindow && (data ?? []).some((r: any) => r.time_window === timeWindow)) {
        setTimeWindow("");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const total = useMemo(() => {
    if (!pkg) return 0;
    let t = pkg.basePrice + (size?.modifier ?? 0) + (condition?.modifier ?? 0);
    for (const a of ADDONS) if (addons[a.key]) t += a.price;
    return t;
  }, [pkg, size, condition, addons]);

  if (!pkg) return null;

  const goCustom = (reason: "xl" | "extreme") => {
    navigate(`/book/quote?reason=${reason}`);
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canContinue = (() => {
    switch (step) {
      case 0: return !!size;
      case 1: return !!condition;
      case 2: return true;
      case 3:
        return !!details.first_name && !!details.last_name && /\S+@\S+\.\S+/.test(details.email)
          && details.phone.length >= 7 && !!details.vehicle_make && !!details.vehicle_model;
      case 4: return !!date && !!timeWindow && !!serviceMode;
      default: return true;
    }
  })();

  const submit = async () => {
    if (!size || !condition || !date) return;
    setSubmitting(true);
    try {
      const selectedAddons = ADDONS.filter((a) => addons[a.key]).map((a) => ({
        key: a.key, label: a.label, price: a.price,
      }));
      const { data, error } = await supabase.functions.invoke("create-deposit-checkout", {
        body: {
          package_slug: pkg.slug,
          package_name: pkg.name,
          base_price: pkg.basePrice,
          vehicle_size: size.label,
          size_modifier: size.modifier,
          condition: condition.label,
          condition_modifier: condition.modifier,
          ...details,
          preferred_date: format(date, "yyyy-MM-dd"),
          time_window: timeWindow,
          service_mode: serviceMode,
          estimated_total: total,
          deposit_amount: pkg.deposit,
          addons: selectedAddons,
          origin: window.location.origin,
          payment_type: paymentType,
          environment: (import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined)?.startsWith("pk_test_") ? "sandbox" : "live",
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      else throw new Error("Could not create checkout session.");
    } catch (e) {
      toast.error("Couldn't start checkout. Please try again or call us.");
      console.error(e);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Helmet>
        <title>{`Book ${pkg.name} | Santos Auto Detailing`}</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={`Book ${pkg.name} | Santos Auto Detailing`} />
        <meta name="twitter:title" content={`Book ${pkg.name} | Santos Auto Detailing`} />
      </Helmet>
      <Navbar />

      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Link to="/book" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to packages
          </Link>

          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2">{pkg.name}</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">{STEPS[step]}</h1>
          </div>

          <Progress value={((step + 1) / STEPS.length) * 100} className="h-1 mb-10" />

          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {VEHICLE_SIZES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    if ("custom" in s && s.custom) { goCustom("xl"); return; }
                    setSize(s); setTimeout(next, 150);
                  }}
                  className={cn(
                    "text-left rounded-lg border bg-card p-5 hover:border-accent transition",
                    size?.key === s.key ? "border-accent" : "border-border",
                  )}
                >
                  <div className="font-display text-lg">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {"custom" in s && s.custom ? "Custom quote required" : s.modifier === 0 ? "Included" : `+$${s.modifier}`}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-3 gap-3">
              {CONDITIONS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    if ("custom" in c && c.custom) { goCustom("extreme"); return; }
                    setCondition(c); setTimeout(next, 150);
                  }}
                  className={cn(
                    "text-left rounded-lg border bg-card p-5 hover:border-accent transition",
                    condition?.key === c.key ? "border-accent" : "border-border",
                  )}
                >
                  <div className="font-display text-lg">{c.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.description}</div>
                  <div className="text-xs font-mono mt-2 text-accent">
                    {"custom" in c && c.custom ? "Custom quote" : c.modifier === 0 ? "+$0" : `+$${c.modifier}`}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-2">Optional. Skip if not needed.</p>
              {ADDONS.map((a) => {
                const on = addons[a.key];
                return (
                  <button
                    key={a.key}
                    onClick={() => setAddons((p) => ({ ...p, [a.key]: !p[a.key] }))}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg border bg-card p-4 transition",
                      on ? "border-accent" : "border-border hover:border-muted-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("h-5 w-5 rounded border flex items-center justify-center",
                        on ? "bg-accent border-accent" : "border-border")}>
                        {on && <Check className="h-3.5 w-3.5 text-accent-foreground" />}
                      </div>
                      <span className="font-medium">{a.label}</span>
                    </div>
                    <span className="font-mono text-sm">+${a.price}</span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" v={details.first_name} on={(v) => setDetails({ ...details, first_name: v })} />
              <Field label="Last name" v={details.last_name} on={(v) => setDetails({ ...details, last_name: v })} />
              <Field label="Phone" type="tel" v={details.phone} on={(v) => setDetails({ ...details, phone: v })} />
              <Field label="Email" type="email" v={details.email} on={(v) => setDetails({ ...details, email: v })} />
              <Field label="Vehicle year" v={details.vehicle_year} on={(v) => setDetails({ ...details, vehicle_year: v })} />
              <Field label="Vehicle make" v={details.vehicle_make} on={(v) => setDetails({ ...details, vehicle_make: v })} />
              <Field label="Vehicle model" v={details.vehicle_model} on={(v) => setDetails({ ...details, vehicle_model: v })} />
              <Field label="Service address or area" v={details.address} on={(v) => setDetails({ ...details, address: v })} />
              <div className="sm:col-span-2 space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  placeholder="Anything we should know?" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate}
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                      initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Preferred time window</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_WINDOWS.map((t) => {
                    const blocked = blockedWindows.includes(t);
                    return (
                      <button key={t} onClick={() => !blocked && setTimeWindow(t)}
                        disabled={blocked}
                        className={cn("rounded-lg border bg-card py-3 text-sm transition",
                          blocked ? "opacity-40 cursor-not-allowed line-through" :
                          timeWindow === t ? "border-accent text-accent" : "border-border hover:border-muted-foreground")}>
                        {t}
                      </button>
                    );
                  })}
                </div>
                {date && blockedWindows.length > 0 && (
                  <p className="text-xs text-muted-foreground">Greyed-out windows are already booked.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Service type</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICE_MODES.map((m) => (
                    <button key={m} onClick={() => setServiceMode(m)}
                      className={cn("rounded-lg border bg-card py-3 px-4 text-sm transition text-left",
                        serviceMode === m ? "border-accent text-accent" : "border-border hover:border-muted-foreground")}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-lg mb-4">Summary</h3>
                <Row k={pkg.name} v={`$${pkg.basePrice}`} />
                {size && <Row k={size.label} v={size.modifier ? `+$${size.modifier}` : "+$0"} />}
                {condition && <Row k={`${condition.label} condition`} v={condition.modifier ? `+$${condition.modifier}` : "+$0"} />}
                {ADDONS.filter((a) => addons[a.key]).map((a) => (
                  <Row key={a.key} k={a.label} v={`+$${a.price}`} />
                ))}
                <div className="border-t border-border my-3" />
                <Row k="Estimated total" v={`$${total}`} bold />
                <Row k={paymentType === "full" ? "Charged today (full)" : "Deposit due now"} v={`$${paymentType === "full" ? total : pkg.deposit}`} bold accent />
                <p className="text-xs text-muted-foreground mt-3">
                  {paymentType === "full" ? "Tax added at checkout. No further payment on the day of service." : "Deposit is applied to your final total. Tax added at checkout."}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-lg mb-3">How would you like to pay?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button onClick={() => setPaymentType("deposit")}
                    className={cn("rounded-lg border bg-background p-4 text-left transition",
                      paymentType === "deposit" ? "border-accent" : "border-border hover:border-muted-foreground")}>
                    <div className="font-display">Pay deposit</div>
                    <div className="text-xs text-muted-foreground mt-1">Pay ${pkg.deposit} now, balance on completion.</div>
                  </button>
                  <button onClick={() => setPaymentType("full")}
                    className={cn("rounded-lg border bg-background p-4 text-left transition",
                      paymentType === "full" ? "border-accent" : "border-border hover:border-muted-foreground")}>
                    <div className="font-display">Pay in full</div>
                    <div className="text-xs text-muted-foreground mt-1">Pay ${total} now. Done — nothing on the day.</div>
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-lg mb-3">Appointment</h3>
                <p className="text-sm">{date && format(date, "PPP")} · {timeWindow}</p>
                <p className="text-sm text-muted-foreground">{serviceMode}</p>
                <p className="text-sm text-muted-foreground mt-2">{details.address}</p>
              </div>
              <Button onClick={submit} disabled={submitting} size="lg" className="w-full">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating checkout…</>
                  : paymentType === "full" ? `Pay $${total} & confirm →` : `Pay $${pkg.deposit} deposit & reserve →`}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Secure payment by Stripe. You'll get a confirmation email.</p>
            </div>
          )}
        </div>
      </main>

      {/* Sticky bottom bar */}
      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-md z-30">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-3 flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-mono text-xs text-muted-foreground">Estimated total</div>
              <div className="font-display text-xl">${total}</div>
            </div>
            <div className="flex gap-2">
              {step > 0 && <Button variant="outline" onClick={prev}>Back</Button>}
              <Button onClick={next} disabled={!canContinue}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input type={type} value={v} onChange={(e) => on(e.target.value)} />
  </div>
);

const Row = ({ k, v, bold, accent }: { k: string; v: string; bold?: boolean; accent?: boolean }) => (
  <div className={cn("flex justify-between py-1.5 text-sm", bold && "font-semibold text-base", accent && "text-accent")}>
    <span>{k}</span><span className="font-mono">{v}</span>
  </div>
);

export default InstantBooking;
