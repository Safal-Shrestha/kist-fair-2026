export function formatINR(value){
  if(value === null || value === undefined || value === '') return '—'
  const n = Number(value) || 0
  return 'रु ' + new Intl.NumberFormat('en-IN').format(n)
}
