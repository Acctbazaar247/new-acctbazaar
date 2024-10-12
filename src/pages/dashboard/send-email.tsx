import AppButton from "@/components/ui/AppButton";
import AppFormInput from "@/components/ui/AppFormInput";
import AppFormTextarea from "@/components/ui/AppFormTextarea";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  subject: string;
  body: string;
}

const SendEmail = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">Send Email</h2>

      <form
        className="w-full md:py-4 2xl:py-5 space-y-4 lg:space-y-5 2xl:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppFormInput
          name="subject"
          required={true}
          register={register}
          type="text"
          label="Subject"
          placeholder="Type your subject"
          error={errors.subject}
        />

        <AppFormTextarea
          name="body"
          label="Body"
          placeholder="Type your email body"
          rows={10}
          register={register}
          error={errors.body}
        />
        <div className="flex items-center justify-center">
          <AppButton label="Send Email" />
        </div>
      </form>
    </SuperAdminLayout>
  );
};

export default SendEmail;
