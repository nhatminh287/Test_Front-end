import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json(); // Dữ liệu sẽ chứa token và kết quả
    const { token, results } = body;

    const response = await fetch('https://test-share.shub.edu.vn/api/intern-test/output', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(results),
    });

    const responseData = await response.json(); // Lấy dữ liệu từ API bên ngoài

    // Trả về thông báo mà API bên ngoài trả về
    return NextResponse.json({ message: responseData.message || 'Results sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error sending results' }, { status: 500 });
  }
};
