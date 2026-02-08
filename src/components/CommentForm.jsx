import { useState } from 'react'

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

export default CommentForm
