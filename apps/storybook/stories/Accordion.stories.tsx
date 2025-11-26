import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@vormir/react';

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" className="w-[600px]">
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
        <AccordionContent value="item-1">
          Yes. It adheres to the WAI-ARIA design pattern and provides full keyboard navigation.
          The component follows accessibility best practices and is screen reader friendly.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Is it beautifully styled?</AccordionTrigger>
        <AccordionContent value="item-2">
          Yes. It features a modern card-based design with smooth animations, hover effects,
          and elegant transitions. The styling adapts perfectly to both light and dark modes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Are the animations smooth?</AccordionTrigger>
        <AccordionContent value="item-3">
          Absolutely! The accordion uses smooth height transitions with proper easing curves.
          Watch how smoothly it expands and collapses with a 300ms transition duration.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[600px]" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Multiple items can be open</AccordionTrigger>
        <AccordionContent value="item-1">
          In this mode, multiple accordion items can be expanded at the same time.
          Each item maintains its own state independently from the others.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Independent expansion</AccordionTrigger>
        <AccordionContent value="item-2">
          Each item expands and collapses independently of the others. The smooth transitions
          work seamlessly even when multiple items are being toggled simultaneously.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Try opening all items</AccordionTrigger>
        <AccordionContent value="item-3">
          You can have all items open simultaneously in multiple mode. Notice how the 
          animations remain smooth and performant regardless of how many items are open.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" className="w-[600px]">
      <AccordionItem value="shipping">
        <AccordionTrigger value="shipping">What are your shipping options?</AccordionTrigger>
        <AccordionContent value="shipping">
          We offer standard shipping (5-7 business days), express shipping (2-3 business days),
          and overnight shipping. Free standard shipping is available for orders over $50.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="returns">
        <AccordionTrigger value="returns">What is your return policy?</AccordionTrigger>
        <AccordionContent value="returns">
          We accept returns within 30 days of purchase. Items must be in original condition
          with tags attached. Refunds are processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="warranty">
        <AccordionTrigger value="warranty">Do products come with a warranty?</AccordionTrigger>
        <AccordionContent value="warranty">
          All our products come with a 1-year manufacturer warranty. Extended warranty options
          are available at checkout for most items.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="international">
        <AccordionTrigger value="international">
          Do you ship internationally?
        </AccordionTrigger>
        <AccordionContent value="international">
          Yes, we ship to over 50 countries worldwide. International shipping rates and
          delivery times vary by location. Customs fees may apply.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <Accordion type="single" className="w-[600px]">
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Getting Started</AccordionTrigger>
        <AccordionContent value="item-1">
          <div className="space-y-3">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">Follow these steps to get started:</p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li className="text-neutral-700 dark:text-neutral-300">Install the package with your preferred package manager</li>
              <li className="text-neutral-700 dark:text-neutral-300">Import the Accordion components you need</li>
              <li className="text-neutral-700 dark:text-neutral-300">Configure the type and default values</li>
              <li className="text-neutral-700 dark:text-neutral-300">Start building amazing UIs!</li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">API Reference</AccordionTrigger>
        <AccordionContent value="item-2">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Main Props</h4>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li className="text-neutral-700 dark:text-neutral-300"><code className="text-brand-600 dark:text-brand-400">type</code>: 'single' | 'multiple'</li>
                <li className="text-neutral-700 dark:text-neutral-300"><code className="text-brand-600 dark:text-brand-400">defaultValue</code>: string | string[]</li>
                <li className="text-neutral-700 dark:text-neutral-300"><code className="text-brand-600 dark:text-brand-400">value</code>: string | string[]</li>
                <li className="text-neutral-700 dark:text-neutral-300"><code className="text-brand-600 dark:text-brand-400">onValueChange</code>: (value) =&gt; void</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Features</AccordionTrigger>
        <AccordionContent value="item-3">
          <div className="space-y-2">
            <p className="text-neutral-700 dark:text-neutral-300">This accordion comes with many great features:</p>
            <div className="grid gap-2 mt-2">
              <div className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">Smooth height transitions with proper easing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">Beautiful card-based design with hover effects</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">Full keyboard navigation support</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">Light and dark mode compatible</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
