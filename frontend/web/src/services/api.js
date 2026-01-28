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
