"use client";

import { useState, useEffect } from "react";
import { Loader2, ShoppingBag, Mail, Package, CheckCircle2, Clock } from "lucide-react";

type OrderItem = { name: string; qty: number };

type OrderRecord = {
  id: string;
  status: string;
  totalPrice: number;
  customerName: string;
  email: string;
  itemsData: string;
  createdAt: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Format date helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === "DELIVERED") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (status === "SHIPPED") return <Package className="w-4 h-4 text-blue-400" />;
    return <Clock className="w-4 h-4 text-orange-400" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border)]/20 pb-5 gap-2">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-gold)]">Order Management</h1>
          <p className="font-sans text-[var(--color-faint)] text-xs md:text-sm tracking-widest uppercase mt-2">Track and fulfill customer purchases</p>
        </div>
        <div className="bg-[var(--color-bg-card)] px-4 py-2 rounded-sm border border-[var(--color-border)]/20 text-[var(--color-gold-mid)] font-sans text-[10px] tracking-widest uppercase">
          {orders.length} Active Orders
        </div>
      </div>

      <div className="bg-[var(--color-bg-low)] border border-[var(--color-border)]/20 rounded-sm overflow-hidden">
        
        {loading ? (
          <div className="flex items-center justify-center py-32 text-[var(--color-faint)]">
            <Loader2 className="w-8 h-8 animate-spin opacity-50" />
          </div>
        ) : orders.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-12 h-12 text-[var(--color-faint)] mb-4" />
            <p className="font-display text-2xl text-[var(--color-muted)] mb-2">No active orders yet</p>
            <p className="font-sans text-xs text-[var(--color-faint)]">Once your store is live, Razorpay transactions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-bg-card)]/50 border-b border-[var(--color-border)]/30 font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-faint)]">
                  <th className="p-4 md:px-6 md:py-5 min-w-[120px]">Order ID</th>
                  <th className="p-4 md:px-6 md:py-5 min-w-[200px]">Customer</th>
                  <th className="p-4 md:px-6 md:py-5 min-w-[200px]">Items</th>
                  <th className="p-4 md:px-6 md:py-5">Total</th>
                  <th className="p-4 md:px-6 md:py-5 text-right pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  
                  // Safely parse JSON items string
                  let items: OrderItem[] = [];
                  try { items = JSON.parse(order.itemsData || "[]"); } catch (e) {}

                  return (
                    <tr key={order.id} className="border-b border-[var(--color-border)]/10 hover:bg-[var(--color-bg-card)]/30 transition-colors">
                      <td className="p-4 md:px-6 py-4">
                        <span className="font-mono text-xs text-[var(--color-gold)]/60">#{order.id.slice(-6).toUpperCase()}</span>
                        <div className="font-sans text-[10px] text-[var(--color-faint)] mt-1">{formatDate(order.createdAt)}</div>
                      </td>
                      
                      <td className="p-4 md:px-6 py-4">
                        <div className="font-sans text-sm text-[var(--color-muted)] font-medium">{order.customerName || "Guest User"}</div>
                        <div className="flex items-center gap-2 font-sans text-[10px] text-[var(--color-faint)] mt-1">
                          <Mail className="w-3 h-3" /> {order.email || "No email"}
                        </div>
                      </td>

                      <td className="p-4 md:px-6 py-4">
                        <div className="space-y-1">
                          {items.map((item, idx) => (
                            <div key={idx} className="font-sans text-xs text-[var(--color-muted)] flex items-center justify-between gap-4">
                              <span className="truncate max-w-[150px]">{item.name}</span>
                              <span className="text-[var(--color-gold)] font-medium bg-[var(--color-bg-deep)] px-2 py-0.5 rounded-[2px] border border-[var(--color-border)]/20">x{item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 md:px-6 py-4">
                        <span className="font-display text-lg text-[var(--color-gold)]">₹{order.totalPrice.toLocaleString("en-IN")}</span>
                      </td>

                      <td className="p-4 md:px-6 py-4 text-right pr-6">
                        <div className="inline-flex items-center gap-2 bg-[var(--color-bg-deep)] border border-[var(--color-border)]/20 px-3 py-1.5 rounded-sm">
                          {getStatusIcon(order.status)}
                          <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)]">{order.status}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
