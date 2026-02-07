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
    ownerId: 't1',
    title: 'Progressões Aritméticas e Geométricas',
    subject: 'Matemática',
    grade: '2º ano',
    summary: 'PA e PG com aplicações financeiras simples.',
    content:
      'Definição, termos gerais, somatório e exemplos de juros simples e compostos.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-19T08:40:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm3',
    ownerId: 't1',
    title: 'Trigonometria no triângulo retângulo',
    subject: 'Matemática',
    grade: '1º ano',
    summary: 'Seno, cosseno e tangente com problemas visuais.',
    content:
      'Razões trigonométricas, ângulos notáveis e aplicações em situações reais.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-21T15:10:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm4',
    ownerId: 't1',
    title: 'Geometria analítica: reta e distância',
    subject: 'Matemática',
    grade: '3º ano',
    summary: 'Equação da reta e distância entre pontos.',
    content:
      'Coeficiente angular, paralelismo, distância ponto-reta e exercícios guiados.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-16T11:25:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm5',
    ownerId: 't1',
    title: 'Estatística básica e interpretação de gráficos',
    subject: 'Matemática',
    grade: '1º ano',
    summary: 'Média, mediana, moda e leitura de gráficos.',
    content:
      'Análise de dados simples, construção de gráficos e interpretação crítica.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-17T09:00:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm6',
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
  {
    id: 'm7',
    ownerId: 't2',
    title: 'Era Vargas: 1930 a 1945',
    subject: 'História',
    grade: '3º ano',
    summary: 'Industrialização, trabalhismo e Estado Novo.',
    content:
      'Golpe de 1937, políticas sociais, propaganda e impacto nas instituições.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-17T14:20:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm8',
    ownerId: 't2',
    title: 'Ditadura Militar: 1964-1985',
    subject: 'História',
    grade: '3º ano',
    summary: 'AI-5, repressão e abertura política.',
    content:
      'Contexto do golpe, censura, resistência e redemocratização.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-22T10:05:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm9',
    ownerId: 't2',
    title: 'Revolução Industrial e impactos sociais',
    subject: 'História',
    grade: '2º ano',
    summary: 'Mudanças no trabalho e urbanização acelerada.',
    content:
      'Invenções, novas relações de trabalho e transformações sociais.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-19T16:45:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm10',
    ownerId: 't2',
    title: 'Guerra Fria e blocos geopolíticos',
    subject: 'História',
    grade: '2º ano',
    summary: 'Bipolaridade, corrida armamentista e conflitos indiretos.',
    content:
      'Plano Marshall, OTAN, Pacto de Varsóvia e guerras por procuração.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-15T12:15:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm11',
    ownerId: 't3',
    title: 'Genética básica: DNA e hereditariedade',
    subject: 'Biologia',
    grade: '1º ano',
    summary: 'Estrutura do DNA e conceitos de genes e alelos.',
    content:
      'Replicação, código genético e exemplos simples de herança.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-21T08:00:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm12',
    ownerId: 't3',
    title: 'Ecologia: cadeias e teias alimentares',
    subject: 'Biologia',
    grade: '2º ano',
    summary: 'Relações ecológicas e equilíbrio dos ecossistemas.',
    content:
      'Produtores, consumidores, decompositores e impactos ambientais.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-16T13:30:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm13',
    ownerId: 't3',
    title: 'Fisiologia humana: sistema respiratório',
    subject: 'Biologia',
    grade: '2º ano',
    summary: 'Estruturas, função e cuidados com a saúde.',
    content:
      'Trocas gasosas, pulmões, diafragma e hábitos saudáveis.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-18T10:50:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm14',
    ownerId: 't3',
    title: 'Biotecnologia e aplicações',
    subject: 'Biologia',
    grade: '3º ano',
    summary: 'Transgênicos, vacinas e uso em saúde.',
    content:
      'Principais técnicas e debates éticos na biotecnologia.',
    isPublic: false,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-14T09:10:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
  {
    id: 'm15',
    ownerId: 't3',
    title: 'Evolução e seleção natural',
    subject: 'Biologia',
    grade: '3º ano',
    summary: 'Darwinismo e evidências evolutivas.',
    content:
      'Seleção natural, deriva genética e exemplos atuais.',
    isPublic: true,
    deleted: false,
    clonedFromId: null,
    updatedAt: '2026-01-23T17:05:00',
    lastExamAt: null,
    lastExamQuestionCount: 0,
  },
]

const buildExamSeed = (material, index) => ({
  id: `e${index + 1}`,
  ownerId: material.ownerId,
  materialId: material.id,
  title: `Questionário - ${material.title}`,
  questions: [
    {
      id: 'q1',
      type: 'mcq',
      prompt: `Sobre ${material.subject}, qual alternativa melhor descreve um conceito-chave do tema?`,
      options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
      answer: 'Alternativa B',
      difficulty: 'F',
    },
    {
      id: 'q2',
      type: 'disc',
      prompt: `Explique, com suas palavras, como o conteúdo de "${material.title}" se aplica no cotidiano.`,
      options: [],
      answer: '',
      difficulty: 'M',
    },
  ],
  createdAt: material.updatedAt,
})

const examsSeed = materialsSeed.map((material, index) => buildExamSeed(material, index))

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
const subjects = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Biologia',
  'Física',
  'Química',
  'Sociologia',
  'Filosofia',
  'Inglês',
  'Artes',
]

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
      aiReviewSuggestions: 2,
      aiReviewedAt: nowIso(),
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
            Questionários
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
            exams={exams}
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
                  <span className={`badge ${examCount > 0 ? 'badge--success' : 'badge--muted'}`}>
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
            <p>
              A IA ajuda a revisar clareza e indicar ajustes pedagógicos antes do questionário.
            </p>
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

function ExamBuilder({ material, onBack, onSave }) {
  const [title, setTitle] = useState(`Questionário - ${material.title}`)
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
        prompt: `Questão IA: qual alternativa melhor sintetiza "${material.title}"?`,
        options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
        answer: 'Alternativa B',
        difficulty: 'F',
      },
      {
        id: `q${questions.length + 2}`,
        type: 'disc',
        prompt: `Questão IA: descreva um exemplo prático de "${material.subject}" aplicado na vida real.`,
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
          <h1>Novo questionário</h1>
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
          <h3>Configurar questionário</h3>
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
            Salvar questionário
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
              <li>Questionário vinculado ao material</li>
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
          <h1>Meus questionários</h1>
        </div>
      </header>
      <div className="grid two">
        {exams.length === 0 ? (
          <div className="card empty">
            <h3>Nenhum questionário criado</h3>
            <p>Crie questionários a partir de um material para aparecer aqui.</p>
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
                  <span>Criado em {shortDate(exam.createdAt)}</span>
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
