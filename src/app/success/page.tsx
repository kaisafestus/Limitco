import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface SuccessPageProps {
  searchParams: {
    code?: string;
    amount?: string;
    package?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const code = searchParams.code || "N/A";
  const amount = searchParams.amount || "0";
  const packageName = searchParams.package || "Fuliza Package";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl border border-green-700 shadow-2xl bg-slate-900">
        <CardHeader className="bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#86efac] text-slate-950 border-b border-green-700">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#16a34a] shadow-lg">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">Payment Confirmed</CardTitle>
              <CardDescription className="text-slate-800">Your M-Pesa transaction completed successfully.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Transaction reference</p>
            <h2 className="mt-3 text-4xl font-semibold text-white tracking-tight">{code}</h2>
            <p className="mt-4 text-sm text-slate-400 max-w-2xl">
              Thank you for your purchase. Your payment request for <strong>{packageName}</strong> of <strong>KSh {Number(amount).toLocaleString()}</strong> has been queued and confirmed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Package</p>
              <p className="mt-3 text-lg font-semibold text-white">{packageName}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Amount</p>
              <p className="mt-3 text-lg font-semibold text-white">KSh {Number(amount).toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-green-700 bg-green-950/80 p-5 text-slate-100">
            <p className="text-sm font-medium text-green-200">What happens next</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              <li>• Keep your transaction code for your records.</li>
              <li>• If you have not yet approved the STK Push on your phone, you can retry from the homepage.</li>
              <li>• If you need help, contact our support team with the code above.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100">
                Return to home
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Contact support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
