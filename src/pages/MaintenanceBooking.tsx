import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SERVICE_MODES, TIME_WINDOWS } from "@/lib/booking-config";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

const MaintenanceBooking = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [requestEmail, setRequestEmail] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    first_name: "", last_name: "", phone: "",
    vehicle_year: "", vehicle_make: "", vehicle_model: "",
    address: "", notes: "", service_mode: "",
  });
  const [date, setDate] = useState<Date | undefined>();
  const [timeWindow, setTimeWindow] = useState("");
  const [blockedWindows, setBlockedWindows] = useState<string[]>([]);

  useEffect(() => {
    if (!date) { setBlockedWindows([]); return; }
    const d = format(date, "yyyy-MM-dd");
    supabase.from("blocked_slots").select("time_window").eq("slot_date", d).then(({ data }) => {
      setBlockedWindows((data ?? []).map((r: any) => r.time_window));
      if (timeWindow && (data ?? []).some((r: any) => r.time_window === timeWindow)) setTimeWindow("");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const requestLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(requestEmail)) return toast.error("Enter a valid email.");
    setRequesting(true);
    const { error } = await supabase.functions.invoke("request-maintenance-link", {
      body: { email: requestEmail, origin: window.location.origin, environment: getStripeEnvironment() },
    });
    setRequesting(false);
    if (error) return toast.error(error.message);
    setRequestSent(true);
  };

  const submit = async () => {
    if (!token) return;
    if (!form.first_name || !form.last_name || form.phone.length < 7) return toast.error("Name and phone required.");
    if (!date || !timeWindow || !form.service_mode) return toast.error("Pick date, time and service type.");
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-maintenance-booking", {
      body: {
        token,
        ...form,
        preferred_date: format(date, "yyyy-MM-dd"),
        time_window: timeWindow,
      },
    });
    setSubmitting(false);
    if (error || !data?.booking_id) return toast.error(data?.error || error?.message || "Could not book.");
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet><title>Schedule your maintenance visit | Santos</title><meta name="robots" content="noindex" /></Helmet>
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <Link to="/maintenance" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to plan
          </Link>

          {done ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-6" />
              <h1 className="font-display text-3xl font-semibold mb-3">You're booked.</h1>
              <p className="text-muted-foreground mb-8">We'll confirm exact arrival the day before.</p>
              <Link to="/"><Button variant="outline">Back to home</Button></Link>
            </div>
          ) : !token ? (
            <div className="max-w-md">
              <h1 className="font-display text-3xl font-semibold mb-3">Schedule your monthly visit</h1>
              <p className="text-muted-foreground mb-6">Enter the email tied to your subscription. We'll send you a secure link to pick a date and time.</p>
              {requestSent ? (
                <div className="rounded-lg border border-accent/40 bg-accent/5 p-5 text-sm">
                  Check <strong>{requestEmail}</strong> for a link to schedule. Link expires in 24 hours.
                </div>
              ) : (
                <form onSubmit={requestLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" required value={requestEmail} onChange={(e) => setRequestEmail(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full" disabled={requesting}>
                    {requesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Email me a scheduling link
                  </Button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2">Maintenance Plan</p>
                <h1 className="font-display text-3xl font-semibold">Schedule your visit</h1>
                <p className="text-muted-foreground mt-2">No charge — covered by your subscription.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" v={form.first_name} on={(v) => setForm({ ...form, first_name: v })} />
                <Field label="Last name" v={form.last_name} on={(v) => setForm({ ...form, last_name: v })} />
                <Field label="Phone" type="tel" v={form.phone} on={(v) => setForm({ ...form, phone: v })} />
                <Field label="Service address" v={form.address} on={(v) => setForm({ ...form, address: v })} />
                <Field label="Vehicle year" v={form.vehicle_year} on={(v) => setForm({ ...form, vehicle_year: v })} />
                <Field label="Vehicle make" v={form.vehicle_make} on={(v) => setForm({ ...form, vehicle_make: v })} />
                <Field label="Vehicle model" v={form.vehicle_model} on={(v) => setForm({ ...form, vehicle_model: v })} />
              </div>

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
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Preferred time window</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_WINDOWS.map((t) => {
                    const blocked = blockedWindows.includes(t);
                    return (
                      <button key={t} onClick={() => !blocked && setTimeWindow(t)} disabled={blocked}
                        className={cn("rounded-lg border bg-card py-3 text-sm transition",
                          blocked ? "opacity-40 cursor-not-allowed line-through" :
                          timeWindow === t ? "border-accent text-accent" : "border-border hover:border-muted-foreground")}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service type</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICE_MODES.map((m) => (
                    <button key={m} onClick={() => setForm({ ...form, service_mode: m })}
                      className={cn("rounded-lg border bg-card py-3 px-4 text-sm transition text-left",
                        form.service_mode === m ? "border-accent text-accent" : "border-border hover:border-muted-foreground")}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>

              <Button onClick={submit} disabled={submitting} size="lg" className="w-full">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking…</> : "Confirm visit"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

const Field = ({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input type={type} value={v} onChange={(e) => on(e.target.value)} />
  </div>
);

export default MaintenanceBooking;
