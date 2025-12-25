import { CreditCard, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { creditPackages } from '@/data/resourcesData';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

export function CreditsSection() {
  const handlePurchase = (credits: number, price: number) => {
    toast.success(`Proceeding to checkout for ${credits} credit(s) at $${price}`);
  };

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Buy Credits</h2>
          <p className="text-sm text-muted-foreground">Use credits to chat with mentors</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 shadow-soft mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="font-semibold text-base">How Credits Work</span>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>1 credit = 1 mentor chat session (30 mins)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Credits never expire</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Chat with any mentor from any university</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        {creditPackages.map((pkg, index) => (
          <div 
            key={pkg.id}
            className={cn(
              "bg-card rounded-2xl p-4 shadow-soft animate-slide-up relative overflow-hidden",
              pkg.popular && "ring-2 ring-primary"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                Popular
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-2xl">
                  {pkg.credits} {pkg.credits === 1 ? 'Credit' : 'Credits'}
                </h3>
                <p className="text-lg font-semibold text-primary mt-1">
                  ${pkg.price} {pkg.currency}
                </p>
                {pkg.credits > 1 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ${(pkg.price / pkg.credits).toFixed(2)} per credit
                  </p>
                )}
              </div>
              
              <Button 
                onClick={() => handlePurchase(pkg.credits, pkg.price)}
                size="lg"
                className={cn(
                  "h-12 px-6",
                  pkg.popular ? "bg-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Secure payment powered by Stripe. Refunds available within 7 days.
      </p>
    </div>
  );
}
