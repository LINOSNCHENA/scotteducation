interface ClientContractOptions {
    clientName: string;
    serviceType: string;
    paymentParts: number;
    deliveryTime: string;
    contact: {
        phone: string;
        email: string;
    };
}

/**
 * Generates a client contract and requirements for web development services
 */
function generateClientContract(options: ClientContractOptions): string {
    const { clientName, serviceType, paymentParts, deliveryTime, contact } = options;

    return `
  Hi Mr./Ms. ${clientName},
  
  Thank you for choosing us to build your ${serviceType}! To get started, kindly send us the following:
  
  ${serviceType} – already selected ✅
  Short profile (1–2 pages) about you or your company
  Logo (company or personal)
  Contact details (phone, email, address, social media links)
  10 photos of yourself, your business, or your products
  Mission statement & slogan
  Domain name
   • If you have one, please share the details
   • If not, we'll provide a FREE option or suggest premium alternatives
  💡 A domain is your website address, like www.example.com
  -----------------------------------------------------------------------------------------------------------------
  
  How we work:
  
  ✅ Project begins once all items above are submitted
  ✅ First version delivered within ${deliveryTime}
  ✅ Daily updates provided throughout
  ✅ Website handed over with full ownership & access
  
  💰 Payment Plan (${paymentParts} equal Parts):
  
  1. On launch of the first version
  2. After your review & input
  3. Upon final handover (source code & credentials)
  
  We look forward to building something great with you!
  
  Warm regards,
  
  Marvin
  
  -----------------------------------------------------------------------------------------------------------------
  Troopers Web Services
  📞 ${contact.phone}
  ✉️ ${contact.email}
  `;
}

// Example Usage
const contract = generateClientContract({
    clientName: "Chituntu",
    serviceType: "Business Website",
    paymentParts: 3,
    deliveryTime: "2 weeks",
    contact: {
        phone: "+260 975 199 357",
        email: "troopers.directorate@gmail.com"
    }
});

console.log(contract);