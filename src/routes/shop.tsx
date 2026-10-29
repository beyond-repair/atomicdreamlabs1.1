import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DEFAULT_BIZ, cashAppHref } from "@/lib/nexus/business";
import { placeShopOrder, readShopOrder, type PaidOrder } from "@/lib/nexus/orders";

export const Route = createFileRoute("/shop")({ component: Shop });

function Shop() {
  const biz = DEFAULT_BIZ;
  const tag = biz.rails.cashApp || "$AtomicDreamLabs";
  const [buyer, setBuyer] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [slip, setSlip] = useState<PaidOrder | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [copied, setCopied] = useState(false);
  const [lookup, setLookup] = useState("");
  const [found, setFound] = useState("");

  async function requestOffer(offerId: string) {
    setBusy(offerId);
    setError("");
    const placed = await placeShopOrder({ data: { offerId, buyer, note: notes[offerId] ?? "" } });
    setBusy("");
    if (!placed.ok) {
      setSlip(null);
      setError(placed.error);
      return;
    }
    setSlip(placed.order);
    setCopied(false);
  }

  async function copyId() {
    if (!slip) return;
    try {
      await navigator.clipboard.writeText(slip.id);
      setCopied(true);
    } catch {
      setCopied(false);
      setError("Copy failed. Select the id and copy it yourself.");
    }
  }

  async function checkOrder() {
    setFound("");
    setError("");
    const res = await readShopOrder({ data: { id: lookup } });
    if (!res.ok) {
      setFound(res.error);
      return;
    }
    setFound(`${res.order.id} · ${res.order.name} · $${res.order.price} · ${res.order.status}`);
  }

  return (
    <main className="shop-page">
      <p className="shop-kicker">ADL NEXUS</p>
      <h1>{biz.name}</h1>
      <p className="shop-pitch">{biz.pitch}</p>
      <label className="shop-label">
        Your name
        <input className="shop-field" value={buyer} maxLength={80} onChange={(e) => setBuyer(e.target.value)} />
      </label>
      <ul>
        {biz.offerings.map((o) => {
          const href = cashAppHref(tag, o.price);
          return (
            <li key={o.id}>
              <h2>{o.name}</h2>
              <p className="shop-price">${o.price}</p>
              <p>{o.note}</p>
              <label className="shop-label">
                What you need
                <input
                  className="shop-field"
                  value={notes[o.id] ?? ""}
                  maxLength={500}
                  onChange={(e) => setNotes((n) => ({ ...n, [o.id]: e.target.value }))}
                />
              </label>
              <button type="button" disabled={busy === o.id} onClick={() => void requestOffer(o.id)}>
                {busy === o.id ? "Saving…" : `Request $${o.price}`}
              </button>
              {href ? (
                <a href={href}>
                  Pay ${o.price} on Cash App
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
      {error ? <p className="shop-fine">{error}</p> : null}
      {slip ? (
        <section className="shop-slip">
          <p>Order {slip.id}</p>
          <p>
            {slip.name} · ${slip.price}
          </p>
          <p className="shop-fine">In Cash App, put {slip.id} in the note. This page cannot see the payment.</p>
          <button type="button" onClick={() => void copyId()}>
            {copied ? "Copied" : "Copy id"}
          </button>
          <a href={slip.href}>Pay ${slip.price} on Cash App</a>
        </section>
      ) : null}
      <label className="shop-label">
        Check an order
        <input className="shop-field" value={lookup} maxLength={24} autoCapitalize="characters" onChange={(e) => setLookup(e.target.value)} />
      </label>
      <button type="button" onClick={() => void checkOrder()}>
        Check
      </button>
      {found ? <p className="shop-fine">{found}</p> : null}
      <p className="shop-fine">The order stays on this machine. Cash App is optional. A status check shows the offer and the state, not your note.</p>
      <Link to="/" className="shop-back">
        Back to the office
      </Link>
    </main>
  );
}
