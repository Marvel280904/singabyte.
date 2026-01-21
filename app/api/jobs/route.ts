import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Karena ada file upload, kita harus membaca FormData, bukan JSON
    const formData = await req.formData();

    // Ambil data dari fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const linkedin = formData.get("linkedin") as string;
    const salary = formData.get("salary") as string;
    const experience = formData.get("experience") as string;
    const jobTitle = formData.get("jobTitle") as string;
    
    // Ambil file resume
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }

    // Convert File ke Buffer agar bisa dikirim Nodemailer
    const buffer = Buffer.from(await file.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      // From: Nama User (via Website) <Email Server>
      from: `"${name} (via Website)" <${process.env.EMAIL_USER}>`,
      to: "dev@singabyte.com",
      replyTo: email,
      subject: `Job Application - ${jobTitle}`,
      text: `
New Job Application Received!

--- Candidate Details ---
Name: ${name}
Email: ${email}
Location: ${location}
LinkedIn: ${linkedin}
Experience: ${experience}
Salary Expectation: $${salary}

Applying for: ${jobTitle}

(See attached resume)
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Application sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send application" }, { status: 500 });
  }
}