import { useState } from 'react';
import { Navbar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: 'Please complete required fields', description: 'Name, email and message are required.' });
      return;
    }

    setLoading(true);

    try {
      // Simulate a send action. Replace this with a real API call if available.
      await new Promise((res) => setTimeout(res, 900));

      // Log form to console (for developer) and show success toast
      console.info('Contact form submission:', { name, email, company, subject, message });
      toast({ title: 'Message sent', description: 'Thanks — we will review your message and get back to you shortly.' });

      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Contact form error', err);
      toast({ title: 'Error', description: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact CTEX</h1>
            <p className="text-lg text-muted-foreground mb-8">Tell us about your project and how we can help. We'll get back to you within 1–2 business days.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full name *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email address *</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief subject" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your project, goals, timeline, and budget (if known)." />
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
