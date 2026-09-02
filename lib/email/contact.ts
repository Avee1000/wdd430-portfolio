// lib/email/contact.ts
import { sendEmail } from './index';

interface ContactEmailParams {
  senderEmail: string;
  senderName: string;
  subject: string;
  message: string;
}

export async function sendContactNotificationEmail({
  senderEmail,
  senderName,
  subject,
  message,
}: ContactEmailParams) {
  // Use public environment domain or fallback to production domain
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const logoUrl = `${baseUrl}/logo.png`;

  return sendEmail({
    senderEmail,
    senderName,
    subject: `Contact Form: ${subject}`,
    htmlContent: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            @media only screen and (max-width: 600px) {
              .bg-body {
                background-color: transparent !important;
              }
              .responsive-table {
                width: 100% !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F9FAFB; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;" class="bg-body">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F9FAFB; padding: 40px 5px;" class="bg-body">
            <tr>
              <td align="center" valign="top">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);" class="responsive-table">

                  <tr>
                    <td style="background-color: #0a0a0a; height: 6px; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td align="left" valign="middle" style="padding: 32px 32px 16px 32px;">
                      <span style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 20px; color: #0a0a0a; letter-spacing: -0.5px;">
                        <img 
                          src="${logoUrl}"
                          alt="OFI-S Logo" 
                          width="28" 
                          height="28" 
                          style="display: inline-block; vertical-align: middle; border: 0; border-radius: 6px;" 
                        />
                        OFI‑S
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td align="left" valign="top" style="padding: 16px 32px 32px 32px;">
                      <h1 style="margin: 0 0 16px 0; font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.3px; line-height: 1.3;">
                        New contact message
                      </h1>

                      <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 1.6; color: #6B7280;">
                        You received a new message from your portfolio contact form.
                      </p>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 16px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="left" valign="middle" style="color: #6B7280; font-weight: 500; font-size: 13px; padding-bottom: 10px;">Name:</td>
                                <td align="right" valign="middle" style="font-weight: 600; color: #0a0a0a; padding-bottom: 10px; font-size: 13px;">${senderName}</td>
                              </tr>
                              <tr>
                                <td align="left" valign="middle" style="color: #6B7280; font-weight: 500; font-size: 13px; padding-bottom: 10px;">Email:</td>
                                <td align="right" valign="middle" style="font-weight: 600; color: #0a0a0a; padding-bottom: 10px; font-size: 13px;">${senderEmail}</td>
                              </tr>
                              <tr>
                                <td align="left" valign="middle" style="color: #6B7280; font-weight: 500; font-size: 13px;">Subject:</td>
                                <td align="right" valign="middle" style="font-weight: 600; color: #0a0a0a; font-size: 13px;">${subject}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 28px;">
                        <tr>
                          <td style="padding: 20px;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #0a0a0a;">Message</p>
                            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #4B5563; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0 0 6px 0; font-size: 13px; color: #9CA3AF;">
                        This message was sent from your portfolio contact form.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" valign="top" style="background-color: #F9FAFB; border-top: 1px solid #E5E7EB; padding: 20px 32px; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.5;">
                        © ${new Date().getFullYear()} OFI‑S. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}