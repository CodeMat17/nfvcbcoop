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
// import {createClient} from '@supabase/supabase-js'
import dayjs from "dayjs";
import { CalendarRangeIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

//  const supabase = createClient(
//    process.env.SUPABASE_URL!,
//    process.env.SUPABASE_ANON_KEY!
//  );

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
  const [repay_date, setRepayDate] = useState(null);
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
        setRepayDate(data.repay_date);
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
      <div className='w-full min-h-full max-w-5xl mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
        <div className='pt-8 pb-24 px-6 md:px-8'>
          <div className='flex flex-col justify-center text-center space-y-3'>
            <p className='text-xl sm:text-2xl text-gray-600 dark:text-gray-300'>
              Welcome
            </p>
            <h1 className='text-center text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'>
              {name}
            </h1>
            <div className='mt-2 flex justify-center items-center gap-4 text-gray-500'>
              <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full'>
                <CalendarRangeIcon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                <span className='text-sm font-medium'>
                  Joined {date_joined}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-12 mt-12'>
            <div className='flex-1 flex flex-col gap-12'>
              <div className='transform transition-all hover:scale-[1.02]'>
                <p className='text-2xl sm:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
                  Total Contributions
                </p>
                <div className='relative overflow-hidden shadow-xl dark:shadow-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700'>
                  <AnimatedCounterForTotalContri
                    value={total_contributions}
                    duratn={3}
                  />
                  <p className='absolute top-6 left-6 text-xl text-green-600 dark:text-green-400 font-bold'>
                    ₦
                  </p>
                  <div className='absolute top-2  right-2'>
                    <span className='relative flex h-4 w-4'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                  </div>
                  <p className='mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium'>
                    Last updated: {latest_update}
                  </p>
                </div>
              </div>

              <div className='relative transform transition-all hover:scale-[1.02]'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700'>
                  <AnimatedCounter
                    value={monthly_contribution}
                    style='text-2xl sm:text-4xl font-bold ml-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'
                    duratn={2}
                  />
                  <p className='absolute top-8 left-8 text-xl text-green-600 dark:text-green-400 font-bold'>
                    ₦
                  </p>
                  <p className='mt-3 text-gray-500 dark:text-gray-400 font-medium'>
                    Monthly Contribution
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Status Section */}
            <div className='flex-1'>
              {loan_status === "free" && (
                <div className='transform transition-all hover:scale-[1.02] bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700'>
                  <div className='flex flex-col gap-6 text-center'>
                    <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>
                      Need a Soft Loan?
                    </h2>
                    <LoanDialog code={code} reload={getRecords} />
                    <div className='prose prose-sm dark:prose-invert'>
                      <p className='text-gray-600 dark:text-gray-300'>
                        You are qualified to apply for a soft-loan between
                        ₦10,000 and ₦150,000. Approval is subject to
                        administrative review.
                      </p>
                      <div className='mt-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl'>
                        <h3 className='text-lg font-semibold text-red-600 dark:text-red-400 mb-3'>
                          Terms & Conditions
                        </h3>
                        <ul className='space-y-3 text-left text-gray-600 dark:text-gray-300'>
                          <li>• 5% interest rate on the principal amount</li>
                          <li>• 6-month repayment period from approval date</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loan_status === "processing" && (
                <div className='transform transition-all hover:scale-[1.02] bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-amber-200 dark:border-gray-700'>
                  <div className='flex flex-col gap-6 text-center'>
                    <div className='flex items-center justify-center gap-3'>
                      <p className='text-xl font-semibold text-amber-800 dark:text-amber-400'>
                        Processing Your Request
                      </p>
                    </div>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Your loan application of ₦{loan_amount} is currently under
                      review. We&apos;ll notify you once a decision has been
                      made.
                    </p>
                  </div>
                </div>
              )}

              {loan_status === "approved" && (
                <div className='transform transition-all hover:scale-[1.02] bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-green-200 dark:border-gray-700'>
                  <div className='flex flex-col justify-center items-center gap-6'>
                    <p className='text-xl font-semibold text-center text-green-600 dark:text-green-400'>
                      Loan Approved!
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Congratulations! Your soft-loan has been approved. Please
                      note the repayment deadline:
                      <span className='block mt-2 font-semibold text-red-600 dark:text-red-400'>
                        {dayjs(repay_date).format("MMMM DD, YYYY")}
                      </span>
                    </p>
                    <div className='mt-4 bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-white space-y-3'>
                      <p className='text-green-400 font-semibold mb-4'>
                        Repayment Account Details
                      </p>
                      <div className='space-y-2 text-gray-200'>
                        <p>NFVCB STAFF CO SOC LTD</p>
                        <p>Zenith Bank</p>
                        <p className='font-mono'>1229203111</p>
                      </div>
                      <p className='text-sm text-amber-400 mt-4 italic'>
                        Remember to include the 5% interest in your repayment
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 pt-20 pb-32 flex flex-col justify-center'>
      <div className='flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto'>
        <div className='flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg'>
          <Image
            priority
            alt='logo'
            src='/coop-logo.webp'
            width={100}
            height={100}
            className='w-[100px] aspect-square rounded-lg'
          />
        </div>
        <h1 className='text-3xl sm:text-5xl md:text-6xl text-center font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'>
          NFVCB Multipurpose Cooperative Society Ltd.
        </h1>
      </div>

      <div className='mt-16 flex flex-col justify-center items-center w-full max-w-sm mx-auto'>
        <div className='w-full bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700'>
          <InputOTP
            type='text'
            maxLength={6}
            pattern={regexPattern}
            value={value}
            onChange={(value: string) => setValue(value)}
            className='flex justify-center w-full'>
            <InputOTPGroup className='flex justify-between w-full gap-2 sm:gap-3'>
              <InputOTPSlot
                index={0}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
              <InputOTPSlot
                index={1}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
              <InputOTPSlot
                index={2}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
              <InputOTPSlot
                index={3}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
              <InputOTPSlot
                index={4}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
              <InputOTPSlot
                index={5}
                className='w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-lg sm:text-xl transition-all focus:border-blue-500 dark:focus:border-blue-400'
              />
            </InputOTPGroup>
          </InputOTP>

          <div className='mt-6 text-center text-gray-600 dark:text-gray-300'>
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <LoaderIcon className='animate-spin text-blue-600 dark:text-blue-400 w-5 h-5' />
                <span>Verifying...</span>
              </div>
            ) : (
              <p>Enter your 6-digit passcode to access your account</p>
            )}
          </div>
          {wrongCode && (
            <p className='mt-4 text-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg'>
              Invalid passcode. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
