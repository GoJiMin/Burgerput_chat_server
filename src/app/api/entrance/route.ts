import { sendMail } from "@/app/services/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userName } = await req.json();

  if (!userName) {
    return new Response("Bad Request!", { status: 400 });
  }

  return sendMail(userName) //
    .then(
      () =>
        new NextResponse(
          JSON.stringify({ message: "알림 전송에 성공했어요!" }),
          { status: 200 }
        )
    )
    .catch((error) => {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ message: "알림 전송에 실패했어요!" }),
        { status: 500 }
      );
    });
}
