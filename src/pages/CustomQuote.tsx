import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CUSTOM_QUOTE_SERVICES, TIMELINES } from "@/lib/booking-config";
import { supabase } from "@/integrations/supabase/client";

const REASON_TEXT: Record<string, string> = {
  xl: "We've moved you to the custom quote flow because XL/oversized vehicles need a tailored estimate.",
  extreme: "Extreme condition jobs need a tailored estimate — please share photos so we can scope the work.",
};

const CustomQuote = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const reason = params.get("reason");
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service_needed: "", asset_type: "",
    vehicle_year: "", vehicle_make: "", vehicle_model: "",
    length_ft: "", main_goal: "", timeline: "", notes: "",
  });

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/")).slice(0, 6);
    setFiles((prev) => [...prev, ...list].slice(0, 6));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service_needed) {
      toast.error("Please fill in name, email, phone, and service.");
      return;
    }
    setSubmitting(true);
    try {
      const photoUrls: string[] = [];
      for (const f of files) {
        const path = `${crypto.randomUUID()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("quote-photos").upload(path, f, {
          cacheControl: "3600", upsert: false,
        });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("quote-photos").getPublicUrl(path);
        photoUrls.push(data.publicUrl);
      }
      const { error } = await supabase.from("quote_requests").insert({
        ...form, photo_urls: photoUrls,
      });
      if (error) throw error;
      supabase.functions.invoke("send-notification", {
        body: { kind: "quote_request_customer", to: form.email, data: form },
      }).catch(() => {});
      supabase.functions.invoke("send-notification", {
        body: { kind: "quote_request_owner", to: form.email, data: { ...form, photo_count: photoUrls.length } },
      }).catch(() => {});
      navigate("/book/quote/success");
    } catch (e) {
      console.error(e);
      toast.error("Could not submit. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Get a Custom Detailing Quote | Santos Auto Detailing</title>
        <meta name="description" content="Request a custom quote for paint correction, ceramic coating, boats, RVs, aircraft, or fleet detailing." />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <Link to="/book" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">Custom Quote</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Tell us about the job.</h1>
          <p className="text-muted-foreground mb-8">
            Share a few photos and details — we'll review and reply with the right package and quote.
          </p>

          {reason && REASON_TEXT[reason] && (
            <div className="mb-8 rounded-lg border border-accent/40 bg-accent/5 p-4 text-sm text-foreground">
              {REASON_TEXT[reason]}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <F label="Name" v={form.name} on={(v) => setForm({ ...form, name: v })} required />
              <F label="Phone" type="tel" v={form.phone} on={(v) => setForm({ ...form, phone: v })} required />
            </div>
            <F label="Email" type="email" v={form.email} on={(v) => setForm({ ...form, email: v })} required />

            <div className="space-y-2">
              <Label>Service needed *</Label>
              <Select value={form.service_needed} onValueChange={(v) => setForm({ ...form, service_needed: v })}>
                <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
                <SelectContent>
                  {CUSTOM_QUOTE_SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <F label="Vehicle / asset type (e.g. Yacht, Sprinter Van, Cessna 172)" v={form.asset_type} on={(v) => setForm({ ...form, asset_type: v })} />

            <div className="grid sm:grid-cols-3 gap-4">
              <F label="Year" v={form.vehicle_year} on={(v) => setForm({ ...form, vehicle_year: v })} />
              <F label="Make" v={form.vehicle_make} on={(v) => setForm({ ...form, vehicle_make: v })} />
              <F label="Model" v={form.vehicle_model} on={(v) => setForm({ ...form, vehicle_model: v })} />
            </div>

            <F label="Length (boat / RV / aircraft) — feet" v={form.length_ft} on={(v) => setForm({ ...form, length_ft: v })} />

            <div className="space-y-2">
              <Label>Main goal</Label>
              <Textarea value={form.main_goal} onChange={(e) => setForm({ ...form, main_goal: e.target.value })}
                placeholder="e.g. Restore paint gloss, remove pet odor, prep for sale" />
            </div>

            <div className="space-y-2">
              <Label>Photos (up to 6)</Label>
              <label className="flex items-center justify-center gap-2 border border-dashed border-border rounded-lg py-6 cursor-pointer hover:border-accent transition">
                <Upload className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Tap to upload</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={onPick} />
              </label>
              {files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {files.map((f, i) => (
                    <div key={i} className="relative aspect-square rounded overflow-hidden border border-border">
                      <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="" />
                      <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Preferred timeline</Label>
              <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                <SelectTrigger><SelectValue placeholder="When do you need this done?" /></SelectTrigger>
                <SelectContent>
                  {TIMELINES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit quote request"}
            </Button>
          </form>
        </div>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
};

const F = ({ label, v, on, type = "text", required }: { label: string; v: string; on: (v: string) => void; type?: string; required?: boolean }) => (
  <div className="space-y-2">
    <Label>{label}{required && " *"}</Label>
    <Input type={type} value={v} onChange={(e) => on(e.target.value)} required={required} />
  </div>
);

export default CustomQuote;
