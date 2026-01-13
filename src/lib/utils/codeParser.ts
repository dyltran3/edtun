type ParsedParam = number | string | boolean

const BOOLEAN_LITERALS = new Set(['true', 'false'])

/**
 * Parse simple Python assignments from raw code to extract parameters.
 * Supports: numbers, booleans, and quoted strings.
 * Example lines:
 *   gravity = 0.5
 *   title = "Hello"
 *   enable = True
 */
export function parsePythonParams(code: string): Record<string, ParsedParam> {
  const params: Record<string, ParsedParam> = {}
  const assignmentRegex = /^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/m

  code.split('\n').forEach((line) => {
    const match = line.match(assignmentRegex)
    if (!match) return

    const [, key, rawValue] = match
    const value = rawValue.trim()

    // Number
    const numeric = Number(value)
    if (!Number.isNaN(numeric)) {
      params[key] = numeric
      return
    }

    // Boolean (True/False or lowercase)
    const lower = value.toLowerCase()
    if (BOOLEAN_LITERALS.has(lower)) {
      params[key] = lower === 'true'
      return
    }

    // Quoted string
    const stringMatch = value.match(/^['"](.*)['"]$/)
    if (stringMatch) {
      params[key] = stringMatch[1]
      return
    }
  })

  return params
}

