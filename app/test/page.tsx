"use client";

import React, { useState } from "react";

// Email template generator function
function generateEmailHTML({
  senderName,
  senderEmail,
  subject,
  message,
}: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const logoUrl = `${baseUrl}/logo.png`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
              <td align="left" style="padding: 32px 32px 16px 32px;">
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
                      <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #4B5563; white-space: pre-wrap;">${message}</p>
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
</html>`;
}

export default function EmailPreviewPage() {
  const [formData, setFormData] = useState({
    senderName: "John Doe",
    senderEmail: "john@example.com",
    subject: "Project Inquiry",
    message: "Hello, I am interested in working with you on a new web project.",
  });

  const emailHTML = generateEmailHTML(formData);

  return (
    <div className="flex h-screen w-full bg-neutral-900 text-white">
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Email Test Controls</h2>

        <label className="text-xs text-neutral-400">
          Sender Name
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white"
            value={formData.senderName}
            onChange={(e) =>
              setFormData({ ...formData, senderName: e.target.value })
            }
          />
        </label>

        <label className="text-xs text-neutral-400">
          Sender Email
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white"
            value={formData.senderEmail}
            onChange={(e) =>
              setFormData({ ...formData, senderEmail: e.target.value })
            }
          />
        </label>

        <label className="text-xs text-neutral-400">
          Subject
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
        </label>

        <label className="text-xs text-neutral-400">
          Message
          <textarea
            rows={4}
            className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </label>
      </div>

      {/* Live Iframe Preview Area */}
      <div className="flex-1 bg-neutral-950 p-8 flex justify-center items-center overflow-auto">
        <iframe
          title="Email Preview"
          srcDoc={emailHTML}
          className="w-full max-w-[650px] h-[750px] border border-neutral-800 rounded-lg shadow-2xl bg-white"
        />
      </div>
    </div>
  );
}
