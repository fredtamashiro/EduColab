import { useState } from 'react'

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

export default ExamBuilder
