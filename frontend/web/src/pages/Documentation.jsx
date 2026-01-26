import React from 'react'

export default function Documentation(){
  return (
    <main className="container py-8">
      <h2 className="text-2xl font-semibold text-primary">Documentation</h2>
      <section className="mt-4 card">
        <h4 className="font-medium">System overview</h4>
        <p className="text-slate-700 mt-2">e-SIKKA is a client-side admin portal for government-managed citizen wallet disbursements and tracking. The app is structured for easy Supabase integration and role-based routing.</p>
      </section>

      <section className="mt-4 card">
        <h4 className="font-medium">Architecture</h4>
        <ul className="list-disc pl-5 text-slate-700 mt-2 text-sm">
          <li>React + Vite frontend</li>
          <li>Tailwind CSS for styling</li>
          <li>Services folder contains API placeholders for Supabase</li>
          <li>Role-based protected routes for Government and Citizen users</li>
        </ul>
      </section>

      <section className="mt-4 card">
        <h4 className="font-medium">Data flow</h4>
        <p className="text-slate-700 mt-2">Frontend calls the API layer in `src/services` which should be replaced with Supabase calls. Authentication is mocked and stored in `localStorage` until Supabase is integrated.</p>
      </section>

      <section className="mt-4 card">
        <h4 className="font-medium">Future scope</h4>
        <p className="text-slate-700 mt-2">Mobile wallet app, QR payments, real Supabase integration, and audit logs.</p>
      </section>
    </main>
  )
}
