import { useState } from 'react'
import { shortDate } from '../utils/date'
import { subjects } from '../data/seed'

function MaterialDetail({
  material,
  teacherName,
  onBack,
  onSave,
  onTogglePublic,
  onDelete,
  onCreateExam,
}) {
  const [form, setForm] = useState({
    title: material.title,
    subject: material.subject,
    grade: material.grade,
    summary: material.summary,
    content: material.content,
  })
  const [alertVisible, setAlertVisible] = useState(false)

  const changed =
    form.title !== material.title ||
    form.subject !== material.subject ||
    form.grade !== material.grade ||
    form.summary !== material.summary ||
    form.content !== material.content

  return (
    <section>
      <header className="section-header">
        <div>
          <button className="link" onClick={onBack}>
            ← voltar
          </button>
          <h1>{material.title}</h1>
          <p>
            {teacherName} • {material.subject} • {material.grade}
          </p>
        </div>
        <div className="inline">
          <button className="ghost" onClick={onTogglePublic}>
            {material.isPublic ? 'Tornar privado' : 'Publicar na comunidade'}
          </button>
          <button className="danger" onClick={onDelete}>
            Arquivar
          </button>
        </div>
      </header>

      {alertVisible && (
        <div className="alert">
          ⚠️ IA simulada: o conteúdo mudou desde o último questionário. Revise{' '}
          {material.lastExamQuestionCount || 0} questões.
        </div>
      )}

      <div className="grid two">
        <div className="card form">
          <h3>Editar material</h3>
          <input
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
              value={form.grade}
              onChange={(event) => setForm({ ...form, grade: event.target.value })}
            />
          </div>
          <textarea
            rows="3"
            value={form.summary}
            onChange={(event) => setForm({ ...form, summary: event.target.value })}
          />
          <textarea
            rows="6"
            value={form.content}
            onChange={(event) => setForm({ ...form, content: event.target.value })}
          />
          <button
            className="primary"
            disabled={!changed}
            onClick={() => {
              onSave(form)
              setAlertVisible(true)
            }}
          >
            Salvar alterações
          </button>
        </div>

        <div className="stack">
          <div className="card">
            <h3>IA como assistente (simulada)</h3>
            <p>A IA ajuda a revisar clareza e indicar ajustes pedagógicos antes do questionário.</p>
            <button className="ghost" onClick={() => setAlertVisible(true)}>
              ✨ IA: revisar conteúdo
            </button>
          </div>
          <div className="card highlight">
            <h3>Gerar questionário a partir do material</h3>
            <p>Crie questões, defina dificuldade e salve o questionário.</p>
            <button className="primary" onClick={onCreateExam}>
              Criar questionário
            </button>
            <div className="meta">
              Último questionário: {material.lastExamAt ? shortDate(material.lastExamAt) : '—'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MaterialDetail
