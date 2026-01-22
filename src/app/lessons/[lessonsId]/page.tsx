'use client'

import { SandboxContainer } from '@/components/sandbox/SandboxContainer'
import { LessonViewer } from '@/components/learning/LessionViewer'
import { useEditorStore } from '@/store/editorStore'
import { useSimulationStore } from '@/store/simulationStore'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Lesson } from '@/lib/services/lessonService'
import { BookOpen, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

const exampleSketch = (p: any) => {
  let ball: any

  p.setup = () => {
    p.createCanvas(600, 400)
    ball = {
      x: p.width / 2,
      y: 50,
      velocityY: 0,
      gravity: 0.5,
      damping: 0.9,
      radius: 25,
    }
  }

  p.draw = () => {
    p.background(240)

    const params = useSimulationStore.getState().params
    if (params.gravity !== undefined) ball.gravity = Number(params.gravity)
    if (params.damping !== undefined) ball.damping = Number(params.damping)
    if (params.ball_radius !== undefined) ball.radius = Number(params.ball_radius)

    // Update physics
    ball.velocityY += ball.gravity
    ball.y += ball.velocityY

    // Bounce off ground
    if (ball.y + ball.radius > p.height) {
      ball.y = p.height - ball.radius
      ball.velocityY *= -ball.damping
    }

    // Draw ball
    p.fill(66, 135, 245)
    p.noStroke()
    p.circle(ball.x, ball.y, ball.radius * 2)

    // Draw ground
    p.stroke(0)
    p.strokeWeight(2)
    p.line(0, p.height - 5, p.width, p.height - 5)

    // Draw info
    p.fill(0)
    p.noStroke()
    p.textSize(14)
    p.text(`Velocity: ${ball.velocityY.toFixed(2)} m/s`, 10, 20)
    p.text(`Position: ${ball.y.toFixed(0)} px`, 10, 40)
    p.text(`Gravity: ${ball.gravity} m/s²`, 10, 60)
  }
}

const calculusSketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(250)

    const params = useSimulationStore.getState().params
    const a = params.a !== undefined ? Number(params.a) : 1
    const b = params.b !== undefined ? Number(params.b) : 0
    const c = params.c !== undefined ? Number(params.c) : -1
    const d = params.d !== undefined ? Number(params.d) : 0
    const x0 = params.x0 !== undefined ? Number(params.x0) : 0

    const toScreenX = (x: number) => p.map(x, -5, 5, 40, p.width - 40)
    const toScreenY = (y: number) => p.map(y, -5, 5, p.height - 40, 40)

    p.stroke(220)
    p.strokeWeight(1)
    const xAxisY = toScreenY(0)
    const yAxisX = toScreenX(0)
    p.line(40, xAxisY, p.width - 40, xAxisY)
    p.line(yAxisX, 40, yAxisX, p.height - 40)

    p.noFill()
    p.stroke(52, 152, 219)
    p.beginShape()
    for (let i = 0; i <= 200; i++) {
      const x = -5 + (10 * i) / 200
      const y = a * x * x * x + b * x * x + c * x + d
      const sx = toScreenX(x)
      const sy = toScreenY(y)
      p.vertex(sx, sy)
    }
    p.endShape()

    const fx0 = a * x0 * x0 * x0 + b * x0 * x0 + c * x0 + d
    const derivative = 3 * a * x0 * x0 + 2 * b * x0 + c

    const x1 = -5
    const y1 = fx0 + derivative * (x1 - x0)
    const x2 = 5
    const y2 = fx0 + derivative * (x2 - x0)

    p.stroke(231, 76, 60)
    p.line(toScreenX(x1), toScreenY(y1), toScreenX(x2), toScreenY(y2))

    p.fill(231, 76, 60)
    p.noStroke()
    p.circle(toScreenX(x0), toScreenY(fx0), 6)

    p.fill(0)
    p.textSize(12)
    p.text(`x0 = ${x0.toFixed(2)}`, 10, 20)
    p.text(`f'(x0) = ${derivative.toFixed(2)}`, 10, 40)
  }
}

const thermoSketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(248)

    const params = useSimulationStore.getState().params
    const temperature = params.temperature !== undefined ? Number(params.temperature) : 300
    const volume = params.volume !== undefined ? Number(params.volume) : 1
    const moles = params.moles !== undefined ? Number(params.moles) : 1

    const r = 0.08314
    let pressure = (moles * r * temperature) / Math.max(volume, 0.1)
    if (pressure > 10) pressure = 10

    const barHeight = p.map(pressure, 0, 10, 10, p.height - 80)

    const left = 150
    const right = 450
    const bottom = p.height - 40
    const top = 60 + (p.height - 120 - barHeight)

    p.stroke(100)
    p.noFill()
    p.rect(left, 60, right - left, p.height - 120)

    p.fill(52, 152, 219, 180)
    p.noStroke()
    p.rect(left + 1, top, right - left - 2, bottom - top)

    p.fill(0)
    p.textSize(12)
    p.text(`T (K): ${temperature.toFixed(0)}`, 20, 30)
    p.text(`V: ${volume.toFixed(2)}`, 20, 50)
    p.text(`n: ${moles.toFixed(2)}`, 20, 70)
    p.text(`P (atm): ${pressure.toFixed(2)}`, 20, 90)
  }
}

// Math: Set Theory & Venn Diagrams
const setTheorySketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(250)

    const params = useSimulationStore.getState().params
    const showIntersection = params.show_intersection !== undefined ? Boolean(params.show_intersection) : true
    const showUnion = params.show_union !== undefined ? Boolean(params.show_union) : false
    const setASize = params.set_a_size !== undefined ? Number(params.set_a_size) : 30
    const setBSize = params.set_b_size !== undefined ? Number(params.set_b_size) : 25

    // Draw universal set
    p.noFill()
    p.stroke(100)
    p.strokeWeight(2)
    p.rect(50, 50, 500, 300)

    // Draw set A
    p.fill(52, 152, 219, 100)
    p.noStroke()
    p.circle(250, 200, 150)

    // Draw set B
    p.fill(231, 76, 60, 100)
    p.circle(350, 200, 150)

    // Labels
    p.fill(0)
    p.textAlign(p.CENTER)
    p.textSize(16)
    p.text("A", 200, 200)
    p.text("B", 400, 200)

    // Set information
    p.textAlign(p.LEFT)
    p.textSize(12)
    p.text(`|A| = ${setASize}`, 60, 30)
    p.text(`|B| = ${setBSize}`, 60, 50)

    if (showIntersection) {
      const intersectionSize = Math.min(setASize, setBSize) / 2
      p.text(`|A ∩ B| = ${intersectionSize}`, 200, 30)
    }

    if (showUnion) {
      const unionSize = setASize + setBSize - Math.min(setASize, setBSize) / 2
      p.text(`|A ∪ B| = ${unionSize}`, 350, 30)
    }
  }
}

// Math: Vector Visualization
const vectorSketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(250)

    const params = useSimulationStore.getState().params
    const v1x = params.v1x !== undefined ? Number(params.v1x) : 3
    const v1y = params.v1y !== undefined ? Number(params.v1y) : 2
    const v2x = params.v2x !== undefined ? Number(params.v2x) : 1
    const v2y = params.v2y !== undefined ? Number(params.v2y) : 3

    const centerX = 300
    const centerY = 200
    const scale = 30

    // Draw grid
    p.stroke(220)
    p.strokeWeight(1)
    for (let i = 0; i <= 600; i += 30) {
      p.line(i, 0, i, 400)
      p.line(0, i, 600, i)
    }

    // Draw axes
    p.stroke(100)
    p.strokeWeight(2)
    p.line(0, centerY, 600, centerY)
    p.line(centerX, 0, centerX, 400)

    // Draw vector v1
    p.stroke(52, 152, 219)
    p.strokeWeight(3)
    const v1EndX = centerX + v1x * scale
    const v1EndY = centerY - v1y * scale
    p.line(centerX, centerY, v1EndX, v1EndY)
    
    // Arrow for v1
    p.push()
    p.translate(v1EndX, v1EndY)
    p.rotate(p.atan2(-v1y, v1x))
    p.line(0, 0, -10, -5)
    p.line(0, 0, -10, 5)
    p.pop()

    // Draw vector v2
    p.stroke(231, 76, 60)
    p.strokeWeight(3)
    const v2EndX = centerX + v2x * scale
    const v2EndY = centerY - v2y * scale
    p.line(centerX, centerY, v2EndX, v2EndY)
    
    // Arrow for v2
    p.push()
    p.translate(v2EndX, v2EndY)
    p.rotate(p.atan2(-v2y, v2x))
    p.line(0, 0, -10, -5)
    p.line(0, 0, -10, 5)
    p.pop()

    // Draw sum vector
    p.stroke(46, 204, 113)
    p.strokeWeight(3)
    const sumEndX = centerX + (v1x + v2x) * scale
    const sumEndY = centerY - (v1y + v2y) * scale
    p.line(centerX, centerY, sumEndX, sumEndY)
    
    // Arrow for sum
    p.push()
    p.translate(sumEndX, sumEndY)
    p.rotate(p.atan2(-(v1y + v2y), v1x + v2x))
    p.line(0, 0, -10, -5)
    p.line(0, 0, -10, 5)
    p.pop()

    // Labels
    p.fill(0)
    p.textAlign(p.LEFT)
    p.textSize(12)
    p.text(`v₁ = (${v1x}, ${v1y})`, 20, 30)
    p.text(`v₂ = (${v2x}, ${v2y})`, 20, 50)
    p.text(`v₁ + v₂ = (${v1x + v2x}, ${v1y + v2y})`, 20, 70)

    // Legend
    p.fill(52, 152, 219)
    p.rect(500, 20, 15, 15)
    p.fill(0)
    p.text("v₁", 520, 32)

    p.fill(231, 76, 60)
    p.rect(500, 40, 15, 15)
    p.fill(0)
    p.text("v₂", 520, 52)

    p.fill(46, 204, 113)
    p.rect(500, 60, 15, 15)
    p.fill(0)
    p.text("v₁+v₂", 520, 72)
  }
}

// Physics: Electric Field
const electricFieldSketch = (p: any) => {
  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(250)

    const params = useSimulationStore.getState().params
    const charge1 = params.charge1 !== undefined ? Number(params.charge1) : 5
    const charge2 = params.charge2 !== undefined ? Number(params.charge2) : -3
    const showField = params.show_field !== undefined ? Boolean(params.show_field) : true

    // Charge positions
    const q1x = 200
    const q1y = 200
    const q2x = 400
    const q2y = 200

    // Draw field lines if enabled
    if (showField) {
      p.stroke(150, 150, 150, 100)
      p.strokeWeight(1)
      
      for (let x = 50; x < 550; x += 30) {
        for (let y = 50; y < 350; y += 30) {
          const dx1 = x - q1x
          const dy1 = y - q1y
          const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
          
          const dx2 = x - q2x
          const dy2 = y - q2y
          const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          
          if (r1 > 20 && r2 > 20) {
            const Ex = charge1 * dx1 / (r1 * r1 * r1) + charge2 * dx2 / (r2 * r2 * r2)
            const Ey = charge1 * dy1 / (r1 * r1 * r1) + charge2 * dy2 / (r2 * r2 * r2)
            
            const magnitude = Math.sqrt(Ex * Ex + Ey * Ey)
            if (magnitude > 0.01) {
              const scale = Math.min(15, 1000 * magnitude)
              const endX = x + (Ex / magnitude) * scale
              const endY = y + (Ey / magnitude) * scale
              
              p.line(x, y, endX, endY)
              
              // Arrow head
              const angle = Math.atan2(Ey, Ex)
              p.push()
              p.translate(endX, endY)
              p.rotate(angle)
              p.line(0, 0, -3, -2)
              p.line(0, 0, -3, 2)
              p.pop()
            }
          }
        }
      }
    }

    // Draw charges
    // Charge 1 (positive)
    p.fill(231, 76, 60)
    p.noStroke()
    p.circle(q1x, q1y, 30)
    p.fill(255)
    p.textAlign(p.CENTER)
    p.textSize(18)
    p.text("+", q1x, q1y + 6)

    // Charge 2 (negative)
    p.fill(52, 152, 219)
    p.circle(q2x, q2y, 30)
    p.fill(255)
    p.text("-", q2x, q2y + 6)

    // Labels
    p.fill(0)
    p.textAlign(p.LEFT)
    p.textSize(12)
    p.text(`q₁ = +${charge1}μC`, 20, 30)
    p.text(`q₂ = ${charge2}μC`, 20, 50)
    p.text("Field Lines: " + (showField ? "ON" : "OFF"), 20, 70)
  }
}

// Physics: Wave Interference
const waveSketch = (p: any) => {
  let time = 0

  p.setup = () => {
    p.createCanvas(600, 400)
  }

  p.draw = () => {
    p.background(250)
    time += 0.05

    const params = useSimulationStore.getState().params
    const frequency1 = params.freq1 !== undefined ? Number(params.freq1) : 2
    const frequency2 = params.freq2 !== undefined ? Number(params.freq2) : 3
    const amplitude1 = params.amp1 !== undefined ? Number(params.amp1) : 50
    const amplitude2 = params.amp2 !== undefined ? Number(params.amp2) : 30
    const showInterference = params.show_interference !== undefined ? Boolean(params.show_interference) : true

    const centerY = 200

    // Draw wave 1
    p.stroke(52, 152, 219)
    p.strokeWeight(2)
    p.noFill()
    p.beginShape()
    for (let x = 0; x <= 600; x += 2) {
      const y = centerY + amplitude1 * Math.sin((x / 50) * frequency1 - time)
      p.vertex(x, y)
    }
    p.endShape()

    // Draw wave 2
    p.stroke(231, 76, 60)
    p.strokeWeight(2)
    p.beginShape()
    for (let x = 0; x <= 600; x += 2) {
      const y = centerY + amplitude2 * Math.sin((x / 50) * frequency2 - time)
      p.vertex(x, y)
    }
    p.endShape()

    // Draw interference pattern
    if (showInterference) {
      p.stroke(46, 204, 113)
      p.strokeWeight(3)
      p.beginShape()
      for (let x = 0; x <= 600; x += 2) {
        const y1 = amplitude1 * Math.sin((x / 50) * frequency1 - time)
        const y2 = amplitude2 * Math.sin((x / 50) * frequency2 - time)
        const y = centerY + y1 + y2
        p.vertex(x, y)
      }
      p.endShape()
    }

    // Draw center line
    p.stroke(100)
    p.strokeWeight(1)
    p.line(0, centerY, 600, centerY)

    // Labels
    p.fill(0)
    p.textAlign(p.LEFT)
    p.textSize(12)
    p.text(`Wave 1: f = ${frequency1}Hz, A = ${amplitude1}`, 20, 30)
    p.text(`Wave 2: f = ${frequency2}Hz, A = ${amplitude2}`, 20, 50)
    p.text("Interference: " + (showInterference ? "ON" : "OFF"), 20, 70)

    // Legend
    p.fill(52, 152, 219)
    p.rect(450, 20, 15, 15)
    p.fill(0)
    p.text("Wave 1", 470, 32)

    p.fill(231, 76, 60)
    p.rect(450, 40, 15, 15)
    p.fill(0)
    p.text("Wave 2", 470, 52)

    if (showInterference) {
      p.fill(46, 204, 113)
      p.rect(450, 60, 15, 15)
      p.fill(0)
      p.text("Sum", 470, 72)
    }
  }
}

const defaultTheory = (
  <div className="prose max-w-none p-6">
    <h2 className="text-2xl font-bold mb-4">Chuyển Động Rơi Tự Do</h2>
    
    <p className="text-gray-700 mb-4">
      Chuyển động rơi tự do là chuyển động của một vật chỉ chịu tác dụng của trọng lực.
      Trong thực tế, vật rơi tự do còn chịu tác dụng của lực cản không khí.
    </p>

    <h3 className="text-xl font-semibold mb-3">Công Thức Cơ Bản</h3>
    
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <p className="mb-2"><strong>Vận tốc theo thời gian:</strong></p>
      <p className="font-mono text-lg">v = v₀ + g×t</p>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <p className="mb-2"><strong>Quãng đường theo thời gian:</strong></p>
      <p className="font-mono text-lg">s = v₀×t + ½×g×t²</p>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <p className="mb-2"><strong>Vận tốc theo quãng đường:</strong></p>
      <p className="font-mono text-lg">v² = v₀² + 2×g×s</p>
    </div>

    <h3 className="text-xl font-semibold mb-3">Thử Nghiệm</h3>
    
    <p className="text-gray-700 mb-4">
      Quan sát mô phỏng bên cạnh để thấy cách quả bóng rơi xuống và nảy lên.
      Thử thay đổi các giá trị trong code để xem điều gì xảy ra:
    </p>

    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>Thay đổi giá trị <code className="bg-gray-100 px-2 py-1 rounded">gravity</code> để thấy tác động của trọng lực</li>
      <li>Thay đổi <code className="bg-gray-100 px-2 py-1 rounded">damping</code> (hệ số giảm chấn) để mô phỏng va chạm</li>
      <li>Thử thêm nhiều quả bóng với vị trí khác nhau</li>
    </ul>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
      <p className="font-semibold text-yellow-800">💡 Thử Thách:</p>
      <p className="text-yellow-700">
        Hãy viết code để tạo 5 quả bóng với màu sắc và kích thước khác nhau,
        rơi từ các vị trí khác nhau trên màn hình!
      </p>
    </div>
  </div>
)

const defaultStarterCode = `# Mô phỏng chuyển động rơi tự do
# Các giá trị có thể thay đổi

gravity = 0.5      # Gia tốc trọng trường (m/s²)
damping = 0.9      # Hệ số giảm chấn khi va chạm
ball_radius = 25   # Bán kính quả bóng (pixels)

# TODO: Thêm code của bạn ở đây
# Thử tạo nhiều quả bóng
# Thử thay đổi các giá trị để thấy sự khác biệt

print(f"Gravity: {gravity} m/s²")
print(f"Damping: {damping}")
print(f"Ball radius: {ball_radius} px")
`

const calculusStarterCode = `a = 1.0
b = 0.0
c = -1.0
d = 0.0
x0 = 0.0

print("a =", a)
print("b =", b)
print("c =", c)
print("d =", d)
print("x0 =", x0)
`

const thermoStarterCode = `temperature = 300.0
volume = 1.0
moles = 1.0

print("Temperature (K):", temperature)
print("Volume (L):", volume)
print("Moles:", moles)
`

type EnhancedLesson = Lesson & {
  subject?: string | null
  grade?: number | null
  topic?: string | null
  priority?: string | null
  sequence_number?: number | null
  lesson_code?: string | null
}

type LessonConfig = {
  starterCode: string
  simulationSketch?: (p: any) => void
  isInteractive: boolean
}

const getLessonConfig = (lesson: EnhancedLesson): LessonConfig => {
  // Math lessons
  if (lesson.subject === 'MTH') {
    // Set Theory (ALG topic)
    if (lesson.topic === 'ALG' && lesson.lesson_code?.includes('ALG')) {
      return {
        starterCode: `# Tập hợp và phép toán
# Thay đổi các giá trị để thấy sự khác biệt

set_a_size = 30      # Số phần tử tập hợp A
set_b_size = 25      # Số phần tử tập hợp B
show_intersection = True  # Hiển thị giao
show_union = False      # Hiển thị hợp

print("Phép toán tập hợp:")
print(f"|A| = {set_a_size}")
print(f"|B| = {set_b_size}")

if show_intersection:
    intersection = min(set_a_size, set_b_size) // 2
    print(f"|A ∩ B| = {intersection}")

if show_union:
    union = set_a_size + set_b_size - min(set_a_size, set_b_size) // 2
    print(f"|A ∪ B| = {union}")
`,
        simulationSketch: setTheorySketch,
        isInteractive: true,
      }
    }

    // Vector and Geometry (GEO topic)
    if (lesson.topic === 'GEO' && lesson.lesson_code?.includes('GEO')) {
      return {
        starterCode: `# Vector và hệ trục tọa độ
# Thay đổi các thành phần vector

v1x = 3.0   # Thành phần x của vector v₁
v1y = 2.0   # Thành phần y của vector v₁
v2x = 1.0   # Thành phần x của vector v₂
v2y = 3.0   # Thành phần y của vector v₂

# Tính toán
v1_magnitude = (v1x**2 + v1y**2)**0.5
v2_magnitude = (v2x**2 + v2y**2)**0.5
sum_x = v1x + v2x
sum_y = v1y + v2y
sum_magnitude = (sum_x**2 + sum_y**2)**0.5

print("Vector v₁:", f"({v1x}, {v1y})")
print("Vector v₂:", f"({v2x}, {v2y})")
print("Tổng v₁+v₂:", f"({sum_x}, {sum_y})")
print(f"Độ lớn v₁: {v1_magnitude:.2f}")
print(f"Độ lớn v₂: {v2_magnitude:.2f}")
print(f"Độ lớn tổng: {sum_magnitude:.2f}")
`,
        simulationSketch: vectorSketch,
        isInteractive: true,
      }
    }

    // Calculus (CAL topic)
    if (lesson.topic === 'CAL' && lesson.lesson_code?.includes('CAL')) {
      return {
        starterCode: calculusStarterCode,
        simulationSketch: calculusSketch,
        isInteractive: true,
      }
    }
  }

  // Physics lessons
  if (lesson.subject === 'PHY') {
    // Electric Field and Circuits (ELE, CIR topics)
    if ((lesson.topic === 'ELE' || lesson.topic === 'CIR') && lesson.lesson_code?.includes('ELE')) {
      return {
        starterCode: `# Điện trường và dòng điện
# Thay đổi các giá trị để thấy tác động

charge1 = 5.0      # Điện tích dương (μC)
charge2 = -3.0     # Điện tích âm (μC)
show_field = True   # Hiển thị đường sức điện

# Tính khoảng cách giữa hai điện tích
distance = 10.0    # khoảng cách (cm)

# Định luật Coulomb: F = k * |q1 * q2| / r²
k = 8.99e9  # Hằng số Coulomb
force = k * abs(charge1 * charge2) / (distance/100)**2

print("Điện trường:")
print(f"q₁ = +{charge1}μC")
print(f"q₂ = {charge2}μC")
print(f"Khoảng cách: {distance}cm")
print(f"Lực tĩnh điện: {force:.2e}N")
`,
        simulationSketch: electricFieldSketch,
        isInteractive: true,
      }
    }

    // Waves and Optics (WAV, OPT topics)
    if ((lesson.topic === 'WAV' || lesson.topic === 'OPT') && lesson.lesson_code?.includes('WAV')) {
      return {
        starterCode: `# Sóng cơ và giao thoa
# Thay đổi tần số và biên độ

freq1 = 2.0         # Tần số sóng 1 (Hz)
freq2 = 3.0         # Tần số sóng 2 (Hz)
amp1 = 50           # Biên độ sóng 1
amp2 = 30           # Biên độ sóng 2
show_interference = True  # Hiển thị giao thoa

# Tính toán
wavelength1 = 1.0 / freq1  # Bước sóng 1
wavelength2 = 1.0 / freq2  # Bước sóng 2

print("Sóng cơ:")
print(f"Sóng 1: f = {freq1}Hz, λ = {wavelength1:.2f}m, A = {amp1}")
print(f"Sóng 2: f = {freq2}Hz, λ = {wavelength2:.2f}m, A = {amp2}")

if show_interference:
    print("Giao thoa: BẬT")
else:
    print("Giao thoa: TẮT")
`,
        simulationSketch: waveSketch,
        isInteractive: true,
      }
    }

    // Thermodynamics (THE topic)
    if (lesson.topic === 'THE' && lesson.lesson_code?.includes('THE')) {
      return {
        starterCode: thermoStarterCode,
        simulationSketch: thermoSketch,
        isInteractive: true,
      }
    }

    // Mechanics (MEC, DYN topics)
    if ((lesson.topic === 'MEC' || lesson.topic === 'DYN') && lesson.lesson_code?.includes('MEC')) {
      return {
        starterCode: defaultStarterCode,
        simulationSketch: exampleSketch,
        isInteractive: true,
      }
    }
  }

  // Default fallback
  if (lesson.starter_code) {
    return {
      starterCode: lesson.starter_code,
      simulationSketch: exampleSketch,
      isInteractive: true,
    }
  }

  return {
    starterCode: defaultStarterCode,
    simulationSketch: exampleSketch,
    isInteractive: false,
  }
}

export default function LessonPage() {
  const { setCode, setLanguage } = useEditorStore()
  const params = useParams()
  const router = useRouter()
  const lessonId = params?.lessonsId as string
  
  const [lesson, setLesson] = useState<EnhancedLesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTheoryOnly, setIsTheoryOnly] = useState(false)

  useEffect(() => {
    setLanguage('python')
  }, [setLanguage])

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!lessonId) {
          throw new Error('Không tìm thấy ID bài học')
        }

        const res = await fetch(`/api/lessons/${lessonId}`)
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Bài học không tồn tại')
          }
          throw new Error('Không thể tải bài học')
        }

        const data: EnhancedLesson = await res.json()
        setLesson(data)
        const config = getLessonConfig(data)
        setCode(config.starterCode)
        setIsTheoryOnly(!config.isInteractive)
      } catch (err: any) {
        console.error('Error loading lesson:', err)
        setError(err.message || 'Đã xảy ra lỗi khi tải bài học')
        setCode(defaultStarterCode)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId, setCode])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2 mt-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">{error || 'Lỗi tải bài học'}</h3>
                  <p className="text-red-700 text-sm mt-1">
                    Vui lòng thử lại hoặc quay về danh sách bài học
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isTheoryOnly) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          {/* Lesson Header with Metadata */}
          <LessonViewer lesson={lesson} />

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <Button 
              variant="outline"
              onClick={() => router.back()}
            >
              ← Bài trước
            </Button>
            <Button>
              Bài sau →
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const lessonConfig = getLessonConfig(lesson)

  return (
    <SandboxContainer
      lessonId={lessonId}
      initialCode={lessonConfig.starterCode}
      theoryContent={
        <div className="space-y-4">
          {/* Lesson Title and Metadata */}
          <div className="space-y-2 pb-4 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold">{lesson.title}</h2>
            </div>
            <p className="text-gray-600">{lesson.description}</p>
            
            {/* Metadata Badges */}
            {(lesson.lesson_code || lesson.grade || lesson.priority || lesson.sequence_number) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {lesson.lesson_code && (
                  <Badge variant="outline" className="font-mono text-xs">
                    {lesson.lesson_code}
                  </Badge>
                )}
                {lesson.grade && (
                  <Badge variant="secondary" className="text-xs">
                    Lớp {lesson.grade}
                  </Badge>
                )}
                {lesson.topic && (
                  <Badge variant="secondary" className="text-xs">
                    {lesson.topic}
                  </Badge>
                )}
                {lesson.priority && (
                  <Badge 
                    className={`text-xs font-semibold ${
                      lesson.priority === 'H' ? 'bg-red-100 text-red-800' :
                      lesson.priority === 'M' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {lesson.priority === 'H' ? 'Cốt lõi' :
                     lesson.priority === 'M' ? 'Mở rộng' :
                     'Tham khảo'}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {lesson.points} points
                </Badge>
              </div>
            )}
          </div>

          {/* Theory Content */}
          <div className="prose prose-sm max-w-none">
            {lesson.theory_content ? (
              typeof lesson.theory_content === 'object' && 
              !Array.isArray(lesson.theory_content) && 
              'content' in lesson.theory_content ? (
                <div>{(lesson.theory_content as any).content}</div>
              ) : typeof lesson.theory_content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: lesson.theory_content as string }} />
              ) : (
                defaultTheory
              )
            ) : (
              defaultTheory
            )}
          </div>
        </div>
      }
      simulationSketch={lessonConfig.simulationSketch}
    />
  )
}
