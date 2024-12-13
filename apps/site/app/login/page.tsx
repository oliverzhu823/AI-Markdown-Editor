import { LoginModal } from '@/clients/components/login';
import { AuthHelper } from '@/libs';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await AuthHelper.luciaAuth.getSession();

  if (session) redirect('/');

  return (
    <div className="h-screen">
      <LoginModal open={true} />
    </div>
  );
};

export default Page;
