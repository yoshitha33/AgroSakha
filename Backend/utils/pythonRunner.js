import { spawn } from 'child_process'

const DEFAULT_PYTHON = process.env.PYTHON_PATH || 'python'

export function runPython(scriptPath, payload = {}, options = {}) {
  const { timeoutMs = 120000 } = options

  return new Promise((resolve, reject) => {
    console.log(`[Python Runner START] Python: ${DEFAULT_PYTHON}`)
    console.log(`[Python Runner START] Script: ${scriptPath}`)
    console.log(`[Python Runner START] Payload: ${JSON.stringify(payload)}`)
    console.log(`[Python Runner START] Timeout: ${timeoutMs}ms`)
    
    const py = spawn(DEFAULT_PYTHON, [scriptPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    console.log(`[Python Runner] Process spawned, PID: ${py.pid}`)

    let stdout = ''
    let stderr = ''
    let finished = false

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true
        console.error(`[Python Runner TIMEOUT] Killing process after ${timeoutMs}ms`)
        py.kill()
        reject(new Error(`Python script timed out after ${timeoutMs}ms`))
      }
    }, timeoutMs)

    py.stdout.on('data', (data) => {
      const str = data.toString()
      stdout += str
      console.log(`[Python STDOUT] ${str}`)
    })

    py.stderr.on('data', (data) => {
      const str = data.toString()
      stderr += str
      console.log(`[Python STDERR] ${str}`)
    })

    py.on('error', (err) => {
      if (finished) {
        console.log(`[Python Runner] ERROR already finished, ignoring`)
        return
      }
      finished = true
      clearTimeout(timer)
      console.error(`[Python Runner ERROR] ${err.message}`)
      reject(err)
    })

    py.on('close', (code) => {
      if (finished) {
        console.log(`[Python Runner] CLOSE already finished (code ${code}), ignoring`)
        return
      }
      finished = true
      clearTimeout(timer)
      console.log(`[Python Runner CLOSE] Process exited with code ${code}`)
      console.log(`[Python Runner CLOSE] stdout length: ${stdout.length}`)
      console.log(`[Python Runner CLOSE] stderr length: ${stderr.length}`)
      
      if (code !== 0) {
        console.error(`[Python Runner ERROR] Non-zero exit code: ${code}`)
        return reject(new Error(stderr || `Python exited with code ${code}`))
      }
      try {
        const trimmed = stdout.trim()
        console.log(`[Python Runner PARSE] Trimmed output: ${trimmed}`)
        const parsed = JSON.parse(trimmed)
        console.log(`[Python Runner SUCCESS] Parsed: ${JSON.stringify(parsed)}`)
        resolve(parsed)
      } catch (e) {
        console.error(`[Python Runner PARSE ERROR] ${e.message}`)
        reject(new Error(`Failed to parse Python output: ${e.message}. Output: ${stdout}`))
      }
    })

    try {
      console.log(`[Python Runner STDIN] Writing payload...`)
      py.stdin.write(JSON.stringify(payload))
      console.log(`[Python Runner STDIN] Closing stdin...`)
      py.stdin.end()
      console.log(`[Python Runner STDIN] Payload sent`)
    } catch (e) {
      // If writing fails, ensure process ends
      try { py.kill() } catch {}
      console.error(`[Python Runner WRITE ERROR] ${e.message}`)
      reject(e)
    }
  })
}

export default runPython
