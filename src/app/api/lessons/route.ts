import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// Sample lessons data for testing when curriculum columns don't exist
const sampleLessons = [
  {
    id: '20000000-0000-0000-0000-000000000001',
    title: 'Mệnh đề & Tập hợp',
    description: 'Các phép toán tập hợp, sơ đồ Ven, các tập hợp số',
    subject: 'MTH',
    grade: 10,
    topic: 'ALG',
    priority: 'H',
    sequence_number: 1,
    lesson_code: 'MTH-10-ALG-H-01',
    points: 10,
    theory_content: { type: 'theory', content: 'Ngoài toán học, các phép toán tập hợp là nền tảng của lôgic, ngôn ngữ lập trình và khoa học máy tính.' },
    is_published: true
  },
  {
    id: '20000000-0000-0000-0000-000000000002',
    title: 'Hàm số bậc hai & Đồ thị',
    description: 'Khảo sát biến thiên, vẽ Parabol, dấu tam thức bậc hai',
    subject: 'MTH',
    grade: 10,
    topic: 'FUN',
    priority: 'H',
    sequence_number: 2,
    lesson_code: 'MTH-10-FUN-H-02',
    points: 10,
    theory_content: { type: 'theory', content: 'Hàm số bậc hai có ứng dụng rộng rãi trong vật lý (chuyển động ném, quỹ đạo) và kinh tế (tối ưu hóa lợi nhuận).' },
    is_published: true
  },
  {
    id: '20000000-0000-0000-0000-000000000003',
    title: 'Vector & Hệ trục tọa độ',
    description: 'Tổng/hiệu vector, tích vô hướng, ứng dụng trong vật lý',
    subject: 'MTH',
    grade: 10,
    topic: 'GEO',
    priority: 'H',
    sequence_number: 3,
    lesson_code: 'MTH-10-GEO-H-03',
    points: 10,
    theory_content: { type: 'theory', content: 'Vector là công cụ mạnh để biểu diễn lực, vận tốc, gia tốc trong không gian ba chiều.' },
    is_published: true
  },
  {
    id: '20000000-0000-0000-0000-000000000019',
    title: 'Động học chất điểm',
    description: 'Chuyển động thẳng đều/biến đổi đều, đồ thị độ dịch chuyển - thời gian',
    subject: 'PHY',
    grade: 10,
    topic: 'MEC',
    priority: 'H',
    sequence_number: 1,
    lesson_code: 'PHY-10-MEC-H-01',
    points: 10,
    theory_content: { type: 'theory', content: 'Động học là nền tảng của cơ học cổ điển, mô tả cách thức vật thể chuyển động.' },
    is_published: true
  },
  {
    id: '20000000-0000-0000-0000-000000000020',
    title: 'Ba định luật Newton & Các lực cơ học',
    description: 'Định luật II Newton (F=ma), Lực ma sát, Lực đàn hồi',
    subject: 'PHY',
    grade: 10,
    topic: 'DYN',
    priority: 'H',
    sequence_number: 2,
    lesson_code: 'PHY-10-DYN-H-02',
    points: 10,
    theory_content: { type: 'theory', content: 'Định luật Newton là nền tảng của cơ học, giải thích mối quan hệ giữa lực và chuyển động.' },
    is_published: true
  }
]

/**
 * GET /api/lessons
 * Returns all lessons with optional filtering
 * Query parameters:
 *   - subject: Filter by subject (e.g., 'MTH', 'PHY')
 *   - grade: Filter by grade (10, 11, 12)
 *   - topic: Filter by topic
 *   - priority: Filter by priority ('H', 'M', 'L')
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subject = searchParams.get('subject')
    const grade = searchParams.get('grade')
    const topic = searchParams.get('topic')
    const priority = searchParams.get('priority')

    let query = supabase
      .from('lessons')
      .select('*')
      .eq('is_published', true)

    // Apply filters if provided
    if (subject) {
      query = query.eq('subject', subject)
    }
    if (grade) {
      query = query.eq('grade', parseInt(grade, 10))
    }
    if (topic) {
      query = query.eq('topic', topic)
    }
    if (priority) {
      query = query.eq('priority', priority)
    }

    // Order by priority and sequence
    query = query
      .order('priority', { ascending: false })
      .order('sequence_number', { ascending: true })

    const { data, error } = await query

    if (error) {
      console.warn('⚠️  Curriculum columns not available, using sample data:', error.message)
      
      // Filter sample data based on query parameters
      let filteredData = sampleLessons
      
      if (subject) {
        filteredData = filteredData.filter(lesson => lesson.subject === subject)
      }
      if (grade) {
        filteredData = filteredData.filter(lesson => lesson.grade === parseInt(grade, 10))
      }
      if (topic) {
        filteredData = filteredData.filter(lesson => lesson.topic === topic)
      }
      if (priority) {
        filteredData = filteredData.filter(lesson => lesson.priority === priority)
      }

      return NextResponse.json(filteredData)
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}
