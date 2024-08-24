import { z } from "zod";

export const userSchema = z.object({
  username: z.string()
    .min(5, 'Username must be between 5-20 characters')
    .max(20, 'Username must be between 5-20 characters'),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must contain at least 8 characters'),
  mbti: z.string().min(4).max(4),
  dob_date: z.string(),
  dob_time: z.string(),
  dob_location: z.string()
});

export type User = z.infer<typeof userSchema>;
