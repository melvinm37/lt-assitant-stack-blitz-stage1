import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register({ email, password, name });
      toast({
        title: 'Success',
        description: 'Registration successful',
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to register',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-light to-forest-dark flex items-center justify-center p-4">
      <div className="bg-almond/90 p-8 rounded-lg shadow-2xl w-full max-w-[500px]">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center text-forest-dark">Create Account</h2>
            <p className="text-center text-forest-dark/80">Please fill in your details</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-forest-dark">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-forest/20 focus:border-forest"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-forest-dark">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-forest/20 focus:border-forest"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-forest-dark">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-forest/20 focus:border-forest"
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-forest hover:bg-forest-dark text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-forest hover:text-forest-dark"
            >
              Already have an account? Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}