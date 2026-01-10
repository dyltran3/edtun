'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, CheckCircle, PlayCircle } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  description: string
  theory_content: any
  points: number
  completed?: boolean
}

interface LessonViewerProps {
  lesson: Lesson
  onStart?: () => void
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onStart }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
          
          <p className="text-gray-600 max-w-2xl">{lesson.description}</p>
          
          <div className="flex items-center gap-3">
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

      <Card>
        <CardHeader>
          <CardTitle>Theory</CardTitle>
          <CardDescription>Understanding the concepts</CardDescription>
        </CardHeader>
        
        <CardContent>
          {lesson.theory_content ? (
            <div className="prose max-w-none">
              {/* Render theory content - this can be markdown, HTML, or custom format */}
              <div dangerouslySetInnerHTML={{ __html: lesson.theory_content.html || '' }} />
            </div>
          ) : (
            <p className="text-gray-500">No theory content available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}