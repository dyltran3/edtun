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
  if (lesson.lesson_code === 'MTH-12-CAL-H-01') {
    return {
      starterCode: calculusStarterCode,
      simulationSketch: calculusSketch,
      isInteractive: true,
    }
  }

  if (lesson.lesson_code === 'PHY-12-THE-H-01') {
    return {
      starterCode: thermoStarterCode,
      simulationSketch: thermoSketch,
      isInteractive: true,
    }
  }

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
