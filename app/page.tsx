"use client";

import AmountCounter from "@/components/AmountCounter";

import LoanDialog from "@/components/LoanDialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import {
  CalendarRangeIcon,
  LoaderCircleIcon,
  LoaderIcon,
  MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const supabase = createClient();
  const router = useRouter();
  const regexPattern = "^[a-zA-Z0-9]*$";

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [code, setCode] = useState(null);
  const [total_contributions, setTotalContributions] = useState(0);

  const [monthly_contribution, setMonthlyContribution] = useState(0);
  const [loan_status, setLoanStatus] = useState(null);
  const [approved_by, setApprovedBy] = useState(null);
  const [cleared_by, setClearedBy] = useState(null);
  const [ippis_no, setIppisNo] = useState(null);
  const [date_joined, setDateJoined] = useState(null);
  const [location, setLocation] = useState(null);
  const [latest_update, setLatestUpdate] = useState(null);
  const [loan_amount, setLoanAmount] = useState(null);

  const [wrongCode, setWrongCode] = useState(false);

  const getRecords = useCallback(async () => {
    try {
      setLoading(true);
      setWrongCode(false);

      const { data, error, status } = await supabase
        .from("records")
        .select(
          "id, name, phone, code, total_contributions,monthly_contribution, loan_status, approved_by, cleared_by, ippis_no, date_joined, location, latest_update,loan_amount"
        )
        .eq("code", value)
        .single();

      if (error && status !== 406) {
        setWrongCode(true);
        // throw error;
      }

      if (!data) {
        setWrongCode(true);
      }

      if (data) {
        // setCode(data);
        setName(data.name);
        setPhone(data.phone);
        setCode(data.code);
        setTotalContributions(data.total_contributions);
        setMonthlyContribution(data.monthly_contribution);
        setLoanStatus(data.loan_status);
        setApprovedBy(data.approved_by);
        setClearedBy(data.cleared_by);
        setIppisNo(data.ippis_no);
        setDateJoined(data.date_joined);
        setLocation(data.location);
        setLatestUpdate(data.latest_update);
        setLoanAmount(data.loan_amount);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      // setName(null);
      // setPhone(null);
      // setCode(null);
      router.refresh();
      setLoading(false);
    }
  }, [value.length === 6, supabase]);

  useEffect(() => {
    if (value.length === 6) {
      getRecords();
    }
  }, [value.length === 6, getRecords]);

  if (name) {
    return (
      <div className='w-full min-h-full max-w-4xl mx-auto'>
        <div className='pt-2 pb-20 px-4'>
          <div className='flex flex-col justify-center text-center'>
            <p className='text-xl sm:text-2xl'>Welcome</p>
            <h1 className='text-center text-2xl sm:text-3xl md:text-5xl font-medium'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-green-600'>
                {name}
              </span>
            </h1>
            <div className='mt-1 flex justify-center items-center gap-4 text-sm text-gray-500'>
              <div className='flex items-center gap-1'>
                <MapPinIcon className='text-pink-600 w-5 h-5' /> {location}
              </div>
              <div className='flex items-center gap-1'>
                <CalendarRangeIcon className='text-purple-500 w-5 h-5' />
                Joined {dayjs(date_joined).format("MMM DD, YYYY")}
              </div>
            </div>
          </div>

          <div className='mt-12 sm:mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-12'>
            <div>
              <p className='text-3xl sm:text-4xl  mb-3 sm:mb-5'>
                Total Contributions
              </p>
              <div className='relative shadow-lg dark:shadow-md shadow-gray-400 dark:shadow-gray-500 bg-gradient-to-tr from-amber-300 dark:from-slate-900 to-green-200 p-7 rounded-xl'>
                {/* {total_contributions} */}

                <AmountCounter
                  value={total_contributions}
                  style='text-3xl sm:text-4xl md:text-6xl font-bold ml-3'
                  duratn={1000000}
                />

                <p className='absolute top-4 left-4 text-green- text-lg font-semibold'>
                  ₦
                </p>
                <div className='absolute -top-2 -right-2'>
                  <span className='relative flex h-7 w-7 justify-center items-center'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-5 w-5 bg-green-500'></span>
                  </span>
                </div>

                <p className='ml-3 mt-2 text-gray-500 font-light'>
                  as at {dayjs(latest_update).format("MMM, YYYY")}
                </p>
              </div>
            </div>

            <div className='relative'>
              <AmountCounter
                value={monthly_contribution}
                style='text-xl sm:text-3xl font-bold ml-5'
                duratn={100000}
              />
              <p className='absolute -top-2 left-0'>₦</p>

              <p className='ml-5 mt-2 text-gray-500  font-light'>
                Monthly contribution
              </p>
            </div>
          </div>

          {/* loan status */}

          {/* loan free */}
          {loan_status === "free" && (
            <div
              className={`flex flex-col items-center justify-center py-20 px-5 mt-12  bg-gray-100 dark:bg-gray-800 rounded-xl`}>
              <div className='flex flex-col gap-4 max-w-sm mx-auto text-center'>
                <p>You need a soft-loan?</p>
                {/* <Button>Apply</Button> */}
                <LoanDialog code={code} reload={getRecords} />
                <p className='mt-4 '>
                  You are qualified to apply for a soft-loan of not more than
                  ₦50,000. But note that the Admin reserves the right to approve
                  or not approve a soft-loan considering some situations.
                </p>
                <h1 className='text-red-600 text-lg'>T&C</h1>
                <ul className='text-left space-y-2 text-red-600'>
                  <li>
                    5% of loan amount will be deducted from source as
                    commission.
                  </li>
                  <li>
                    Loan payback duration is 3 mount starting from the date of
                    approval.
                  </li>
                  <li>
                    Defaulters will have the loan amount taken from their salary
                    of the subsequent month.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* loan processing */}
          {loan_status === "processing" && (
            <div
              className={`flex flex-col items-center justify-center py-20 px-5 mt-12  bg-amber-100 dark:bg-slate-800 rounded-xl`}>
              <div className='flex flex-col gap-4 max-w-sm mx-auto text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <p className='text-lg'>Processing</p>
                  <LoaderCircleIcon className='animate-spin text-amber-600' />
                </div>
                <p className='mt-2'>
                  Your loan application of N{loan_amount} is currently being
                  processed. Hang-on.
                </p>
              </div>
            </div>
          )}

          {/* loan approved */}
          {loan_status === "approved" && (
            <div
              className={`flex flex-col items-center justify-center py-20 px-5 mt-12  bg-green-100 dark:bg-slate-800 rounded-xl`}>
              <div className='flex flex-col gap-4 max-w-sm mx-auto text-center'>
                <p className='text-lg text-green-600'>Approved!</p>

                <p className='mt-2'>
                  Congratulations. Your soft-loan has been approved. You are
                  expected to repay on or before Jun 13, 2024. Note that you
                  will be penalized if you default.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-4 pt-20 pb-32 flex flex-col items-center justify-center'>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <UserRecord data={data} /> */}

      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex-shrink-0 flex items-center justify-center'>
          <Image
            priority
            alt='logo'
            src='/coop-logo.webp'
            width={80}
            height={80}
            className='w-[80px] aspect-square rounded-sm'
          />
        </div>
        <h1 className='text-2xl sm:text-4xl md:text-5xl text-center max-w-xl'>
          NFVCB Multipurpose Cooperative Society Ltd.
        </h1>
      </div>

      <div className='mt-12 flex flex-col justify-center items-center'>
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

        <div className='mt-2'>
          {loading ? <LoaderIcon className='animate-spin' /> : "Enter passcode"}
        </div>
        {wrongCode && (
          <p className='text-center text-sm text-red-600'>
            Wrong passcode or something else went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
