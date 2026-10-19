export interface GuidebookItem {
  id: string;
  title: string;
  division: string;
  track?: string;
  level: string;
  driveFileId: string;
  previewUrl: string;
  downloadUrl: string;
  parentFolderId?: string;
}

export interface PdfModalContextType {
  isOpen: boolean;
  activeDocId: string;
  openModal: (docId?: string) => void;
  closeModal: () => void;
  setActiveDoc: (docId: string) => void;
}
