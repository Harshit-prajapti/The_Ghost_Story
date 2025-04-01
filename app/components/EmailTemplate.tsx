import * as React from 'react';

interface ResendOtpEmailProps {
  username: string;
  otpCode: string;
  timeLimit: number;
}

const ResendOtpEmail: React.FC<ResendOtpEmailProps> = ({ username, otpCode, timeLimit }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>Verify Your Email - OTP Resend Request</h2>
      <p>Dear {username},</p>
      <p>
        We noticed that you requested to resend your One-Time Password (OTP) for email verification.
        Please use the OTP below to complete your verification process.
      </p>
      <h3 style={{ background: '#f3f3f3', padding: '10px', display: 'inline-block', borderRadius: '5px' }}>
        {otpCode}
      </h3>
      <p>
        This OTP is valid for the next <strong>{timeLimit} minutes</strong>. Please do not share this code with
        anyone for security reasons.
      </p>
      <p>If you did not request this OTP, please ignore this email. Your account remains secure.</p>
      <p>For any assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p><strong>[Ghost_Story]</strong></p>
      <p><a href="mailto:[Support Email]" style={{ color: '#007bff' }}>[Support Email]</a></p>
      <p><a href="[Website URL]" style={{ color: '#007bff' }}>[Website URL]</a></p>
    </div>
  );
};

export default ResendOtpEmail;

