import { RegistrationData } from "@/types/Model.Universities";
import Button from "../ui/Button";
import Link from "next/link";

interface ConfirmationProps {
  data: RegistrationData;
}

export default function Confirmation({ data }: ConfirmationProps) {
  console.log(data);
  return (
    <div className="space-y-6 text-center">
      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
        <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-xl font-semibold">Registration Successful!</h2>
      </div>

      <div className="space-y-4 text-left max-w-md mx-auto">
        <div>
          <h3 className="font-medium">Confirmation Number</h3>
          <p className="font-mono bg-gray-100 p-2 rounded">REG-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        </div>

        <div>
          <h3 className="font-medium">Next Steps</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You will receive a confirmation email shortly</li>
            <li>Payment instructions will be sent within 24 hours</li>
            <li>Contact the international office if you have questions</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <Link href="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
