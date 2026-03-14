import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We serve Kelowna, West Kelowna, Lake Country, Peachland, and surrounding areas in the Okanagan Valley. Our fully equipped mobile unit comes directly to your location.",
  },
  {
    question: "How long does a detail take?",
    answer: "An Essential detail takes 3–4 hours, Premium takes 4–6 hours, and our Ceramic Pro package takes 1–2 days depending on the condition of the paint and the level of correction needed.",
  },
  {
    question: "What is ceramic coating?",
    answer: "Ceramic coating is a liquid polymer applied to your vehicle's exterior that creates a permanent bond with the paint. It provides 9H hardness protection against UV damage, chemical stains, scratches, and makes cleaning effortless with its hydrophobic properties.",
  },
  {
    question: "Do I need to provide water or electricity?",
    answer: "No. Our mobile unit is fully self-contained with filtered water, generator power, and professional-grade equipment. We just need access to your vehicle.",
  },
  {
    question: "How do I book a service?",
    answer: "You can book directly through our website by selecting a package and choosing your preferred date. We'll confirm your appointment within 2 hours.",
  },
  {
    question: "What products do you use?",
    answer: "We use only professional-grade products including Gyeon, CarPro, and Rupes. All products are pH-balanced and safe for all paint types including matte finishes.",
  },
];

const transition = { type: "spring" as const, duration: 0.5, bounce: 0 };

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
