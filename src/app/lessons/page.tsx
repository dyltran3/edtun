'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, GraduationCap, Filter, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface FilteredLesson {
  id: string
  title: string
  description: string
  lesson_code: string | null
  subject: string | null
  grade: number | null
  topic: string | null
  priority: string | null
  sequence_number: number | null
  points: number
}

interface CurriculumMetadata {
  subjects: string[]
  gradesBySubject: Record<string, number[]>
  topicsBySubjectGrade: Record<string, string[]>
}

export default function LessonsPage() {
  const [metadata, setMetadata] = useState<CurriculumMetadata | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string>('MTH')
  const [selectedGrade, setSelectedGrade] = useState<number>(10)
  const [lessons, setLessons] = useState<FilteredLesson[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch metadata on component mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/lessons/filter?metadata=true')
        const data = await response.json()
        setMetadata(data)
      } catch (error) {
        console.error('Error fetching metadata:', error)
      }
    }

    fetchMetadata()
  }, [])

  // Fetch lessons when subject or grade changes
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/lessons/filter?subject=${selectedSubject}&grade=${selectedGrade}`
        )
        const data = await response.json()
        setLessons(data.lessons || [])
      } catch (error) {
        console.error('Error fetching lessons:', error)
        setLessons([])
      } finally {
        setLoading(false)
      }
    }

    if (metadata) {
      fetchLessons()
    }
  }, [selectedSubject, selectedGrade, metadata])

  const getPriorityColor = (priority: string | null): string => {
    switch (priority) {
      case 'H':
        return 'bg-red-100 text-red-800'
      case 'M':
        return 'bg-yellow-100 text-yellow-800'
      case 'L':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLabel = (priority: string | null): string => {
    switch (priority) {
      case 'H':
        return 'Cốt lõi'
      case 'M':
        return 'Mở rộng'
      case 'L':
        return 'Tham khảo'
      default:
        return 'N/A'
    }
  }

  const getSubjectLabel = (subject: string): string => {
    return subject === 'MTH' ? 'Toán' : 'Vật Lý'
  }

  const availableGrades =
    metadata && selectedSubject ? metadata.gradesBySubject[selectedSubject] || [] : []

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.lesson_code?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const highPriorityLessons = filteredLessons.filter((l) => l.priority === 'H')
  const mediumPriorityLessons = filteredLessons.filter((l) => l.priority === 'M')
  const lowPriorityLessons = filteredLessons.filter((l) => l.priority === 'L')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">Danh Sách Bài Học</h1>
              <p className="text-gray-600 text-sm mt-1">
                Khám phá tất cả bài học theo chương trình học GDPT 2018
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm bài học, mã, hoặc chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Lọc bài học
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Môn học</label>
                <div className="flex gap-2">
                  {metadata?.subjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={selectedSubject === subject ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedSubject(subject)
                        setSelectedGrade(
                          metadata.gradesBySubject[subject]?.[0] || 10
                        )
                      }}
                      className="flex-1"
                    >
                      {getSubjectLabel(subject)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Grade Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Khối lớp</label>
                <div className="flex gap-2">
                  {availableGrades.map((grade) => (
                    <Button
                      key={grade}
                      variant={selectedGrade === grade ? 'default' : 'outline'}
                      onClick={() => setSelectedGrade(grade)}
                      className="flex-1"
                    >
                      Lớp {grade}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons by Priority */}
        <Tabs defaultValue="high" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="high">
              Cốt lõi ({highPriorityLessons.length})
            </TabsTrigger>
            <TabsTrigger value="medium">Mở rộng ({mediumPriorityLessons.length})</TabsTrigger>
            <TabsTrigger value="low">Tham khảo ({lowPriorityLessons.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="high" className="space-y-3 mt-6">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : highPriorityLessons.length > 0 ? (
              highPriorityLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="pt-6 text-center text-gray-500">
                  Không có bài học nào trong mục này
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="medium" className="space-y-3 mt-6">
            {mediumPriorityLessons.length > 0 ? (
              mediumPriorityLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="pt-6 text-center text-gray-500">
                  Không có bài học nào trong mục này
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="low" className="space-y-3 mt-6">
            {lowPriorityLessons.length > 0 ? (
              lowPriorityLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="pt-6 text-center text-gray-500">
                  Không có bài học nào trong mục này
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/**
 * Lesson Card Component
 */
const LessonCard: React.FC<{ lesson: FilteredLesson }> = ({ lesson }) => {
  const getPriorityColor = (priority: string | null): string => {
    switch (priority) {
      case 'H':
        return 'bg-red-100 text-red-800'
      case 'M':
        return 'bg-yellow-100 text-yellow-800'
      case 'L':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLabel = (priority: string | null): string => {
    switch (priority) {
      case 'H':
        return 'Cốt lõi'
      case 'M':
        return 'Mở rộng'
      case 'L':
        return 'Tham khảo'
      default:
        return 'N/A'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all hover:border-blue-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link href={`/lessons/${lesson.id}`} className="hover:text-blue-600">
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-base leading-snug">{lesson.title}</h3>
              </div>
            </Link>

            <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              {lesson.lesson_code && (
                <Badge variant="outline" className="font-mono text-xs font-semibold bg-white">
                  {lesson.lesson_code}
                </Badge>
              )}

              {lesson.topic && (
                <Badge variant="secondary" className="text-xs">
                  {lesson.topic}
                </Badge>
              )}

              {lesson.sequence_number && (
                <Badge variant="outline" className="text-xs">
                  Bài {lesson.sequence_number}
                </Badge>
              )}

              {lesson.priority && (
                <Badge className={`text-xs font-semibold ${getPriorityColor(lesson.priority)}`}>
                  {getPriorityLabel(lesson.priority)}
                </Badge>
              )}

              <Badge variant="outline" className="text-xs ml-auto">
                {lesson.points} points
              </Badge>
            </div>
          </div>

          <Button asChild className="flex-shrink-0">
            <Link href={`/lessons/${lesson.id}`}>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
