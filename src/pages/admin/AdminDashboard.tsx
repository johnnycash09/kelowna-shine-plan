import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

const BOOKING_STATUSES = ["New Booking","Deposit Paid","Pending Confirmation","Confirmed","Completed","Cancelled"] as const;
const QUOTE_STATUSES = ["New Request","Needs Review","Quote Sent","Accepted","Declined","Completed"] as const;

type Booking = any;
type Quote = any;
type Subscription = any;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [bFilter, setBFilter] = useState<string>("all");
  const [qFilter, setQFilter] = useState<string>("all");
  const [openBooking, setOpenBooking] = useState<Booking | null>(null);
  const [openQuote, setOpenQuote] = useState<Quote | null>(null);
  const [openAddons, setOpenAddons] = useState<any[]>([]);
  const [refunding, setRefunding] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/admin", { replace: true }); return; }
      const { data: roles } = await supabase.from("user_roles")
        .select("role").eq("user_id", sess.session.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      if (admin) await loadAll();
      setLoading(false);
    })();
  }, [navigate]);

  const loadAll = async () => {
    const [{ data: b }, { data: q }, { data: s }] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings(b ?? []); setQuotes(q ?? []); setSubs(s ?? []);
  };

  const refundBooking = async (bookingId: string) => {
    if (!confirm("Refund this customer's deposit and cancel the booking? This frees the slot.")) return;
    setRefunding(true);
    const { data, error } = await supabase.functions.invoke("refund-deposit", {
      body: { bookingId, environment: getStripeEnvironment() },
    });
    setRefunding(false);
    if (error || !data?.refunded) return toast.error(error?.message || data?.error || "Refund failed");
    toast.success("Refund processed and slot freed.");
    await loadAll();
    setOpenBooking((prev) => prev ? { ...prev, status: "Cancelled" } : prev);
  };

  const openBookingDetail = async (b: Booking) => {
    setOpenBooking(b);
    const { data } = await supabase.from("booking_addons").select("*").eq("booking_id", b.id);
    setOpenAddons(data ?? []);
  };

  const updateBooking = async (id: string, patch: any) => {
    const { error } = await supabase.from("bookings").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((arr) => arr.map((b) => b.id === id ? { ...b, ...patch } : b));
    if (openBooking?.id === id) setOpenBooking({ ...openBooking, ...patch });
    toast.success("Updated");
  };
  const updateQuote = async (id: string, patch: any) => {
    const { error } = await supabase.from("quote_requests").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setQuotes((arr) => arr.map((q) => q.id === id ? { ...q, ...patch } : q));
    if (openQuote?.id === id) setOpenQuote({ ...openQuote, ...patch });
    toast.success("Updated");
  };

  const filteredBookings = useMemo(
    () => bFilter === "all" ? bookings : bookings.filter((b) => b.status === bFilter),
    [bookings, bFilter],
  );
  const filteredQuotes = useMemo(
    () => qFilter === "all" ? quotes : quotes.filter((q) => q.status === qFilter),
    [quotes, qFilter],
  );

  const signOut = async () => { await supabase.auth.signOut(); navigate("/admin"); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-2xl mb-2">Access denied</h1>
        <p className="text-muted-foreground text-sm mb-4">Your account doesn't have admin access.</p>
        <Button onClick={signOut} variant="outline">Sign out</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Admin Dashboard | Santos</title><meta name="robots" content="noindex" /></Helmet>
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Santos Admin</h1>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="quotes">Quote requests ({quotes.length})</TabsTrigger>
            <TabsTrigger value="subs">Subscriptions ({subs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <Select value={bFilter} onValueChange={setBFilter}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {BOOKING_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Package</th>
                    <th className="text-left p-3">Total</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id} onClick={() => openBookingDetail(b)} className="border-t border-border hover:bg-card/50 cursor-pointer">
                      <td className="p-3">{new Date(b.created_at).toLocaleDateString()}</td>
                      <td className="p-3">{b.first_name} {b.last_name}<div className="text-xs text-muted-foreground">{b.email}</div></td>
                      <td className="p-3">{b.package_name}</td>
                      <td className="p-3 font-mono">${b.estimated_total}</td>
                      <td className="p-3"><Badge variant="outline">{b.status}</Badge></td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No bookings yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="quotes" className="mt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <Select value={qFilter} onValueChange={setQFilter}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {QUOTE_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Service</th>
                    <th className="text-left p-3">Photos</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((q) => (
                    <tr key={q.id} onClick={() => setOpenQuote(q)} className="border-t border-border hover:bg-card/50 cursor-pointer">
                      <td className="p-3">{new Date(q.created_at).toLocaleDateString()}</td>
                      <td className="p-3">{q.name}<div className="text-xs text-muted-foreground">{q.email}</div></td>
                      <td className="p-3">{q.service_needed}</td>
                      <td className="p-3">{q.photo_urls?.length ?? 0}</td>
                      <td className="p-3"><Badge variant="outline">{q.status}</Badge></td>
                    </tr>
                  ))}
                  {filteredQuotes.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No quote requests yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="subs" className="mt-6">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Started</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Plan</th>
                    <th className="text-left p-3">Renews</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s) => (
                    <tr key={s.id} className="border-t border-border">
                      <td className="p-3">{new Date(s.created_at).toLocaleDateString()}</td>
                      <td className="p-3">{s.customer_name || "—"}<div className="text-xs text-muted-foreground">{s.customer_email}</div></td>
                      <td className="p-3 font-mono text-xs">{s.price_id}</td>
                      <td className="p-3">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</td>
                      <td className="p-3"><Badge variant={s.status === "active" || s.status === "trialing" ? "default" : "outline"}>{s.cancel_at_period_end ? "Cancels at period end" : s.status}</Badge></td>
                    </tr>
                  ))}
                  {subs.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No active subscriptions yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking detail */}
      <Sheet open={!!openBooking} onOpenChange={(o) => !o && setOpenBooking(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {openBooking && (
            <>
              <SheetHeader><SheetTitle>{openBooking.package_name}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-5 text-sm">
                <Section title="Customer">
                  <p>{openBooking.first_name} {openBooking.last_name}</p>
                  <p className="text-muted-foreground">{openBooking.email} · {openBooking.phone}</p>
                  <p className="text-muted-foreground">{openBooking.address}</p>
                </Section>
                <Section title="Vehicle">
                  <p>{openBooking.vehicle_year} {openBooking.vehicle_make} {openBooking.vehicle_model}</p>
                  <p className="text-muted-foreground">{openBooking.vehicle_size} · {openBooking.condition} condition</p>
                </Section>
                <Section title="Appointment">
                  <p>{openBooking.preferred_date} · {openBooking.time_window}</p>
                  <p className="text-muted-foreground">{openBooking.service_mode}</p>
                </Section>
                <Section title="Add-ons">
                  {openAddons.length === 0 ? <p className="text-muted-foreground">None</p> : (
                    <ul className="space-y-1">
                      {openAddons.map((a) => <li key={a.id} className="flex justify-between"><span>{a.addon_label}</span><span className="font-mono">+${a.price}</span></li>)}
                    </ul>
                  )}
                </Section>
                <Section title="Pricing">
                  <div className="flex justify-between"><span>Estimated total</span><span className="font-mono">${openBooking.estimated_total}</span></div>
                  <div className="flex justify-between"><span>Deposit</span><span className="font-mono">${openBooking.deposit_amount}</span></div>
                </Section>
                {openBooking.notes && <Section title="Customer notes"><p className="text-muted-foreground whitespace-pre-wrap">{openBooking.notes}</p></Section>}

                <Section title="Status">
                  <Select value={openBooking.status} onValueChange={(v) => updateBooking(openBooking.id, { status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{BOOKING_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </Section>
                <Section title="Internal notes">
                  <Textarea defaultValue={openBooking.internal_notes ?? ""}
                    onBlur={(e) => updateBooking(openBooking.id, { internal_notes: e.target.value })} />
                </Section>
                {openBooking.status === "Deposit Paid" && (
                  <Section title="Refund">
                    <Button variant="destructive" size="sm" disabled={refunding}
                      onClick={() => refundBooking(openBooking.id)}>
                      {refunding ? "Processing…" : `Refund $${openBooking.deposit_amount} deposit & cancel`}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Frees the time slot and marks the booking Cancelled.</p>
                  </Section>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Quote detail */}
      <Sheet open={!!openQuote} onOpenChange={(o) => !o && setOpenQuote(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {openQuote && (
            <>
              <SheetHeader><SheetTitle>{openQuote.service_needed}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-5 text-sm">
                <Section title="Customer">
                  <p>{openQuote.name}</p>
                  <p className="text-muted-foreground">{openQuote.email} · {openQuote.phone}</p>
                </Section>
                <Section title="Asset">
                  <p>{openQuote.asset_type}</p>
                  <p className="text-muted-foreground">{openQuote.vehicle_year} {openQuote.vehicle_make} {openQuote.vehicle_model}</p>
                  {openQuote.length_ft && <p className="text-muted-foreground">{openQuote.length_ft} ft</p>}
                </Section>
                {openQuote.main_goal && <Section title="Main goal"><p className="text-muted-foreground whitespace-pre-wrap">{openQuote.main_goal}</p></Section>}
                {openQuote.timeline && <Section title="Timeline"><p>{openQuote.timeline}</p></Section>}
                {openQuote.notes && <Section title="Notes"><p className="text-muted-foreground whitespace-pre-wrap">{openQuote.notes}</p></Section>}
                {openQuote.photo_urls?.length > 0 && (
                  <Section title="Photos">
                    <div className="grid grid-cols-3 gap-2">
                      {openQuote.photo_urls.map((u: string) => (
                        <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                          <img src={u} alt="" className="aspect-square object-cover rounded border border-border" />
                        </a>
                      ))}
                    </div>
                  </Section>
                )}
                <Section title="Status">
                  <Select value={openQuote.status} onValueChange={(v) => updateQuote(openQuote.id, { status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{QUOTE_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </Section>
                <Section title="Internal notes">
                  <Textarea defaultValue={openQuote.internal_notes ?? ""}
                    onBlur={(e) => updateQuote(openQuote.id, { internal_notes: e.target.value })} />
                </Section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">{title}</p>
    <div className="space-y-1">{children}</div>
  </div>
);

export default AdminDashboard;
