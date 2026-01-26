// Mock Auth service and placeholders for Supabase integration
// TODO: Replace with Supabase auth calls
const USER_KEY = 'esikka_user'

export async function login({ email, password, role }) {
  // Mock authentication delay
  await new Promise((r) => setTimeout(r, 400))
  // email param may be used to pass phone in the current UI. Store both phone and a display name for demo.
  const user = { id: 'u_' + Date.now(), name: 'John Doe', phone: email, role }
  // TODO: POST request to Supabase auth (signInWithPassword or OTP)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export async function logout() {
  localStorage.removeItem(USER_KEY)
}

export async function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

export async function fetchUserRole(userId) {
  // TODO: Fetch role from Supabase
  const u = await getCurrentUser()
  return u?.role || null
}
