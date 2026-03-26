import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

const Signup = () => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex lg:w-1/2 surface-sunken items-center justify-center p-12">
      <div className="max-w-md">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-8">
          <CheckCircle2 className="h-7 w-7 text-primary" />
          Approvr
        </Link>
        <h2 className="text-2xl font-bold mb-3">Join the Founder Beta</h2>
        <p className="text-muted-foreground leading-relaxed">
          Get early access, help shape the product, and lock in founding-member pricing when we launch.
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">No credit card required</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Alex Rivera" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="alex@agency.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace">Workspace name</Label>
            <Input id="workspace" placeholder="Rivera Design Co" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Link to="/dashboard">
            <Button className="w-full">Create workspace</Button>
          </Link>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Signup;
