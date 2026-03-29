interface EligibilityBadgeProps {
  isEligible: boolean;
  size?: 'small' | 'large';
}

export default function EligibilityBadge({ isEligible, size = 'small' }: EligibilityBadgeProps) {
  if (size === 'small') {
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {isEligible ? '✓ Yes' : '✗ No'}
      </span>
    );
  }

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        isEligible ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
      }`}
    >
      <p className={`text-xl font-bold ${isEligible ? 'text-green-800' : 'text-red-800'}`}>
        {isEligible ? '✓ Eligible to Vote' : '✗ Not Eligible (Under 18)'}
      </p>
      <p className={`text-sm mt-2 ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
        {isEligible
          ? 'You are eligible to participate in the voter registration process.'
          : 'You must be 18 years or older to register as a voter.'}
      </p>
    </div>
  );
}
