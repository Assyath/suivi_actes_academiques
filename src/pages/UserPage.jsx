import { useState } from 'react'

const demandes = [
  { id: 'DA-1001', matricule: '123456', nom: 'ADIKPETO Morel Lionnel', statut: 'Déposée', description: 'Le relevé de notes (par semestre ou par année)' },
  { id: 'DA-1002', matricule: '234567', nom: 'DJOSSOU Hyppolyte', statut: 'En cours', description: 'L\'attestation de réussite' },
  { id: 'DA-1003', matricule: '345678', nom: 'HOUNKPATIN Arnaud', statut: 'Prête à retirer', description: 'L\'attestation de diplôme (en attendant la délivrance du diplôme définitif)' },
  { id: 'DA-1004', matricule: '456789', nom: 'AGBOSSOU Grâce', statut: 'Déposée', description: 'Le diplôme (Licence, Master, etc.)' },
  { id: 'DA-1005', matricule: '567890', nom: 'KPODEKON Nadège', statut: 'En cours', description: 'Le certificat de scolarité ou attestation d\'inscription' },
  { id: 'DA-1006', matricule: '678901', nom: 'DOSSOU Marcel', statut: 'Prête à retirer', description: 'Le bulletin de notes (selon l\'établissement)' },
  { id: 'DA-1007', matricule: '789012', nom: 'HOUNTONDJI Clarisse', statut: 'Déposée', description: 'Le transcript académique (relevé de notes officiel)' },
  { id: 'DA-1008', matricule: '890123', nom: 'ZINSOU Rodrigue', statut: 'En cours', description: 'Le duplicata de diplôme ou de relevé de notes (en cas de perte)' },
  { id: 'DA-1009', matricule: '901234', nom: 'TOSSOU Prisca', statut: 'Prête à retirer', description: 'L\'attestation de soutenance (pour les étudiants ayant soutenu leur mémoire)' },
  { id: 'DA-1010', matricule: '112345', nom: 'AÏHOUN Cédric', statut: 'En cours', description: 'Le programme ou descriptif des cours' },
]

function UserPage() {
  const [etape, setEtape] = useState('accueil') // 'accueil' | 'identifier' | 'resultat'
  const [numero, setNumero] = useState('')
  const [matricule, setMatricule] = useState('')
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState('')

  const chercherDemande = (event) => {
    event.preventDefault()
    setErreur('')
    const demandeTrouvee = demandes.find(
      (demande) => demande.id === numero.trim() && demande.matricule === matricule.trim(),
    )

    if (!demandeTrouvee) {
      setErreur('Aucune demande ne correspond au numéro de dossier et matricule fournis.')
      setResultat(null)
      return
    }

    setResultat(demandeTrouvee)
    setEtape('resultat')
  }

  const retourAccueil = () => {
    setEtape('accueil')
    setNumero('')
    setMatricule('')
    setResultat(null)
    setErreur('')
  }

  return (
    <div className="container">
      {etape === 'accueil' && (
        <>
          <header>
            <h1>Suivez l'état de votre demande d'acte académique, à distance</h1>
          </header>
          <main>
            <p>Entrez votre numéro de dossier et votre matricule pour connaître le statut de votre demande.</p>
            <button className="primary" onClick={() => setEtape('identifier')}>
              Suivre ma demande
            </button>
          </main>
        </>
      )}

      {etape === 'identifier' && (
        <>
          <header>
            <h1>Consulter ma demande</h1>
          </header>
          <main>

            {erreur && <div className="alert error">{erreur}</div>}

            <form onSubmit={chercherDemande}>
              <div className="form-group">
                <label htmlFor="numero">Numéro de dossier</label>
                <input
                  id="numero"
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Ex: DA-1001"
                />
              </div>

              <div className="form-group">
                <label htmlFor="matricule">Matricule</label>
                <input
                  id="matricule"
                  type="text"
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  placeholder="Ex: 123456"
                />
              </div>

              <button className="primary" type="submit">
                Consulter ma demande
              </button>
            </form>
          </main>
        </>
      )}

      {etape === 'resultat' && resultat && (
        <>
          <header>
            <h1>Résultat</h1>
          </header>
          <main>
            <h2>Détails de la demande</h2>
            <p><strong>Numéro :</strong> {resultat.id}</p>
            <p><strong>Nom :</strong> {resultat.nom}</p>
            <p><strong>Statut :</strong> {resultat.statut}</p>
            <p><strong>Description :</strong> {resultat.description}</p>

            <button className="primary" onClick={retourAccueil} style={{ marginTop: '20px' }}>
              Retour à l'accueil
            </button>
          </main>
        </>
      )}
    </div>
  )
}

export default UserPage
