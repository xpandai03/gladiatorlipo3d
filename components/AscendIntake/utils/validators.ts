import { z } from 'zod';

export const formSchema = z.object({
  name: z.string()
    .min(2, 'Please enter your full name (2-80 chars).')
    .max(80, 'Please enter your full name (2-80 chars).'),
  
  email: z.string()
    .email("That email doesn't look right."),
  
  phone_raw: z.string()
    .min(10, 'Please enter a valid phone number.'),
  
  phone_e164: z.string().optional(),
  
  note: z.string()
    .max(1000, 'Please keep this under 1000 characters.')
    .optional()
    .or(z.literal('')),
  
  consent_communications: z.boolean()
    .refine((val) => val === true, {
      message: 'Please agree to be contacted to continue.'
    })
});

export type FormSchema = z.infer<typeof formSchema>;

export const validateStep = (step: string, value: any): { valid: boolean; error?: string } => {
  try {
    const stepSchema = formSchema.shape[step as keyof typeof formSchema.shape];
    if (stepSchema) {
      stepSchema.parse(value);
      return { valid: true };
    }
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message };
    }
    return { valid: false, error: 'Invalid input' };
  }
};