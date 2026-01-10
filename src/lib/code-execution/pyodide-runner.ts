let pyodideInstance: any = null

export const initPyodide = async () => {
  if (pyodideInstance) return pyodideInstance

  try {
    // @ts-ignore
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    })
    
    pyodideInstance = pyodide
    return pyodide
  } catch (error) {
    console.error('Failed to load Pyodide:', error)
    throw error
  }
}

export const runPythonCode = async (
  code: string,
  onOutput: (output: string) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const pyodide = await initPyodide()

    // Redirect stdout to capture print statements
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
    `)

    // Run the user's code
    await pyodide.runPythonAsync(code)

    // Get the output
    const output = pyodide.runPython('sys.stdout.getvalue()')
    
    if (output) {
      onOutput(output)
    }

    // Reset stdout
    pyodide.runPython(`
sys.stdout = sys.__stdout__
    `)
  } catch (error: any) {
    onError(error.message || 'Unknown error occurred')
  }
}

export const installPackage = async (packageName: string) => {
  try {
    const pyodide = await initPyodide()
    await pyodide.loadPackage(packageName)
  } catch (error) {
    console.error(`Failed to install package ${packageName}:`, error)
    throw error
  }
}