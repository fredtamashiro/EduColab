import { useMemo, useRef, useState } from 'react'
import './App.css'

const teachersSeed = [
  { id: 't1', name: 'Ana Paula', discipline: 'Matemática' },
  { id: 't2', name: 'Carlos Eduardo', discipline: 'História' },
  { id: 't3', name: 'Juliana Rocha', discipline: 'Biologia' },
]

const materialsSeed = [
  {
    id: 'm1',
    ownerId: 't1',
    title: 'Funções do 2º grau: introdução',
    subject: 'Matemática',
    grade: '2º ano',
    summary: 'Material com exemplos práticos e exercícios iniciais.',
    content:
      'Conceito de função do 2º grau, gráfico, concavidade e raízes. Exercícios com problemas do cotidiano.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-20T10:00:00',
    lastExamAt: '2026-01-22T14:00:00',
    lastExamQuestionCount: 4,
  },
  {
    id: 'm2',
    ownerId: 't2',
    title: 'Brasil República: Primeira República',
    subject: 'História',
    grade: '3º ano',
    summary: 'Linha do tempo, principais movimentos e impactos.',
    content:
      'Contexto pós-1889, política dos governadores, economia cafeeira e movimentos sociais da época.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-18T09:30:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
]

const examsSeed = [
  {
    id: 'e1',
    ownerId: 't1',
    materialId: 'm1',
    title: 'Prova - Funções do 2º grau',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        prompt: 'Qual é o coeficiente que define a concavidade da parábola?',
        options: ['a', 'b', 'c', 'd'],
        answer: 'a',
        difficulty: 'F',
      },
      {
        id: 'q2',
        type: 'disc',
        prompt: 'Explique o que são as raízes de uma função quadrática.',
        options: [],
        answer: '',
        difficulty: 'M',
      },
    ],
    createdAt: '2026-01-22T14:00:00',
  },
]

const commentsSeed = [
  {
    id: 'c1',
    materialId: 'm1',
    authorId: 't3',
    text: 'Gostei dos exemplos. Talvez incluir um exercício aplicado a física?',
    createdAt: '2026-01-23T11:10:00',
  },
]

const nowIso = () => new Date().toISOString()
const shortDate = (iso) => (iso ? new Date(iso).toLocaleDateString('pt-BR') : '—')

function App() {
  const nextId = useRef(10)
  const [teachers] = useState(teachersSeed)
  const [materials, setMaterials] = useState(materialsSeed)
  const [exams, setExams] = useState(examsSeed)
  const [comments, setComments] = useState(commentsSeed)
  const [currentTeacherId, setCurrentTeacherId] = useState('')
  const [view, setView] = useState('login')
  const [selectedMaterialId, setSelectedMaterialId] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)
  const [showDeleted, setShowDeleted] = useState(false)

  const currentTeacher = teachers.find((t) => t.id === currentTeacherId)

  const myMaterials = materials.filter(
    (m) => m.ownerId === currentTeacherId && (showDeleted || !m.deleted)
  )

  const publicMaterials = materials.filter((m) => m.isPublic && !m.deleted)

  const myExams = exams.filter((e) => e.ownerId === currentTeacherId)

  const selectedMaterial = materials.find((m) => m.id === selectedMaterialId)
  const selectedExam = exams.find((e) => e.id === selectedExamId)

  const materialComments = useMemo(() => {
    const grouped = new Map()
    comments.forEach((comment) => {
      if (!grouped.has(comment.materialId)) {
        grouped.set(comment.materialId, [])
      }
      grouped.get(comment.materialId).push(comment)
    })
    return grouped
  }, [comments])

  const nextLocalId = (prefix) => {
    const id = `${prefix}${nextId.current}`
    nextId.current += 1
    return id
  }

  const login = (id) => {
    setCurrentTeacherId(id)
    setView('materials')
  }

  const logout = () => {
    setCurrentTeacherId('')
    setView('login')
    setSelectedMaterialId(null)
    setSelectedExamId(null)
  }

  const createMaterial = (payload) => {
    const newMaterial = {
      id: nextLocalId('m'),
      ownerId: currentTeacherId,
      isPublic: false,
      deleted: false,
      clonedFromId: null,
      updatedAt: nowIso(),
      lastExamAt: null,
      lastExamQuestionCount: 0,
      ...payload,
    }
    setMaterials((prev) => [newMaterial, ...prev])
  }

  const updateMaterial = (id, patch) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...patch, updatedAt: nowIso() } : m
      )
    )
  }

  const deleteMaterial = (id) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, deleted: true } : m)))
  }

  const togglePublic = (id) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, isPublic: !m.isPublic } : m)))
  }

  const cloneMaterial = (material) => {
    const clone = {
      ...material,
      id: nextLocalId('m'),
      ownerId: currentTeacherId,
      isPublic: false,
      deleted: false,
      clonedFromId: material.id,
      title: `${material.title} (clonado)`,
      updatedAt: nowIso(),
    }
    setMaterials((prev) => [clone, ...prev])
    setView('materials')
  }

  const addComment = (materialId, text) => {
    const newComment = {
      id: nextLocalId('c'),
      materialId,
      authorId: currentTeacherId,
      text,
      createdAt: nowIso(),
    }
    setComments((prev) => [newComment, ...prev])
  }

  const createExam = (materialId, payload) => {
    const newExam = {
      id: nextLocalId('e'),
      ownerId: currentTeacherId,
      materialId,
      title: payload.title,
      questions: payload.questions,
      createdAt: nowIso(),
    }
    setExams((prev) => [newExam, ...prev])
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === materialId
          ? {
              ...m,
              lastExamAt: newExam.createdAt,
              lastExamQuestionCount: newExam.questions.length,
            }
          : m
      )
    )
    setSelectedExamId(newExam.id)
    setView('exam-detail')
  }

  const getTeacherName = (id) => teachers.find((t) => t.id === id)?.name || '—'

  if (view === 'login') {
    return (
      <div className="page login">
        <div className="login-panel">
          <p className="eyebrow">EduColab</p>
          <h1>Plataforma colaborativa para professores do ensino público.</h1>
          <p>
            Selecione um perfil para simular o login e explorar o MVP (sem senha).
          </p>
          <div className="login-grid">
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                className="card select"
                onClick={() => login(teacher.id)}
              >
                <strong>{teacher.name}</strong>
                <span>{teacher.discipline}</span>
              </button>
            ))}
          </div>
          <div className="login-note">✨ IA simulada habilitada no MVP</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page app">
      <aside className="sidebar">
        <div className="brand">
          <span className="dot" />
          <div>
            <h2>EduColab</h2>
            <p>Professores + IA</p>
          </div>
        </div>
        <nav>
          <button
            className={view === 'materials' ? 'active' : ''}
            onClick={() => setView('materials')}
          >
            Meus materiais
          </button>
          <button
            className={view === 'community' ? 'active' : ''}
            onClick={() => setView('community')}
          >
            Comunidade
          </button>
          <button
            className={view === 'exams' ? 'active' : ''}
            onClick={() => setView('exams')}
          >
            Provas
          </button>
        </nav>
        <div className="profile">
          <div>
            <strong>{currentTeacher?.name}</strong>
            <span>{currentTeacher?.discipline}</span>
          </div>
          <button onClick={logout} className="ghost">Sair</button>
        </div>
      </aside>

      <main className="content">
        {view === 'materials' && (
          <MaterialsView
            materials={myMaterials}
            showDeleted={showDeleted}
            onToggleShowDeleted={() => setShowDeleted((prev) => !prev)}
            onCreate={createMaterial}
            onOpen={(id) => {
              setSelectedMaterialId(id)
              setView('material-detail')
            }}
            onDelete={deleteMaterial}
            onTogglePublic={togglePublic}
          />
        )}

        {view === 'material-detail' && selectedMaterial && (
          <MaterialDetail
            material={selectedMaterial}
            teacherName={getTeacherName(selectedMaterial.ownerId)}
            onBack={() => setView('materials')}
            onSave={(patch) => updateMaterial(selectedMaterial.id, patch)}
            onTogglePublic={() => togglePublic(selectedMaterial.id)}
            onDelete={() => {
              deleteMaterial(selectedMaterial.id)
              setView('materials')
            }}
            onCreateExam={() => setView('exam-builder')}
          />
        )}

        {view === 'exam-builder' && selectedMaterial && (
          <ExamBuilder
            material={selectedMaterial}
            onBack={() => setView('material-detail')}
            onSave={(payload) => createExam(selectedMaterial.id, payload)}
          />
        )}

        {view === 'exam-detail' && selectedExam && (
          <ExamDetail
            exam={selectedExam}
            material={materials.find((m) => m.id === selectedExam.materialId)}
            onBack={() => setView('exams')}
          />
        )}

        {view === 'exams' && (
          <ExamsView
            exams={myExams}
            materials={materials}
            onOpen={(id) => {
              setSelectedExamId(id)
              setView('exam-detail')
            }}
          />
        )}

        {view === 'community' && (
          <CommunityView
            materials={publicMaterials}
            comments={materialComments}
            getTeacherName={getTeacherName}
            onClone={cloneMaterial}
            onComment={addComment}
            currentTeacherId={currentTeacherId}
          />
        )}
      </main>
    </div>
  )
}

function MaterialsView({
  materials,
  showDeleted,
  onToggleShowDeleted,
  onCreate,
  onOpen,
  onDelete,
  onTogglePublic,
}) {
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
            <input
              placeholder="Disciplina"
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
            />
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
            materials.map((material) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}

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
          ⚠️ IA simulada: o conteúdo mudou desde a última prova. Revise{' '}
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
            <input
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
            />
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
            <p>
              A IA ajuda a revisar clareza e indicar ajustes pedagógicos antes da prova.
            </p>
            <button className="ghost" onClick={() => setAlertVisible(true)}>
              ✨ IA: revisar conteúdo
            </button>
          </div>
          <div className="card highlight">
            <h3>Gerar prova a partir do material</h3>
            <p>Crie questões, defina dificuldade e salve a avaliação.</p>
            <button className="primary" onClick={onCreateExam}>
              Criar prova
            </button>
            <div className="meta">
              Última prova: {material.lastExamAt ? shortDate(material.lastExamAt) : '—'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExamBuilder({ material, onBack, onSave }) {
  const [title, setTitle] = useState(`Prova - ${material.title}`)
  const [questions, setQuestions] = useState([])
  const [draft, setDraft] = useState({
    type: 'mcq',
    prompt: '',
    options: [''],
    answer: '',
    difficulty: 'M',
  })

  const addQuestion = () => {
    if (!draft.prompt.trim()) return
    setQuestions((prev) => [
      ...prev,
      {
        id: `q${prev.length + 1}`,
        ...draft,
        options: draft.type === 'mcq' ? draft.options.filter(Boolean) : [],
      },
    ])
    setDraft({
      type: 'mcq',
      prompt: '',
      options: [''],
      answer: '',
      difficulty: 'M',
    })
  }

  const addAiQuestions = () => {
    const aiSuggestions = [
      {
        id: `q${questions.length + 1}`,
        type: 'mcq',
        prompt: `Questão IA: com base em "${material.subject}", qual conceito resume o tema?`,
        options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
        answer: 'Opção B',
        difficulty: 'F',
      },
      {
        id: `q${questions.length + 2}`,
        type: 'disc',
        prompt: 'Questão IA: explique a relação entre o conteúdo e o cotidiano do aluno.',
        options: [],
        answer: '',
        difficulty: 'M',
      },
    ]
    setQuestions((prev) => [...prev, ...aiSuggestions])
  }

  const applyAiDifficulty = () => {
    const levels = ['F', 'M', 'D']
    setQuestions((prev) =>
      prev.map((question) => ({
        ...question,
        difficulty: levels[Math.floor(Math.random() * levels.length)],
      }))
    )
  }

  return (
    <section>
      <header className="section-header">
        <div>
          <button className="link" onClick={onBack}>
            ← voltar
          </button>
          <h1>Nova prova</h1>
          <p>
            {material.title} • {material.subject}
          </p>
        </div>
        <div className="inline">
          <button className="ghost" onClick={addAiQuestions}>
            ✨ IA: sugerir questões
          </button>
          <button className="ghost" onClick={applyAiDifficulty}>
            ✨ IA: avaliar dificuldade
          </button>
        </div>
      </header>

      <div className="grid two">
        <div className="card form">
          <h3>Configurar prova</h3>
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
          <div className="divider" />
          <h4>Nova questão</h4>
          <select
            value={draft.type}
            onChange={(event) =>
              setDraft({
                ...draft,
                type: event.target.value,
                options: event.target.value === 'mcq' ? [''] : [],
              })
            }
          >
            <option value="mcq">Múltipla escolha</option>
            <option value="disc">Dissertativa</option>
          </select>
          <textarea
            rows="3"
            placeholder="Enunciado"
            value={draft.prompt}
            onChange={(event) => setDraft({ ...draft, prompt: event.target.value })}
          />
          {draft.type === 'mcq' && (
            <div className="stack compact">
              {draft.options.map((option, index) => (
                <input
                  key={`opt-${index}`}
                  placeholder={`Opção ${index + 1}`}
                  value={option}
                  onChange={(event) => {
                    const options = [...draft.options]
                    options[index] = event.target.value
                    setDraft({ ...draft, options })
                  }}
                />
              ))}
              <button
                className="ghost"
                type="button"
                onClick={() => setDraft({ ...draft, options: [...draft.options, ''] })}
              >
                + adicionar opção
              </button>
              <input
                placeholder="Resposta correta"
                value={draft.answer}
                onChange={(event) => setDraft({ ...draft, answer: event.target.value })}
              />
            </div>
          )}
          <select
            value={draft.difficulty}
            onChange={(event) => setDraft({ ...draft, difficulty: event.target.value })}
          >
            <option value="F">Fácil</option>
            <option value="M">Média</option>
            <option value="D">Difícil</option>
          </select>
          <button className="ghost" type="button" onClick={addQuestion}>
            Adicionar questão
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => onSave({ title, questions })}
            disabled={!title || questions.length === 0}
          >
            Salvar prova
          </button>
        </div>

        <div className="stack">
          <div className="card">
            <h3>Questões adicionadas</h3>
            {questions.length === 0 ? (
              <p>Use a IA simulada ou adicione questões manualmente.</p>
            ) : (
              <ul className="list">
                {questions.map((question, index) => (
                  <li key={question.id}>
                    <span className="pill">{index + 1}</span>
                    <div>
                      <strong>{question.prompt}</strong>
                      <span>
                        {question.type === 'mcq' ? 'Múltipla escolha' : 'Dissertativa'} •{' '}
                        {question.difficulty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card highlight">
            <h3>Checklist MVP</h3>
            <ul className="checklist">
              <li>Prova vinculada ao material</li>
              <li>IA simulada gera questões</li>
              <li>Dificuldade marcada (F/M/D)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExamsView({ exams, materials, onOpen }) {
  return (
    <section>
      <header className="section-header">
        <div>
          <p className="eyebrow">Avaliações</p>
          <h1>Minhas provas</h1>
        </div>
      </header>
      <div className="grid two">
        {exams.length === 0 ? (
          <div className="card empty">
            <h3>Nenhuma prova criada</h3>
            <p>Crie provas a partir de um material para aparecer aqui.</p>
          </div>
        ) : (
          exams.map((exam) => {
            const material = materials.find((m) => m.id === exam.materialId)
            return (
              <article key={exam.id} className="card">
                <h3>{exam.title}</h3>
                <p>{material?.title}</p>
                <div className="meta">
                  <span>{exam.questions.length} questões</span>
                  <span>Criada em {shortDate(exam.createdAt)}</span>
                </div>
                <button className="ghost" onClick={() => onOpen(exam.id)}>
                  Ver detalhes
                </button>
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}

function ExamDetail({ exam, material, onBack }) {
  return (
    <section>
      <header className="section-header">
        <div>
          <button className="link" onClick={onBack}>
            ← voltar
          </button>
          <h1>{exam.title}</h1>
          <p>{material?.title}</p>
        </div>
      </header>
      <div className="card">
        <ul className="list">
          {exam.questions.map((question, index) => (
            <li key={question.id}>
              <span className="pill">{index + 1}</span>
              <div>
                <strong>{question.prompt}</strong>
                <span>
                  {question.type === 'mcq' ? 'Múltipla escolha' : 'Dissertativa'} •{' '}
                  {question.difficulty}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CommunityView({ materials, comments, getTeacherName, onClone, onComment, currentTeacherId }) {
  return (
    <section>
      <header className="section-header">
        <div>
          <p className="eyebrow">Comunidade</p>
          <h1>Materiais públicos</h1>
          <p>Compartilhe, comente e clone materiais para melhorar a aula.</p>
        </div>
      </header>
      <div className="stack">
        {materials.map((material) => {
          const materialComments = comments.get(material.id) || []
          return (
            <article key={material.id} className="card community">
              <div className="card-head">
                <div>
                  <h3>{material.title}</h3>
                  <p>
                    {material.subject} • {material.grade} • {getTeacherName(material.ownerId)}
                  </p>
                </div>
                <button className="ghost" onClick={() => onClone(material)}>
                  Clonar
                </button>
              </div>
              <p>{material.summary}</p>
              <div className="meta">
                <span>Atualizado em {shortDate(material.updatedAt)}</span>
                {material.clonedFromId && <span>Baseado em {material.clonedFromId}</span>}
              </div>
              <div className="comment-box">
                <strong>Comentários ({materialComments.length})</strong>
                <ul className="list compact">
                  {materialComments.map((comment) => (
                    <li key={comment.id}>
                      <span className="pill">{getTeacherName(comment.authorId)}</span>
                      <div>
                        <strong>{comment.text}</strong>
                        <span>{shortDate(comment.createdAt)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <CommentForm
                  onSubmit={(text) => onComment(material.id, text)}
                  disabled={currentTeacherId === material.ownerId}
                />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function CommentForm({ onSubmit, disabled }) {
  const [text, setText] = useState('')
  return (
    <form
      className="comment-form"
      onSubmit={(event) => {
        event.preventDefault()
        if (!text.trim()) return
        onSubmit(text)
        setText('')
      }}
    >
      <input
        placeholder={disabled ? 'Você não pode comentar no seu próprio material' : 'Sugira melhorias'}
        value={text}
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="ghost" type="submit" disabled={disabled}>
        Enviar
      </button>
    </form>
  )
}

export default App
