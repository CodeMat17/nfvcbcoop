"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/utils/supabase/client";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UserRecord = ({ data }: any) => {
  const supabase = createClient();

  // const [value, setValue] = useState<string>("");
  const regexPattern = "^[a-zA-Z0-9]*$";

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  const [value, setValue] = useState<string>("");
  const [records, setRecords] = useState(null);

  console.log("clg data:", data);

  return (
    <div className='w-full px-4 min-h-screen flex flex-col items-center justify-center'>
      <div className='mb-8'>
        {data &&
          data.map((record: any) => (
            <div key={record.id}>
              {record.code === value && (
                <>
                  <p>{record.name}</p>
                  <p>{record.phone}</p>
                  <p>{record.code}</p>
                </>
              )}
            </div>
          ))}
      </div>{" "}
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex-shrink-0 flex items-center justify-center'>
          <Image
            priority
            alt='logo'
            src='/coop-logo.webp'
            width={100}
            height={100}
            className='w-[100px] aspect-square'
          />
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-center max-w-xl'>
          NFVCB Multipurpose Cooperative Society Ltd.
        </h1>
      </div>
      <div className='mt-28 flex flex-col justify-center items-center'>
        <InputOTP
          maxLength={6}
          pattern={regexPattern}
          value={value}
          onChange={(value: string) => setValue(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className='sm:p-6' />
            <InputOTPSlot index={1} className='sm:p-6' />
            <InputOTPSlot index={2} className='sm:p-6' />
            <InputOTPSlot index={3} className='sm:p-6' />
            <InputOTPSlot index={4} className='sm:p-6' />
            <InputOTPSlot index={5} className='sm:p-6' />
          </InputOTPGroup>
        </InputOTP>

        {loading && <LoaderIcon className='animate-spin mt-4' />}

        <Button
          className='mt-2 disabled:cursor-not-allowed'
          //   onClick={getRecords}
          disabled={value.length < 6 || loading}>
          {loading ? <LoaderIcon className='animate-spin' /> : "Enter passcode"}
        </Button>
      </div>
      <div className='mb-8'>
        {data &&
          data.map((record: any) => (
            <div key={record.id}>
              {record.code === "A7B2R9K5" && (
                <>
                  <p>{record.name}</p>
                  <p>{record.phone}</p>
                  <p>{record.code}</p>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserRecord;
