"use client";

import AnimatedCounter from "@/components/AnimatedCounter";
import AnimatedCounterForTotalContri from "@/components/AnimatedCounterForTotalContri";

import LoanDialog from "@/components/LoanDialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { CalendarRangeIcon, LoaderCircleIcon, LoaderIcon } from "lucide-react";
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
  const [ repay_date, setRepayDate] = useState(null);
  const [loan_amount, setLoanAmount] = useState(null);

  const [wrongCode, setWrongCode] = useState(false);



  const getRecords = useCallback(async () => {
    try {
      setLoading(true);
      setWrongCode(false);

      const { data, error, status } = await supabase
        .from("records")
        .select(
          "id, name, phone, code, total_contributions,monthly_contribution, loan_status, approved_by, cleared_by, ippis_no, date_joined, location, latest_update,loan_amount, repay_date"
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
        setRepayDate(data.repay_date)
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
  }, [value, supabase, router]);

  useEffect(() => {
    if (value.length === 6) {
      getRecords();
    }
  }, [value, getRecords]);

  if (name) {
    return (
      <div className='w-full min-h-full max-w-4xl mx-auto'>
        <div className='pt-6 pb-20 px-4'>
          <div className='flex flex-col justify-center text-center'>
            <p className='text-xl sm:text-2xl'>Welcome</p>
            <h1 className='text-center text-2xl sm:text-3xl md:text-5xl font-semibold'>
              <span className=''>{name}</span>
            </h1>
            <div className='mt-1 flex justify-center items-center gap-4 text-gray-500'>
              {/* <div className='flex items-center gap-1'>
                <MapPinIcon className='text-pink-600 w-5 h-5' /> {location}
              </div> */}
              <div className='flex items-center gap-1'>
                <CalendarRangeIcon className='w-6 h-6' />
                Joined {date_joined}
              </div>
            </div>
          </div>

          <div className='mt-12 sm:mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-12'>
            <div>
              <p className='text-2xl sm:text-3xl  mb-3 sm:mb-5'>
                Total Contributions
              </p>
              <div className='relative shadow-lg dark:shadow-md shadow-gray-400 dark:shadow-gray-700 bg-white dark:bg-gray-800 p-7 rounded-xl'>
                {/* <AmountCounter
                  value={total_contributions}
                  style='text-4xl sm:text-5xl font-bold ml-3 text-slate-900'
                  duratn={3}
                /> */}

                <AnimatedCounterForTotalContri
                  value={total_contributions}
                  duratn={3}
                />

                <p className='absolute top-4 left-4 text-lg text-green-600 font-semibold'>
                  ₦
                </p>
                <div className='absolute -top-2 right-0'>
                  <span className='relative flex h-5 w-5 justify-center items-center'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                  </span>
                </div>

                <p className='ml-3 text-gray-500 font-light '>
                  as at {dayjs(latest_update).format("MMM, YYYY")}
                </p>
              </div>
            </div>

            <div className='relative'>
              <AnimatedCounter
                value={monthly_contribution}
                style='text-xl sm:text-3xl font-bold ml-5'
                duratn={2}
              />
              {/* 
              <AmountCounter
                value={monthly_contribution}
                style='text-xl sm:text-3xl font-bold ml-5'
                duratn={2}
              /> */}
              <p className='absolute -top-2 left-0'>₦</p>

              <p className='ml-5 text-gray-500  font-light'>
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
                  ₦150,000 and a min. of ₦10,000. Note that the Admin may
                  approve or not approve a soft-loan considering some
                  conditions.
                </p>
                <h1 className='text-red-600 text-lg'>T&C</h1>
                <ul className='text-center space-y-2 text-red-600'>
                  <li>
                    5% of loan amount will be deducted from source as
                    commission.
                  </li>
                  <li>
                    Loan payback duration is 6 mount starting from the date of
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
                  expected to repay on or before{" "}
                  <span className="font-semibold text-red-600">{dayjs(repay_date).format("MMM DD, YYYY")}</span>. Note that you will be penalized if you default.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full px-4 pt-20 pb-32 flex flex-col items-center justify-center'>
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

      <div className='mt-12 px-4 flex flex-col justify-center items-center'>
        <InputOTP
          type='text'
          maxLength={6}
          pattern={regexPattern}
          value={value}
          onChange={(value: string) => setValue(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className=' border-gray-600' />
            <InputOTPSlot index={1} className=' border-gray-600' />
            <InputOTPSlot index={2} className=' border-gray-600' />
            <InputOTPSlot index={3} className=' border-gray-600' />
            <InputOTPSlot index={4} className=' border-gray-600' />
            <InputOTPSlot index={5} className=' border-gray-600' />
          </InputOTPGroup>
        </InputOTP>

        <div className='mt-2'>
          {loading ? (
            <LoaderIcon className='animate-spin' />
          ) : (
            "Enter your passcode."
          )}
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
