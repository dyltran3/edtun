'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Rocket, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { Course } from '@/lib/services/courseService'
import { Skeleton } from '@/components/ui/skeleton'

function Page() {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'project'>('all')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/courses')
        if (!res.ok) throw new Error('Không thể tải khoá học')
        const data = await res.json()
        setCourses(data)
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course => {
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <Skeleton className="h-10 w-10 mb-4" />
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
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
                    <Badge variant="secondary">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Điểm: {course.points || 0}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>
                      Xem Chi Tiết
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page