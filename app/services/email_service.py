import smtplib
import os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(to_email: str, subject: str, html_content: str):
    # 🔥 Load environment variables at runtime
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    print("------ EMAIL DEBUG START ------")
    print("SMTP_HOST:", SMTP_HOST)
    print("SMTP_PORT:", SMTP_PORT)
    print("SMTP_USER:", SMTP_USER)
    print("SMTP_PASSWORD exists:", bool(SMTP_PASSWORD))
    print("Sending to:", to_email)
    print("------ EMAIL DEBUG END --------")

    if not SMTP_HOST or not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError("SMTP credentials not configured properly")

    # Remove accidental spaces
    SMTP_USER = SMTP_USER.strip()
    SMTP_PASSWORD = SMTP_PASSWORD.strip()

    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(html_content, "html"))

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20)
        server.ehlo()
        server.starttls()
        server.ehlo()

        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

        print("✅ EMAIL SENT SUCCESSFULLY")

    except smtplib.SMTPAuthenticationError as e:
        print("❌ AUTH ERROR — Check Gmail App Password")
        raise e

    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))
        raise e

    finally:
        try:
            server.quit()
        except:
            pass
