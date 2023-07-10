export function usePopupAdditionalClose (onClose) {
  const closeByEscape = (e) => {
    if(e.key === 'Escape') {
      onClose();
    }
  }

  const handleOverlay = (e) => {
    if (e.target === e.currentTarger) {
      onClose()
    }
  }

  return { closeByEscape, handleOverlay }
}
