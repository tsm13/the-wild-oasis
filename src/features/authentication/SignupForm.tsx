import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { ISignupFormValues } from "./interface";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<ISignupFormValues>();
  const { errors } = formState;

  const onSubmit = ({ fullName, email, password }: ISignupFormValues) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset,
      }
    );
  };

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required." })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password needs to be at least 8 characters.",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords must match.",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            $variation="secondary"
            type="reset"
            size="medium"
            disabled={isLoading}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button $variation="primary" size="medium" disabled={isLoading}>
            Create new user
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
