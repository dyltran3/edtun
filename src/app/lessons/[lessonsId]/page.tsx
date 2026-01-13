'use client'

import { SandboxContainer } from '@/components/sandbox/SandboxContainer'
import { useEditorStore } from '@/store/editorStore'
import { useSimulationStore } from '@/store/simulationStore'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Lesson } from '@/lib/services/lessonService'

// Example P5.js sketch for physics simulation (must set p.setup / p.draw directly)
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

export default function LessonPage() {
  const { setCode, setLanguage } = useEditorStore()
  const params = useParams()
  const lessonId = params?.lessonsId as string
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLanguage('python')
  }, [setLanguage])

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/lessons/${lessonId}`)
        if (!res.ok) throw new Error('Không thể tải bài học')
        const data = await res.json()
        setLesson(data)
        setCode(data.starter_code || defaultStarterCode)
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi')
        setCode(defaultStarterCode)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId, setCode])

  return (
    <SandboxContainer
      lessonId={lessonId}
      initialCode={lesson?.starter_code || defaultStarterCode}
      theoryContent={lesson?.theory_content ? <div className="p-4">{JSON.stringify(lesson.theory_content)}</div> : defaultTheory}
      simulationSketch={exampleSketch}
    />
  )
}