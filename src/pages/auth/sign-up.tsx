import { Label } from "@radix-ui/react-label";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { trpc } from "../../utils/trpc";

type SignUpForm = {
  email: string;
  password: string;
  secret: string;
};

const SignUp: NextPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const onSubmit = (data: SignUpForm) => {
    signUp.mutate(data);
  };
  const signUp = trpc.auth.signUp.useMutation();

  return (
    <main className="flex justify-center pt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="just flex w-fit flex-col items-center gap-4"
      >
        <fieldset>
          <Label htmlFor="email-input">Email</Label>
          <Input id="email-input" {...register("email", { required: true })} />
        </fieldset>
        <fieldset>
          <Label htmlFor="pw-input">Password</Label>
          <Input id="pw-input" {...register("password", { required: true })} />
        </fieldset>
        <fieldset>
          <Label htmlFor="secret-input">Secret</Label>
          <Input
            id="secret-input"
            {...register("secret", { required: true })}
          />
        </fieldset>
        <fieldset>
          <Button type="submit">Sign Up</Button>
        </fieldset>
      </form>
    </main>
  );
};

export default SignUp;
