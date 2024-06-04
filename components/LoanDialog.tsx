"use client";

import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const revalidate = 0;

const LoanDialog = ({
  code,
  reload,
}: {
  code: string | null;
  reload: () => void;
}) => {
  const supabase = createClient();
  const router = useRouter();

  // const {user} = await

  const regexPattern = "^[a-zA-Z0-9]*$";

  const [loading, setLoading] = useState(false);
  let [amount, setAmount] = useState("");
  const intAmount = parseInt(amount);
  const [loanCode, setLoanCode] = useState(code);

  const [passcode, setPasscode] = useState<string>("");
  const [wrongPasscode, setWrongPasscode] = useState(false);
  const currentDateISO = new Date().toISOString();

  const loanApplication = async () => {
    setWrongPasscode(false);
    if (loanCode != passcode) {
      setWrongPasscode(true);
    }
    console.log("loanCode: ", loanCode);
    if (loanCode === passcode) {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("records")
          .update({
            loan_status: "processing",
            loan_amount: intAmount,
            applied_on: currentDateISO,
          })
          .eq("code", loanCode)
          .select();

        if (error) {
          console.error("Error updating row:", error.message);
        }

        if (!error) {
          toast("Hurray!, Loan request submitted successfully!.");
          reload();
          // router.refresh();
        }
      } catch (error) {
        console.log("Error Msg: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='px-4 w-full'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='text-lg px-10 py-4'>
            Apply
          </Button>
        </DialogTrigger>
        <DialogContent className='w-full sm:max-w-xl rounded-xl p-10'>
          <DialogHeader className='mb-2'>
            <DialogTitle>Soft-loan Application Form</DialogTitle>
          </DialogHeader>
          {/* Amount and pasccode selector */}
          <div className='flex flex-col items-center justify-center gap-4'>
            {wrongPasscode && (
              <div className='bg-red-100 text-red-600 py-4 w-full text-center rounded-xl'>
                Wrong passcode
              </div>
            )}
            <Select value={amount} onValueChange={(value) => setAmount(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select loan amount' />
              </SelectTrigger>
              <SelectContent className="overflow-scroll pb-20 mb-8">
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value='10000'>₦10,000</SelectItem>
                  <SelectItem value='20000'>₦20,000</SelectItem>
                  <SelectItem value='30000'>₦30,000</SelectItem>
                  <SelectItem value='40000'>₦40,000</SelectItem>
                  <SelectItem value='50000'>₦50,000</SelectItem>
                  <SelectItem value='60000'>₦60,000</SelectItem>
                  <SelectItem value='70000'>₦70,000</SelectItem>
                  <SelectItem value='80000'>₦80,000</SelectItem>
                  <SelectItem value='90000'>₦90,000</SelectItem>
                  <SelectItem value='100000'>₦100,000</SelectItem>
                  <SelectItem value='110000'>₦110,000</SelectItem>
                  <SelectItem value='120000'>₦120,000</SelectItem>
                  <SelectItem value='130000'>₦130,000</SelectItem>
                  <SelectItem value='140000'>₦140,000</SelectItem>
                  <SelectItem value='150000'>₦150,000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div>
              <InputOTP
                maxLength={6}
                pattern={regexPattern}
                value={passcode}
                onChange={(passcode: string) => setPasscode(passcode)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className=' border-gray-500' />
                  <InputOTPSlot index={1} className=' border-gray-500' />
                  <InputOTPSlot index={2} className=' border-gray-500' />
                  <InputOTPSlot index={3} className=' border-gray-500' />
                  <InputOTPSlot index={4} className=' border-gray-500' />
                  <InputOTPSlot index={5} className=' border-gray-500' />
                </InputOTPGroup>
              </InputOTP>
              <p className='text-sm text-center text-gray-500'>
                Enter your passcode
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={loading} onClick={loanApplication}>
              {loading ? <LoaderIcon className='animate-spin' /> : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanDialog;
