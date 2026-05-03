import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

import {
  updatePasswordSchema,
  UpdatePasswordSchema,
} from "./UpdatePasswordSchema";

type UpdatePasswordFormProps = {
  onSubmit: (data: UpdatePasswordSchema) => void;
};

export function UpdatePasswordForm({ onSubmit }: UpdatePasswordFormProps) {
  const { control, handleSubmit } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  return (
    <Box>
      <Controller
        control={control}
        name="currPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="curr-password-input"
            label="Senha Atual"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="*********"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="new-password-input"
            label="Nova Senha"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="*********"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="confirm-new-password-input"
            label="Confirmar nova senha"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="*********"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button
        testID="submit-button"
        mt="s16"
        title="Atualizar"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
