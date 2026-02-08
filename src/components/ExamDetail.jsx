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

export default ExamDetail
