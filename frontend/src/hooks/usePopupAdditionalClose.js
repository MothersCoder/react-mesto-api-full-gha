export function usePopupAdditionalClose (onClose) {
  const closeByEscape = (e) => {
    if(e.key === 'Escape') {
      onClose();
    }
  }

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return { closeByEscape, handleOverlay }
}
