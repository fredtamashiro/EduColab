import { shortDate } from '../utils/date'

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

export default ExamsView
