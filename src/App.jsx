import { useMemo, useRef, useState } from 'react'
import './App.css'
import { commentsSeed, examsSeed, materialsSeed, teachersSeed } from './data/seed'
import { nowIso } from './utils/date'
import CommunityView from './components/CommunityView'
import ExamBuilder from './components/ExamBuilder'
import ExamDetail from './components/ExamDetail'
import ExamsView from './components/ExamsView'
import MaterialDetail from './components/MaterialDetail'
import MaterialsView from './components/MaterialsView'

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
          <p>Selecione um perfil para simular o login e explorar o MVP (sem senha).</p>
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
          <button onClick={logout} className="ghost">
            Sair
          </button>
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

export default App
