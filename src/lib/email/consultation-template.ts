import { CONTACT, SITE } from "@/lib/constants";

export type ConsultationEmailFields = {
  fullName: string;
  workEmail: string;
  company: string;
  projectType: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;width:132px;color:#64748b;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:15px;line-height:1.5;">${value}</td>
    </tr>`;
}

export function buildConsultationEmailHtml(fields: ConsultationEmailFields) {
  const fullName = escapeHtml(fields.fullName);
  const workEmail = escapeHtml(fields.workEmail);
  const company = escapeHtml(fields.company);
  const projectType = escapeHtml(fields.projectType);
  const message = escapeHtml(fields.message);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#eef2f7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:28px 32px 24px;">
                <p style="margin:0;color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">${SITE.name}</p>
                <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;font-weight:700;">New consultation request</h1>
                <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;line-height:1.5;">${SITE.tagline}</p>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#0284c7;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.6;">A new project inquiry just arrived. Reply directly to reach the client.</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${detailRow("Name", fullName)}
                  ${detailRow("Email", `<a href="mailto:${workEmail}" style="color:#0284c7;text-decoration:none;">${workEmail}</a>`)}
                  ${detailRow("Company", company)}
                  ${detailRow("Project", projectType)}
                </table>
                <p style="margin:22px 0 8px;color:#64748b;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">Message</p>
                <div style="background:#f8fafc;border-left:4px solid #0284c7;border-radius:8px;padding:16px 18px;">
                  <p style="margin:0;color:#0f172a;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="margin:24px 0 8px;">
                  <a href="mailto:${workEmail}" style="display:inline-block;background:#0284c7;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;">Reply to ${fullName}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#0f172a;padding:22px 32px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;">${SITE.name}</p>
                <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;">${CONTACT.address}</p>
                <p style="margin:8px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6;">
                  <a href="mailto:${CONTACT.email}" style="color:#38bdf8;text-decoration:none;">${CONTACT.email}</a>
                  &nbsp;·&nbsp; ${CONTACT.phone}
                </p>
                <p style="margin:8px 0 0;">
                  <a href="${SITE.url}" style="color:#38bdf8;font-size:13px;text-decoration:none;">${SITE.url.replace("https://", "")}</a>
                </p>
                <p style="margin:16px 0 0;color:#64748b;font-size:11px;line-height:1.5;">© ${year} ${SITE.name}. Sent from the consultation form on ${SITE.url.replace("https://", "")}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
