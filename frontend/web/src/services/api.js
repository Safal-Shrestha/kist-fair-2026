// Centralized API placeholders (mocked). Backend developers can replace these
// TODO: Replace mock implementations with Supabase API calls

import budgetsMock from '../data/budgets'
import transactionsMock from '../data/transactions'
import walletMock from '../data/wallet'

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
