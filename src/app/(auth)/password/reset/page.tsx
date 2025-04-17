// app/password/reset/page.tsx
import ResetPasswordForm from './ResetPasswordForm';

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
    return <ResetPasswordForm token={searchParams.token} />;
}
