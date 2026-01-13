'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Course, getCourseById } from '@/lib/services/courseService'
import { getLessonsByCourse, Lesson } from '@/lib/services/lessonService'
import { Skeleton } from '@/components/ui/skeleton'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params?.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const [courseData, lessonData] = await Promise.all([
          getCourseById(courseId),
          getLessonsByCourse(courseId),
        ])
        setCourse(courseData)
        setLessons(lessonData)
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu khóa học')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        {error || 'Khoá học không tồn tại'}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <p className="text-sm text-gray-500 uppercase">{course.category}</p>
        <h1 className="text-3xl font-bold mt-2">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Danh sách bài học
          </CardTitle>
          <CardDescription>
            {lessons.length} bài học • Chế độ {course.mode}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-semibold">{lesson.title}</p>
                <p className="text-sm text-gray-500">{lesson.description}</p>
              </div>
              <Button asChild>
                <Link href={`/lessons/${lesson.id}`}>Học ngay</Link>
              </Button>
            </div>
          ))}

          {lessons.length === 0 && (
            <p className="text-sm text-gray-500">Chưa có bài học.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

