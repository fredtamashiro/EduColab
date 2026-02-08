const nowIso = () => new Date().toISOString()
const shortDate = (iso) => (iso ? new Date(iso).toLocaleDateString('pt-BR') : '—')

export { nowIso, shortDate }
