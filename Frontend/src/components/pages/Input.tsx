interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  reference? : any
}

export function Input({ onChange, placeholder, value ,  reference}: InputProps) {
  return (
    <div className="mb-6">
      <input
        ref = {reference}
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/60 placeholder-gray-500 text-gray-800 shadow-sm transition duration-300"
        onChange={onChange}
      />
    </div>
  );
}