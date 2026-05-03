import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currPassword: z
      .string({ message: "campo obrigatório" })
      .min(6, "no mínimo 6 caracteres"),
    newPassword: z
      .string({ message: "campo obrigatório" })
      .min(6, "no mínimo 6 caracteres"),
    confirmPassword: z
      .string({ message: "campo obrigatório" })
      .min(6, "no mínimo 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
