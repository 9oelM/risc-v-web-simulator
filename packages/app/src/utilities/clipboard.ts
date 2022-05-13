export function copyToClipboard(text: string) {
  // @ts-ignore
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    // @ts-ignore
    return window.clipboardData.setData(`Text`, text)
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported(`copy`)
  ) {
    const textarea = document.createElement(`textarea`)
    textarea.textContent = text
    textarea.style.position = `fixed` // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand(`copy`) // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn(`Copy to clipboard failed.`, ex)
      return prompt(`Copy to clipboard: Ctrl+C, Enter`, text)
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

export function copyToClipboard2(text: string) {
  const input = document.createElement(`input`)
  input.setAttribute(`value`, text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand(`copy`)
  document.body.removeChild(input)
  return result
}
