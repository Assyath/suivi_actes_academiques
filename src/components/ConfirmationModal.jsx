import './ConfirmationModal.css'

function ConfirmationModal({ titre, message, onOui, onAnnuler, textOui = 'Oui', textAnnuler = 'Annuler' }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{titre}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="secondary" onClick={onAnnuler}>
            {textAnnuler}
          </button>
          <button className="primary" onClick={onOui}>
            {textOui}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
