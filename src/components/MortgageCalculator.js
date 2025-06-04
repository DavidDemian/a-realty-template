import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * InputField Component
 * Reusable form input field with label and validation
 */
const InputField = memo(({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  prefix, 
  suffix,
  min,
  error,
  required = false
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-accent-dark">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          required={required}
          className={`
            w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} 
            py-2 ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-7' : 'pr-3'}
            focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent
            transition-all duration-300
          `}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{suffix}</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

/**
 * MortgageCalculator Component
 * A reusable mortgage calculator that computes monthly payments based on user inputs
 */
const MortgageCalculator = ({ 
  defaultHomePrice = 300000,
  defaultDownPayment = 60000,
  defaultInterestRate = 4.5,
  defaultLoanTerm = 30,
  className = '',
  showTotalInterest = false,
  animateResult = true
}) => {
  // Form state
  const [homePrice, setHomePrice] = useState(defaultHomePrice);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [loanTerm, setLoanTerm] = useState(defaultLoanTerm);
  
  // Results state
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleInputChange = (e, setter) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setter(value);
  };
  
  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    
    if (!homePrice || homePrice <= 0) {
      newErrors.homePrice = 'Home price must be greater than 0';
    }
    
    if (!downPayment && downPayment !== 0) {
      newErrors.downPayment = 'Down payment is required';
    } else if (downPayment < 0) {
      newErrors.downPayment = 'Down payment cannot be negative';
    } else if (downPayment >= homePrice) {
      newErrors.downPayment = 'Down payment must be less than home price';
    }
    
    if (!interestRate || interestRate <= 0) {
      newErrors.interestRate = 'Interest rate must be greater than 0';
    } else if (interestRate > 20) {
      newErrors.interestRate = 'Interest rate seems too high';
    }
    
    if (!loanTerm || loanTerm <= 0) {
      newErrors.loanTerm = 'Loan term must be greater than 0';
    } else if (loanTerm > 50) {
      newErrors.loanTerm = 'Loan term seems too long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Calculate mortgage payment
  const calculateMortgage = () => {
    if (!validateInputs()) return;
    
    // Calculate loan amount
    const loanAmount = homePrice - downPayment;
    
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // Convert loan term to months
    const loanTermMonths = loanTerm * 12;
    
    // Calculate monthly payment using the mortgage formula
    // M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
    // Where:
    // M = monthly payment
    // P = principal (loan amount)
    // r = monthly interest rate (in decimal form)
    // n = number of payments (loan term in months)
    
    if (monthlyInterestRate === 0) {
      // If interest rate is 0, simple division
      const calculatedMonthlyPayment = loanAmount / loanTermMonths;
      setMonthlyPayment(calculatedMonthlyPayment);
      setTotalInterest(0);
    } else {
      const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
      const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
      const calculatedMonthlyPayment = loanAmount * (numerator / denominator);
      
      // Calculate total interest paid over the life of the loan
      const totalPayments = calculatedMonthlyPayment * loanTermMonths;
      const calculatedTotalInterest = totalPayments - loanAmount;
      
      setMonthlyPayment(calculatedMonthlyPayment);
      setTotalInterest(calculatedTotalInterest);
    }
    
    // Show result with animation if enabled
    if (animateResult) {
      setShowResult(false);
      setTimeout(() => setShowResult(true), 100);
    } else {
      setShowResult(true);
    }
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Mortgage Calculator</h3>
      
      <div className="space-y-4">
        <InputField
          label="Home Price"
          type="number"
          name="homePrice"
          value={homePrice}
          onChange={(e) => handleInputChange(e, setHomePrice)}
          placeholder="300,000"
          prefix="$"
          min="0"
          error={errors.homePrice}
          required
        />
        
        <InputField
          label="Down Payment"
          type="number"
          name="downPayment"
          value={downPayment}
          onChange={(e) => handleInputChange(e, setDownPayment)}
          placeholder="60,000"
          prefix="$"
          min="0"
          error={errors.downPayment}
          required
        />
        
        <InputField
          label="Interest Rate"
          type="number"
          name="interestRate"
          value={interestRate}
          onChange={(e) => handleInputChange(e, setInterestRate)}
          placeholder="4.5"
          suffix="%"
          min="0"
          step="0.01"
          error={errors.interestRate}
          required
        />
        
        <InputField
          label="Loan Term"
          type="number"
          name="loanTerm"
          value={loanTerm}
          onChange={(e) => handleInputChange(e, setLoanTerm)}
          placeholder="30"
          suffix="Years"
          min="1"
          error={errors.loanTerm}
          required
        />
        
        <button
          onClick={calculateMortgage}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Calculate mortgage payment"
        >
          Calculate
        </button>
      </div>
      
      {showResult && monthlyPayment !== null && (
        <div className={`mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 ${animateResult ? 'animate-fade-in' : ''}`}>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Estimated Monthly Payment</h4>
          <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
          
          {showTotalInterest && totalInterest !== null && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Total Interest Paid:</p>
              <p className="text-lg font-semibold text-accent">{formatCurrency(totalInterest)}</p>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            This is an estimate. Actual payment may vary based on taxes, insurance, and other factors.
          </p>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
MortgageCalculator.propTypes = {
  defaultHomePrice: PropTypes.number,
  defaultDownPayment: PropTypes.number,
  defaultInterestRate: PropTypes.number,
  defaultLoanTerm: PropTypes.number,
  className: PropTypes.string,
  showTotalInterest: PropTypes.bool,
  animateResult: PropTypes.bool
};

// Display names for debugging
MortgageCalculator.displayName = 'MortgageCalculator';
InputField.displayName = 'InputField';

export default MortgageCalculator;
