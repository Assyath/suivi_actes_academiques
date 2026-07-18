import { useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal'
import Toast from '../components/Toast'
import './AdminDashboard.css'

const demandes = [
  {
    id: 'DA-1001',
    matricule: '123456',
    nom: 'ADIKPETO Morel Lionnel',
    statut: 'Déposée',
    description: 'Le relevé de notes (par semestre ou par année)',
  },
  {
    id: 'DA-1002',
    matricule: '234567',
    nom: 'DJOSSOU Hyppolyte',
    statut: 'En cours',
    description: 'L\'attestation de réussite',
  },
  {
    id: 'DA-1003',
    matricule: '345678',
    nom: 'HOUNKPATIN Arnaud',
    statut: "Prête à retirer",
    description: 'L\'attestation de diplôme (en attendant la délivrance du diplôme définitif)',
  },
  {
    id: 'DA-1004',
    matricule: '456789',
    nom: 'AGBOSSOU Grâce',
    statut: 'Déposée',
    description: 'Le diplôme (Licence, Master, etc.)',
  },
  {
    id: 'DA-1005',
    matricule: '567890',
    nom: 'KPODEKON Nadège',
    statut: 'En cours',
    description: 'Le certificat de scolarité ou attestation d\'inscription',
  },
  {
    id: 'DA-1006',
    matricule: '678901',
    nom: 'DOSSOU Marcel',
    statut: "Prête à retirer",
    description: 'Le bulletin de notes (selon l\'établissement)',
  },
  {
    id: 'DA-1007',
    matricule: '789012',
    nom: 'HOUNTONDJI Clarisse',
    statut: 'Déposée',
    description: 'Le transcript académique (relevé de notes officiel)',
  },
  {
    id: 'DA-1008',
    matricule: '890123',
    nom: 'ZINSOU Rodrigue',
    statut: 'En cours',
    description: 'Le duplicata de diplôme ou de relevé de notes (en cas de perte)',
  },
  {
    id: 'DA-1009',
    matricule: '901234',
    nom: 'TOSSOU Prisca',
    statut: "Prête à retirer",
    description: 'L\'attestation de soutenance (pour les étudiants ayant soutenu leur mémoire)',
  },
  {
    id: 'DA-1010',
    matricule: '112345',
    nom: 'AÏHOUN Cédric',
    statut: 'En cours',
    description: 'Le programme ou descriptif des cours',
  },
]

const statuts = ['Déposée', 'En cours', "Prête à retirer"]

function AdminDashboard({ onLogout }) {
  const [demandesData, setDemandesData] = useState(demandes)
  const [rechercheQuery, setRechercheQuery] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const demandesFiltrees = demandesData.filter((demande) =>
    demande.id.toLowerCase().includes(rechercheQuery.toLowerCase()) ||
    demande.matricule.includes(rechercheQuery) ||
    demande.nom.toLowerCase().includes(rechercheQuery.toLowerCase()),
  )

  const handleStatutChange = (demandeId, nouveauStatut) => {
    const demande = demandesData.find((d) => d.id === demandeId)
    setPendingUpdate({ demandeId, nouveauStatut, demande })
    setShowConfirmation(true)
  }

  const confirmUpdate = () => {
    if (pendingUpdate) {
      setDemandesData(
        demandesData.map((demande) =>
          demande.id === pendingUpdate.demandeId
            ? { ...demande, statut: pendingUpdate.nouveauStatut }
            : demande,
        ),
      )
      setToastMessage(`Statut de ${pendingUpdate.demandeId} changé avec succès`)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
    setShowConfirmation(false)
    setPendingUpdate(null)
  }

  const cancelUpdate = () => {
    setShowConfirmation(false)
    setPendingUpdate(null)
  }

  return (
    <div className="container">
      <header className="admin-header">
        <h1>Tableau de bord Admin</h1>
        <button className="secondary" onClick={onLogout}>
          Déconnexion
        </button>
      </header>

      <main>
        <div className="search-section">
          <label htmlFor="recherche">Rechercher une demande</label>
          <input
            id="recherche"
            type="text"
            placeholder="Numéro de dossier, matricule ou nom..."
            value={rechercheQuery}
            onChange={(e) => setRechercheQuery(e.target.value)}
          />
        </div>

        <div className="table-section">
          <h2>Demandes ({demandesFiltrees.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Matricule</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {demandesFiltrees.map((demande) => (
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>{demande.matricule}</td>
                  <td>{demande.nom}</td>
                  <td>{demande.description}</td>
                  <td>
                    <span className={`statut statut-${demande.statut.toLowerCase().replace(/\s+/g, '-')}`}>
                      {demande.statut}
                    </span>
                  </td>
                  <td>
                    <select
                      value={demande.statut}
                      onChange={(e) => handleStatutChange(demande.id, e.target.value)}
                    >
                      {statuts.map((statut) => (
                        <option key={statut} value={statut}>
                          {statut}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showConfirmation && pendingUpdate && (
        <ConfirmationModal
          titre="Confirmer le changement de statut"
          message={`Confirmer le passage de '${pendingUpdate.demande.statut}' à '${pendingUpdate.nouveauStatut}' pour la demande ${pendingUpdate.demandeId} ?`}
          onOui={confirmUpdate}
          onAnnuler={cancelUpdate}
          textOui="Enregistrer"
          textAnnuler="Annuler"
        />
      )}

      <Toast message={toastMessage} type="success" visible={showToast} />
    </div>
  )
}

export default AdminDashboard
