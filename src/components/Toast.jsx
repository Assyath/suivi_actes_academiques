import './Toast.css'

function Toast({ message, type = 'success', visible }) {
  if (!visible) return null

  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Toast
