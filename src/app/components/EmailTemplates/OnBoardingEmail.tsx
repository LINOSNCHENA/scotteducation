// import { IContactFormEmailProps } from "@/app/types/Models.subscriptions";
import { COMP_ICON_1URL, COMP_3SITE } from "@/app/utils/ApiRoutes";
import { COMP_NAME, COMP_MOTTO } from "@/app/utils/NexusData";
import { IContactFormEmailProps } from "@/types/Models.subscriptions";
import { Html, Head, Preview, Body, Container, Section, Img, Text, Row, Column } from "@react-email/components";

export const IPurposes = "New General Inquiry on Company Services and Other Inquiries";

export const ContactFormEmail = ({ username, subject, senderEmail, message }: IContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {username}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Row>
              <Column align="center">
                <Img src={COMP_ICON_1URL} width="80" alt={COMP_NAME} style={logo} />
                <Text style={companyName}>{COMP_NAME}</Text>
                <Text style={companyMotto}>{COMP_MOTTO}</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>📬 New Contact Form Submission</Text>
            <Text style={subHeading}>{IPurposes}</Text>

            <Section style={card}>
              <Text style={label}>From:</Text>
              <Text style={value}>
                {username} (<span style={email}>{senderEmail}</span>)
              </Text>

              <Text style={label}>Subject:</Text>
              <Text style={value}>{subject}</Text>

              <Text style={label}>Message:</Text>
              <Text style={messageBox}>{message}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} {COMP_NAME}. All rights reserved.
            </Text>
            <Text style={footerLink}>
              <a href={COMP_3SITE} style={link}>
                {COMP_3SITE}
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

// ========== STYLES ==========
const main = {
  backgroundColor: "#00C853",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#B9F6CA",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  margin: "0 auto",
  maxWidth: "900px",
  padding: "40px",
  width: "100%",
};

const header = {
  marginBottom: "30px",
  textAlign: "center" as const,
};

const logo = {
  marginBottom: "10px",
};

const companyName = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "5px 0",
};

const companyMotto = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
};

const content = {
  padding: "0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "0 0 10px 0",
};

const subHeading = {
  fontSize: "16px",
  color: "#475569",
  margin: "0 0 25px 0",
};

const card = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "25px",
  margin: "20px 0",
};

const label = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#475569",
  margin: "15px 0 5px 0",
};

const value = {
  fontSize: "15px",
  color: "#1e293b",
  margin: "0 0 15px 0",
  lineHeight: "1.5",
};

const email = {
  color: "#3b82f6",
};

const messageBox = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  fontSize: "15px",
  color: "#334155",
  padding: "15px",
  margin: "10px 0",
  lineHeight: "1.6",
};

const footer = {
  marginTop: "40px",
  borderTop: "1px solid #e2e8f0",
  paddingTop: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#64748b",
  margin: "5px 0",
};

const footerLink = {
  fontSize: "12px",
  color: "#64748b",
  margin: "5px 0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "none",
};
