import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    const response = await fetch('https://test-share.shub.edu.vn/api/intern-test/input', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
};