-- Schema and sample data for Suivi des Actes Académiques
-- Database: suivi_actes_academiques

DROP DATABASE IF EXISTS `suivi_actes_academiques`;
CREATE DATABASE `suivi_actes_academiques` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `suivi_actes_academiques`;

-- Table: demandes
CREATE TABLE `demandes` (
  `id` VARCHAR(20) NOT NULL,
  `matricule` VARCHAR(20) NOT NULL,
  `nom` VARCHAR(150) NOT NULL,
  `statut` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: admins (demo)
CREATE TABLE `admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Demo admin (use a real hash in production)
INSERT INTO `admins` (`username`, `password`) VALUES
('admin', 'admin123');

-- Sample demandes (10)
INSERT INTO `demandes` (`id`, `matricule`, `nom`, `statut`, `description`) VALUES
('DA-1001', '123456', 'ADIKPETO Morel Lionnel', 'Déposée', 'Le relevé de notes (par semestre ou par année)'),
('DA-1002', '234567', 'DJOSSOU Hyppolyte', 'En cours', 'L''attestation de réussite'),
('DA-1003', '345678', 'HOUNKPATIN Arnaud', 'Prête à retirer', 'L''attestation de diplôme (en attendant la délivrance du diplôme définitif)'),
('DA-1004', '456789', 'AGBOSSOU Grâce', 'Déposée', 'Le diplôme (Licence, Master, etc.)'),
('DA-1005', '567890', 'KPODEKON Nadège', 'En cours', 'Le certificat de scolarité ou attestation d''inscription'),
('DA-1006', '678901', 'DOSSOU Marcel', 'Prête à retirer', 'Le bulletin de notes (selon l''établissement)'),
('DA-1007', '789012', 'HOUNTONDJI Clarisse', 'Déposée', 'Le transcript académique (relevé de notes officiel)'),
('DA-1008', '890123', 'ZINSOU Rodrigue', 'En cours', 'Le duplicata de diplôme ou de relevé de notes (en cas de perte)'),
('DA-1009', '901234', 'TOSSOU Prisca', 'Prête à retirer', 'L''attestation de soutenance (pour les étudiants ayant soutenu leur mémoire)'),
('DA-1010', '112345', 'AÏHOUN Cédric', 'En cours', 'Le programme ou descriptif des cours');

-- Indexes
CREATE INDEX idx_demandes_matricule ON `demandes` (`matricule`);
CREATE INDEX idx_demandes_statut ON `demandes` (`statut`);

-- End of file
