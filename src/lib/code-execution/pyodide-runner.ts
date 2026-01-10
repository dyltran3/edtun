// src/lib/code-execution/pyodide-runner.ts
import { loadPyodide } from 'pyodide'

// Định nghĩa interface cho Pyodide để tránh dùng 'any' quá nhiều
interface PyodideInterface {
  runPython: (code: string) => any
  runPythonAsync: (code: string) => Promise<any>
  loadPackage: (names: string | string[]) => Promise<any>
  setStdout: (options: { batched: (msg: string) => void }) => void
}

let pyodideInstance: PyodideInterface | null = null

export const initPyodide = async () => {
  if (pyodideInstance) return pyodideInstance

  try {
    // CẬP NHẬT: Sử dụng đúng phiên bản 0.29.1 khớp với package.json
    // @ts-ignore - loadPyodide được import từ script tag hoặc package
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.1/full/',
    })
    
    pyodideInstance = pyodide as PyodideInterface
    return pyodideInstance
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

    // CẬP NHẬT: Thiết lập custom stdout để bắt output ngay lập tức (Streaming output)
    // Cách này tốt hơn việc redirect sys.stdout vào StringIO
    pyodide.setStdout({
      batched: (msg: string) => {
        onOutput(msg + '\n') 
      }
    })

    // Chạy code người dùng
    await pyodide.runPythonAsync(code)

  } catch (error: any) {
    // Làm sạch thông báo lỗi Python cho dễ đọc hơn
    const errorMessage = error.message || 'Unknown error occurred'
    onError(errorMessage)
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