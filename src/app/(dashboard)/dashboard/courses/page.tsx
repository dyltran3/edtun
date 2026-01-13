'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Rocket, Clock, Award } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockCourses = [
  {
    id: '1',
    title: 'Toán Hình Học Lớp 10',
    description: 'Học hình học qua mô phỏng tương tác và code',
    mode: 'academic',
    category: 'math',
    level: 'beginner',
    lessons: 12,
    duration: '6 tuần',
    points: 120,
    enrolled: true,
    progress: 60,
  },
  {
    id: '2',
    title: 'Vật Lý: Chuyển Động',
    description: 'Hiểu chuyển động thông qua simulation thực tế',
    mode: 'academic',
    category: 'physics',
    level: 'beginner',
    lessons: 10,
    duration: '5 tuần',
    points: 100,
    enrolled: false,
    progress: 0,
  },
  {
    id: '3',
    title: 'Build a Todo App',
    description: 'Xây dựng ứng dụng Todo đầy đủ từ A-Z',
    mode: 'project',
    category: 'programming',
    level: 'intermediate',
    lessons: 8,
    duration: '4 tuần',
    points: 200,
    enrolled: true,
    progress: 40,
  },
  {
    id: '4',
    title: 'E-commerce Website',
    description: 'Tạo website bán hàng hoàn chỉnh với payment',
    mode: 'project',
    category: 'programming',
    level: 'advanced',
    lessons: 15,
    duration: '8 tuần',
    points: 300,
    enrolled: false,
    progress: 0,
  },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'project'>('all')

  const filteredCourses = mockCourses.filter(course => {
    if (activeTab === 'all') return true
    return course.mode === activeTab
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Khóa Học</h1>
        <p className="text-gray-600">
          Khám phá các khóa học và dự án để phát triển kỹ năng
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Tất Cả</TabsTrigger>
          <TabsTrigger value="academic">Academic Mode</TabsTrigger>
          <TabsTrigger value="project">Project Mode</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${
                      course.mode === 'academic' 
                        ? 'bg-blue-100' 
                        : 'bg-purple-100'
                    }`}>
                      {course.mode === 'academic' ? (
                        <BookOpen className={`w-6 h-6 ${
                          course.mode === 'academic' 
                            ? 'text-blue-600' 
                            : 'text-purple-600'
                        }`} />
                      ) : (
                        <Rocket className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <Badge variant={course.enrolled ? 'default' : 'secondary'}>
                      {course.enrolled ? 'Đã đăng ký' : course.level}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} bài học</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{course.points} điểm</span>
                    </div>
                  </div>

                  {course.enrolled && course.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Tiến độ</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>
                      {course.enrolled ? 'Tiếp Tục Học' : 'Xem Chi Tiết'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}