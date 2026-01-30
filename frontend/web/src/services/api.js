// Centralized API placeholders (mocked). Backend developers can replace these
// TODO: Replace mock implementations with Supabase API calls

import budgetsMock from '../data/budgets'
import transactionsMock from '../data/transactions'
import walletMock from '../data/wallet'
import usersMock from '../data/users'

export async function fetchBudgets() {
  try {
    // TODO: Fetch data from Supabase API
    await new Promise((r) => setTimeout(r, 200))
    return budgetsMock
  } catch (err) {
    throw err
  }
}

export async function createBudget(payload) {
  try {
    // TODO: POST request to Supabase
    await new Promise((r) => setTimeout(r, 200))
    return { success: true, budget: { id: 'b_' + Date.now(), ...payload } }
  } catch (err) {
    throw err
  }
}

export async function updateBudget(id, payload) {
  try {
    // TODO: PUT/PATCH request to Supabase
    await new Promise((r) => setTimeout(r, 200))
    return { success: true }
  } catch (err) {
    throw err
  }
}

export async function fetchTransactions({ type } = {}) {
  try {
    // TODO: Fetch expenditure logs from Supabase
    await new Promise((r) => setTimeout(r, 200))
    return transactionsMock
  } catch (err) {
    throw err
  }
}

export async function fetchWallet(userId) {
  try {
    // TODO: Fetch wallet data for citizen from Supabase
    await new Promise((r) => setTimeout(r, 200))
    return walletMock
  } catch (err) {
    throw err
  }
}

export async function fetchUsers(){
  await new Promise((r)=>setTimeout(r,120))
  // return a shallow copy so callers can mutate locally without changing original mock
  return usersMock.map(u=>({...u}))
}

export async function toggleUserStatus(id){
  await new Promise((r)=>setTimeout(r,120))
  // Toggle in-memory mock (no persistence) — return updated user
  const u = usersMock.find(x=> x.id === id)
  if(!u) return null
  u.status = u.status === 'active' ? 'frozen' : 'active'
  return {...u}
}

export async function fetchMerchants(){
  await new Promise((r)=>setTimeout(r,120))
  // Mock merchant list
  return [
    { id:1, name:'Merchant X', category:'Grocery', walletId:101, approved:true },
    { id:2, name:'Merchant Y', category:'Pharmacy', walletId:102, approved:false },
  ]
}

export async function createMerchant(payload){
  await new Promise((r)=>setTimeout(r,160))
  return { success:true, merchant: { id: Date.now(), ...payload } }
}

export async function updateMerchant(id, payload){
  await new Promise((r)=>setTimeout(r,120))
  // In a real API, apply changes and return updated merchant
  return { success:true, merchant: { id, ...payload } }
}

export async function deleteMerchant(id){
  await new Promise((r)=>setTimeout(r,120))
  return { success:true }
}

export async function issueSubsidy(payload){
  await new Promise((r)=>setTimeout(r,160))
  // payload: { userId, category, amount, expiry }
  return { success:true, subsidy: { id: 's_'+Date.now(), ...payload } }
}

export async function createSubWallet(payload){
  await new Promise((r)=>setTimeout(r,160))
  // payload: { userId, category, amount, expiry }
  return { success:true, subWallet: { id: 'sw_'+Date.now(), ...payload } }
}

// subsidies: store in-memory mock list for admin UI (seeded)
const subsidiesMock = [
  { id: 'sub_1', issuedAt: '2026-01-10T08:00:00.000Z', category: 'School Grants', amount: 5000000, department: 'Education', expiry: '2026-03-31' },
  { id: 'sub_2', issuedAt: '2026-01-15T09:30:00.000Z', category: 'Healthcare Aid', amount: 2000000, department: 'Health', expiry: '2026-06-30' },
  { id: 'sub_3', issuedAt: '2026-02-01T12:00:00.000Z', category: 'Fertilizer Subsidy', amount: 1500000, department: 'Agriculture', expiry: '2026-04-30' },
]

export async function fetchSubsidies(){
  await new Promise(r=>setTimeout(r,120))
  return subsidiesMock.map(s=>({...s}))
}

export async function createSubsidy(payload){
  await new Promise(r=>setTimeout(r,160))
  const s = { id: 'sub_'+Date.now(), issuedAt: new Date().toISOString(), ...payload }
  subsidiesMock.unshift(s)
  return { success:true, subsidy: s }
}

export async function fetchAllocations(){
  await new Promise(r=>setTimeout(r,120))
  // mock allocations store
  if(!globalThis._allocations) globalThis._allocations = []
  return globalThis._allocations.map(a=>({...a}))
}

export async function createAllocation(payload){
  await new Promise(r=>setTimeout(r,160))
  if(!globalThis._allocations) globalThis._allocations = []
  const a = { id: 'alloc_'+Date.now(), createdAt: new Date().toISOString(), ...payload }
  globalThis._allocations.unshift(a)
  return { success:true, allocation: a }
}

export async function fetchSubsidyLogs(){
  await new Promise(r=>setTimeout(r,120))
  // combine subsidies and allocations into simple log entries
  const subs = subsidiesMock.map(s=> ({ ts: new Date(s.issuedAt).getTime(), type: 'issued', text: `Issued ${s.amount} for ${s.category} (dept: ${s.department})`, raw: s }))
  const allocs = (globalThis._allocations || []).map(a=> ({ ts: new Date(a.createdAt).getTime(), type: 'allocation', text: `Allocated ${a.amount} to ${a.department} for FY ${a.fiscalYear}`, raw: a }))
  return [...subs, ...allocs].sort((a,b)=> b.ts - a.ts)
}

// Programs: simple mock store
const programsMock = [
  { id: 'p_1', name: 'School Grants', categories: ['Education'], budget: 5000000, fiscalYear: '2025-2026', status: 'active' },
  { id: 'p_2', name: 'Rural Health', categories: ['Health'], budget: 3000000, fiscalYear: '2025-2026', status: 'active' },
]

export async function fetchPrograms(){
  await new Promise(r=>setTimeout(r,120))
  return programsMock.map(p=>({...p}))
}

export async function createProgram(payload){
  await new Promise(r=>setTimeout(r,160))
  const p = { id: 'p_'+Date.now(), ...payload }
  programsMock.unshift(p)
  return { success:true, program: p }
}

export async function updateProgram(id, payload){
  await new Promise(r=>setTimeout(r,120))
  const idx = programsMock.findIndex(x=> x.id === id)
  if(idx>=0) programsMock[idx] = { ...programsMock[idx], ...payload }
  return { success:true, program: programsMock[idx] }
}

export async function deleteProgram(id){
  await new Promise(r=>setTimeout(r,120))
  const idx = programsMock.findIndex(x=> x.id === id)
  if(idx>=0) programsMock.splice(idx,1)
  return { success:true }
}

// allocations per program/department (in-memory)
if(!globalThis._programAllocations) globalThis._programAllocations = [
  { id: 'pa_1', programId: 'p_1', department: 'Education', amount: 5000000, fiscalYear: '2025-2026', createdAt: new Date().toISOString() },
  { id: 'pa_2', programId: 'p_2', department: 'Health', amount: 3000000, fiscalYear: '2025-2026', createdAt: new Date().toISOString() }
]

export async function fetchProgramAllocations(){
  await new Promise(r=>setTimeout(r,120))
  return globalThis._programAllocations.map(a=>({...a}))
}

export async function createProgramAllocation(payload){
  await new Promise(r=>setTimeout(r,160))
  const a = { id: 'pa_'+Date.now(), createdAt: new Date().toISOString(), ...payload }
  globalThis._programAllocations.unshift(a)
  return { success:true, allocation: a }
}
