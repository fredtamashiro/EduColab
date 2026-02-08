import { shortDate } from '../utils/date'
import CommentForm from './CommentForm'

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

export default CommunityView
