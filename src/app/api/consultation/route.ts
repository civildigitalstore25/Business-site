import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT, SITE } from "@/lib/constants";
import { buildConsultationEmailHtml } from "@/lib/email/consultation-template";

type ConsultationBody = {
  fullName?: string;
  company?: string;
  workEmail?: string;
  projectType?: string;
  message?: string;
};

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

    const adminEmail = process.env.ADMIN_EMAIL || CONTACT.email;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, "");

    const emailHtml = buildConsultationEmailHtml({
      fullName,
      workEmail,
      company,
      projectType,
      message,
    });

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
      from: `"${SITE.name} Consultation" <${smtpUser}>`,
      to: adminEmail,
      replyTo: workEmail,
      subject: `${SITE.name} Consultation — ${fullName} (${projectType})`,
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
