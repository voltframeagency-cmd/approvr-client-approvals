import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

const Login = () => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex lg:w-1/2 surface-sunken items-center justify-center p-12">
      <div className="max-w-md">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-8">
          <CheckCircle2 className="h-7 w-7 text-primary" />
          Approvr
        </Link>
        <h2 className="text-2xl font-bold mb-3">Approvals, simplified.</h2>
        <p className="text-muted-foreground leading-relaxed">
          One portal for deliverable reviews, client feedback, and signoff. No more digging through email.
        </p>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-4">
          <CheckCircle2 className="h-7 w-7 text-primary" />
          Approvr
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@agency.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Link to="/dashboard">
            <Button className="w-full">Sign in</Button>
          </Link>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">Start free trial</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Login;
