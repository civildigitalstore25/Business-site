import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ConsultationBody = {
  fullName?: string;
  company?: string;
  workEmail?: string;
  projectType?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ConsultationBody;
    const fullName = body.fullName?.trim();
    const workEmail = body.workEmail?.trim();
    const company = body.company?.trim() || "Not provided";
    const projectType = body.projectType?.trim() || "Not specified";
    const message = body.message?.trim() || "No additional message.";

    if (!fullName || !workEmail) {
      return NextResponse.json(
        { error: "Full name and work email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "info@tomscope.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, "");

    const emailHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e2e8f0;border-radius:8px;">
        <h2 style="color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">New Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(workEmail)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
        <div style="margin-top:20px;padding:15px;background:#f8fafc;border-left:4px solid #0284c7;">
          <p style="margin:0;"><strong>Message:</strong></p>
          <p style="margin:10px 0 0;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <p style="font-size:12px;color:#64748b;margin-top:24px;">Submitted from the Tomscope consultation form.</p>
      </div>
    `;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP not configured — logging submission only.");
      console.log({ fullName, workEmail, company, projectType, message });
      return NextResponse.json({
        success: true,
        message: "Request received (SMTP not configured).",
        devMode: true,
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587", 10),
      secure: smtpPort === "465",
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Tomscope Consultation" <${smtpUser}>`,
      to: adminEmail,
      replyTo: workEmail,
      subject: `Tomscope Consultation — ${fullName} (${projectType})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Consultation request sent successfully." });
  } catch (error) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
