/** Future value of monthly SIP (payment at period start). */
export function sipFutureValue(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number,
): { futureValue: number; totalInvested: number; wealthGained: number } {
  const months = years * 12;
  const monthlyRate = annualReturnPercent / 100 / 12;
  const totalInvested = monthlyInvestment * months;

  if (months === 0) {
    return { futureValue: 0, totalInvested: 0, wealthGained: 0 };
  }

  let futureValue: number;
  if (monthlyRate === 0) {
    futureValue = totalInvested;
  } else {
    const growth = Math.pow(1 + monthlyRate, months);
    futureValue = monthlyInvestment * ((growth - 1) / monthlyRate) * (1 + monthlyRate);
  }

  return {
    futureValue,
    totalInvested,
    wealthGained: futureValue - totalInvested,
  };
}

export type SipYearPoint = {
  year: number;
  invested: number;
  maturityValue: number;
  wealthGained: number;
};

/** Year-by-year SIP projection for charts and tables. */
export function sipProjectionByYear(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number,
): SipYearPoint[] {
  const totalYears = Math.min(Math.max(Math.floor(years), 1), 50);
  return Array.from({ length: totalYears }, (_, index) => {
    const year = index + 1;
    const snapshot = sipFutureValue(monthlyInvestment, annualReturnPercent, year);
    return {
      year,
      invested: snapshot.totalInvested,
      maturityValue: snapshot.futureValue,
      wealthGained: snapshot.wealthGained,
    };
  });
}

/** Compound annual growth rate (decimal, e.g. 0.12 = 12%). */
export function calculateCagr(
  beginningValue: number,
  endingValue: number,
  years: number,
): number | null {
  if (beginningValue <= 0 || endingValue <= 0 || years <= 0) return null;
  return Math.pow(endingValue / beginningValue, 1 / years) - 1;
}

export type CagrYearPoint = { year: number; value: number };

export type CagrAnalysis = {
  cagr: number;
  absoluteGain: number;
  totalReturnPercent: number;
  curve: CagrYearPoint[];
};

/** Full CAGR analysis with year-by-year compound growth curve for charts. */
export function analyzeCagr(
  beginningValue: number,
  endingValue: number,
  years: number,
): CagrAnalysis | null {
  const cagr = calculateCagr(beginningValue, endingValue, years);
  if (cagr === null) return null;

  const totalYears = Math.min(Math.max(Math.floor(years), 1), 50);
  const curve: CagrYearPoint[] = Array.from({ length: totalYears + 1 }, (_, year) => ({
    year,
    value: beginningValue * Math.pow(1 + cagr, year),
  }));

  return {
    cagr,
    absoluteGain: endingValue - beginningValue,
    totalReturnPercent: ((endingValue - beginningValue) / beginningValue) * 100,
    curve,
  };
}

/** Future value of lumpsum investment. */
export function lumpsumFutureValue(
  principal: number,
  annualReturnPercent: number,
  years: number,
): { futureValue: number; profitEarned: number } {
  const rate = annualReturnPercent / 100;
  const futureValue = principal * Math.pow(1 + rate, years);
  return { futureValue, profitEarned: futureValue - principal };
}

export type LumpsumYearPoint = {
  year: number;
  futureValue: number;
  profitEarned: number;
};

/** Year-by-year lumpsum projection for charts and tables. */
export function lumpsumProjectionByYear(
  principal: number,
  annualReturnPercent: number,
  years: number,
): LumpsumYearPoint[] {
  const totalYears = Math.min(Math.max(Math.floor(years), 1), 50);
  const rate = annualReturnPercent / 100;
  return Array.from({ length: totalYears }, (_, index) => {
    const year = index + 1;
    const futureValue = principal * Math.pow(1 + rate, year);
    return {
      year,
      futureValue,
      profitEarned: futureValue - principal,
    };
  });
}

/** Loan EMI using standard amortization formula. */
export function calculateEmi(
  principal: number,
  annualInterestPercent: number,
  tenureMonths: number,
): {
  emi: number;
  totalPayment: number;
  totalInterest: number;
} | null {
  if (principal <= 0 || tenureMonths <= 0) return null;
  const monthlyRate = annualInterestPercent / 100 / 12;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * tenureMonths;
  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
  };
}

export type EmiAmortizationRow = {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
};

export type EmiYearPoint = {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
};

export type EmiAnalysis = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: EmiAmortizationRow[];
  yearly: EmiYearPoint[];
};

/** Full EMI analysis with monthly amortization and yearly breakdown for charts. */
export function analyzeEmi(
  principal: number,
  annualInterestPercent: number,
  tenureMonths: number,
): EmiAnalysis | null {
  const summary = calculateEmi(principal, annualInterestPercent, tenureMonths);
  if (!summary) return null;

  const months = Math.min(Math.max(Math.floor(tenureMonths), 1), 480);
  const monthlyRate = annualInterestPercent / 100 / 12;
  let balance = principal;
  const schedule: EmiAmortizationRow[] = [];

  for (let month = 1; month <= months; month++) {
    const interestPaid = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPaid = Math.min(summary.emi - interestPaid, balance);
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      emi: summary.emi,
      principalPaid,
      interestPaid,
      balance,
    });
  }

  const yearly: EmiYearPoint[] = [];
  for (let year = 1; year <= Math.ceil(months / 12); year++) {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = Math.min(year * 12, months);
    const slice = schedule.filter((row) => row.month >= startMonth && row.month <= endMonth);
    if (slice.length === 0) continue;
    yearly.push({
      year,
      principalPaid: slice.reduce((sum, row) => sum + row.principalPaid, 0),
      interestPaid: slice.reduce((sum, row) => sum + row.interestPaid, 0),
      endingBalance: slice[slice.length - 1].balance,
    });
  }

  return {
    ...summary,
    schedule,
    yearly,
  };
}

export type GstMode = 'add' | 'remove';

export function calculateGst(
  amount: number,
  gstRatePercent: number,
  mode: GstMode,
): {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
} {
  const rate = gstRatePercent / 100;

  if (mode === 'add') {
    const gstAmount = amount * rate;
    return {
      baseAmount: amount,
      gstAmount,
      totalAmount: amount + gstAmount,
    };
  }

  const baseAmount = amount / (1 + rate);
  const gstAmount = amount - baseAmount;
  return {
    baseAmount,
    gstAmount,
    totalAmount: amount,
  };
}

/** GST breakdown with mode-aware final amount label target. */
export function analyzeGst(amount: number, gstRatePercent: number, mode: GstMode) {
  const result = calculateGst(amount, gstRatePercent, mode);
  const finalAmount = mode === 'add' ? result.totalAmount : result.baseAmount;
  const gstShare = result.totalAmount > 0 ? result.gstAmount / result.totalAmount : 0;
  return { ...result, finalAmount, gstShare, mode };
}
