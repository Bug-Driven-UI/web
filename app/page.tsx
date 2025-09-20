import {
  ArrowRight,
  Clock,
  Flame,
  MapPin,
  Pizza,
  Smartphone,
  Sparkles,
  Star,
  Truck
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/src/components/ui';

const highlights = [
  { label: 'Deliveries today', value: '3,245' },
  { label: 'Avg. delivery time', value: '23 min' },
  { label: 'City coverage', value: '25+ boroughs' }
];

const features = [
  {
    title: 'Lightning-fast delivery',
    description: 'Our riders race to your door with live tracking and updates.',
    Icon: Truck
  },
  {
    title: 'Wood-fired flavor',
    description: 'Hand-crafted dough, San Marzano sauce, and fresh toppings.',
    Icon: Flame
  },
  {
    title: 'Curated for every craving',
    description: 'Choose classics, seasonal collabs, or build your own masterpiece.',
    Icon: Sparkles
  }
];

const pizzas = [
  {
    name: 'Truffle Inferno',
    description: 'Black truffle cream, fire-roasted mushrooms, chili honey drizzle.',
    price: '$22',
    highlight: 'Most loved'
  },
  {
    name: 'Neon Napoli',
    description: 'Charred dough, buffalo mozzarella, sweet basil, heirloom tomatoes.',
    price: '$18',
    highlight: 'Chef special'
  },
  {
    name: 'Solar Garden',
    description: 'Roasted squash, pistachio pesto, whipped ricotta, lemon zest.',
    price: '$19',
    highlight: 'Veg-forward'
  }
];

const steps = [
  {
    title: 'Build your pie',
    description: 'Pick a signature pizza or create your own in under a minute.',
    Icon: Pizza
  },
  {
    title: 'Track every mile',
    description: 'Watch your pizza bake, box, and roll out with real-time updates.',
    Icon: Smartphone
  },
  {
    title: 'Meet your rider',
    description: 'Delivery pros hand you bubbling-hot pizza, always under 30 minutes.',
    Icon: MapPin
  }
];

const testimonials = [
  {
    quote: 'The only pizza that arrives hotter than my oven. The truffle crust is unreal.',
    name: 'Lena Ortiz',
    role: 'Late-night food critic'
  },
  {
    quote: 'From click to couch in 20 minutes. Their live tracker is dangerously addictive.',
    name: 'Marcus Reed',
    role: 'Product manager & pizza fiend'
  }
];

const HomePage = () => (
  <main className='text-foreground min-h-screen bg-gradient-to-b from-[#fff6f1] via-white to-white'>
    <header className='border-border relative isolate overflow-hidden border-b bg-white/80 pt-24 pb-16 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)] backdrop-blur'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-16 px-6'>
        <div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
          <div className='max-w-2xl space-y-6'>
            <span className='border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-medium'>
              <Clock className='size-4' />
              Piping hot in 30 minutes or it’s free
            </span>
            <h1 className='text-foreground text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl'>
              The future of pizza delivery is fast, fresh, and right on time.
            </h1>
            <p className='text-muted-foreground text-lg sm:text-xl'>
              NeonSlice brings chef-crafted pies from our wood-fired kitchens straight to your door.
              No soggy crusts, no guessing games—just premium pizza and real-time tracking.
            </p>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button className='px-8 py-3 text-base' size='lg'>
                Start an order
                <ArrowRight className='size-4' />
              </Button>
              <Button asChild className='px-8 py-3 text-base' variant='ghost'>
                <Link href='#menu'>Browse the menu</Link>
              </Button>
            </div>
          </div>
          <div className='border-border/70 grid gap-4 rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur md:w-80'>
            <div className='flex items-center gap-3'>
              <div className='bg-primary/15 text-primary rounded-full p-2'>
                <Truck className='size-5' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Active riders</p>
                <p className='text-2xl font-semibold'>126 in your area</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-primary/15 text-primary rounded-full p-2'>
                <Star className='size-5' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Community rating</p>
                <p className='text-2xl font-semibold'>4.9 / 5.0</p>
              </div>
            </div>
            <p className='bg-muted/80 text-muted-foreground rounded-xl p-4 text-sm'>
              “NeonSlice is the only place I trust for pizza night. Everything arrives blazing hot
              and perfectly crisp.”
            </p>
          </div>
        </div>
        <dl className='grid gap-6 sm:grid-cols-3'>
          {highlights.map(({ label, value }) => (
            <div
              key={label}
              className='border-border/70 rounded-2xl border bg-white/60 p-6 text-center shadow-sm backdrop-blur'
            >
              <dt className='text-muted-foreground text-sm uppercase'>{label}</dt>
              <dd className='mt-2 text-2xl font-semibold'>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className='pointer-events-none absolute inset-x-0 -bottom-24 flex justify-center blur-3xl'>
        <div className='from-primary/25 to-primary/25 h-48 w-3/4 max-w-4xl rounded-full bg-gradient-to-r via-orange-400/20' />
      </div>
    </header>

    <section className='mx-auto w-full max-w-6xl px-6 py-20' id='features'>
      <div className='grid gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center'>
        <div className='space-y-6'>
          <h2 className='text-foreground text-3xl font-semibold sm:text-4xl'>
            Why NeonSlice works for hungry cities
          </h2>
          <p className='text-muted-foreground text-lg'>
            We obsess over the handoff from oven to doorstep. From thermal-lined delivery bags to
            smart routing, every choice keeps your pizza at peak flavor.
          </p>
          <Button asChild className='px-0 text-base' variant='link'>
            <Link href='#steps' className='inline-flex items-center gap-2'>
              See how it works
              <ArrowRight className='size-4' />
            </Link>
          </Button>
        </div>
        <div className='grid gap-6 sm:grid-cols-2'>
          {features.map(({ title, description, Icon }) => (
            <article
              key={title}
              className='group border-border relative overflow-hidden rounded-2xl border bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
            >
              <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition group-hover:opacity-100' />
              <Icon className='text-primary relative size-10' />
              <h3 className='text-foreground relative mt-4 text-lg font-semibold'>{title}</h3>
              <p className='text-muted-foreground relative mt-2 text-sm'>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className='bg-white/80 py-20' id='menu'>
      <div className='mx-auto w-full max-w-6xl px-6'>
        <div className='flex flex-col gap-4 text-center'>
          <span className='border-border/60 bg-muted/70 text-muted-foreground mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide uppercase'>
            <Pizza className='size-4' />
            Signature pies
          </span>
          <h2 className='text-foreground text-3xl font-semibold sm:text-4xl'>
            Crafted daily by our oven masters
          </h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-base'>
            Every pizza is stretched to order, hit with just the right kiss of smoke, and sealed in
            a heat-lock box for the ride.
          </p>
        </div>
        <div className='mt-10 grid gap-6 md:grid-cols-3'>
          {pizzas.map(({ name, description, price, highlight }) => (
            <article
              key={name}
              className='border-border flex h-full flex-col justify-between rounded-2xl border bg-gradient-to-b from-white to-white/60 p-6 text-left shadow-sm'
            >
              <div className='space-y-4'>
                <div className='text-primary flex items-center justify-between text-xs font-medium tracking-wide uppercase'>
                  <span>{highlight}</span>
                  <span>{price}</span>
                </div>
                <h3 className='text-foreground text-xl font-semibold'>{name}</h3>
                <p className='text-muted-foreground text-sm'>{description}</p>
              </div>
              <Button className='mt-6 w-full justify-between text-sm' variant='secondary'>
                Add to order
                <ArrowRight className='size-4' />
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className='mx-auto w-full max-w-6xl px-6 py-20' id='steps'>
      <div className='grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center'>
        <div>
          <h2 className='text-foreground text-3xl font-semibold sm:text-4xl'>
            Pizza in three taps
          </h2>
          <p className='text-muted-foreground mt-4 text-base'>
            Our app keeps the entire journey transparent—from the moment dough spins in the air to
            the second your doorbell rings.
          </p>
          <div className='mt-8 space-y-6'>
            {steps.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                className='border-border/80 flex gap-4 rounded-2xl border bg-white/70 p-5 shadow-sm'
              >
                <div className='bg-primary/15 text-primary flex size-12 items-center justify-center rounded-xl'>
                  <Icon className='size-5' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-semibold tracking-wide uppercase'>
                    Step {index + 1}
                  </p>
                  <h3 className='text-foreground text-lg font-semibold'>{title}</h3>
                  <p className='text-muted-foreground text-sm'>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='border-primary/20 from-primary/10 rounded-3xl border bg-gradient-to-br via-orange-200/60 to-white p-8 shadow-lg'>
          <div className='text-primary flex items-center gap-3'>
            <Clock className='size-5' />
            <span className='text-sm font-medium tracking-wide uppercase'>Live order feed</span>
          </div>
          <div className='mt-6 space-y-4'>
            {[
              'Order confirmed',
              'Baking in the 900°F oven',
              'Packed & leaving the kitchen',
              '5 minutes away'
            ].map((status) => (
              <div
                key={status}
                className='flex items-start gap-3 rounded-2xl bg-white/70 p-4 shadow-sm'
              >
                <div className='bg-primary mt-1 size-2 rounded-full' />
                <div>
                  <p className='text-foreground text-sm font-medium'>{status}</p>
                  <p className='text-muted-foreground text-xs'>Updated just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className='bg-muted/60 py-20'>
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 md:flex-row md:gap-16'>
        <div className='md:w-1/2'>
          <h2 className='text-foreground text-3xl font-semibold sm:text-4xl'>
            Loved by late-night dreamers and dinner party pros
          </h2>
          <p className='text-muted-foreground mt-4 text-base'>
            Thousands of city diners trust NeonSlice to deliver pizza that feels like it came
            straight from the oven to the table.
          </p>
          <div className='text-muted-foreground mt-6 flex items-center gap-4 rounded-full bg-white/80 px-4 py-3 text-sm shadow-sm'>
            <Star className='size-4 text-yellow-500' />
            Rated 4.9/5 across 12,000+ reviews
          </div>
        </div>
        <div className='grid flex-1 gap-6'>
          {testimonials.map(({ quote, name, role }) => (
            <blockquote
              key={name}
              className='border-border rounded-3xl border bg-white p-6 shadow-sm'
            >
              <p className='text-foreground text-base'>“{quote}”</p>
              <footer className='text-muted-foreground mt-4 text-sm font-medium'>
                {name} · {role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <section className='mx-auto w-full max-w-5xl px-6 py-20'>
      <div className='border-primary/25 from-primary/15 via-primary/10 rounded-3xl border bg-gradient-to-r to-orange-200/40 p-10 text-center shadow-lg'>
        <p className='border-primary/20 text-primary mx-auto flex max-w-fit items-center gap-2 rounded-full border bg-white/70 px-4 py-1 text-xs font-semibold tracking-wide uppercase'>
          <Sparkles className='size-4' />
          Tonight only
        </p>
        <h2 className='text-foreground mt-6 text-3xl font-semibold sm:text-4xl'>
          Free dessert pizza with your first NeonSlice order
        </h2>
        <p className='text-muted-foreground mt-3 text-base'>
          Create an account, schedule a delivery window, and experience the thrill of pizza that
          travels better than it should.
        </p>
        <div className='mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button className='px-10 py-3 text-base' size='lg'>
            Claim my offer
            <ArrowRight className='size-4' />
          </Button>
          <Button asChild className='px-8 py-3 text-base' variant='ghost'>
            <Link href='/about'>Learn more about NeonSlice</Link>
          </Button>
        </div>
      </div>
    </section>

    <footer className='border-border text-muted-foreground border-t bg-white/80 py-10 text-sm'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row'>
        <p>© {new Date().getFullYear()} NeonSlice Delivery Co. All rights reserved.</p>
        <div className='flex items-center gap-4'>
          <Link href='/privacy' className='hover:text-foreground'>
            Privacy
          </Link>
          <Link href='/terms' className='hover:text-foreground'>
            Terms
          </Link>
          <Link href='/careers' className='hover:text-foreground'>
            Careers
          </Link>
        </div>
      </div>
    </footer>
  </main>
);

export default HomePage;
