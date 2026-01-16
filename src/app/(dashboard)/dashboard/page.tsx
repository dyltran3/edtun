'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CurriculumLearningPath } from '@/components/learning/CurriculumLearningPath'
import { 
  BookOpen, 
  Rocket, 
  Award, 
  TrendingUp, 
  Clock,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, profile, loading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const levelProgress = ((profile.points % 100) / 100) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Chào mừng trở lại, {profile.full_name || profile.username}!
        </h1>
        <p className="text-gray-600">
          Tiếp tục hành trình học tập của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.level}</div>
            <Progress value={levelProgress} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">
              {profile.points % 100} / 100 XP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.points}</div>
            <p className="text-xs text-gray-500 mt-2">
              Keep learning to earn more!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.streak_days} days</div>
            <p className="text-xs text-gray-500 mt-2">
              Don't break the chain!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-gray-500 mt-2">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Academic Mode</CardTitle>
                <CardDescription>
                  Học Toán, Lý, Anh với mô phỏng tương tác
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/courses?mode=academic">
                Tiếp Tục Học
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Rocket className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>Project Mode</CardTitle>
                <CardDescription>
                  Xây dựng dự án thực tế và phát triển sản phẩm
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/projects">
                Khám Phá Dự Án
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Tiếp Tục Học</CardTitle>
          <CardDescription>
            Các khóa học bạn đang theo dõi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Toán Hình Học Lớp 10</h3>
                  <p className="text-sm text-gray-500">Bài 5: Đường tròn và tiếp tuyến</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">60% Complete</div>
                  <Progress value={60} className="w-32 mt-1" />
                </div>
                <Button asChild>
                  <Link href="/lessons/lesson-id">Tiếp Tục</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Build a Todo App</h3>
                  <p className="text-sm text-gray-500">Milestone 2: Database Integration</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">40% Complete</div>
                  <Progress value={40} className="w-32 mt-1" />
                </div>
                <Button asChild>
                  <Link href="/projects/project-id">Tiếp Tục</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structured Curriculum Learning Path */}
      <CurriculumLearningPath />
    </div>
  )
}