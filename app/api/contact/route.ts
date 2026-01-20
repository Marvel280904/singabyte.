import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, subject, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, // email server
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      // set Nama Pengirim jadi Nama User, tapi emailnya tetap email server
      from: `"${firstName} ${lastName} (via Website)" <${process.env.EMAIL_USER}>`, 
      
      to: "dev@singabyte.com",
      
      // Saat admin klik Reply, akan ke email user
      replyTo: email, 
      
      subject: `${subject} - ${company}`,
      text: `
You have a new inquiry from the website.

--- Details ---
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Subject: ${subject}

--- Message ---
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}