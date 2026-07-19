'use client';

import { useState } from 'react';

type Step = 'phone' | 'verify';

export function PhoneEditForm() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length >= 10) setStep('verify');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 인증 처리
  }

  return (
    <form
      onSubmit={step === 'phone' ? handleSendCode : handleSubmit}
      className="flex flex-1 flex-col px-5.5 pt-7"
    >
      <div className="flex flex-1 flex-col gap-5">
        {/* 전화번호 입력 */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-ink-700 text-sm font-semibold">
            휴대폰 번호
          </label>
          <div className="flex gap-2">
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={step === 'verify'}
              className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary flex-1 rounded-md border px-3.5 py-3 text-sm transition focus-visible:ring-1 focus-visible:outline-none disabled:opacity-50"
            />
            <button
              type={step === 'phone' ? 'submit' : 'button'}
              onClick={step === 'verify' ? () => setStep('phone') : undefined}
              className="border-line text-primary focus-visible:ring-primary hover:bg-secondary shrink-0 rounded-md border px-3.5 py-3 text-sm font-semibold transition-colors focus-visible:ring-1 focus-visible:outline-none"
            >
              {step === 'verify' ? '재전송' : '인증번호 받기'}
            </button>
          </div>
        </div>

        {/* 인증번호 입력 */}
        {step === 'verify' && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="code" className="text-ink-700 text-sm font-semibold">
              인증번호
            </label>
            <input
              id="code"
              type="tel"
              inputMode="numeric"
              placeholder="인증번호 6자리"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary rounded-md border px-3.5 py-3 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="submit"
          disabled={step === 'phone' ? phone.length < 10 : code.length < 6}
          className="bg-primary text-primary-foreground shadow-fab focus-visible:ring-primary h-14 w-full rounded-2xl text-base font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
        >
          수정
        </button>
      </div>
    </form>
  );
}
