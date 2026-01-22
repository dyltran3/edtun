'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, CheckCircle, PlayCircle, Tag, GraduationCap, Star } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  description: string | null
  theory_content: any
  points: number
  completed?: boolean
  subject?: string | null
  grade?: number | null
  topic?: string | null
  priority?: string | null
  sequence_number?: number | null
  lesson_code?: string | null
}

interface LessonViewerProps {
  lesson: Lesson
  onStart?: () => void
}

const getPriorityColor = (priority: string | null | undefined): string => {
  switch (priority) {
    case 'H':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'M':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'L':
      return 'bg-blue-100 text-blue-800 border-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

const getPriorityLabel = (priority: string | null | undefined): string => {
  switch (priority) {
    case 'H':
      return 'Cốt lõi'
    case 'M':
      return 'Mở rộng'
    case 'L':
      return 'Tham khảo'
    default:
      return 'Không xác định'
  }
}

const getSubjectLabel = (subject: string | null | undefined): string => {
  switch (subject) {
    case 'MTH':
      return 'Toán'
    case 'PHY':
      return 'Vật Lý'
    default:
      return subject || 'Chưa phân loại'
  }
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onStart }) => {
  const hasMetadata = lesson.subject || lesson.grade || lesson.topic || lesson.lesson_code

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
          
          <p className="text-gray-600 max-w-2xl">{lesson.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Badge variant="secondary">
              {lesson.points} Points
            </Badge>
            
            {lesson.completed && (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>

        <Button size="lg" onClick={onStart}>
          <PlayCircle className="w-5 h-5 mr-2" />
          Start Learning
        </Button>
      </div>

      {/* Structured Curriculum Metadata */}
      {hasMetadata && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Thông tin bài học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lesson.lesson_code && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase">Mã bài</span>
                  <span className="text-sm font-mono font-bold text-blue-700">{lesson.lesson_code}</span>
                </div>
              )}
              
              {lesson.subject && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> Môn
                  </span>
                  <span className="text-sm font-semibold">{getSubjectLabel(lesson.subject)}</span>
                </div>
              )}
              
              {lesson.grade && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase">Khối</span>
                  <span className="text-sm font-semibold">Lớp {lesson.grade}</span>
                </div>
              )}
              
              {lesson.topic && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Chủ đề
                  </span>
                  <span className="text-sm font-semibold">{lesson.topic}</span>
                </div>
              )}
              
              {lesson.priority && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
                    <Star className="w-3 h-3" /> Ưu tiên
                  </span>
                  <Badge className={`w-fit text-xs font-bold ${getPriorityColor(lesson.priority)}`}>
                    {getPriorityLabel(lesson.priority)} ({lesson.priority})
                  </Badge>
                </div>
              )}
              
              {lesson.sequence_number && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-600 uppercase">STT</span>
                  <span className="text-sm font-bold">{String(lesson.sequence_number).padStart(2, '0')}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Theory</CardTitle>
          <CardDescription>Understanding the concepts</CardDescription>
        </CardHeader>
        
        <CardContent>
          {lesson.theory_content ? (
            <div className="prose max-w-none">
              {typeof lesson.theory_content === 'object' && 
               lesson.theory_content !== null &&
               !Array.isArray(lesson.theory_content) && 
               'content' in lesson.theory_content ? (
                <div>{lesson.theory_content.content}</div>
              ) : typeof lesson.theory_content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: lesson.theory_content }} />
              ) : (
                <div className="text-gray-600">
                  <p>Nội dung lý thuyết đang được cập nhật.</p>
                  <p className="text-sm mt-2">Theory content is being updated.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">
              <p>Chưa có nội dung lý thuyết.</p>
              <p className="text-sm mt-1">No theory content available.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
