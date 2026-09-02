// lib/email/index.ts
import { brevo, devTransporter, parseBrevoError } from './brevo';


export interface SendEmailOptions {
    toEmail?: string;
    toName?: string;
    senderEmail: string;
    senderName: string;
    subject: string;
    htmlContent: string;
}

export async function sendEmail({ senderEmail, senderName, subject, htmlContent }: SendEmailOptions) {

    if (process.env.NODE_ENV === 'production') {
        try {
            const info = await devTransporter.sendMail({
                from: `Portfolio Contact Form <flourish.coding@gmail.com>`,
                to: `"Osamagumwende Flourish Idahosa-Sunny" <Flourish.idahosasunny@gmail.com>`,
                subject: subject,
                replyTo: `${senderName} <${senderEmail}>`,
                html: htmlContent,
                cc: "eddyidahosa01@gmail.com",
            });

            console.log('✉️ [MAILPIT] Email captured! Message ID:', info.messageId, process.env.SENDER_EMAIL
            );
            return { success: true, messageId: info.messageId };
        } catch (err) {
            console.error('❌ Mailpit Sandbox Error:', err);
            throw err;
        }
    }

    // 🔴 PRODUCTION: Send via Brevo API
    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject,
            sender: {
                name: 'Portfolio Contact Form',
                email: 'flourish.coding@gmail.com',
            },
            to: [
                {
                    email: 'flourish.coding@gmail.com',
                    name: 'Osamagumwende Flourish Idahosa-Sunny'
                }
            ],
            replyTo: {
                email: senderEmail as string,
                name: senderName
            },
            htmlContent,
            cc: [
                {
                    email: "eddyidahosa01@gmail.com",
                    name: "Osamagumwende Flourish Idahosa-Sunny"
                }
            ],
            // attachment: [
            //     {
            //         name: "logo.png",
            //         content: logoBase64
            //     }
            // ]
        });

        console.log('✉️ [MAILPIT] Email captured! Message ID:', response.messageId, process.env.SENDER_EMAIL);
        return { success: true, messageId: response.messageId };
    } catch (err) {
        console.error('❌ Brevo API Error:', err);
        throw parseBrevoError(err);
    }
}

// export async function sendWelcomeEmail(toEmail: string, toName: string) {
//     return sendEmail({
//         toEmail,
//         toName,
//         subject: 'Welcome to our platform!',
//         htmlContent: `<h1>Welcome, ${toName}!</h1><p>We are excited to have you.</p>`,
//     });
// }

export { EmailDeliveryError } from './brevo';