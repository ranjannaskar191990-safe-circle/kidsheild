'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserSignup() {
  const router = useRouter();
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      /* * ==========================================
       * CTO NOTICE: REAL SUPABASE AUTH WIRE-UP
       * ==========================================
       * When ready to connect the real database, uncomment the code below:
       * * import { createClient } from '@supabase/supabase-js';
       * const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
       * * const { data, error } = await supabase.auth.signUp({
       * email: email,
       * password: password,
       * options: {
       * data: { full_name: name }
       * }
       * });
       * * if (error) throw error;
       * ==========================================
       */

      // Simulated network delay for the prototype UI
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] font-sans flex justify-center items-center p-5 relative z-0">
      <div className="absolute inset-0 bg-black/50 -z-10 pointer-events-none"></div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-10 relative z-10 text-white my-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white shadow-sm">Create Account</h1>
          <p className="text-indigo-300 text-sm font-semibold tracking-wide uppercase">
            Join the KidShield Network
          </p>
        </div>

        {error && (
          <div className="bg-red-500/15 border-l-4 border-red-500 text-red-300 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/15 border-l-4 border-green-500 text-green-300 p-3 rounded-lg mb-6 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-white/90 font-semibold mb-2 text-sm">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name" 
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:shadow-[0_0_10px_rgba(118,75,162,0.3)] transition-all"
            />
          </div>

          <div>
            <label className="block text-white/90 font-semibold mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:shadow-[0_0_10px_rgba(118,75,162,0.3)] transition-all"
            />
          </div>

          <div>
            <label className="block text-white/90 font-semibold mb-2 text-sm">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password" 
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:shadow-[0_0_10px_rgba(118,75,162,0.3)] transition-all"
            />
          </div>

          <div>
            <label className="block text-white/90 font-semibold mb-2 text-sm">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password" 
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:shadow-[0_0_10px_rgba(118,75,162,0.3)] transition-all"
            />
          </div>

          <div className="space-y-3 pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full p-3.5 bg-gradient-to-br from-[#764ba2] to-[#667eea] text-white rounded-lg text-base font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-purple-500/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <button 
              type="button"
              onClick={() => router.push('/')}
              className="w-full p-3 bg-transparent border-2 border-white/30 text-white rounded-lg text-base font-semibold hover:bg-white/10 hover:border-white transition-all"
            >
              Back to Home
            </button>
          </div>

          <div className="text-center mt-6 pt-5 border-t border-white/10">
            <p className="text-white/70 text-sm mb-2">Already have an account?</p>
            <button 
              type="button"
              onClick={() => router.push('/login')}
              className="text-indigo-300 font-semibold hover:text-white hover:underline transition-colors"
            >
              Login Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}