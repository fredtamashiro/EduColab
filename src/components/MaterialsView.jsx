import { useState } from 'react'
import { shortDate } from '../utils/date'
import { subjects } from '../data/seed'

function MaterialsView({
  materials,
  exams,
  showDeleted,
  onToggleShowDeleted,
  onCreate,
  onOpen,
  onDelete,
  onTogglePublic,
}) {
  const [aiNotice, setAiNotice] = useState('')
  const [form, setForm] = useState({
    title: '',
    subject: '',
    grade: '',
    summary: '',
    content: '',
  })

  const resetForm = () =>
    setForm({ title: '', subject: '', grade: '', summary: '', content: '' })

  return (
    <section>
      <header className="section-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Meus materiais didáticos</h1>
        </div>
        <div className="inline">
          <label className="toggle">
            <input type="checkbox" checked={showDeleted} onChange={onToggleShowDeleted} />
            Mostrar arquivados
          </label>
        </div>
      </header>

      {aiNotice && (
        <div className="alert">
          {aiNotice}
          <button className="ghost" onClick={() => setAiNotice('')}>
            Fechar
          </button>
        </div>
      )}

      <div className="grid two">
        <form
          className="card form"
          onSubmit={(event) => {
            event.preventDefault()
            if (!form.title || !form.subject) return
            onCreate({
              title: form.title,
              subject: form.subject,
              grade: form.grade || '—',
              summary: form.summary,
              content: form.content,
            })
            setAiNotice(
              `✨ IA simulada: revisão inicial concluída. 2 sugestões disponíveis para "${form.title}".`
            )
            resetForm()
          }}
        >
          <h3>Novo material</h3>
          <input
            placeholder="Título"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <div className="grid two compact">
            <select
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
            >
              <option value="">Disciplina</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <input
              placeholder="Ano/série"
              value={form.grade}
              onChange={(event) => setForm({ ...form, grade: event.target.value })}
            />
          </div>
          <textarea
            rows="3"
            placeholder="Resumo rápido"
            value={form.summary}
            onChange={(event) => setForm({ ...form, summary: event.target.value })}
          />
          <textarea
            rows="4"
            placeholder="Conteúdo principal"
            value={form.content}
            onChange={(event) => setForm({ ...form, content: event.target.value })}
          />
          <button className="primary" type="submit">
            Criar material
          </button>
        </form>

        <div className="stack">
          {materials.length === 0 ? (
            <div className="card empty">
              <h3>Sem materiais ainda</h3>
              <p>Crie o primeiro material para iniciar o MVP.</p>
            </div>
          ) : (
            materials.map((material) => {
              const examCount = exams.filter((exam) => exam.materialId === material.id).length
              return (
                <article key={material.id} className="card">
                  <div className="card-head">
                    <div>
                      <h3>{material.title}</h3>
                      <p>
                        {material.subject} • {material.grade}
                      </p>
                    </div>
                    <span className={`tag ${material.isPublic ? 'public' : ''}`}>
                      {material.isPublic ? 'Público' : 'Privado'}
                    </span>
                  </div>
                  <p>{material.summary || 'Sem resumo.'}</p>
                  <div className="meta">
                    <span>Atualizado: {shortDate(material.updatedAt)}</span>
                    <span
                      className={`badge ${
                        examCount > 0 ? 'badge--success' : 'badge--muted'
                      }`}
                    >
                      Questionários: {examCount}
                    </span>
                    {material.deleted && <span>Arquivado</span>}
                  </div>
                  <div className="actions">
                    <button className="ghost" onClick={() => onOpen(material.id)}>
                      Abrir
                    </button>
                    <button className="ghost" onClick={() => onTogglePublic(material.id)}>
                      {material.isPublic ? 'Privar' : 'Publicar'}
                    </button>
                    <button className="danger" onClick={() => onDelete(material.id)}>
                      Arquivar
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default MaterialsView
