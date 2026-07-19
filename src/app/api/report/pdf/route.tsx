import { getReportSummary, TEMP_PATIENT_ID } from '@/lib/data/report';
import { ReportPdfDocument } from '@/lib/pdf/report-pdf-document';
import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

// 매 요청마다 최신 리포트로 새로 생성 (정적 캐시 대상 아님)
export const dynamic = 'force-dynamic';

export async function GET() {
  const summary = await getReportSummary(TEMP_PATIENT_ID);
  const document = <ReportPdfDocument summary={summary} />;

  try {
    const buffer = await renderToBuffer(document);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report.pdf"',
      },
    });
  } catch (error) {
    console.error('[report-pdf]', error);
    const message = error instanceof Error ? error.message : 'PDF 생성 중 오류가 발생했습니다.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
