// Simple email notification using nodemailer or any email service
// You can integrate with SendGrid, AWS SES, or other providers

export async function sendRegistrationNotification(registration: any) {
    // Example using fetch to a serverless function or external API
    try {
      // Send email to admin
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'admin@wqtc.org',
          subject: `New Class Registration: ${registration.name}`,
          html: `
            <h2>New Class Registration</h2>
            <p><strong>Name:</strong> ${registration.name}</p>
            <p><strong>Email:</strong> ${registration.email}</p>
            <p><strong>Phone:</strong> ${registration.phone}</p>
            <p><strong>Language:</strong> ${registration.language}</p>
            <p><strong>Timing:</strong> ${registration.timing}</p>
            <p><strong>Class Type:</strong> ${registration.classType}</p>
            ${registration.additionalNotes ? `<p><strong>Notes:</strong> ${registration.additionalNotes}</p>` : ''}
          `,
        }),
      });
  
      // Send confirmation email to student
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: registration.email,
          subject: 'WQTC Class Registration Confirmed',
          html: `
            <h2>Thank you for registering!</h2>
            <p>Dear ${registration.name},</p>
            <p>Your registration for the <strong>${registration.language}</strong> class has been received.</p>
            <p><strong>Class Details:</strong></p>
            <ul>
              <li>Timing: ${registration.timing}</li>
              <li>Days: ${registration.days}</li>
              <li>Type: ${registration.classType}</li>
            </ul>
            <p>You will be contacted on WhatsApp at <strong>${registration.contactNumber}</strong> with further details.</p>
            <p>Jazakallah Khair!</p>
            <p>WQTC Team</p>
          `,
        }),
      });
    } catch (error) {
      console.error('Email notification error:', error);
    }
  }
  