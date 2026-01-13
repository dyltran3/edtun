import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Code, Rocket, Zap, Users, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Ed-Tun STEM
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-600 font-semibold">
            "Thấy là Tin"
          </p>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Nền tảng Giáo dục Tương tác & Tư duy Khởi nghiệp Thực chiến. 
            Biến công thức khô khan thành trải nghiệm học tập sống động.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Bắt Đầu Miễn Phí
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                Khám Phá Khóa Học
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tính Năng Nổi Bật
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Visual Sync</CardTitle>
                <CardDescription>
                  Đồng bộ code và mô phỏng theo thời gian thực
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Thay đổi code, mô phỏng cập nhật tức thì. Hiểu rõ bản chất của mỗi dòng code.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Client-Side Execution</CardTitle>
                <CardDescription>
                  Chạy code Python/Web ngay trên trình duyệt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Không cần cài đặt, không cần server. Học và code mọi lúc, mọi nơi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>AI-Powered Assistant</CardTitle>
                <CardDescription>
                  Trợ lý học tập cá nhân hóa với Gemini AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Được hỗ trợ 24/7 bởi AI thông minh, giải đáp mọi thắc mắc ngay lập tức.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hai Chế Độ Học Tập
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-2xl">Academic Mode</CardTitle>
                </div>
                <CardDescription>Chương trình học hàn lâm cho K-12</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Toán, Lý, Anh theo chuẩn chương trình</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Mô phỏng tương tác trực quan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Từ cơ bản đến nâng cao</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/courses?mode=academic">
                    Khám Phá Academic Mode
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="w-8 h-8 text-purple-600" />
                  <CardTitle className="text-2xl">Project Mode</CardTitle>
                </div>
                <CardDescription>Học thông qua dự án thực chiến</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Xây dựng sản phẩm thực tế</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Kỹ năng lập trình + quản trị</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Chuẩn bị cho khởi nghiệp</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/courses?mode=project">
                    Khám Phá Project Mode
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Award className="w-16 h-16 mx-auto" />
          
          <h2 className="text-4xl font-bold">
            Sẵn Sàng Bắt Đầu Hành Trình Học Tập?
          </h2>
          
          <p className="text-xl text-blue-100">
            Tham gia cùng hàng nghìn học viên đang biến ước mơ thành hiện thực
          </p>

          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              Đăng Ký Ngay - Miễn Phí
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}